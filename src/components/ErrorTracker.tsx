import React, { useState } from 'react';
import { UserError } from '../types';
import { speakPhrase, createSpeechRecognizer } from '../utils/speech';
import { Trash2, Check, Volume2, Mic, AlertCircle, BookOpen, Smile, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ErrorTrackerProps {
  errors: UserError[];
  onClearError: (id: string) => void;
  onClearAll: () => void;
  onRecordError?: (errorMsg: string) => void;
}

export default function ErrorTracker({ errors, onClearError, onClearAll, onRecordError }: ErrorTrackerProps) {
  const [activePracticeId, setActivePracticeId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [practiceScore, setPracticeScore] = useState<number | null>(null);

  const handleSpeak = (text: string) => {
    setIsPlaying(true);
    speakPhrase(text, 'argentina', () => {
      setIsPlaying(false);
    });
  };

  const handleStartListening = (targetText: string) => {
    setUserTranscript('');
    setPracticeScore(null);

    const recognizer = createSpeechRecognizer(
      'argentina',
      (result) => {
        setUserTranscript(result);
        calculateScore(result, targetText);
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

  const calculateScore = (userText: string, targetText: string) => {
    const user = cleanText(userText);
    const target = cleanText(targetText);

    if (user === target) {
      setPracticeScore(100);
      return;
    }

    const userWords = user.split(/\s+/);
    const targetWords = target.split(/\s+/);

    let matches = 0;
    targetWords.forEach(word => {
      if (userWords.includes(word)) matches++;
    });

    const score = Math.round((matches / targetWords.length) * 100);
    setPracticeScore(score);
  };

  return (
    <div className="flex flex-col gap-5 max-w-md mx-auto pb-10">
      
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
            <AlertCircle className="text-red-500 w-4 h-4" /> Laboratório de Erros
          </h3>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Dicas e revisões salvas automaticamente para você fixar.</p>
        </div>
        {errors.length > 0 && (
          <button
            id="clear-all-errors-btn"
            onClick={() => {
              if (confirm("Quer limpar todo o histórico de erros revisados?")) onClearAll();
            }}
            className="p-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/70 rounded-xl transition-all"
          >
            Limpar Tudo
          </button>
        )}
      </div>

      {errors.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center shadow-xs flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl">
            🎉
          </div>
          <h3 className="font-bold text-gray-900 text-base">¡Qué bien! Nenhum erro registrado.</h3>
          <p className="text-xs text-gray-500 max-w-xs leading-relaxed font-sans font-medium">
            Seu espanhol está re piola! Converse no chat de IA ou pratique frases do dia a dia. Se cometer deslizes, eles aparecerão aqui para você treinar a forma certa.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {errors.map((err) => {
            const isPracticing = activePracticeId === err.id;

            return (
              <div
                id={`error-card-${err.id}`}
                key={err.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs hover:shadow-sm transition-shadow duration-200 flex flex-col gap-3"
              >
                {/* Card Header row */}
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] tracking-wide ${
                    err.sourceType === 'chat' 
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}>
                    {err.sourceType === 'chat' ? 'Vindo do Chat' : 'Vindo da Pronúncia'}
                  </span>
                  <button
                    id={`delete-err-btn-${err.id}`}
                    onClick={() => onClearError(err.id)}
                    className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Excluir do histórico"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Main comparison text */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Como você disse ou tentou:</span>
                  <p className="text-sm font-semibold text-gray-500 line-through font-sans italic leading-relaxed">
                    "{err.originalText}"
                  </p>
                </div>

                <div className="flex flex-col gap-1 border-l-2 border-emerald-500 pl-3 py-0.5">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">O natural no dia a dia:</span>
                  <p className="text-sm font-bold text-gray-900 font-sans leading-relaxed">
                    "{err.correctedText}"
                  </p>
                </div>

                {/* Explanation block */}
                <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 leading-relaxed font-sans font-medium">
                  {err.explanation}
                </div>

                {/* Practice Again Block Toggle */}
                {isPracticing ? (
                  <div className="mt-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl flex flex-col gap-2.5">
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Treino corretivo imediato:
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        id="err-practice-speak-btn"
                        onClick={() => handleSpeak(err.correctedText)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                          isPlaying ? 'bg-indigo-200 text-indigo-900' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Ouvir correta</span>
                      </button>

                      <button
                        id="err-practice-record-btn"
                        onClick={() => handleStartListening(err.correctedText)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                          isListening ? 'bg-red-200 text-red-900 animate-pulse' : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isListening ? 'Gravando...' : 'Repetir correta'}</span>
                      </button>
                    </div>

                    {userTranscript && (
                      <div className="mt-1 pt-2 border-t border-indigo-100/40 text-xs">
                        <p className="text-gray-500">Você falou:</p>
                        <p className="font-bold text-gray-800 italic">"{userTranscript}"</p>
                        {practiceScore !== null && (
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className={`font-bold ${practiceScore >= 80 ? 'text-emerald-700' : 'text-amber-700'}`}>
                              Sintonia: {practiceScore}%
                            </span>
                            {practiceScore >= 80 ? (
                              <button
                                id={`resolve-err-btn-${err.id}`}
                                onClick={() => {
                                  onClearError(err.id);
                                  setActivePracticeId(null);
                                  setUserTranscript('');
                                  setPracticeScore(null);
                                }}
                                className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-lg transition-colors flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" /> Concluir e Deletar Erro
                              </button>
                            ) : (
                              <span className="text-[10px] text-amber-700 italic font-semibold">Tente falar mais próximo do ritmo nativo!</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    id={`start-practice-btn-${err.id}`}
                    onClick={() => {
                      setActivePracticeId(err.id);
                      setUserTranscript('');
                      setPracticeScore(null);
                    }}
                    className="mt-1.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                  >
                    <span>Treinar falar essa frase</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
