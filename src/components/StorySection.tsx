import React, { useState, useEffect } from 'react';
import { Country, Story } from '../types';
import { speakPhrase } from '../utils/speech';
import { BookOpen, Volume2, Sparkles, Check, X, ArrowRight, RefreshCw, Eye, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import DialogueTrainer from './DialogueTrainer';

interface StorySectionProps {
  activeDialect: Country;
  onTrackError?: (original: string, corrected: string, exp: string) => void;
  onSavePhraseToSRS?: (spanish: string, translation: string, explanation: string, category: string) => void;
}

const DEFAULT_STORIES: Record<Country, Story> = {
  colombia: {
    title: "Un Tinto en la Candelaria",
    location: "Bogotá, Colômbia",
    paragraphs: [
      "Hola parce, le cuento. Ayer estuve caminando por la Candelaria y me dio antojo de un buen tinto. Entré a una cafetería de esas antiguas que son bien bacanas.",
      "El mesero era un pingo muy formal y me saludó: '¿Cómo le va, mi llave? Siga por aquí'. Pedí el tinto bien caliente y una arepa con bastante queso, ¡una delicia!",
      "Después llegó mi parce Felipe con su polola colombiana. Nos quedamos rumbiando y echando carreta hasta la noche. ¡La pasamos súper chévere!"
    ],
    translations: [
      "Olá parceiro, te conto. Ontem estive caminhando por La Candelaria e me deu desejo de um bom cafezinho preto. Entrei em uma cafeteria daquelas antigas que são bem legais.",
      "O garçom era um rapaz muito de boa e me saudou: 'Como vai, meu chapa? Siga por aqui'. Pedi o cafezinho preto bem quente e uma arepa com bastante queijo, uma delícia!",
      "Depois chegou meu parceiro Felipe com a namorada dele. Ficamos dançando e jogando conversa fora até a noite. Passamos super bem (super legal)!"
    ],
    slangGlossary: [
      { word: "Parce", meaning: "Parceiro, amigo de confiança.", example: "¿Cómo estás, parce?" },
      { word: "Tinto", meaning: "Cafezinho preto pequeno e simples.", example: "Me regala un tinto, por favor." },
      { word: "Bacano", meaning: "Muito legal, ótimo.", example: "Tu carro nuevo está bacano." },
      { word: "Mi llave", meaning: "Meu chapa, parceiro (gíria amigável).", example: "¡Todo bien, mi llave!" },
      { word: "Echar carreta", meaning: "Jogar conversa fora, bater papo comprido.", example: "Nos quedamos echando carreta." },
      { word: "Chévere", meaning: "Legal, fantástico, excelente.", example: "Qué viaje tan chévere." }
    ],
    quiz: {
      question: "O que significa 'Tinto' no dia a dia da Colômbia?",
      options: [
        "Um copo de vinho tinto de mesa.",
        "Um cafezinho preto simples e puro.",
        "Um suco de uva muito concentrado.",
        "Uma tinta para pintar paredes coloniais."
      ],
      correctIndex: 1,
      explanation: "Na Colômbia, 'tinto' é estritamente o cafezinho preto puro, o café coado simples cotidiano."
    }
  },
  mexico: {
    title: "Tacos en Coyoacán",
    location: "Cidade do México, México",
    paragraphs: [
      "¡Qué onda, güey! Ayer me fui a pasear por Coyoacán con mi cuate Luis. El día estaba re chido y había un chorro de mariachis tocando en el quiosco del parque.",
      "Nos dio un hambre perra, así que fuimos a una taquería muy famosa. El taquero nos recibió bien chido: '¡Pásenle, marchantes! ¿Cuántos con todo?'. Pedimos diez de pastor con piña y salsa bien picosa, ¡no manches, qué delicia!",
      "Luego nos echamos una michelada bien fría en una cantina tradicional. Platicamos de todo un poco y la pasamos de pelos. ¡México es la neta, carnal!"
    ],
    translations: [
      "E aí, cara! Ontem fui passear por Coyoacán com o meu amigo Luis. O dia estava super legal e tinha um monte de mariachis tocando no coreto do parque.",
      "Bateu uma fome de leão, então fomos a uma taqueria muito famosa. O taqueiro nos recebeu super bem: 'Entrem, fregueses! Quantos com tudo?'. Pedimos dez de pastor com abacaxi e molho bem apimentado, não brinque (caramba), que delícia!",
      "Depois tomamos uma michelada bem gelada em uma cantina tradicional. Conversamos sobre tudo um pouco e passamos super bem (de pelos). O México é o máximo (a neta), meu irmão!"
    ],
    slangGlossary: [
      { word: "Güey", meaning: "Cara, mano, gíria mais comum do México.", example: "¿Qué onda, güey?" },
      { word: "Cuate", meaning: "Amigo próximo, parceiro.", example: "Luis es mi cuate del alma." },
      { word: "Chido", meaning: "Legal, bacana, bonito.", example: "Tu playera está bien chida." },
      { word: "No manches", meaning: "Não brinque, caramba, exclamação de surpresa.", example: "¡No manches, es carísimo!" },
      { word: "De pelos", meaning: "Excelente, maravilhoso, muito divertido.", example: "La fiesta estuvo de pelos." },
      { word: "La neta", meaning: "A verdade, o máximo, o melhor.", example: "Ese cantante es la neta." }
    ],
    quiz: {
      question: "O que o narrador e seu amigo Luis comeram em Coyoacán?",
      options: [
        "Empanadas de carne assada com batatas.",
        "Tacos al pastor com abacaxi e molho apimentado.",
        "Uma arepa com queijo bem quentinha.",
        "Um burrito de frango super suave."
      ],
      correctIndex: 1,
      explanation: "No segundo parágrafo eles pedem 'diez de pastor con piña y salsa bien picosa' (tacos de porco marinado com abacaxi e molho bem apimentado)."
    }
  }
};

export default function StorySection({ activeDialect, onTrackError, onSavePhraseToSRS }: StorySectionProps) {
  const [subTab, setSubTab] = useState<'dialogues' | 'stories'>('dialogues');
  const [activeStory, setActiveStory] = useState<Story>(DEFAULT_STORIES[activeDialect]);
  const [selectedParagraph, setSelectedParagraph] = useState<number | null>(null);
  const [isSavedParagraph, setIsSavedParagraph] = useState<Record<number, boolean>>({});
  
  // Custom prompt topic input
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Quiz tracking
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Sync story when dialect changes
  useEffect(() => {
    setActiveStory(DEFAULT_STORIES[activeDialect]);
    setSelectedParagraph(null);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(null);
    setIsSavedParagraph({});
  }, [activeDialect]);

  const handleParagraphClick = (index: number) => {
    setSelectedParagraph(index === selectedParagraph ? null : index);
  };

  const handleSpeakParagraph = (text: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid toggling translation collapse
    speakPhrase(text, activeDialect);
  };

  const handleSaveParagraphToSRS = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSavePhraseToSRS) {
      const pSpanish = activeStory.paragraphs[index];
      const pTranslation = activeStory.translations[index];
      const explanation = `Frase memorável do texto "${activeStory.title}". Sotaque: ${activeDialect === 'colombia' ? 'Colombiano' : 'Mexicano'}.`;
      
      onSavePhraseToSRS(pSpanish, pTranslation, explanation, 'Histórias');
      setIsSavedParagraph(prev => ({ ...prev, [index]: true }));
    }
  };

  // Generate dynamic story using Gemini server-side API
  const handleGenerateCustomStory = async () => {
    setIsGenerating(true);
    setSelectedParagraph(null);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(null);
    setIsSavedParagraph({});

    const topicToSend = customTopic.trim() || "no encontro de amigos";

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: activeDialect,
          topic: topicToSend
        })
      });

      if (!response.ok) {
        throw new Error("Falha ao gerar história com IA.");
      }

      const data = await response.json();
      if (data.title && data.paragraphs && data.paragraphs.length > 0) {
        setActiveStory(data);
      }
    } catch (err) {
      console.error(err);
      // Fallback message but keep default story
      alert("Não conseguimos gerar uma história exclusiva com IA agora. Mas você pode aproveitar nossa história pré-programada excelente!");
      setActiveStory(DEFAULT_STORIES[activeDialect]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSubmit = (index: number) => {
    if (quizSubmitted) return;
    setSelectedAnswer(index);
    const correct = index === activeStory.quiz.correctIndex;
    setIsAnswerCorrect(correct);
    setQuizSubmitted(true);

    if (!correct && onTrackError) {
      onTrackError(
        `Opção selecionada: "${activeStory.quiz.options[index]}"`,
        `Opção correta: "${activeStory.quiz.options[activeStory.quiz.correctIndex]}"`,
        `Compreensão incorreta na história "${activeStory.title}" (${activeDialect === 'colombia' ? 'Colômbia' : 'México'}).`
      );
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(null);
  };

  const isCol = activeDialect === 'colombia';
  const flag = isCol ? '🇨🇴' : '🇲🇽';

  return (
    <div className="flex flex-col gap-5 max-w-md mx-auto pb-10">
      
      {/* Tab Switcher */}
      <div className="bg-white rounded-2xl border border-gray-100 p-1 shadow-xs flex gap-1">
        <button
          id="tab-btn-dialogues"
          onClick={() => setSubTab('dialogues')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'dialogues'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>15 Diálogos {isCol ? 'Colombianos' : 'Mexicanos'}</span>
        </button>
        <button
          id="tab-btn-stories"
          onClick={() => setSubTab('stories')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'stories'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Histórias com IA</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'dialogues' ? (
          <motion.div
            key="dialogues"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <DialogueTrainer 
              activeDialect={activeDialect} 
              onTrackError={onTrackError} 
              onSavePhraseToSRS={onSavePhraseToSRS} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="stories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-5"
          >
            {/* AI Story Prompt Generator Form */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-indigo-200">
                <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
                <span className="text-xs font-semibold uppercase tracking-wider">Histórias infinitas com IA</span>
              </div>
              <h4 className="text-sm font-bold">Crie uma história no sotaque {isCol ? 'Colombiano 🇨🇴' : 'Mexicano 🇲🇽'}:</h4>
              <div className="flex gap-2">
                <input
                  id="story-custom-topic-input"
                  type="text"
                  placeholder="Ex: pegando voo, comprando passagens, vendedor de rua..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  disabled={isGenerating}
                  className="flex-1 px-3.5 py-2 rounded-xl text-sm bg-white/10 border border-white/10 focus:outline-hidden focus:border-white/30 text-white placeholder-white/40 font-medium"
                />
                <button
                  id="story-generate-btn"
                  onClick={handleGenerateCustomStory}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Gerar</span>
                  )}
                </button>
              </div>
            </div>

            {/* Actual story content board */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col gap-4">
              
              {/* Story details header */}
              <div className="border-b border-gray-100 pb-3">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider flex items-center gap-1">
                  {flag} {activeStory.location}
                </span>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight mt-1 font-sans">
                  {activeStory.title}
                </h2>
              </div>

              {/* Story paragraphs */}
              <div className="flex flex-col gap-4 py-1">
                {activeStory.paragraphs.map((para, idx) => (
                  <div
                    id={`story-para-${idx}`}
                    key={idx}
                    onClick={() => handleParagraphClick(idx)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedParagraph === idx
                        ? 'border-indigo-100 bg-indigo-50/40 shadow-xs'
                        : 'border-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-medium text-gray-800 leading-relaxed font-sans flex-1 pr-2">
                        {para}
                      </p>
                      <div className="flex gap-1 items-center shrink-0">
                        <button
                          id={`play-story-para-${idx}`}
                          onClick={(e) => handleSpeakParagraph(para, e)}
                          className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                          title="Ouvir parágrafo"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleSaveParagraphToSRS(idx, e)}
                          disabled={isSavedParagraph[idx]}
                          className={`p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-indigo-100 hover:text-indigo-700 transition-colors ${isSavedParagraph[idx] ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : ''}`}
                          title="Memorizar parágrafo"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Translation revealed on click (Espiar) */}
                    <AnimatePresence>
                      {selectedParagraph === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2.5 pt-2.5 border-t border-indigo-100/40"
                        >
                          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">
                            Espiando Tradução:
                          </span>
                          <p className="text-xs text-indigo-950 font-sans leading-relaxed">
                            {activeStory.translations[idx]}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-gray-400 italic text-center">
                💡 Toque nos parágrafos para "Espiar" a tradução de cada um!
              </p>

              {/* Slang glossary / Espiar gírias */}
              <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-xl p-4 mt-2">
                <div className="flex items-center gap-1.5 text-indigo-900 font-bold text-sm mb-3">
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span>Espiar Gírias desta história:</span>
                </div>
                <div className="flex flex-col gap-3">
                  {activeStory.slangGlossary.map((item, idx) => (
                    <div key={idx} className="text-xs border-l-2 border-indigo-200 pl-3">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-bold text-indigo-950 text-sm font-mono">{item.word}</span>
                        <span className="text-gray-400">➔</span>
                        <span className="font-semibold text-indigo-900">{item.meaning}</span>
                      </div>
                      <p className="text-[11px] text-indigo-950/70 italic mt-0.5 font-sans">
                        Uso: "{item.example}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive comprehension Quiz */}
              <div className="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-4 mt-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-sm mb-3">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Quiz de Compreensão:</span>
                </div>
                
                <p className="text-xs font-semibold text-emerald-950 mb-3 leading-relaxed">
                  {activeStory.quiz.question}
                </p>

                <div className="flex flex-col gap-2">
                  {activeStory.quiz.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrectOpt = idx === activeStory.quiz.correctIndex;
                    
                    let btnClass = "bg-white border-gray-100 text-gray-700 hover:bg-gray-50";
                    if (quizSubmitted) {
                      if (isCorrectOpt) {
                        btnClass = "bg-emerald-100 border-emerald-300 text-emerald-900 font-semibold";
                      } else if (isSelected) {
                        btnClass = "bg-red-100 border-red-300 text-red-900 font-semibold";
                      } else {
                        btnClass = "bg-gray-50 border-gray-100 text-gray-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        id={`quiz-option-${idx}`}
                        key={idx}
                        onClick={() => handleAnswerSubmit(idx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${btnClass}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 shrink-0 flex items-center justify-center uppercase">
                          {String.fromCharCode(97 + idx)}
                        </span>
                        <span className="leading-relaxed font-medium">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quiz results and feedback */}
                {quizSubmitted && (
                  <div className="mt-3.5 pt-3 border-t border-emerald-100/50 text-xs">
                    {isAnswerCorrect ? (
                      <div className="text-emerald-800 font-semibold flex items-center gap-1.5 mb-1.5">
                        <Check className="w-4 h-4 text-emerald-600" /> ¡Excelente! Você compreendeu tudo direitinho.
                      </div>
                    ) : (
                      <div className="text-red-800 font-semibold flex items-center gap-1.5 mb-1.5">
                        <X className="w-4 h-4 text-red-600" /> Ah, não foi dessa vez!
                      </div>
                    )}
                    <p className="text-emerald-950 leading-relaxed font-sans mt-1">
                      {activeStory.quiz.explanation}
                    </p>
                    
                    <button
                      id="quiz-retry-btn"
                      onClick={handleResetQuiz}
                      className="mt-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" /> Tentar de novo
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
