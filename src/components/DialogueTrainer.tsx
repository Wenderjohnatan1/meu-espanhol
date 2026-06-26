import React, { useState, useEffect, useRef } from 'react';
import { conversations, Conversation, ConversationTurn } from '../data/conversations';
import { speakPhrase, createSpeechRecognizer } from '../utils/speech';
import { 
  BookOpen, Volume2, Mic, Eye, Check, RefreshCw, ChevronRight, 
  ArrowLeft, Compass, Award, Star, MessageSquare, AlertCircle, Info, Flame, Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Country } from '../types';

interface DialogueTrainerProps {
  activeDialect: Country;
  onTrackError?: (original: string, corrected: string, explanation: string) => void;
  onSavePhraseToSRS?: (spanish: string, translation: string, explanation: string, category: string) => void;
}

export default function DialogueTrainer({ activeDialect, onTrackError, onSavePhraseToSRS }: DialogueTrainerProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [filterCategory, setFilterCategory] = useState<string>('todos');
  
  // Speech states
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [micError, setMicError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // tracks active TTS playing turn ID
  const [savedTurns, setSavedTurns] = useState<Record<string, boolean>>({});

  // Conversation history for the chat-like bubble flow
  const [chatHistory, setChatHistory] = useState<ConversationTurn[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, currentTurnIndex]);

  // Reset selection when dialect changes
  useEffect(() => {
    setSelectedConversation(null);
    setChatHistory([]);
  }, [activeDialect]);

  // Load conversation progress / initialize
  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setCurrentTurnIndex(0);
    setRevealedTranslations({});
    setUserTranscript('');
    setMatchScore(null);
    setFeedbackMessage('');
    setMicError(null);
    setSavedTurns({});
    // Initialize history with the first message
    setChatHistory([conv.turns[0]]);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setChatHistory([]);
  };

  const toggleTranslation = (turnId: string) => {
    setRevealedTranslations(prev => ({
      ...prev,
      [turnId]: !prev[turnId]
    }));
  };

  const handleSpeakText = (text: string, turnId: string) => {
    setIsPlaying(turnId);
    speakPhrase(text, activeDialect, () => {
      setIsPlaying(null);
    });
  };

  // Sound recognition
  const handleStartRecording = (targetText: string, turn: ConversationTurn) => {
    setUserTranscript('');
    setMatchScore(null);
    setFeedbackMessage('');
    setMicError(null);

    const recognizer = createSpeechRecognizer(
      activeDialect,
      (result) => {
        setUserTranscript(result);
        evaluateSpeech(result, targetText, turn);
      },
      (error) => {
        let msg = "Microfone não pôde ser ativado.";
        if (error === 'not-allowed') {
          msg = "Permissão ao microfone negada. Ative nas configurações do navegador.";
        }
        setMicError(msg);
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
      setMicError("Reconhecimento de fala indisponível neste navegador.");
    }
  };

  const cleanText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[¿?¡!.,;:_()\-]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const evaluateSpeech = (userText: string, targetText: string, turn: ConversationTurn) => {
    const user = cleanText(userText);
    const target = cleanText(targetText);

    const isCol = activeDialect === 'colombia';
    const characterName = isCol ? 'Valentina' : 'Ximena';

    if (user === target) {
      setMatchScore(100);
      setFeedbackMessage(
        isCol 
          ? "¡Espectacular, parce! Pronúncia 100% idêntica e ritmo impecável."
          : "¡Órale, qué chido! Pronúncia impecável e sotaque super chilango."
      );
      return;
    }

    const userWords = user.split(/\s+/);
    const targetWords = target.split(/\s+/);

    let matches = 0;
    targetWords.forEach(word => {
      if (userWords.includes(word)) matches++;
    });

    const score = Math.round((matches / targetWords.length) * 100);
    setMatchScore(score);

    if (score >= 80) {
      setFeedbackMessage(
        isCol
          ? `¡Qué berraquera! Excelente pronúncia. ${characterName} te entendeu perfeitamente!`
          : `¡No manches, qué chido! Excelente pronúncia. ${characterName} te entendeu perfeitamente!`
      );
    } else if (score >= 50) {
      setFeedbackMessage(
        isCol
          ? `¡Muy bien! Te entenderam, mas que tal polir os fonemas colombianos?`
          : `¡Ahí la llevas! Te entenderam, mas que tal treinar mais para pegar o sotaque mexicano?`
      );
      // Automatically register to error list if score is mediocre
      if (onTrackError) {
        onTrackError(
          userText || "Pronúncia parcial",
          targetText,
          `Pronúncia parcial (${score}%) no diálogo "${selectedConversation?.title}" (${activeDialect === 'colombia' ? 'Colômbia' : 'México'}).`
        );
      }
    } else {
      setFeedbackMessage(
        isCol
          ? "¡Qué pena! Não compreendi bem. Clique em 'Ouvir' acima para pegar o ritmo e tente de novo!"
          : "¡Qué onda! Não captei bem. Clique em 'Ouvir' acima para imitar a entonação e tente de novo!"
      );
      if (onTrackError) {
        onTrackError(
          userText || "Silêncio ou ruído",
          targetText,
          `Sintonia baixa de pronúncia (${score}%) no diálogo "${selectedConversation?.title}" (${activeDialect === 'colombia' ? 'Colômbia' : 'México'}).`
        );
      }
    }
  };

  const handleNextTurn = () => {
    if (!selectedConversation) return;
    
    const nextIdx = currentTurnIndex + 1;
    if (nextIdx < selectedConversation.turns.length) {
      setCurrentTurnIndex(nextIdx);
      setUserTranscript('');
      setMatchScore(null);
      setFeedbackMessage('');
      setMicError(null);
      // Append next turn to flow history
      setChatHistory(prev => [...prev, selectedConversation.turns[nextIdx]]);
    } else {
      // Completed conversation!
      setCurrentTurnIndex(nextIdx); // this triggers the completed screen
    }
  };

  const handleSaveToSRS = (turn: ConversationTurn) => {
    if (onSavePhraseToSRS) {
      const isCol = activeDialect === 'colombia';
      const cat = selectedConversation?.category || 'Diálogos';
      const explanation = turn.slangTip || `Expressão útil do dia a dia no sotaque ${isCol ? 'colombiano' : 'mexicano'}.`;
      
      onSavePhraseToSRS(turn.spanish, turn.translation, explanation, cat);
      setSavedTurns(prev => ({ ...prev, [turn.id]: true }));
    }
  };

  // Filter conversations by active dialect and category
  const categories = ['todos', 'Hotel', 'Flerte', 'Restaurante', 'Táxi', 'Balada', 'Cotidiano'];
  const filteredConversations = conversations.filter(c => 
    c.dialect === activeDialect &&
    (filterCategory === 'todos' || c.category.toLowerCase() === filterCategory.toLowerCase())
  );

  const isCol = activeDialect === 'colombia';
  const characterName = isCol ? 'Valentina' : 'Ximena';
  const flag = isCol ? '🇨🇴' : '🇲🇽';

  return (
    <div className="flex flex-col gap-4">
      
      {!selectedConversation ? (
        // List of conversations
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              <Compass className="text-indigo-600 w-4 h-4" /> Laboratório de Diálogos da {characterName} {flag}
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed">
              Pratique conversação ativa no espanhol real do {isCol ? 'dia a dia da Colômbia (Medellín, Bogotá)' : 'cotidiano do México (CDMX, Guadalajara)'}. Escolha uma das 15 situações temáticas para treinar!
            </p>
            
            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 mt-3 flex-nowrap scrollbar-none">
              {categories.map((cat) => (
                <button
                  id={`dialog-cat-${cat}`}
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                    filterCategory === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat === 'todos' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredConversations.map((conv) => (
              <div
                id={`conv-card-${conv.id}`}
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-3xs hover:border-indigo-100 hover:shadow-2xs transition-all cursor-pointer flex flex-col gap-2 relative overflow-hidden group"
              >
                {/* Accent Highlight strip */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 group-hover:bg-amber-400 transition-colors" />
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    conv.category === 'Hotel' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    conv.category === 'Flerte' ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                    conv.category === 'Restaurante' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    conv.category === 'Táxi' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    conv.category === 'Balada' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                    'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {conv.category}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    📍 {conv.location}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {conv.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                    {conv.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-50 text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  <span>{conv.turns.length} Frases / Trocas</span>
                  <span className="text-indigo-600 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Treinar Diálogo <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
            {filteredConversations.length === 0 && (
              <div className="text-center py-8 bg-white border border-gray-100 rounded-2xl">
                <p className="text-xs text-gray-400 font-medium">Nenhum diálogo disponível nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Active Simulator View
        <div className="bg-white border border-gray-150 rounded-3xl p-4 shadow-sm flex flex-col gap-4 min-h-[500px]">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <button
              id="dialog-back-btn"
              onClick={handleBackToList}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
            <div className="text-center">
              <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider">
                Sotaque {isCol ? 'Colombiano' : 'Mexicano'} ({selectedConversation.location})
              </span>
              <h4 className="font-bold text-gray-900 text-xs">
                {selectedConversation.title}
              </h4>
            </div>
            <div className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full font-bold text-[10px] uppercase">
              {currentTurnIndex < selectedConversation.turns.length ? (
                <span>{currentTurnIndex + 1} / {selectedConversation.turns.length}</span>
              ) : (
                <span>Fim 🎉</span>
              )}
            </div>
          </div>

          {currentTurnIndex < selectedConversation.turns.length ? (
            // Dialogue Flow Active
            <div className="flex-1 flex flex-col gap-4">
              
              {/* Chat bubbles container */}
              <div className="flex-1 overflow-y-auto max-h-[250px] pr-1 flex flex-col gap-3 min-h-[180px]">
                {chatHistory.slice(0, -1).map((histTurn) => (
                  <div
                    key={histTurn.id}
                    className={`flex flex-col max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed relative ${
                      histTurn.isUserTurn
                        ? 'bg-indigo-600 text-white self-end rounded-br-none'
                        : 'bg-gray-100 text-gray-800 self-start rounded-bl-none'
                    }`}
                  >
                    <span className={`font-bold text-[9px] uppercase mb-0.5 tracking-wider ${
                      histTurn.isUserTurn ? 'text-indigo-200' : 'text-gray-400'
                    }`}>
                      {histTurn.speaker}
                    </span>
                    <p className="font-semibold">{histTurn.spanish}</p>
                    <p className={`mt-1 border-t pt-1 text-[11px] italic leading-tight ${
                      histTurn.isUserTurn ? 'border-white/15 text-indigo-100' : 'border-gray-250/20 text-gray-500'
                    }`}>
                      {histTurn.translation}
                    </p>
                    
                    {/* Tiny save phrase action */}
                    <button
                      onClick={() => handleSaveToSRS(histTurn)}
                      disabled={savedTurns[histTurn.id]}
                      className={`absolute -bottom-2 ${histTurn.isUserTurn ? '-left-2' : '-right-2'} bg-white p-1 rounded-full border shadow-3xs text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer`}
                      title="Salvar na Memorização"
                    >
                      <Save className={`w-3 h-3 ${savedTurns[histTurn.id] ? 'text-emerald-500 fill-emerald-500' : ''}`} />
                    </button>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Active prompt bubble */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                {(() => {
                  const activeTurn = selectedConversation.turns[currentTurnIndex];
                  const hasRevealed = revealedTranslations[activeTurn.id];
                  const isSaved = savedTurns[activeTurn.id];

                  return (
                    <div className="flex flex-col gap-3">
                      
                      {/* Speaker Badge */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full font-black text-[9px] uppercase tracking-wider ${
                          activeTurn.isUserTurn 
                            ? 'bg-indigo-100 text-indigo-800 animate-pulse border border-indigo-200' 
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {activeTurn.isUserTurn ? '👉 Seu Turno (Fale esta resposta)' : `🗣️ Turno de ${activeTurn.speaker}`}
                        </span>

                        <div className="flex gap-1.5 items-center">
                          <button
                            id={`speak-active-turn-${activeTurn.id}`}
                            onClick={() => handleSpeakText(activeTurn.spanish, activeTurn.id)}
                            className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                              isPlaying === activeTurn.id
                                ? 'bg-indigo-100 border-indigo-200 text-indigo-700 animate-pulse'
                                : 'bg-gray-50 border-gray-150 text-gray-600 hover:bg-gray-100'
                            }`}
                            title="Ouvir a pronúncia oficial"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isPlaying === activeTurn.id ? 'Tocando...' : 'Ouvir'}</span>
                          </button>

                          <button
                            id={`reveal-active-turn-${activeTurn.id}`}
                            onClick={() => toggleTranslation(activeTurn.id)}
                            className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                              hasRevealed
                                ? 'bg-amber-50 border-amber-200 text-amber-700'
                                : 'bg-gray-50 border-gray-150 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{hasRevealed ? 'Ocultar' : 'Espiar'}</span>
                          </button>

                          <button
                            onClick={() => handleSaveToSRS(activeTurn)}
                            disabled={isSaved}
                            className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
                              isSaved
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-gray-50 border-gray-150 text-gray-600 hover:bg-gray-100'
                            }`}
                            title="Memorizar esta frase"
                          >
                            <Save className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                            <span>{isSaved ? 'Salvo' : 'Memorizar'}</span>
                          </button>
                        </div>
                      </div>

                      {/* The Spanish phrase display */}
                      <div className={`rounded-2xl p-4 border text-center ${
                        activeTurn.isUserTurn 
                          ? 'bg-indigo-50/50 border-indigo-100' 
                          : 'bg-amber-50/30 border-amber-100/50'
                      }`}>
                        <p className="text-base font-bold text-gray-900 leading-relaxed font-sans">
                          "{activeTurn.spanish}"
                        </p>
                        
                        <AnimatePresence>
                          {hasRevealed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2.5 pt-2.5 border-t border-gray-150/40 text-left"
                            >
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Tradução aproximada:</span>
                              <p className="text-xs text-gray-700 font-sans leading-relaxed italic">
                                "{activeTurn.translation}"
                              </p>
                              {activeTurn.slangTip && (
                                <div className="mt-2 p-2 bg-amber-50 rounded-lg text-[11px] text-amber-900 font-medium leading-relaxed border border-amber-100/30">
                                  💡 <strong>Dica de Sotaque:</strong> {activeTurn.slangTip}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Interactive Section for User Turn (Microphone) */}
                      {activeTurn.isUserTurn ? (
                        <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-2xl p-3 flex flex-col gap-2">
                          <div className="flex gap-2">
                            <button
                              id="dialog-record-btn"
                              onClick={() => handleStartRecording(activeTurn.spanish, activeTurn)}
                              className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                isListening 
                                  ? 'bg-red-500 text-white animate-pulse shadow-md' 
                                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                              }`}
                            >
                              <Mic className="w-4 h-4" />
                              <span>{isListening ? 'Gravando... Fale!' : 'Gravar minha resposta'}</span>
                            </button>

                            {/* Option to skip to next turn if stuck */}
                            <button
                              id="dialog-skip-btn"
                              onClick={handleNextTurn}
                              className="px-3.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl text-xs font-bold border border-gray-150 transition-colors"
                              title="Avançar sem gravar"
                            >
                              Pular
                            </button>
                          </div>

                          {/* Error or Warning regarding mic permission */}
                          {micError && (
                            <div className="text-[10px] text-red-600 font-bold flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{micError}</span>
                            </div>
                          )}

                          {/* User Speech Transcription and evaluation */}
                          {userTranscript && (
                            <div className="mt-1.5 p-3 bg-white rounded-xl border border-indigo-100/40 text-xs">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Você falou:</span>
                              <p className="font-bold text-gray-800 italic mt-0.5">"{userTranscript}"</p>
                              
                              {matchScore !== null && (
                                <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold uppercase text-[10px] tracking-wide text-gray-500">Sintonia com o sotaque:</span>
                                    <span className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
                                      matchScore >= 80 ? 'bg-emerald-100 text-emerald-800' :
                                      matchScore >= 50 ? 'bg-amber-100 text-amber-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {matchScore}%
                                    </span>
                                  </div>

                                  {/* Progress bar visualizer */}
                                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-300 ${
                                        matchScore >= 80 ? 'bg-emerald-500' :
                                        matchScore >= 50 ? 'bg-amber-500' :
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${matchScore}%` }}
                                    />
                                  </div>

                                  <p className={`font-semibold mt-1 leading-relaxed ${
                                    matchScore >= 80 ? 'text-emerald-800' :
                                    matchScore >= 50 ? 'text-amber-800' :
                                    'text-red-800'
                                  }`}>
                                    {feedbackMessage}
                                  </p>

                                  {matchScore >= 50 && (
                                    <button
                                      id="dialog-confirm-next-btn"
                                      onClick={handleNextTurn}
                                      className="mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1"
                                    >
                                      <span>Avançar no Diálogo</span>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                        </div>
                      ) : (
                        // Standard narrator/character turn progress button
                        <button
                          id="dialog-narrator-next-btn"
                          onClick={handleNextTurn}
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm"
                        >
                          <span>Entendi e Ouvir {characterName}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}

                    </div>
                  );
                })()}
              </div>

            </div>
          ) : (
            // Completed Dialogue Screen
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl shadow-xs border border-emerald-100 relative">
                🎉
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  ★
                </div>
              </div>

              <div>
                <h3 className="font-black text-gray-900 text-lg">
                  {isCol ? '¡Felicitaciones, parcero!' : '¡Eso es todo, carnal!'}
                </h3>
                <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mt-0.5">
                  Diálogo Concluído com Sucesso!
                </p>
                <p className="text-xs text-gray-500 font-medium max-w-xs leading-relaxed mt-2">
                  Você completou o treino de conversação <strong>"{selectedConversation.title}"</strong> de ponta a ponta. Sua fluência no sotaque {isCol ? 'colombiano' : 'mexicano'} agradece!
                </p>
              </div>

              {/* Slang Glossary review block */}
              <div className="bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-4 w-full text-left">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Gírias de ouro desta conversa:
                </span>
                <div className="flex flex-col gap-2.5 mt-2.5">
                  {selectedConversation.slangGlossary.map((item, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="font-black text-indigo-950">{item.word} ➔ <span className="font-medium text-indigo-800">{item.meaning}</span></p>
                      <p className="text-[10px] text-gray-400 italic mt-0.5">Ex: "{item.example}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 w-full mt-2">
                <button
                  id="dialog-reset-conv-btn"
                  onClick={() => handleSelectConversation(selectedConversation)}
                  className="flex-1 py-3 border border-gray-150 hover:bg-gray-50 text-gray-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Repetir</span>
                </button>

                <button
                  id="dialog-finish-and-list-btn"
                  onClick={handleBackToList}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>Ver Outras Conversas</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
