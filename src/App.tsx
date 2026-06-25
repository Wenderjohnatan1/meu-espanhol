import React, { useState, useEffect } from 'react';
import { phrases, countries } from './data/phrases';
import { Country, Phrase, UserError } from './types';
import PhraseCard from './components/PhraseCard';
import StorySection from './components/StorySection';
import ChatSection from './components/ChatSection';
import PronunciationSection from './components/PronunciationSection';
import ErrorTracker from './components/ErrorTracker';
import { BookOpen, Sparkles, MessageSquare, Mic, AlertCircle, Info, Volume2, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'phrases' | 'stories' | 'chat' | 'pronounce' | 'errors';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('phrases');
  const [trackedErrors, setTrackedErrors] = useState<UserError[]>([]);
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<Country | 'todos'>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [recordingError, setRecordingError] = useState<string | null>(null);

  // Load errors from localStorage on startup
  useEffect(() => {
    const saved = localStorage.getItem('hablasur_errors');
    if (saved) {
      try {
        setTrackedErrors(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Sync errors to localStorage
  const saveErrors = (updated: UserError[]) => {
    setTrackedErrors(updated);
    localStorage.setItem('hablasur_errors', JSON.stringify(updated));
  };

  // Add error to log (tracked across Chat and Pronunciation)
  const handleTrackNewError = (original: string, corrected: string, explanation: string) => {
    // Avoid double logging identical original errors
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
  };

  const handleClearError = (id: string) => {
    const updated = trackedErrors.filter((e) => e.id !== id);
    saveErrors(updated);
  };

  const handleClearAllErrors = () => {
    saveErrors([]);
  };

  const handleRecordError = (errorMsg: string) => {
    setRecordingError(errorMsg);
    setTimeout(() => setRecordingError(null), 5000); // clear after 5s
  };

  // Extract unique categories from phrase list
  const categories = ['todos', ...Array.from(new Set(phrases.map((p) => p.category)))];

  // Filter phrases based on search, category, and country
  const filteredPhrases = phrases.filter((p) => {
    const matchesCountry = selectedCountryFilter === 'todos' || p.country === selectedCountryFilter;
    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesSearch = 
      p.spanish.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-6 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-950">
      
      {/* Top Banner Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shrink-0">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-xs">
              💬
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-none">Espanhol do Dia a Dia</h1>
              <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-widest mt-0.5 block">Sotaques Sul-Americanos</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              Foco Prático
            </span>
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 py-4 overflow-x-hidden">
        
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
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              
              {/* Introduction Card */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/40 rounded-2xl p-4 flex gap-3 text-indigo-950">
                <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs font-medium">
                  <span className="font-bold block text-indigo-950 mb-0.5">Sem Gramática, Apenas o Cotidiano:</span>
                  Aqui você foca no espanhol de verdade. Ouça a pronúncia, treine sua fala com o microfone e espie as traduções e gírias secretas!
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
                    placeholder="Buscar gíria, tradução ou palavra..."
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

                {/* Country Filter Pill-row */}
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Filtrar por País:</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 flex-nowrap scrollbar-none">
                    <button
                      id="country-filter-todos"
                      onClick={() => setSelectedCountryFilter('todos')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                        selectedCountryFilter === 'todos'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Todos
                    </button>
                    {countries.map((c) => (
                      <button
                        id={`country-filter-${c.id}`}
                        key={c.id}
                        onClick={() => setSelectedCountryFilter(c.id as Country)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-colors shrink-0 ${
                          selectedCountryFilter === c.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter Pill-row */}
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Categoria:</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 flex-nowrap scrollbar-none">
                    {categories.map((cat) => (
                      <button
                        id={`category-filter-${cat}`}
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap uppercase tracking-wider transition-colors shrink-0 ${
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
                    const countryFlag = countries.find((c) => c.id === phrase.country)?.flag || '🌎';
                    return (
                      <PhraseCard
                        key={phrase.id}
                        phrase={phrase}
                        flag={countryFlag}
                        onRecordError={handleRecordError}
                        onTrackError={handleTrackNewError}
                      />
                    );
                  })
                ) : (
                  <div className="text-center py-10 bg-white rounded-3xl border border-gray-150 p-6 text-gray-400 font-medium">
                    Nenhuma frase encontrada para esta combinação de filtros.
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
              transition={{ duration: 0.2 }}
            >
              <StorySection onTrackError={handleTrackNewError} />
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ChatSection
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
              transition={{ duration: 0.2 }}
            >
              <PronunciationSection
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
              transition={{ duration: 0.2 }}
            >
              <ErrorTracker
                errors={trackedErrors}
                onClearError={handleClearError}
                onClearAll={handleClearAllErrors}
                onRecordError={handleRecordError}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Desktop/Web Sidebar-like Header and Mobile Responsive Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-150 py-2.5 z-40 shadow-lg shrink-0">
        <div className="max-w-md mx-auto px-4 flex justify-between items-center">
          
          <button
            id="nav-btn-phrases"
            onClick={() => setActiveTab('phrases')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors shrink-0 w-16 ${
              activeTab === 'phrases' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Frases</span>
          </button>

          <button
            id="nav-btn-stories"
            onClick={() => setActiveTab('stories')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors shrink-0 w-16 ${
              activeTab === 'stories' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Histórias</span>
          </button>

          <button
            id="nav-btn-chat"
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors shrink-0 w-16 ${
              activeTab === 'chat' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Conversar</span>
          </button>

          <button
            id="nav-btn-pronounce"
            onClick={() => setActiveTab('pronounce')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors shrink-0 w-16 ${
              activeTab === 'pronounce' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>Pronúncia</span>
          </button>

          <button
            id="nav-btn-errors"
            onClick={() => setActiveTab('errors')}
            className={`flex flex-col items-center gap-1 text-[10px] font-bold uppercase transition-colors shrink-0 w-16 relative ${
              activeTab === 'errors' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            <span>Erros</span>
            {trackedErrors.length > 0 && (
              <span className="absolute -top-1 right-2 w-4 h-4 bg-red-500 text-[9px] text-white font-bold rounded-full flex items-center justify-center border border-white animate-bounce">
                {trackedErrors.length}
              </span>
            )}
          </button>

        </div>
      </nav>

    </div>
  );
}
