import React, { useState } from 'react';
import { UserAccount } from '../types';
import { 
  Key, User, ShieldCheck, Flame, Award, LogOut, Check, ArrowRight, UserPlus, 
  HelpCircle, Sparkles, Smile, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthSectionProps {
  currentUser: UserAccount | null;
  onLogin: (account: UserAccount) => void;
  onLogout: () => void;
  onUpdateUser: (account: UserAccount) => void;
}

const AVATARS = [
  { id: 'av_1', name: 'Medellín Skate', emoji: '🛹', color: 'bg-amber-100 border-amber-300' },
  { id: 'av_2', name: 'Bogotá Coffee', emoji: '☕', color: 'bg-rose-100 border-rose-300' },
  { id: 'av_3', name: 'CDMX Taco', emoji: '🌮', color: 'bg-emerald-100 border-emerald-300' },
  { id: 'av_4', name: 'Guadalajara Hat', emoji: '🤠', color: 'bg-blue-100 border-blue-300' },
  { id: 'av_5', name: 'Salsa Dancer', emoji: '💃', color: 'bg-purple-100 border-purple-300' },
  { id: 'av_6', name: 'Chilli Lover', emoji: '🌶️', color: 'bg-orange-100 border-orange-300' },
];

export default function AuthSection({ currentUser, onLogin, onLogout, onUpdateUser }: AuthSectionProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getAccounts = (): Record<string, any> => {
    try {
      const stored = localStorage.getItem('hablasur_registered_accounts');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const saveAccounts = (accounts: Record<string, any>) => {
    localStorage.setItem('hablasur_registered_accounts', JSON.stringify(accounts));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || !password) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }

    const accounts = getAccounts();

    if (isRegistering) {
      // Sign up flow
      if (accounts[cleanUsername]) {
        setErrorMsg("Este nome de usuário já está sendo utilizado.");
        return;
      }

      if (!name.trim()) {
        setErrorMsg("Por favor, digite seu nome.");
        return;
      }

      const newAccount: UserAccount = {
        username: cleanUsername,
        name: name.trim(),
        avatarUrl: selectedAvatar.emoji,
        xp: 100, // Welcome gift!
        streak: 1,
        lastActive: new Date().toISOString().split('T')[0]
      };

      // Save password and account details
      accounts[cleanUsername] = {
        details: newAccount,
        password: password // simple stored password for learning mock sandbox
      };

      saveAccounts(accounts);
      onLogin(newAccount);
      
      // Reset
      setName('');
      setUsername('');
      setPassword('');
    } else {
      // Login flow
      const existing = accounts[cleanUsername];
      if (!existing || existing.password !== password) {
        setErrorMsg("Nome de usuário ou senha incorretos.");
        return;
      }

      // Check / update streak
      const todayStr = new Date().toISOString().split('T')[0];
      const details = { ...existing.details };
      
      if (details.lastActive) {
        const lastDate = new Date(details.lastActive);
        const todayDate = new Date(todayStr);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          details.streak += 1;
        } else if (diffDays > 1) {
          details.streak = 1; // broken streak
        }
      } else {
        details.streak = 1;
      }
      
      details.lastActive = todayStr;
      
      // Save back updated session
      accounts[cleanUsername].details = details;
      saveAccounts(accounts);

      onLogin(details);
      
      // Reset
      setUsername('');
      setPassword('');
    }
  };

  const handleResetProgress = () => {
    if (!currentUser) return;
    if (confirm("Deseja mesmo resetar seus pontos de experiência e conquistas? Isso não poderá ser desfeito.")) {
      const updated = {
        ...currentUser,
        xp: 100,
        streak: 1,
        lastActive: new Date().toISOString().split('T')[0]
      };
      
      const accounts = getAccounts();
      if (accounts[currentUser.username]) {
        accounts[currentUser.username].details = updated;
        saveAccounts(accounts);
      }
      onUpdateUser(updated);
    }
  };

  return (
    <div className="max-w-md mx-auto pb-10">
      
      <AnimatePresence mode="wait">
        {currentUser ? (
          // Logged In Dashboard View
          <motion.div
            key="profile-active"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm flex flex-col gap-5"
          >
            {/* Header Profile Card */}
            <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-3xl flex items-center justify-center shadow-xs">
                {currentUser.avatarUrl || '🛹'}
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Estudante Ativo</span>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  @{currentUser.username}
                </p>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-3.5 text-center flex flex-col items-center gap-1">
                <Flame className="w-6 h-6 text-amber-500 fill-amber-500 animate-pulse" />
                <span className="block font-black text-amber-950 text-xl leading-none mt-1">
                  {currentUser.streak} {currentUser.streak === 1 ? 'Dia' : 'Dias'}
                </span>
                <span className="text-[10px] text-amber-700/80 font-bold uppercase tracking-wider">Fogo de Ofensiva</span>
              </div>

              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-3.5 text-center flex flex-col items-center gap-1">
                <Award className="w-6 h-6 text-indigo-600" />
                <span className="block font-black text-indigo-950 text-xl leading-none mt-1">
                  {currentUser.xp} XP
                </span>
                <span className="text-[10px] text-indigo-700/80 font-bold uppercase tracking-wider">Pontuação de Fluência</span>
              </div>
            </div>

            {/* Level progress visualization */}
            <div className="bg-slate-50 rounded-2xl border border-gray-100 p-4 text-xs font-medium text-slate-700 flex flex-col gap-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-800">Nível 1 (Iniciante Ativo)</span>
                <span className="text-indigo-600">{currentUser.xp} / 1000 XP</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentUser.xp / 1000) * 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                💡 Ganhe XP praticando diálogos, acertando quizzes de compreensão e memorizando frases espaçadas!
              </p>
            </div>

            {/* Settings & Danger Zone */}
            <div className="flex flex-col gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={handleResetProgress}
                className="w-full py-2.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Resetar meu Progresso</span>
              </button>

              <button
                onClick={onLogout}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-3xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair da minha Conta</span>
              </button>
            </div>

          </motion.div>
        ) : (
          // Auth flow form (Login / Register)
          <motion.div
            key="profile-guest"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-gray-150 rounded-3xl p-5 shadow-sm flex flex-col gap-4"
          >
            {/* Header intro */}
            <div className="text-center pb-2 border-b border-gray-50">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl flex items-center justify-center text-xl mx-auto shadow-3xs mb-2">
                🔑
              </div>
              <h3 className="font-black text-gray-900 text-sm">
                {isRegistering ? 'Crie seu perfil de estudos' : 'Acesse seus estudos'}
              </h3>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto mt-0.5">
                Crie ou entre em uma conta para que sua memorização espaçada, XP e históricos fiquem salvos localmente!
              </p>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-1.5 leading-snug">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              
              {isRegistering && (
                <div className="flex flex-col gap-1 animate-fade-in">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Qual o seu Nome?</label>
                  <div className="relative flex items-center">
                    <Smile className="w-4 h-4 text-gray-300 absolute left-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Lucas Rodrigues"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-150 focus:outline-hidden focus:border-indigo-500 text-xs font-semibold placeholder-gray-300 bg-gray-50/50"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Nome de Usuário (Username):</label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gray-300 absolute left-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: lucas123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-150 focus:outline-hidden focus:border-indigo-500 text-xs font-semibold placeholder-gray-300 bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sua Senha de Estudos:</label>
                <div className="relative flex items-center">
                  <Key className="w-4 h-4 text-gray-300 absolute left-3.5" />
                  <input
                    type="password"
                    required
                    placeholder="Sua senha secreta"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-150 focus:outline-hidden focus:border-indigo-500 text-xs font-semibold placeholder-gray-300 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Character Avatar Picker for Registration */}
              {isRegistering && (
                <div className="flex flex-col gap-1.5 mt-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Selecione seu Mascote de Perfil:</label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {AVATARS.map((av) => (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => setSelectedAvatar(av)}
                        className={`p-2 rounded-xl text-xl border flex items-center justify-center transition-all ${av.color} ${
                          selectedAvatar.id === av.id ? 'scale-110 shadow-xs ring-2 ring-indigo-500' : 'opacity-70 hover:opacity-100'
                        }`}
                        title={av.name}
                      >
                        {av.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1"
              >
                <span>{isRegistering ? 'Cadastrar Perfil e Entrar' : 'Entrar na minha Conta'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </form>

            {/* Toggle login vs register */}
            <div className="text-center pt-2 border-t border-gray-50 text-xs font-semibold">
              {isRegistering ? (
                <button
                  onClick={() => {
                    setIsRegistering(false);
                    setErrorMsg(null);
                  }}
                  className="text-indigo-600 hover:underline"
                >
                  Já tem um perfil? Acesse aqui!
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsRegistering(true);
                    setErrorMsg(null);
                  }}
                  className="text-indigo-600 hover:underline flex items-center gap-1 mx-auto"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Novo por aqui? Crie seu perfil!</span>
                </button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
