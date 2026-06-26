// Browser Web Speech API wrappers

// Pre-trigger voice loading in browsers like Chrome so the voice list is populated early
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}

// 1. Text-to-Speech (TTS)
export const speakPhrase = (text: string, country: string, onEnd?: () => void) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn("Speech synthesis is not supported in this browser.");
    onEnd?.();
    return;
  }

  // Cancel any ongoing speaking
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a fitting Spanish voice
  const voices = window.speechSynthesis.getVoices();
  
  // Locale mappings for accents
  const countryLocales: Record<string, string[]> = {
    colombia: ['es-CO', 'es-VE', 'es-MX', 'es'],
    mexico: ['es-MX', 'es-US', 'es']
  };

  const targets = countryLocales[country.toLowerCase()] || ['es-MX', 'es-ES', 'es'];
  
  // Prioritize female voices for Spanish locales to match Valentina/female characters
  const femaleIndicators = [
    'female', 'femenino', 'femenina', 'mujer', 'sabina', 'helena', 'paulina', 
    'monica', 'mónica', 'elena', 'maria', 'maría', 'sofia', 'sofía', 'sol', 
    'lucia', 'lucía', 'clara', 'marisol', 'sandra', 'laura', 'angela', 'ángela', 
    'rosa', 'carmen', 'google español', 'zira', 'samantha', 'karen', 'tessa',
    'yolanda', 'sara', 'carlota', 'elsa', 'penelope', 'penélope', 'francisca', 
    'paola', 'isabela', 'isabella', 'gabriela', 'valeria', 'camila', 'alejandra', 
    'siri', 'luana', 'leia', 'victoria', 'anita', 'chloe', 'susan', 'hazel', 
    'meera', 'heera', 'sylvia', 'natalia', 'soledad', 'teresa', 'juana', 'alicia'
  ];

  const maleIndicators = [
    'male', 'masculino', 'hombre', 'jorge', 'juan', 'diego', 'julio', 
    'pablo', 'alvaro', 'álvaro', 'miguel', 'enrique', 'carlos', 'microsoft david',
    'raul', 'raúl', 'jose', 'josé', 'eduardo', 'manuel', 'alejandro', 'rodrigo', 
    'gonzalo', 'javier', 'mateo', 'santiago', 'sebastian', 'sebastián', 'nicolas', 
    'nicolás', 'samuel', 'daniel', 'andres', 'andrés', 'felipe', 'luis', 'pedro', 
    'paco', 'pepe', 'francisco', 'antonio', 'fernando', 'ricardo', 'roberto', 
    'hugo', 'marcos', 'david', 'microsoft pablo', 'microsoft raul', 'microsoft jose',
    'carlos', 'luis', 'alberto', 'ricardo', 'tomas', 'tomás'
  ];

  // Filter voices that match any of the target languages
  const candidates: SpeechSynthesisVoice[] = [];
  for (const target of targets) {
    const matched = voices.filter(v => v.lang.toLowerCase().replace('_', '-').includes(target.toLowerCase().replace('_', '-')));
    candidates.push(...matched);
  }
  
  // Deduplicate candidates
  const uniqueCandidates = Array.from(new Set(candidates));

  // Score candidates to prioritize female voices and correct locale specificity
  const scoredCandidates = uniqueCandidates.map(voice => {
    const nameLower = voice.name.toLowerCase();
    
    // Find index of target in preferred targets array to represent locale priority (lower index = better locale match)
    let localeIndex = targets.findIndex(target => voice.lang.toLowerCase().replace('_', '-').includes(target.toLowerCase().replace('_', '-')));
    if (localeIndex === -1) localeIndex = 99;

    let isFemale = false;
    let isMale = false;

    for (const indicator of femaleIndicators) {
      if (nameLower.includes(indicator)) {
        isFemale = true;
        break;
      }
    }

    for (const indicator of maleIndicators) {
      if (nameLower.includes(indicator)) {
        isMale = true;
        break;
      }
    }

    let genderScore = 0;
    if (isFemale && !isMale) {
      genderScore = 2; // Strong preference for female voice
    } else if (isMale) {
      genderScore = -2; // Strong aversion to male voice
    } else {
      genderScore = 0; // Neutral / unspecified
    }

    return {
      voice,
      genderScore,
      localeIndex
    };
  });

  // Sort by female preference first, then by the best locale match
  scoredCandidates.sort((a, b) => {
    if (b.genderScore !== a.genderScore) {
      return b.genderScore - a.genderScore;
    }
    return a.localeIndex - b.localeIndex;
  });

  let selectedVoice = null;
  if (scoredCandidates.length > 0) {
    selectedVoice = scoredCandidates[0].voice;
  } else {
    // Fallback: look for any voice matching targets sequentially
    for (const target of targets) {
      selectedVoice = voices.find(v => v.lang.toLowerCase().includes(target.toLowerCase()));
      if (selectedVoice) break;
    }
  }

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }
  
  utterance.lang = targets[0];
  // Slightly adjust pitch and rate for natural feeling
  utterance.rate = 0.9; // Spoken slightly slower for learners
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
};

// 2. Speech Recognition (Speech-to-Text) helper
export interface SpeechRecognitionResult {
  transcript: string;
  isFinal: boolean;
}

export const createSpeechRecognizer = (
  country: string,
  onResult: (result: string) => void,
  onError: (error: string) => void,
  onEnd: () => void
) => {
  if (typeof window === 'undefined') return null;

  const SpeechRecognition = 
    (window as any).SpeechRecognition || 
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Speech recognition is not supported in this browser.");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  // Set local language code
  const countryLocales: Record<string, string> = {
    colombia: 'es-CO',
    mexico: 'es-MX'
  };
  
  recognition.lang = countryLocales[country.toLowerCase()] || 'es-CO';

  recognition.onresult = (event: any) => {
    const result = event.results[event.results.length - 1];
    if (result.isFinal) {
      onResult(result[0].transcript);
    }
  };

  recognition.onerror = (event: any) => {
    console.error("Speech Recognition Error:", event.error);
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
};
