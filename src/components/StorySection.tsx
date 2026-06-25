import React, { useState } from 'react';
import { Country, Story } from '../types';
import { countries } from '../data/phrases';
import { speakPhrase } from '../utils/speech';
import { BookOpen, Volume2, Sparkles, Check, X, ArrowRight, RefreshCw, Eye, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ColombianDialogueTrainer from './ColombianDialogueTrainer';

interface StorySectionProps {
  onTrackError?: (original: string, corrected: string, exp: string) => void;
}

const DEFAULT_STORIES: Record<Country, Story> = {
  argentina: {
    title: "Un Bondi a San Telmo",
    location: "Buenos Aires, Argentina",
    paragraphs: [
      "Che, vení que te cuento. El otro día me tomé el bondi para ir a pasear por San Telmo. ¡No sabés el quilombo que era el tránsito! Pero el chofer metía pata como loco.",
      "Cuando bajé, me encontré con mi amigo Rodri en una esquina. El pibe estaba re piola tomando un mate calentito. '¡Qué hacés, che boludo!', me gritó re contento.",
      "Fuimos a comer unas empanadas fritas que estaban una masa. Nos quedamos charlando de fútbol y arreglamos para armar un asadito el próximo finde. ¡Estuvo bárbaro!"
    ],
    translations: [
      "Cara, vem cá que eu te conto. Outro dia peguei o ônibus para passear por San Telmo. Você não imagina a bagunça que estava o trânsito! Mas o motorista pisava fundo como um louco.",
      "Quando desci, me encontrei com meu amigo Rodri em uma esquina. O garoto estava super de boa tomando um mate quentinho. 'E aí, cara, mano!', me gritou super contente.",
      "Fomos comer umas empanadas fritas que estavam excelentes (uma massa). Ficamos conversando sobre futebol e combinamos de fazer um churrasquinho no próximo fim de semana. Foi ótimo!"
    ],
    slangGlossary: [
      { word: "Che", meaning: "Cara, mano, gíria argentina número 1.", example: "¿Qué hacés, che?" },
      { word: "Bondi", meaning: "Ônibus urbano/coletivo.", example: "Me tomé el bondi equivocado." },
      { word: "Quilombo", meaning: "Bagunça, confusão, caos.", example: "El centro está hecho un quilombo." },
      { word: "Re piola", meaning: "Super legal, muito de boa.", example: "Tu campera está re piola." },
      { word: "Boludo", meaning: "Cara, mano (entre amigos próximos, sem tom de xingamento).", example: "Dale, boludo, apurate." },
      { word: "Una masa", meaning: "Excelente, incrível, espetacular.", example: "Ese recital estuvo una masa." },
      { word: "Asadito", meaning: "Churrasquinho tipicamente argentino.", example: "El domingo sale un asadito." }
    ],
    quiz: {
      question: "O que o amigo Rodri estava fazendo quando o narrador o encontrou?",
      options: [
        "Estava tomando um mate quentinho super de boa.",
        "Estava correndo atrás de um bondi que ia passar.",
        "Estava fazendo um asadito com o motorista do ônibus.",
        "Estava jogando futebol na esquina de San Telmo."
      ],
      correctIndex: 0,
      explanation: "No segundo parágrafo, diz: 'El pibe estaba re piola tomando un mate calentito'."
    }
  },
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
      "O garçom era um rapaz muito educado e me saudou: 'Como vai, meu chapa? Siga por aqui'. Pedi o cafezinho preto bem quente e uma arepa com bastante queijo, uma delícia!",
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
  chile: {
    title: "De Paseo por Valparaíso",
    location: "Valparaíso, Chile",
    paragraphs: [
      "¡Hola, po! Les cuento que anduve paseando por Valparaíso el fin de semana. Al tiro me di cuenta de que las subidas son súper empinadas, ¡casi me muero subiendo los cerros!",
      "Para descansar entré a un almacén chiquitito a comprar un pancito batido. La señora era súper buena onda y me dijo: '¿Cachai cómo llegar al mirador? Si te perdís, me llamai'.",
      "Más tarde me encontré con unos pololos chilenos que andaban pololeando en el paseo. Eran bien simpáticos, me invitaron una empanada de pino y un mote con huesillo. ¡Estuvo la raja!"
    ],
    translations: [
      "Olá! Conto a vocês que andei passeando por Valparaíso no fim de semana. Rapidamente percebi que as subidas são super inclinadas, quase morri subindo os morros!",
      "Para descansar entrei em uma mercearia pequenininha para comprar um pãozinho batido. A senhora era super gente boa e me disse: 'Você saca (sabe) como chegar ao mirante? Se você se perder, me liga'.",
      "Mais tarde me encontrei com uns namorados chilenos que estavam namorando no passeio. Eram bem simpáticos, me convidaram para comer uma empanada e um doce típico de trigo e pêssego. Foi excelente (sensacional)!"
    ],
    slangGlossary: [
      { word: "Po", meaning: "Muleta linguística típica chilena (de 'pues').", example: "Sí, po. Obvio, po." },
      { word: "Al tiro", meaning: "Imediatamente, agora mesmo, rápido.", example: "Voy al tiro, espérame." },
      { word: "Cachai", meaning: "Você saca? Entendeu? Entende?", example: "El mapa es confuso, ¿cachai?" },
      { word: "Pololos", meaning: "Namorados. O verbo 'pololear' é namorar.", example: "Ellos son pololos hace años." },
      { word: "La raja", meaning: "Sensacional, excelente, incrível.", example: "El concierto estuvo la raja." }
    ],
    quiz: {
      question: "Se um chileno disser que vai fazer algo 'al tiro', quando ele fará?",
      options: [
        "Fará apenas amanhã de manhã.",
        "Fará imediatamente, sem demora.",
        "Se recusa totalmente a fazer.",
        "Fará no próximo ano."
      ],
      correctIndex: 1,
      explanation: "'Al tiro' significa fazer algo de imediato, correndo, muito rápido."
    }
  },
  peru: {
    title: "Una Tarde en Barranco",
    location: "Lima, Peru",
    paragraphs: [
      "¿Habla causa? Ayer me fui a Barranco a caminar por el Puente de los Suspiros. El barrio estaba recontra paja, lleno de arte urbano y música criolla en cada esquina.",
      "Me encontré con mi pata Sergio. El loco andaba medio asado porque se le perdieron unas lucas en el camino, pero al toque se le pasó cuando le invité un cebiche.",
      "Nos fuimos a su jato a escuchar un poco de música y relajarnos. Qué buena tarde pasamos comiendo rico y riéndonos de puras tonterías. ¡Ya nos vemos, gente!"
    ],
    translations: [
      "E aí, parça? Ontem fui a Barranco caminhar pela Ponte dos Suspiros. O bairro estava super legal (super paja), cheio de arte urbana e música crioula em cada esquina.",
      "Me encontrei com meu amigo Sergio. O cara estava meio irritado porque perdeu uns trocados (lucas) no caminho, mas logo (ao toque) passou quando lhe paguei um ceviche.",
      "Fomos para a casa dele (sua jato) escutar um pouco de música e relaxar. Que tarde boa passamos comendo bem e rindo de puras bobeiras. Até mais, galera!"
    ],
    slangGlossary: [
      { word: "Causa / Pata", meaning: "Parceiro, amigo de verdade.", example: "Él es mi pata de la infancia." },
      { word: "Recontra paja", meaning: "Extremamente legal, bacana.", example: "Tu idea está recontra paja." },
      { word: "Asado", meaning: "Irritado, bravo, chateado.", example: "No te amargues, ¿por qué estás asado?" },
      { word: "Lucas", meaning: "Gíria para dinheiro/moedas de Soles.", example: "El menú cuesta doce lucas." },
      { word: "Al toque", meaning: "Imediatamente, logo, num instante.", example: "Salió el ceviche al toque." },
      { word: "Jato", meaning: "Casa, lar.", example: "Estoy cansado, me voy a mi jato." }
    ],
    quiz: {
      question: "Qual palavra os peruanos usam na história para se referir à sua 'casa'?",
      options: [
        "Bondi",
        "Jato",
        "Causa",
        "Vaina"
      ],
      correctIndex: 1,
      explanation: "No Peru, 'jato' é a gíria urbana comum para designar 'casa'."
    }
  }
};

export default function StorySection({ onTrackError }: StorySectionProps) {
  const [subTab, setSubTab] = useState<'colombia_dialogues' | 'classic_stories'>('colombia_dialogues');
  const [selectedCountry, setSelectedCountry] = useState<Country>('argentina');
  const [isLoading, setIsLoading] = useState(false);
  const [activeStory, setActiveStory] = useState<Story>(DEFAULT_STORIES.argentina);
  const [selectedParagraph, setSelectedParagraph] = useState<number | null>(null);
  
  // Custom prompt topic input
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Quiz tracking
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setActiveStory(DEFAULT_STORIES[country]);
    setSelectedParagraph(null);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(null);
  };

  const handleParagraphClick = (index: number) => {
    setSelectedParagraph(index === selectedParagraph ? null : index);
  };

  const handleSpeakParagraph = (text: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid toggling translation collapse
    speakPhrase(text, selectedCountry);
  };

  // Generate dynamic story using Gemini server-side API
  const handleGenerateCustomStory = async () => {
    setIsGenerating(true);
    setSelectedParagraph(null);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(null);

    const topicToSend = customTopic.trim() || "no encontro de amigos";

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: selectedCountry,
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
      setActiveStory(DEFAULT_STORIES[selectedCountry]);
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
        `Você errou a pergunta de compreensão da história "${activeStory.title}". Pergunta: "${activeStory.quiz.question}".`
      );
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswer(null);
    setQuizSubmitted(false);
    setIsAnswerCorrect(null);
  };

  return (
    <div className="flex flex-col gap-5 max-w-md mx-auto pb-10">
      
      {/* Tab Switcher */}
      <div className="bg-white rounded-2xl border border-gray-100 p-1 shadow-xs flex gap-1">
        <button
          id="tab-btn-colombia-dialogues"
          onClick={() => setSubTab('colombia_dialogues')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'colombia_dialogues'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>20 Diálogos Colombianos</span>
        </button>
        <button
          id="tab-btn-classic-stories"
          onClick={() => setSubTab('classic_stories')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            subTab === 'classic_stories'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Histórias com IA</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {subTab === 'colombia_dialogues' ? (
          <motion.div
            key="colombia_dialogues"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <ColombianDialogueTrainer onTrackError={onTrackError} />
          </motion.div>
        ) : (
          <motion.div
            key="classic_stories"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-5"
          >
            {/* Country selection header */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Selecione o Sotaque das Histórias:
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {countries.map((c) => (
                  <button
                    id={`story-country-${c.id}`}
                    key={c.id}
                    onClick={() => handleCountryChange(c.id as Country)}
                    className={`flex flex-col items-center py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all ${
                      selectedCountry === c.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                        : 'border-gray-100 bg-gray-50/50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-2xl mb-1">{c.flag}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Story Prompt Generator Form */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-indigo-200">
                <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
                <span className="text-xs font-semibold uppercase tracking-wider">Histórias infinitas com IA</span>
              </div>
              <h4 className="text-sm font-bold">Crie uma história personalizada no sotaque local:</h4>
              <div className="flex gap-2">
                <input
                  id="story-custom-topic-input"
                  type="text"
                  placeholder="Ex: pegando carona, na balada, comprando pão..."
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
                  {countries.find(c => c.id === selectedCountry)?.flag} {activeStory.location}
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
                      <p className="text-sm font-medium text-gray-800 leading-relaxed font-sans">
                        {para}
                      </p>
                      <button
                        id={`play-story-para-${idx}`}
                        onClick={(e) => handleSpeakParagraph(para, e)}
                        className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-indigo-100 hover:text-indigo-700 transition-colors shrink-0"
                        title="Ouvir parágrafo"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
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
