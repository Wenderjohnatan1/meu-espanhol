import React, { useState, useEffect } from 'react';
import { Country, SRSCard, UserAccount } from '../types';
import { speakPhrase } from '../utils/speech';
import { 
  Award, Brain, Bell, Calendar, CheckCircle, Clock, Eye, EyeOff, 
  HelpCircle, Plus, RefreshCw, Sparkles, Trash2, Volume2, Info, BellRing
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SrsSectionProps {
  activeDialect: Country;
  currentUser: UserAccount | null;
  srsCards: SRSCard[];
  onUpdateCards: (newCards: SRSCard[]) => void;
  onAddXp?: (xp: number) => void;
}

export default function SrsSection({ 
  activeDialect, 
  currentUser, 
  srsCards, 
  onUpdateCards,
  onAddXp 
}: SrsSectionProps) {
  // Tabs
  const [activeSubTab, setActiveSubTab] = useState<'revisar' | 'cartoes' | 'adicionar'>('revisar');
  
  // Custom Card Input
  const [newSpanish, setNewSpanish] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [newCategory, setNewCategory] = useState('Geral');

  // Reviewing States
  const [reviewQueue, setReviewQueue] = useState<SRSCard[]>([]);
  const [currentReviewIdx, setCurrentReviewIdx] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [frontMode, setFrontMode] = useState<'spanish' | 'translation'>('translation'); // Portuguese first by default, like real flashcards!

  // Notification states
  const [notificationPermission, setNotificationPermission] = useState<string>(() => {
    try {
      if ('Notification' in window && window.Notification) {
        return Notification.permission;
      }
    } catch (e) {
      console.warn("Notification permission check failed or blocked in iframe:", e);
    }
    return 'unsupported';
  });

  // Filter cards by active dialect
  const filteredCards = srsCards.filter(c => c.dialect === activeDialect);
  
  // Get cards currently due for review
  const getDueCards = (cards: SRSCard[]) => {
    const now = new Date();
    return cards.filter(c => c.dialect === activeDialect && new Date(c.nextReviewDate) <= now);
  };

  const dueCards = getDueCards(srsCards);

  // Initialize review session
  const startReviewSession = () => {
    const due = getDueCards(srsCards);
    // Shuffle queue
    const shuffled = [...due].sort(() => Math.random() - 0.5);
    setReviewQueue(shuffled);
    setCurrentReviewIdx(0);
    setIsRevealed(false);
  };

  useEffect(() => {
    startReviewSession();
  }, [srsCards, activeDialect]);

  // Request native notifications
  const handleRequestNotificationPermission = () => {
    try {
      if (!('Notification' in window) || !window.Notification) {
        alert("Este navegador não suporta notificações de área de trabalho.");
        return;
      }

      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === 'granted') {
          try {
            new Notification("🔔 Notificações Ativadas!", {
              body: "Ótimo! Enviaremos lembretes assim que suas frases estiverem prontas para memorização.",
            });
          } catch (err) {
            console.warn("Creating Notification failed (blocked in iframe):", err);
          }
        }
      }).catch((err) => {
        console.warn("Requesting notification permission rejected:", err);
        alert("Permissão de notificação bloqueada pelo navegador.");
      });
    } catch (e) {
      console.error("Failed to request notification permission:", e);
      alert("Não foi possível solicitar notificações neste navegador/ambiente.");
    }
  };

  // Add custom manual card
  const handleAddCustomCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpanish.trim() || !newTranslation.trim()) return;

    const newCard: SRSCard = {
      id: 'custom_' + Date.now(),
      spanish: newSpanish.trim(),
      translation: newTranslation.trim(),
      explanation: newExplanation.trim() || 'Frase personalizada adicidada por você.',
      dialect: activeDialect,
      intervalMinutes: 1, // Start small
      easeFactor: 2.5,
      nextReviewDate: new Date(Date.now() + 60 * 1000).toISOString(), // 1 min from now
      box: 1,
      addedAt: new Date().toISOString()
    };

    const updated = [newCard, ...srsCards];
    onUpdateCards(updated);

    // Reset fields
    setNewSpanish('');
    setNewTranslation('');
    setNewExplanation('');
    
    // Switch to Cards tab
    setActiveSubTab('cartoes');
    
    // Show confirmation
    if (onAddXp) onAddXp(5); // +5 XP for adding custom cards!
  };

  // Remove card from learning
  const handleDeleteCard = (id: string) => {
    if (confirm("Deseja mesmo remover esta frase do seu deck de memorização?")) {
      const updated = srsCards.filter(c => c.id !== id);
      onUpdateCards(updated);
    }
  };

  // Spaced Repetition Scheduling algorithm (SuperMemo SM-2 adaptation)
  const handleRateCard = (rating: 'hard' | 'good' | 'easy') => {
    if (reviewQueue.length === 0) return;
    const currentCard = reviewQueue[currentReviewIdx];

    let nextBox = currentCard.box;
    let nextInterval = currentCard.intervalMinutes;
    let nextEase = currentCard.easeFactor;

    if (rating === 'hard') {
      // Failed memory: reset to box 1 and schedule very soon
      nextBox = 1;
      nextInterval = 1; // 1 minute
      nextEase = Math.max(1.3, currentCard.easeFactor - 0.2);
    } else if (rating === 'good') {
      // Good review: advance boxes
      nextBox = Math.min(5, currentCard.box + 1);
      nextEase = currentCard.easeFactor;
      
      // Schedule intervals based on box level
      const intervalMap: Record<number, number> = {
        1: 5,        // 5 minutes
        2: 15,       // 15 minutes
        3: 60,       // 1 hour
        4: 360,      // 6 hours
        5: 1440,     // 1 day
      };
      nextInterval = intervalMap[nextBox] || 5;
    } else if (rating === 'easy') {
      // Very easy review: jump ahead
      nextBox = Math.min(5, currentCard.box + 1);
      nextEase = currentCard.easeFactor + 0.15;
      
      const intervalMap: Record<number, number> = {
        1: 10,       // 10 minutes
        2: 30,       // 30 minutes
        3: 120,      // 2 hours
        4: 720,      // 12 hours
        5: 2880,     // 2 days
      };
      nextInterval = intervalMap[nextBox] || 10;
    }

    // Calculate next review time
    const nextReview = new Date(Date.now() + nextInterval * 60 * 1000);

    // Update inside main list
    const updatedCards = srsCards.map(c => {
      if (c.id === currentCard.id) {
        return {
          ...c,
          box: nextBox,
          intervalMinutes: nextInterval,
          easeFactor: nextEase,
          nextReviewDate: nextReview.toISOString()
        };
      }
      return c;
    });

    onUpdateCards(updatedCards);
    if (onAddXp) onAddXp(rating === 'hard' ? 2 : rating === 'good' ? 10 : 15); // Add rewards

    // Move to next card in active queue
    if (currentReviewIdx + 1 < reviewQueue.length) {
      setCurrentReviewIdx(prev => prev + 1);
      setIsRevealed(false);
    } else {
      // Finished active queue
      setReviewQueue([]);
    }
  };

  const handleSpeakActive = (text: string) => {
    speakPhrase(text, activeDialect);
  };

  // Helper to format remaining time
  const getRemainingTimeText = (dateString: string) => {
    const diffMs = new Date(dateString).getTime() - Date.now();
    if (diffMs <= 0) return 'Pronta para revisão!';
    
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins < 60) return `Em ${diffMins} min`;
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `Em ${diffHours} h`;
    
    return `Em ${Math.round(diffHours / 24)} dias`;
  };

  const isCol = activeDialect === 'colombia';
  const flag = isCol ? '🇨🇴' : '🇲🇽';

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto pb-10">
      
      {/* Tab Switcher */}
      <div className="bg-white rounded-2xl border border-gray-100 p-1 shadow-xs flex gap-1">
        <button
          onClick={() => setActiveSubTab('revisar')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'revisar'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Estudar ({dueCards.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('cartoes')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'cartoes'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Meu Deck ({filteredCards.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('adicionar')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'adicionar'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Adicionar</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'revisar' && (
          <motion.div
            key="revisar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4"
          >
            {/* Desktop Notification Prompt */}
            {notificationPermission !== 'granted' && (
              <div className="bg-indigo-50 border border-indigo-100/60 rounded-2xl p-4 flex flex-col gap-2 shadow-3xs">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-600 text-white p-2 rounded-xl shrink-0">
                    <BellRing className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-indigo-950 text-xs">Lembrete Inteligente de Revisão</h4>
                    <p className="text-[11px] text-indigo-800 mt-0.5 leading-relaxed font-medium">
                      Ative as notificações para receber alertas em tempo real exatamente na hora de revisar e fixar na memória profunda!
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRequestNotificationPermission}
                  className="w-full mt-1.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                >
                  🔔 Ativar Notificações no Celular / Computador
                </button>
              </div>
            )}

            {reviewQueue.length > 0 && currentReviewIdx < reviewQueue.length ? (
              // Active Flashcard Session
              <div className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm flex flex-col gap-4 min-h-[350px] justify-between">
                
                {/* Header */}
                <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                  <span className="flex items-center gap-1">
                    📖 Sessão de Memorização ({flag})
                  </span>
                  <span>{currentReviewIdx + 1} de {reviewQueue.length} restantes</span>
                </div>

                {/* Main Card Canvas */}
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                  
                  {/* Card Front/Back Toggle indicator */}
                  <span className="text-[10px] uppercase font-black tracking-widest text-indigo-500 mb-2 block">
                    {frontMode === 'translation' 
                      ? (!isRevealed ? 'Tradução (Tente lembrar o Espanhol!)' : 'Resposta Revelada!') 
                      : (!isRevealed ? 'Espanhol (Tente lembrar a Tradução!)' : 'Resposta Revelada!')
                    }
                  </span>

                  <div className="min-h-[120px] flex flex-col items-center justify-center px-4">
                    {frontMode === 'translation' ? (
                      // Show Portuguese first
                      !isRevealed ? (
                        <h3 className="text-xl font-sans font-black text-gray-900 leading-relaxed">
                          "{reviewQueue[currentReviewIdx].translation}"
                        </h3>
                      ) : (
                        <div className="flex flex-col gap-2.5 items-center">
                          <h3 className="text-xl font-sans font-bold text-indigo-600 leading-relaxed">
                            "{reviewQueue[currentReviewIdx].translation}"
                          </h3>
                          <span className="text-xs font-bold text-gray-300 uppercase">➔</span>
                          <h2 className="text-2xl font-sans font-black text-gray-950 leading-relaxed">
                            "{reviewQueue[currentReviewIdx].spanish}"
                          </h2>
                        </div>
                      )
                    ) : (
                      // Show Spanish first
                      !isRevealed ? (
                        <h3 className="text-xl font-sans font-black text-gray-900 leading-relaxed">
                          "{reviewQueue[currentReviewIdx].spanish}"
                        </h3>
                      ) : (
                        <div className="flex flex-col gap-2.5 items-center">
                          <h3 className="text-xl font-sans font-bold text-indigo-600 leading-relaxed">
                            "{reviewQueue[currentReviewIdx].spanish}"
                          </h3>
                          <span className="text-xs font-bold text-gray-300 uppercase">➔</span>
                          <h2 className="text-2xl font-sans font-black text-gray-950 leading-relaxed">
                            "{reviewQueue[currentReviewIdx].translation}"
                          </h2>
                        </div>
                      )
                    )}

                    {/* Show Slang / Explanation when revealed */}
                    {isRevealed && reviewQueue[currentReviewIdx].explanation && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-indigo-50/50 border border-indigo-50 rounded-xl text-left text-[11px] text-indigo-900 leading-relaxed font-medium"
                      >
                        💡 <strong>Nota Cultural:</strong> {reviewQueue[currentReviewIdx].explanation}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Card Controls */}
                <div className="flex flex-col gap-2.5">
                  {!isRevealed ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFrontMode(prev => prev === 'spanish' ? 'translation' : 'spanish');
                        }}
                        className="px-3 py-3 border border-gray-150 hover:bg-gray-50 text-gray-500 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1"
                        title="Inverter Frente/Verso"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setIsRevealed(true);
                          handleSpeakActive(reviewQueue[currentReviewIdx].spanish);
                        }}
                        className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Revelar Resposta</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Audio repeat */}
                      <button
                        onClick={() => handleSpeakActive(reviewQueue[currentReviewIdx].spanish)}
                        className="py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Ouvir Novamente</span>
                      </button>

                      {/* Performance ratings */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleRateCard('hard')}
                          className="py-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-800 text-xs font-black rounded-xl transition-all flex flex-col items-center gap-1"
                        >
                          <span>Errei 🔴</span>
                          <span className="text-[9px] text-red-500 font-bold">Refazer logo</span>
                        </button>
                        <button
                          onClick={() => handleRateCard('good')}
                          className="py-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-black rounded-xl transition-all flex flex-col items-center gap-1"
                        >
                          <span>Médio 🟡</span>
                          <span className="text-[9px] text-amber-600 font-bold">Avançar</span>
                        </button>
                        <button
                          onClick={() => handleRateCard('easy')}
                          className="py-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-black rounded-xl transition-all flex flex-col items-center gap-1"
                        >
                          <span>Fácil 🟢</span>
                          <span className="text-[9px] text-emerald-600 font-bold">Dominado</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              // Empty session - Deck fully completed
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs text-center flex flex-col items-center justify-center py-10 gap-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center text-3xl">
                  ✓
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-base">Tudo Revisado por Agora!</h3>
                  <p className="text-xs text-gray-400 font-medium mt-1 leading-relaxed max-w-xs mx-auto">
                    Excelente trabalho! Você revisou todas as expressões prontas do sotaque {isCol ? 'colombiano' : 'mexicano'}.
                  </p>
                </div>

                {filteredCards.length > 0 ? (
                  <div className="bg-slate-50 border rounded-2xl p-3 w-full text-left text-xs font-medium text-slate-600">
                    <p className="font-bold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" /> Estatísticas do seu Deck:
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-center text-[11px]">
                      <div className="bg-white p-2 rounded-xl border border-gray-100">
                        <span className="block font-black text-indigo-950 text-sm">{filteredCards.length}</span>
                        <span className="text-gray-400 text-[10px]">Total</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-gray-100">
                        <span className="block font-black text-amber-600 text-sm">
                          {filteredCards.filter(c => c.box > 1 && c.box < 5).length}
                        </span>
                        <span className="text-gray-400 text-[10px]">Aprendendo</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-gray-100">
                        <span className="block font-black text-emerald-600 text-sm">
                          {filteredCards.filter(c => c.box === 5).length}
                        </span>
                        <span className="text-gray-400 text-[10px]">Dominados</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-indigo-50/50 border border-indigo-100/30 rounded-xl p-3.5 text-left text-xs text-indigo-950 leading-relaxed">
                    💡 <strong>Como começar?</strong> Entre na aba "Frases" e simplesmente clique em "Ouvir", "Espiar" ou grave sua voz. Elas serão salvas aqui automaticamente para fixação espaçada!
                  </div>
                )}

                <button
                  onClick={startReviewSession}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-3xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Recarregar Sessão
                </button>
              </div>
            )}
          </motion.div>
        )}

        {activeSubTab === 'cartoes' && (
          <motion.div
            key="cartoes"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3"
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-3xs">
              <h3 className="font-bold text-gray-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                📁 Meu Deck de Memorização ({filteredCards.length})
              </h3>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-medium">
                Lista completa de palavras, frases e expressões que estão programadas no seu cérebro.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border border-gray-100 rounded-2xl p-3.5 shadow-3xs flex justify-between items-start gap-2 relative overflow-hidden group"
                >
                  {/* Left priority border based on review status */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    new Date(card.nextReviewDate) <= new Date() ? 'bg-amber-400' : 'bg-gray-200'
                  }`} />

                  <div className="flex-1 flex flex-col gap-1 pl-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                        card.box === 5 ? 'bg-emerald-50 text-emerald-700' : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        Box {card.box}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> {getRemainingTimeText(card.nextReviewDate)}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-sm leading-snug mt-1 font-sans">
                      {card.spanish}
                    </h4>
                    <p className="text-xs text-gray-500 italic font-sans font-medium">
                      "{card.translation}"
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleSpeakActive(card.spanish)}
                      className="p-1.5 rounded-lg bg-gray-50 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-colors"
                      title="Ouvir"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredCards.length === 0 && (
                <div className="text-center py-12 bg-white border border-gray-100 rounded-3xl flex flex-col items-center gap-2">
                  <span className="text-3xl">🗂️</span>
                  <p className="text-xs text-gray-400 font-semibold">Nenhuma expressão adicionada ainda.</p>
                  <p className="text-[10px] text-gray-300 max-w-xs leading-relaxed">
                    Interaja com qualquer expressão na aba de Frases ou Diálogos para ela aparecer aqui automaticamente!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeSubTab === 'adicionar' && (
          <motion.div
            key="adicionar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <form onSubmit={handleAddCustomCard} className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs flex flex-col gap-4">
              <div className="border-b border-gray-100 pb-2">
                <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-indigo-600" /> Criar Flashcard Customizado
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed font-medium">
                  Guarde suas próprias gírias ou expressões que escutou no dia a dia para treinar com a memorização espaçada.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Expressão em Espanhol ({isCol ? 'Colombiano 🇨🇴' : 'Mexicano 🇲🇽'}):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: ¡Qué chimba de parche!"
                    value={newSpanish}
                    onChange={(e) => setNewSpanish(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-150 focus:outline-hidden focus:border-indigo-500 text-sm font-semibold placeholder-gray-300 bg-gray-50/50"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Tradução em Português:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Que grupo de amigos legal!"
                    value={newTranslation}
                    onChange={(e) => setNewTranslation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-150 focus:outline-hidden focus:border-indigo-500 text-sm font-semibold placeholder-gray-300 bg-gray-50/50"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Nota Cultural ou Gíria (Opcional):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Explique como os nativos usam essa expressão..."
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-150 focus:outline-hidden focus:border-indigo-500 text-sm font-semibold placeholder-gray-300 bg-gray-50/50 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Salvar Expressão no Deck (+5 XP)</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
