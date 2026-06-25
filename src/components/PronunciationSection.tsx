import React, { useState } from 'react';
import { phrases, countries } from '../data/phrases';
import { speakPhrase, createSpeechRecognizer } from '../utils/speech';
import { Volume2, Mic, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PronunciationSectionProps {
  onRecordError?: (errorMsg: string) => void;
  onTrackError?: (original: string, corrected: string, exp: string) => void;
}

export default function PronunciationSection({ onRecordError, onTrackError }: PronunciationSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('argentina');

  // Interactive training states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);

  // Filter phrases based on selected country
  const filteredPhrases = phrases.filter(p => p.country === selectedCountryFilter);
  const currentPhrase = filteredPhrases[currentIndex] || filteredPhrases[0];

  const handleNextPhrase = () => {
    setUserTranscript('');
    setScore(null);
    if (currentIndex < filteredPhrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop
    }
  };

  const handleSpeakPhrase = () => {
    setIsPlaying(true);
    speakPhrase(currentPhrase.spanish, currentPhrase.country, () => {
      setIsPlaying(false);
    });
  };

  const handleStartListening = () => {
    setUserTranscript('');
    setScore(null);
    
    const recognizer = createSpeechRecognizer(
      currentPhrase.country,
      (result) => {
        setUserTranscript(result);
        calculateScore(result);
      },
      (error) => {
        let msg = "Microfone indisponível.";
        if (error === 'not-allowed') msg = "Permissão do microfone negada.";
        if (onRecordError) onRecordError(msg);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizer) {
      try {
        setIsListening(true);
        recognizer.start();
      } catch (err) {
        console.error(err);
        setIsListening(false);
      }
    } else {
      if (onRecordError) {
        onRecordError("Reconhecimento de fala indisponível ou bloqueado por restrições de sandbox.");
      }
    }
  };

  const cleanText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[¿?¡!.,;:_]/g, "")
      .trim();
  };

  const calculateScore = (transcript: string) => {
    const user = cleanText(transcript);
    const target = cleanText(currentPhrase.spanish);

    if (user === target) {
      setScore(100);
      return;
    }

    const userWords = user.split(/\s+/);
    const targetWords = target.split(/\s+/);

    let matchedCount = 0;
    targetWords.forEach(word => {
      if (userWords.includes(word)) {
        matchedCount++;
      }
    });

    const calculatedScore = Math.round((matchedCount / targetWords.length) * 100);
    setScore(calculatedScore);

    // If score is low, auto-log as a mistake for review!
    if (calculatedScore < 80 && onTrackError) {
      onTrackError(
        transcript || "[Sua fala não foi compreendida]",
        currentPhrase.spanish,
        `Você tentou pronunciar a frase em sotaque ${currentPhrase.country.toUpperCase()}: "${currentPhrase.spanish}". Pronunciou: "${transcript || "..."}".`
      );
    }
  };

  const handleCountryFilterChange = (countryId: string) => {
    setSelectedCountryFilter(countryId);
    setCurrentIndex(0);
    setUserTranscript('');
    setScore(null);
  };

  const currentCountryInfo = countries.find(c => c.id === selectedCountryFilter) || countries[0];

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto pb-10">
      
      {/* Sotaque Selector */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
        <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Praticar Pronúncia & Escuta:
        </h3>
        <div className="flex gap-2 justify-between">
          {countries.map(c => (
            <button
              id={`pron-country-btn-${c.id}`}
              key={c.id}
              onClick={() => handleCountryFilterChange(c.id)}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedCountryFilter === c.id
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : 'border-gray-100 bg-gray-50/50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl mb-1">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Pronunciation Card */}
      {currentPhrase ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col gap-5 relative overflow-hidden">
          
          {/* Progress Indicator */}
          <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
            <span>FRASE {currentIndex + 1} DE {filteredPhrases.length}</span>
            <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider text-[10px]">
              Sotaque {currentCountryInfo.accent}
            </span>
          </div>

          {/* Large display phrase */}
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-relaxed font-sans">
              "{currentPhrase.spanish}"
            </h2>
            <p className="text-sm text-gray-400 italic mt-2">
              Tradução: {currentPhrase.translation}
            </p>
          </div>

          {/* Actions Column */}
          <div className="flex flex-col gap-3 pt-3 border-t border-gray-50">
            
            {/* Step 1: Listen (Ouvir) */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">1</span>
              <button
                id="pron-speak-btn"
                onClick={handleSpeakPhrase}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isPlaying 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                <span>{isPlaying ? 'Reproduzindo Áudio...' : 'Ouça o Sotaque Nativo'}</span>
              </button>
            </div>

            {/* Step 2: Speak (Falar) */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-xs font-bold text-red-600">2</span>
              <button
                id="pron-record-btn"
                onClick={handleStartListening}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  isListening 
                    ? 'bg-red-200 text-red-900 animate-pulse' 
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>{isListening ? 'Gravando... Fale Agora!' : 'Aperte e Fale no Microfone'}</span>
              </button>
            </div>

          </div>

          {/* Comparison Result Feedback */}
          <AnimatePresence>
            {userTranscript && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-2xl border ${
                  score !== null && score >= 85
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-950'
                    : 'bg-amber-50 border-amber-100 text-amber-950'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Resultado da Análise</span>
                  {score !== null && (
                    <span className={`text-sm font-black ${score >= 85 ? 'text-emerald-700' : 'text-amber-700'}`}>
                      Precisão: {score}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mb-1">Você falou:</p>
                <p className="font-semibold italic text-sm mb-3">"{userTranscript}"</p>

                {score !== null && score >= 85 ? (
                  <div className="flex items-start gap-2 text-xs text-emerald-800 font-medium">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                    <div>
                      <span className="font-bold block">¡Excelente pronunciación!</span>
                      Você dominou a cadência e gíria do sotaque {currentCountryInfo.accent}.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-xs text-amber-800 font-medium">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <span className="font-bold block">Foco no Sotaque!</span>
                      Você cometeu alguns erros de ritmo. Essa tentativa foi salva na aba "Erros" automaticamente para que você possa revisar quando quiser!
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          <button
            id="pron-next-btn"
            onClick={handleNextPhrase}
            className="mt-2 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-150 text-gray-700 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>Próxima Frase</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Peek description info */}
          <div className="bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100/50 text-xs text-gray-500 leading-relaxed font-sans mt-1">
            <h4 className="font-bold text-gray-700 flex items-center gap-1 mb-1">
              <HelpCircle className="w-3.5 h-3.5" /> Entendendo a gíria:
            </h4>
            {currentPhrase.explanation}
          </div>

        </div>
      ) : (
        <div className="text-center text-gray-400 py-10 font-sans font-medium">
          Nenhuma frase encontrada para esta categoria.
        </div>
      )}

    </div>
  );
}
