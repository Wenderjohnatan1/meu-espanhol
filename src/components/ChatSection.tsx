import React, { useState, useRef, useEffect } from 'react';
import { Country, ChatMessage, UserError } from '../types';
import { countries } from '../data/phrases';
import { speakPhrase, createSpeechRecognizer } from '../utils/speech';
import { Send, Mic, Volume2, Sparkles, AlertCircle, BookOpen, User, RefreshCw, Eye, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatSectionProps {
  activeDialect: Country;
  onRecordError?: (errorMsg: string) => void;
  onTrackError?: (original: string, corrected: string, exp: string) => void;
  trackedErrors: UserError[];
}

export default function ChatSection({ activeDialect, onRecordError, onTrackError, trackedErrors }: ChatSectionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [resetKey, setResetKey] = useState(0);
  
  // Voice & synth states
  const [isListening, setIsListening] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeCharacter = countries.find(c => c.id === activeDialect) || countries[0];

  // Initialize with a welcome message when country or resetKey changes
  useEffect(() => {
    const name = activeCharacter.defaultCharacter;
    let welcomeText = '';
    
    if (activeDialect === 'colombia') {
      welcomeText = `¡Hola parce! Soy ${name}. Qué alegría saludarte hoy. ¿Qué más, cómo va todo en tu día?`;
    } else {
      welcomeText = `¡Qué onda, güey! Soy ${name}. Qué chido platicar contigo hoy. ¿De qué vamos a platicar, carnal?`;
    }

    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: welcomeText,
        timestamp: new Date(),
        localSlangTip: activeDialect === 'colombia' 
          ? "Para começar, mande um 'Hola Valentina, todo bien?'" 
          : "Para começar, mande um 'Hola Ximena, ¿cómo estás, güey?'"
      }
    ]);
  }, [activeDialect, resetKey]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    if (!textToSend) {
      setInputText('');
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsAiTyping(true);

    try {
      const chatHistory = messages.concat(userMessage).map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          country: activeDialect,
          characterName: activeCharacter.defaultCharacter
        })
      });

      if (!response.ok) {
        throw new Error("Falha ao comunicar com o servidor.");
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || "¡Perdón! Tuve un problemita, ¿me repetís?",
        timestamp: new Date(),
        corrections: data.corrections || [],
        localSlangTip: data.localSlangTip
      };

      setMessages(prev => [...prev, botMessage]);

      // If there are corrections, log them in the user error state automatically
      if (data.corrections && data.corrections.length > 0 && onTrackError) {
        data.corrections.forEach((corr: any) => {
          onTrackError(corr.original, corr.corrected, corr.explanation);
        });
      }

    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: activeDialect === 'colombia' 
          ? "¡Qué pena, parce! Não consegui me conectar ao servidor. Vamos tentar de novo?"
          : "¡Qué onda, carnal! Tive um probleminha de conexão ao servidor. Vamos tentar de novo?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleStartListening = () => {
    const recognizer = createSpeechRecognizer(
      activeDialect,
      (result) => {
        setInputText(result);
      },
      (error) => {
        let msg = "Microfone inacessível.";
        if (error === 'not-allowed') msg = "Acesso ao microfone negado.";
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
        onRecordError("Reconhecimento de voz não suportado neste navegador. Escreva por texto, funciona super bem!");
      }
    }
  };

  const handleSpeakText = (msgId: string, text: string) => {
    setSpeakingId(msgId);
    speakPhrase(text, activeDialect, () => {
      setSpeakingId(null);
    });
  };

  const handleResetChat = () => {
    if (confirm("Quer reiniciar nossa conversa do zero?")) {
      setResetKey(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-md mx-auto relative bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden shadow-xs">
      
      {/* Top Header Selector */}
      <div className="bg-white border-b border-gray-100 p-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl font-bold border border-indigo-100">
            {activeCharacter.flag}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-gray-900 text-sm leading-none">{activeCharacter.defaultCharacter}</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider">{activeCharacter.name} • {activeCharacter.accent}</span>
          </div>
        </div>

        <button
          id="chat-reset-btn"
          onClick={handleResetChat}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          title="Reiniciar chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Panel */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
            >
              {/* Message Bubble */}
              <div
                className={`p-3.5 rounded-2xl text-sm font-medium leading-relaxed font-sans ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-2xs'
                }`}
              >
                <p>{msg.text}</p>
                
                {/* Audio voice response for model messages */}
                {!isUser && (
                  <div className="flex items-center justify-end gap-1.5 mt-2 pt-1.5 border-t border-gray-50">
                    <button
                      id={`speak-msg-btn-${msg.id}`}
                      onClick={() => handleSpeakText(msg.id, msg.text)}
                      className={`p-1.5 rounded-lg hover:bg-gray-100 text-indigo-600 transition-colors ${
                        speakingId === msg.id ? 'bg-indigo-50 animate-pulse' : ''
                      }`}
                      title="Ouvir mensagem"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Slang / Espiar Tip below AI Bubble */}
              {!isUser && msg.localSlangTip && (
                <div className="mt-1.5 text-[11px] text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded-xl p-2.5 max-w-full flex gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-indigo-500 mt-0.5" />
                  <p className="font-sans font-medium">
                    <span className="font-bold">Gíria local:</span> {msg.localSlangTip}
                  </p>
                </div>
              )}

              {/* Grammar / Portunhol corrections detected by AI */}
              {!isUser && msg.corrections && msg.corrections.length > 0 && (
                <div className="mt-1.5 border border-amber-200 bg-amber-50/70 rounded-xl p-2.5 max-w-full flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Dica amigável de Espanhol:</span>
                  </div>
                  {msg.corrections.map((corr, cidx) => (
                    <div key={cidx} className="text-[11px] font-sans">
                      <div className="text-red-700 line-through">"{corr.original}"</div>
                      <div className="text-emerald-800 font-semibold">✓ "{corr.corrected}"</div>
                      <p className="text-gray-600 mt-0.5 font-medium leading-relaxed">{corr.explanation}</p>
                    </div>
                  ))}
                  <div className="text-[10px] text-amber-700 bg-amber-100/40 rounded-md py-0.5 px-1.5 self-start font-medium flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" /> Salvo no seu histórico de erros!
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* AI Typing loader */}
        {isAiTyping && (
          <div className="self-start flex items-center gap-2 bg-white border border-gray-100 p-3.5 rounded-2xl rounded-bl-none shadow-2xs max-w-[85%]">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 z-10 shrink-0">
        <button
          id="chat-mic-btn"
          onClick={handleStartListening}
          className={`p-3.5 rounded-xl transition-all ${
            isListening
              ? 'bg-red-100 text-red-700 animate-pulse'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
          }`}
          title="Falar mensagem por voz"
        >
          <Mic className="w-4 h-4" />
        </button>

        <form
          id="chat-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex-1 flex gap-2"
        >
          <input
            id="chat-text-input"
            type="text"
            placeholder={isListening ? "Ouvindo sua voz..." : "Mande uma mensagem..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isAiTyping}
            className="flex-1 px-4 py-3 border border-gray-150 rounded-xl text-sm focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 font-sans font-medium"
          />
          <button
            id="chat-send-btn"
            type="submit"
            disabled={!inputText.trim() || isAiTyping}
            className="p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all disabled:opacity-40 disabled:hover:bg-indigo-600"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
