import React, { useState, useEffect } from 'react';
import { phrases, countries } from './data/phrases';
import { Country, Phrase, UserError, SRSCard, UserAccount } from './types';
import PhraseCard from './components/PhraseCard';
import StorySection from './components/StorySection';
import ChatSection from './components/ChatSection';
import PronunciationSection from './components/PronunciationSection';
import ErrorTracker from './components/ErrorTracker';
import SrsSection from './components/SrsSection';
import AuthSection from './components/AuthSection';
import { 
  BookOpen, Sparkles, MessageSquare, Mic, AlertCircle, Info, 
  Volume2, Search, X, Brain, User, Award, Flame, BellRing, Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  fetchUserSrsCards, syncUserSrsCards, 
  fetchUserErrors, syncUserErrors, saveUserRecord, fetchUserRecord,
  deleteUserError, clearAllUserErrors
} from './lib/firebase';

type Tab = 'phrases' | 'stories' | 'memorize' | 'chat' | 'pronounce' | 'errors' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('phrases');
  const [activeDialect, setActiveDialect] = useState<Country>('colombia');
  
  // User Profile & Progress State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('hablasur_logged_in_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // SRS Cards state
  const [srsCards, setSrsCards] = useState<SRSCard[]>(() => {
    try {
      const saved = localStorage.getItem('hablasur_srs_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Error tracker state
  const [trackedErrors, setTrackedErrors] = useState<UserError[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [recordingError, setRecordingError] = useState<string | null>(null);

  // In-app Notification Alert State
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [lastNotifiedCount, setLastNotifiedCount] = useState(0);

  // Load errors and cards on startup or when the logged-in user changes
  useEffect(() => {
    if (currentUser) {
      const syncCloudUserData = async () => {
        try {
          // Fetch newest profile details from cloud
          const record = await fetchUserRecord(currentUser.username);
          if (record && record.details) {
            setCurrentUser(record.details);
          }

          // Fetch cards and errors in parallel
          const [cloudCards, cloudErrors] = await Promise.all([
            fetchUserSrsCards(currentUser.username),
            fetchUserErrors(currentUser.username)
          ]);
          
          if (cloudCards && cloudCards.length > 0) {
            setSrsCards(cloudCards);
          } else {
            setSrsCards([]);
          }
          if (cloudErrors && cloudErrors.length > 0) {
            setTrackedErrors(cloudErrors);
          } else {
            setTrackedErrors([]);
          }
        } catch (err) {
          console.error("Failed to fetch cloud user details:", err);
        }
      };

      syncCloudUserData();
    } else {
      // Offline/local backup fallback for logged-out guests
      const savedErrors = localStorage.getItem('hablasur_errors');
      if (savedErrors) {
        try {
          setTrackedErrors(JSON.parse(savedErrors));
        } catch (err) {
          console.error(err);
        }
      } else {
        setTrackedErrors([]);
      }
      const savedCards = localStorage.getItem('hablasur_srs_cards');
      if (savedCards) {
        try {
          setSrsCards(JSON.parse(savedCards));
        } catch (err) {
          console.error(err);
        }
      } else {
        setSrsCards([]);
      }
    }
  }, [currentUser?.username]);

  // Sync user profile changes to Cloud Firestore and local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hablasur_logged_in_user', JSON.stringify(currentUser));
      // Save details to Firestore
      const syncProfile = async () => {
        try {
          const record = await fetchUserRecord(currentUser.username);
          const passwordToUse = record?.password || '123456';
          await saveUserRecord(currentUser.username, {
            details: currentUser,
            password: passwordToUse
          });
        } catch (err) {
          console.error("Firestore sync profile error:", err);
        }
      };
      syncProfile();
    } else {
      localStorage.removeItem('hablasur_logged_in_user');
    }
  }, [currentUser]);

  // Sync SRS deck to Cloud Firestore and local storage
  useEffect(() => {
    localStorage.setItem('hablasur_srs_cards', JSON.stringify(srsCards));
    if (currentUser && srsCards.length > 0) {
      syncUserSrsCards(currentUser.username, srsCards);
    }
  }, [srsCards, currentUser?.username]);

  // Real-time Timer to check for due spaced repetition cards and raise notifications
  useEffect(() => {
    const checkSrsDueCards = () => {
      const now = new Date();
      const dueCount = srsCards.filter(
        c => c.dialect === activeDialect && new Date(c.nextReviewDate) <= now
      ).length;

      if (dueCount > 0 && dueCount > lastNotifiedCount) {
        // Show in-app banner alert
        setShowNotificationToast(true);
        setLastNotifiedCount(dueCount);

        // Try standard web push native notification if granted
        try {
          if ('Notification' in window && window.Notification && Notification.permission === 'granted') {
            new Notification("⏰ Hora de memorizar!", {
              body: `Você tem ${dueCount} expressões prontas para revisão no sotaque ${
                activeDialect === 'colombia' ? 'colombiano' : 'mexicano'
              }!`,
              icon: '/favicon.ico'
            });
          }
        } catch (e) {
          console.warn("Notification API check blocked or failed in this iframe context:", e);
        }
      } else if (dueCount === 0) {
        setShowNotificationToast(false);
        setLastNotifiedCount(0);
      }
    };

    // Run check immediately and then every 10 seconds
    checkSrsDueCards();
    const intervalId = setInterval(checkSrsDueCards, 10000);

    return () => clearInterval(intervalId);
  }, [srsCards, activeDialect, lastNotifiedCount]);

  // Sync errors to localStorage and Cloud Firestore
  const saveErrors = (updated: UserError[]) => {
    setTrackedErrors(updated);
    localStorage.setItem('hablasur_errors', JSON.stringify(updated));
    if (currentUser && updated.length > 0) {
      syncUserErrors(currentUser.username, updated);
    }
  };

  // Add error to log (tracked across Chat, Story Quiz, and Pronunciation)
  const handleTrackNewError = (original: string, corrected: string, explanation: string) => {
    const exists = trackedErrors.some(
      (e) => e.originalText.toLowerCase() === original.toLowerCase()
    );
    if (exists) return;

    const newError: UserError = {
      id: `err-${Date.now()}`,
      originalText: original,
      correctedText: corrected,
      explanation,
      sourceType: activeTab === 'chat' ? 'chat' : 'pronuncia',
      timestamp: new Date().toISOString(),
      reviewed: false
    };

    saveErrors([newError, ...trackedErrors]);
    
    // Add small feedback
    if (currentUser) {
      // Award minor XP for effort!
      handleAddXp(2);
    }
  };

  const handleClearError = (id: string) => {
    const updated = trackedErrors.filter((e) => e.id !== id);
    saveErrors(updated);
    if (currentUser) {
      deleteUserError(currentUser.username, id);
    }
  };

  const handleClearAllErrors = () => {
    saveErrors([]);
    if (currentUser) {
      clearAllUserErrors(currentUser.username, trackedErrors);
    }
  };

  const handleRecordError = (errorMsg: string) => {
    setRecordingError(errorMsg);
    setTimeout(() => setRecordingError(null), 5000); // clear after 5s
  };

  // XP addition helper
  const handleAddXp = (amount: number) => {
    if (!currentUser) return;
    const newXp = currentUser.xp + amount;
    setCurrentUser({
      ...currentUser,
      xp: newXp
    });
  };

  // Main automatic SRS trigger on card interaction (Listen, record speech, spy details)
  const handleInteractWithPhrase = (phraseId: string) => {
    const matchedPhrase = phrases.find(p => p.id === phraseId);
    if (!matchedPhrase) return;

    // Check if phrase is already inside deck
    const existsInSrs = srsCards.some(card => card.id === phraseId);
    if (existsInSrs) return;

    // Create a new flashcard with initial SM-2 scheduled parameters
    const newSrsCard: SRSCard = {
      id: phraseId,
      spanish: matchedPhrase.spanish,
      translation: matchedPhrase.translation,
      explanation: matchedPhrase.explanation,
      dialect: matchedPhrase.country,
      intervalMinutes: 1, // First review in 1 minute
      easeFactor: 2.5,
      nextReviewDate: new Date(Date.now() + 60 * 1000).toISOString(), // due in 60 seconds
      box: 1,
      addedAt: new Date().toISOString()
    };

    setSrsCards(prev => [newSrsCard, ...prev]);

    // Give the logged in student some encouragement XP!
    if (currentUser) {
      handleAddXp(10); // +10 XP for unlocking a word
    }
  };

  // Direct manual save from Dialogue/Story paragraph clicks
  const handleSavePhraseDirectly = (spanish: string, translation: string, explanation: string, category: string) => {
    const customId = `story_${Date.now()}`;
    const newSrsCard: SRSCard = {
      id: customId,
      spanish,
      translation,
      explanation,
      dialect: activeDialect,
      intervalMinutes: 1,
      easeFactor: 2.5,
      nextReviewDate: new Date(Date.now() + 60 * 1000).toISOString(),
      box: 1,
      addedAt: new Date().toISOString()
    };

    setSrsCards(prev => [newSrsCard, ...prev]);

    if (currentUser) {
      handleAddXp(15); // +15 XP for capturing stories!
    }
  };

  // Extract unique categories from active phrase list
  const activePhrases = phrases.filter(p => p.country === activeDialect);
  const categories = ['todos', ...Array.from(new Set(activePhrases.map((p) => p.category)))];

  // Filter phrases based on search, category, and dialect
  const filteredPhrases = activePhrases.filter((p) => {
    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesSearch = 
      p.spanish.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 md:pb-10 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-950">
      
      {/* Top Banner Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shrink-0 shadow-3xs">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-2">
          
          {/* Logo / Title */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs">
              🇨🇴
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-950 leading-none">HablaSur</h1>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-0.5 block">Sotaque Real</span>
            </div>
          </div>

          {/* Configuration Dialect Switcher Toggle */}
          <div className="bg-gray-100 p-1 rounded-xl flex gap-1 border">
            <button
              onClick={() => {
                setActiveDialect('colombia');
                setSelectedCategory('todos');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                activeDialect === 'colombia'
                  ? 'bg-white text-gray-900 shadow-xs ring-1 ring-gray-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Mudar aplicativo para sotaque Colombiano"
            >
              <span>🇨🇴</span>
              <span className="hidden sm:inline">Colômbia</span>
            </button>
            <button
              onClick={() => {
                setActiveDialect('mexico');
                setSelectedCategory('todos');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                activeDialect === 'mexico'
                  ? 'bg-white text-gray-900 shadow-xs ring-1 ring-gray-200'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Mudar aplicativo para sotaque Mexicano"
            >
              <span>🇲🇽</span>
              <span className="hidden sm:inline">México</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-4 overflow-x-hidden">
        
        {/* Real-time floating Spaced Repetition Due Alert */}
        <AnimatePresence>
          {showNotificationToast && activeTab !== 'memorize' && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              onClick={() => setActiveTab('memorize')}
              className="cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl p-3.5 mb-4 shadow-sm flex items-center justify-between border border-indigo-500/30 gap-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bell className="w-4 h-4 text-white animate-bounce" />
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-none text-white">Pronto para memorização!</h4>
                  <p className="text-[10px] text-indigo-100 font-medium mt-0.5">Toque aqui para revisar suas frases de hoje.</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-white/10 text-[10px] font-bold rounded-lg border border-white/20 shrink-0">
                Iniciar
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Account Quick Progress Header (Displays when logged in) */}
        {currentUser && (
          <div className="bg-white border border-gray-100 rounded-2xl p-3 mb-4 shadow-3xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">{currentUser.avatarUrl || '🛹'}</span>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase leading-none block">Estudando</span>
                <span className="font-bold text-xs text-slate-850 leading-tight">{currentUser.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center">
                <span className="text-[9px] text-amber-500 font-bold uppercase block leading-none">Ofensiva</span>
                <span className="font-bold text-xs text-amber-700 flex items-center gap-0.5 justify-center mt-0.5">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {currentUser.streak}d
                </span>
              </div>
              <div className="w-px h-6 bg-gray-100" />
              <div className="text-center">
                <span className="text-[9px] text-indigo-600 font-bold uppercase block leading-none">Fluência</span>
                <span className="font-bold text-xs text-indigo-700 flex items-center gap-0.5 justify-center mt-0.5">
                  <Award className="w-3.5 h-3.5 text-indigo-600" /> {currentUser.xp} XP
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification Alert for Voice / Microphone permission failures */}
        <AnimatePresence>
          {recordingError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-150 rounded-2xl p-3.5 mb-4 text-xs text-red-800 flex gap-2 shadow-xs"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Aviso de Áudio:</span>
                <p className="mt-0.5 leading-relaxed">{recordingError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Renders Section based on activeTab */}
        <AnimatePresence mode="wait">
          {activeTab === 'phrases' && (
            <motion.div
              key="phrases-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col gap-4"
            >
              
              {/* Introduction Card */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/40 rounded-2xl p-4 flex gap-3 text-indigo-950">
                <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs font-medium">
                  <span className="font-bold block text-indigo-950 mb-0.5">Espanhol do Dia a Dia:</span>
                  Aqui você foca no espanhol real das ruas. Ouça, treine sua fala com o microfone e espie as gírias. Suas interações salvam as expressões na memorização espaçada automaticamente!
                </div>
              </div>

              {/* Filters Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs flex flex-col gap-3">
                
                {/* Search query input */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Buscar gíria ou tradução..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 border border-gray-150 rounded-xl text-xs font-medium focus:outline-hidden focus:border-indigo-500 font-sans"
                  />
                  {searchQuery && (
                    <button
                      id="clear-search-btn"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter Pill-row */}
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Categorias:</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 flex-nowrap scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        id={`category-filter-${cat}`}
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Phrases List */}
              <div className="flex flex-col gap-4">
                {filteredPhrases.length > 0 ? (
                  filteredPhrases.map((phrase) => {
                    const countryFlag = phrase.country === 'colombia' ? '🇨🇴' : '🇲🇽';
                    return (
                      <PhraseCard
                        key={phrase.id}
                        phrase={phrase}
                        flag={countryFlag}
                        onRecordError={handleRecordError}
                        onTrackError={handleTrackNewError}
                        onInteract={handleInteractWithPhrase}
                      />
                    );
                  })
                ) : (
                  <div className="text-center py-10 bg-white rounded-3xl border border-gray-150 p-6 text-gray-400 font-semibold text-xs">
                    Nenhuma frase encontrada para esta categoria ou busca.
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {activeTab === 'stories' && (
            <motion.div
              key="stories-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <StorySection 
                activeDialect={activeDialect}
                onTrackError={handleTrackNewError} 
                onSavePhraseToSRS={handleSavePhraseDirectly}
              />
            </motion.div>
          )}

          {activeTab === 'memorize' && (
            <motion.div
              key="memorize-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <SrsSection 
                activeDialect={activeDialect}
                currentUser={currentUser}
                srsCards={srsCards}
                onUpdateCards={setSrsCards}
                onAddXp={handleAddXp}
              />
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <ChatSection
                activeDialect={activeDialect}
                onRecordError={handleRecordError}
                onTrackError={handleTrackNewError}
                trackedErrors={trackedErrors}
              />
            </motion.div>
          )}

          {activeTab === 'pronounce' && (
            <motion.div
              key="pronounce-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <PronunciationSection
                activeDialect={activeDialect}
                onRecordError={handleRecordError}
                onTrackError={handleTrackNewError}
              />
            </motion.div>
          )}

          {activeTab === 'errors' && (
            <motion.div
              key="errors-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <ErrorTracker
                errors={trackedErrors}
                onClearError={handleClearError}
                onClearAll={handleClearAllErrors}
                onRecordError={handleRecordError}
              />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <AuthSection
                currentUser={currentUser}
                onLogin={setCurrentUser}
                onLogout={() => setCurrentUser(null)}
                onUpdateUser={setCurrentUser}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Navigation - Responsive Scrolling/Compact Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-150 py-2 z-40 shadow-lg shrink-0">
        <div className="max-w-md mx-auto px-4 flex justify-between items-center gap-1 overflow-x-auto scrollbar-none">
          
          <button
            id="nav-btn-phrases"
            onClick={() => setActiveTab('phrases')}
            className={`flex flex-col items-center gap-1 text-[9px] font-black uppercase transition-all shrink-0 w-12 ${
              activeTab === 'phrases' ? 'text-indigo-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            <span>Frases</span>
          </button>

          <button
            id="nav-btn-stories"
            onClick={() => setActiveTab('stories')}
            className={`flex flex-col items-center gap-1 text-[9px] font-black uppercase transition-all shrink-0 w-12 ${
              activeTab === 'stories' ? 'text-indigo-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Sparkles className="w-4.5 h-4.5" />
            <span>Histórias</span>
          </button>

          <button
            id="nav-btn-memorize"
            onClick={() => setActiveTab('memorize')}
            className={`flex flex-col items-center gap-1 text-[9px] font-black uppercase transition-all shrink-0 w-12 relative ${
              activeTab === 'memorize' ? 'text-indigo-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Brain className="w-4.5 h-4.5" />
            <span>Decorar</span>
            {srsCards.filter(c => c.dialect === activeDialect && new Date(c.nextReviewDate) <= new Date()).length > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 bg-indigo-600 rounded-full" />
            )}
          </button>

          <button
            id="nav-btn-chat"
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 text-[9px] font-black uppercase transition-all shrink-0 w-12 ${
              activeTab === 'chat' ? 'text-indigo-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <span>Chat</span>
          </button>

          <button
            id="nav-btn-pronounce"
            onClick={() => setActiveTab('pronounce')}
            className={`flex flex-col items-center gap-1 text-[9px] font-black uppercase transition-all shrink-0 w-12 ${
              activeTab === 'pronounce' ? 'text-indigo-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Mic className="w-4.5 h-4.5" />
            <span>Treinar</span>
          </button>

          <button
            id="nav-btn-errors"
            onClick={() => setActiveTab('errors')}
            className={`flex flex-col items-center gap-1 text-[9px] font-black uppercase transition-all shrink-0 w-12 relative ${
              activeTab === 'errors' ? 'text-indigo-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <AlertCircle className="w-4.5 h-4.5" />
            <span>Erros</span>
            {trackedErrors.length > 0 && (
              <span className="absolute -top-0.5 right-1.5 w-4 h-4 bg-red-500 text-[8px] text-white font-black rounded-full flex items-center justify-center border border-white">
                {trackedErrors.length}
              </span>
            )}
          </button>

          <button
            id="nav-btn-profile"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 text-[9px] font-black uppercase transition-all shrink-0 w-12 ${
              activeTab === 'profile' ? 'text-indigo-600 scale-105' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <User className="w-4.5 h-4.5" />
            <span>Perfil</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
