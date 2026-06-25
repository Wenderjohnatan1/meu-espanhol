import React, { useState } from 'react';
import { Phrase } from '../types';
import { speakPhrase, createSpeechRecognizer } from '../utils/speech';
import { Volume2, Eye, EyeOff, Check, Mic, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhraseCardProps {
  key?: React.Key;
  phrase: Phrase;
  flag: string;
  onRecordError?: (errorMsg: string) => void;
  onTrackError?: (original: string, corrected: string, exp: string) => void;
}

export default function PhraseCard({ phrase, flag, onRecordError, onTrackError }: PhraseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpying, setIsSpying] = useState(false);
  
  // Pronunciation check states
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const handleSpeak = () => {
    setIsPlaying(true);
    speakPhrase(phrase.spanish, phrase.country, () => {
      setIsPlaying(false);
    });
  };

  const handleStartListening = () => {
    setUserTranscript('');
    setMatchScore(null);
    
    const recognizer = createSpeechRecognizer(
      phrase.country,
      (result) => {
        setUserTranscript(result);
        calculateScore(result, phrase.spanish);
      },
      (error) => {
        let msg = "Erro ao acessar o microfone.";
        if (error === 'not-allowed') msg = "Permissão ao microfone negada.";
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
        onRecordError("Reconhecimento de voz não é suportado ou está bloqueado no iframe. Experimente digitar!");
      }
    }
  };

  const cleanTextForComparison = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[¿?¡!.,;:_-]/g, "")
      .trim();
  };

  const calculateScore = (userText: string, targetText: string) => {
    const cleanUser = cleanTextForComparison(userText);
    const cleanTarget = cleanTextForComparison(targetText);
    
    if (cleanUser === cleanTarget) {
      setMatchScore(100);
      return;
    }

    const userWords = cleanUser.split(/\s+/);
    const targetWords = cleanTarget.split(/\s+/);
    
    let matches = 0;
    targetWords.forEach(word => {
      if (userWords.includes(word)) matches++;
    });

    const score = Math.round((matches / targetWords.length) * 100);
    setMatchScore(score);

    // If score is low, log an error for the user to review later
    if (score < 75 && onTrackError) {
      onTrackError(
        userText || "[Sua fala não foi compreendida]",
        targetText,
        `Tentativa de pronúncia para a frase "${targetText}". Você disse "${userText || "..."}". Foque na entonação local do sotaque de ${phrase.country.toUpperCase()}.`
      );
    }
  };

  return (
    <div id={`phrase-card-${phrase.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow duration-300 p-5 flex flex-col gap-4">
      {/* Top row */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono font-medium tracking-wide text-gray-400 uppercase bg-gray-50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <span>{flag}</span>
          <span>{phrase.category}</span>
        </span>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          {phrase.difficulty}
        </span>
      </div>

      {/* Main Spanish Sentence */}
      <div className="py-2">
        <h3 className="text-xl font-sans font-semibold text-gray-900 tracking-tight leading-relaxed">
          {phrase.spanish}
        </h3>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-50">
        {/* Play Button (Ouvir) */}
        <button
          id={`play-btn-${phrase.id}`}
          onClick={handleSpeak}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
            isPlaying 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
          }`}
          title="Ouvir pronúncia original"
        >
          <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span>Ouvir</span>
        </button>

        {/* Speak Check Button (Falar) */}
        <button
          id={`record-btn-${phrase.id}`}
          onClick={handleStartListening}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
            isListening 
              ? 'bg-red-100 text-red-800 animate-pulse' 
              : 'bg-red-50 text-red-700 hover:bg-red-100'
          }`}
          title="Treinar falar essa frase"
        >
          <Mic className="w-4 h-4" />
          <span>{isListening ? 'Gravando...' : 'Falar'}</span>
        </button>

        {/* Peek Button (Espiar) */}
        <button
          id={`spy-btn-${phrase.id}`}
          onClick={() => setIsSpying(!isSpying)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ml-auto ${
            isSpying 
              ? 'bg-indigo-100 text-indigo-800' 
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
          }`}
          title="Espiar tradução e gíria"
        >
          {isSpying ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{isSpying ? 'Esconder' : 'Espiar'}</span>
        </button>
      </div>

      {/* Speech result feedback */}
      <AnimatePresence>
        {userTranscript && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs flex flex-col gap-1.5"
          >
            <div className="flex justify-between items-center text-gray-500">
              <span>Você disse:</span>
              {matchScore !== null && (
                <span className={`font-semibold ${matchScore >= 80 ? 'text-emerald-600' : matchScore >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                  Sintonia: {matchScore}%
                </span>
              )}
            </div>
            <p className="font-sans font-medium text-gray-800 italic">"{userTranscript}"</p>
            {matchScore !== null && matchScore >= 80 ? (
              <span className="text-emerald-600 flex items-center gap-1 font-medium mt-1">
                <Check className="w-3.5 h-3.5" /> Pronúncia muito boa! ¡Excelente!
              </span>
            ) : matchScore !== null ? (
              <span className="text-amber-600 flex items-center gap-1 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5" /> Quase lá! Ouça novamente e repita focado no sotaque.
              </span>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Peek Details (Espiar) */}
      <AnimatePresence>
        {isSpying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-dashed border-gray-100 flex flex-col gap-3">
              <div>
                <span className="text-xs font-medium text-indigo-500 uppercase tracking-wider block mb-1">
                  Tradução Prática:
                </span>
                <p className="text-sm font-semibold text-gray-800 font-sans">
                  {phrase.translation}
                </p>
              </div>

              <div className="bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-50 flex gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-indigo-800 block">
                    Espiada Cultural & Gíria:
                  </span>
                  <p className="text-xs text-indigo-950 mt-1 leading-relaxed font-sans font-medium">
                    {phrase.explanation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
