import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Waves, Calendar, PlusCircle, Check, ArrowRight, Table } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClientUser, VisitHistory } from '../types';

interface ClientPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: ClientUser) => void;
  isLoggedIn: boolean;
  currentUser: ClientUser | null;
  onLogout: () => void;
}

export default function ClientPortal({
  isOpen,
  onClose,
  onLoginSuccess,
  isLoggedIn,
  currentUser,
  onLogout
}: ClientPortalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Pool registration state (inside portal)
  const [poolType, setPoolType] = useState('fibra');
  const [poolVol, setPoolVol] = useState(25000);
  const [poolRegMsg, setPoolRegMsg] = useState('');

  // Service history mock logs
  const [visits, setVisits] = useState<VisitHistory[]>([
    {
      id: 'visit-1',
      date: '28/05/2026',
      parameters: { ph: 7.4, alcalinidade: 90, cloro: 2.0 },
      technician: 'Edson Mendes',
      status: 'Concluído',
      notes: 'Areia limpa retro-lavada, folhas retiradas e supercloração de rotina.'
    },
    {
      id: 'visit-2',
      date: '21/05/2026',
      parameters: { ph: 7.2, alcalinidade: 100, cloro: 1.8 },
      technician: 'Edson Mendes',
      status: 'Concluído',
      notes: 'Paredes escovadas de ponta a ponta. pH ideal estabilizado.'
    },
    {
      id: 'visit-3',
      date: '04/06/2026',
      parameters: { ph: 7.4, alcalinidade: 100, cloro: 2.0 },
      technician: 'Edson Mendes',
      status: 'Agendado',
      notes: 'Próxima visita semanal pré-agendada.'
    }
  ]);

  // Demo user preset credentials for 1-click evaluation
  const handleQuickLogin = () => {
    const mockUser: ClientUser = {
      id: 'mock-user-1',
      name: 'Marcos Felippe de Souza',
      email: 'marcos@mendes.com',
      phone: '(16) 99312-3456',
      address: 'Condomínio San Marco, Casa 12 - Ribeirão Preto / SP',
      poolRegistered: {
        type: 'Alvenaria Pastilhada',
        volumeLiters: 32000,
        lastTreatmentDate: '28/05/2026',
        waterStatus: 'cristalina'
      }
    };
    setErrorMsg('');
    setSuccessAnimation(true);
    setTimeout(() => {
      onLoginSuccess(mockUser);
      setSuccessAnimation(false);
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Por favor, preencha todos os campos.');
        return;
      }
      if (password.length < 5) {
        setErrorMsg('A senha precisa ter pelo menos 5 caracteres.');
        return;
      }

      // Successful fake authentication simulator
      setSuccessAnimation(true);
      setTimeout(() => {
        const authenticatedUser: ClientUser = {
          id: `custom-${Date.now()}`,
          name: email.split('@')[0].toUpperCase(),
          email: email,
          phone: '(16) 99190-2525',
          address: 'Riberão Preto, SP',
          poolRegistered: {
            type: 'Fibra Padrão',
            volumeLiters: 18000,
            lastTreatmentDate: 'Hoje às 10:00',
            waterStatus: 'cristalina'
          }
        };
        onLoginSuccess(authenticatedUser);
        setSuccessAnimation(false);
      }, 1200);
    } else {
      // Register Mode
      if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMsg('Preencha os campos obrigatórios para cadastro.');
        return;
      }
      setSuccessAnimation(true);
      setTimeout(() => {
        const newUser: ClientUser = {
          id: `custom-reg-${Date.now()}`,
          name: name,
          email: email,
          phone: phone || '(16) 99120-2020',
          address: 'Ribeirão Preto, SP',
          poolRegistered: {
            type: 'Fibra',
            volumeLiters: 20000,
            lastTreatmentDate: 'Aguardando vistoria',
            waterStatus: 'tratando'
          }
        };
        onLoginSuccess(newUser);
        setSuccessAnimation(false);
      }, 1200);
    }
  };

  // Registering secondary pools inside dashboard state
  const handleRegisterPool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    currentUser.poolRegistered = {
      type: poolType === 'fibra' ? 'Piscina de Fibra' : poolType === 'vinil' ? 'Piscina de Vinil' : 'Alvenaria Sob Medida',
      volumeLiters: poolVol,
      lastTreatmentDate: 'Recém-Cadastrada',
      waterStatus: 'cristalina'
    };

    setPoolRegMsg('Piscina salva com sucesso! O volume de tratamento foi atualizado.');
    setTimeout(() => {
      setPoolRegMsg('');
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="client-portal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all animate-fade-in"
    >
      <motion.div
        id="client-portal-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl backdrop-blur-lg bg-white/70 rounded-[36px] overflow-hidden shadow-2xl border border-white/30 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
      >
        
        {/* Left Side: Brand Visuals Column (4 cols) */}
        <div className="md:col-span-4 bg-[#000a8f]/90 text-white p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md border-r border-white/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-500/10 rounded-full filter blur-xl"></div>
          
          <div className="relative z-10 flex items-start justify-between md:block md:space-y-4">
            <div className="flex items-center gap-2">
              <Waves className="w-8 h-8 text-sky-400 animate-pulse" />
              <div>
                <span className="font-extrabold text-lg uppercase tracking-wider block leading-none">Mendes</span>
                <span className="text-[10px] font-bold text-sky-300 uppercase tracking-widest block">Área do Cliente</span>
              </div>
            </div>

            <button
              id="mobile-close-portal-top"
              onClick={onClose}
              className="md:hidden p-1.5 bg-white/10 rounded-full text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10 space-y-4 pt-12 md:pt-0 pb-6">
            <h3 className="font-black text-xl leading-tight text-white">
              Sua piscina em mãos de quem entende.
            </h3>
            <p className="text-xs text-sky-100 font-light leading-relaxed whitespace-normal">
              Acompanhe medições de pH, cloro acumulado, próximas visitas técnicas e receba relatórios periódicos da saúde da água.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10px] text-sky-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              Tecnologia certificada contra limo e bactérias.
            </div>
          </div>

          <p className="text-[10px] text-sky-300 hidden md:block">
            Mendes Piscinas © 2026 — Gestão Digital
          </p>
        </div>

        {/* Right Side: Flow Form / Dashboard Content (8 cols) */}
        <div className="md:col-span-8 p-6 overflow-y-auto flex flex-col justify-between max-h-[60vh] md:max-h-[85vh]">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="font-black text-lg text-slate-900 tracking-tight">
                {isLoggedIn ? 'Painel de Controle do Cliente' : authMode === 'login' ? 'Entrar em Minha Conta' : 'Criar Novo Cadastro'}
              </h2>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                {isLoggedIn ? 'Monitore as condições preventivas da sua água' : 'Entre com e-mail e senha correspondentes'}
              </p>
            </div>

            <button
              id="desktop-close-portal"
              onClick={onClose}
              className="hidden md:flex p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 bg-transparent" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {successAnimation ? (
              /* Success loading animation */
              <motion.div
                key="auth-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center space-y-4 flex-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 animate-spin">
                  <Waves className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-primary text-sm uppercase tracking-wider">
                  Sincronizando Dados Básicos...
                </h4>
                <p className="text-xs text-slate-500 font-light">
                  Acessando relatórios e histórico químico da piscina.
                </p>
              </motion.div>
            ) : isLoggedIn && currentUser ? (
              /* LOGGED IN CLIENT DASHBOARD (RICH INTERACTION) */
              <motion.div
                key="client-dashboard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 flex-1 text-xs"
                id="portal-dashboard-details"
              >
                {/* Visual Grid widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Pool info widget */}
                  <div className="backdrop-blur-sm bg-white/50 border border-blue-100/60 rounded-2xl p-4 space-y-3 shadow-md shadow-blue-900/5">
                    <span className="block text-[10px] text-sky-800 font-bold uppercase tracking-wider">
                      Minha Piscina Ativa
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        {currentUser.poolRegistered?.type || 'Sem Piscina Ativa'}
                      </h4>
                      <span className="text-xs text-[#000a8f] font-black">
                        {currentUser.poolRegistered?.volumeLiters.toLocaleString('pt-BR')} Litros
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-sky-100">
                      <span className="text-slate-500">Última Visita:</span>
                      <strong className="text-slate-800">{currentUser.poolRegistered?.lastTreatmentDate}</strong>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Estado da Água:</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 capitalize">
                        {currentUser.poolRegistered?.waterStatus || 'Concluído'}
                      </span>
                    </div>
                  </div>

                  {/* Next Visit scheduling block */}
                  <div className="backdrop-blur-sm bg-slate-50/40 border border-slate-200/50 rounded-2xl p-4 space-y-3 flex flex-col justify-between shadow-md shadow-slate-900/5">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">
                        Próxima Visita Agendada
                      </span>
                      <div className="flex items-center gap-2 text-[#000a8f] font-bold">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>Quinta-feira, 04/06 às 14:00</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-600 font-light">
                      Filtração sob responsabilidade do técnico: <strong>Edson Mendes</strong>
                    </div>

                    <button
                      id="btn-reagendamento"
                      onClick={() => alert('Sua solicitação de reagendamento para Quinta-feira às 14:00 foi enviada para o WhatsApp de confirmação de Mendes Piscinas!')}
                      className="w-full py-1.5 px-3 bg-[#000a8f] hover:bg-[#0029a3] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer"
                    >
                      Solicitar Reagendamento
                    </button>
                  </div>
                </div>

                {/* Simulated Chart/Parameters History Grid */}
                <div className="backdrop-blur-sm bg-white/40 border border-blue-100/60 rounded-2xl p-4 space-y-3 shadow-md shadow-blue-900/5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Histórico Recente de Aferições Químicas (Ideal: pH 7.2 ~ 7.6)
                  </span>

                  <div className="space-y-2">
                    <div className="grid grid-cols-4 font-bold text-slate-500 border-b border-slate-100 pb-1.5 text-[9px] text-center">
                      <span className="text-left">Data</span>
                      <span>pH Medido</span>
                      <span>Cloro Ativo</span>
                      <span>Alcalinidade</span>
                    </div>

                    {visits.map((hist) => (
                      <div key={hist.id} className="grid grid-cols-4 py-1.5 border-b border-dotted border-slate-100 text-center text-slate-700 items-center">
                        <span className="text-left font-bold text-slate-800">{hist.date}</span>
                        <span className={hist.parameters.ph === 7.4 ? 'text-emerald-600 font-bold' : ''}>
                          {hist.parameters.ph}
                        </span>
                        <span>{hist.parameters.cloro} ppm</span>
                        <span>{hist.parameters.alcalinidade} ppm</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced: Register New Pool inline-form for user interaction expansion */}
                <div className="backdrop-blur-sm bg-slate-50/45 rounded-2xl p-4 border border-slate-200/50 space-y-3 shadow-inner">
                  <span className="block font-bold text-[10px] uppercase text-slate-600 flex items-center gap-1.5">
                    <PlusCircle className="w-4 h-4 text-primary shrink-0" /> Cadastrar Outra Piscina / Alterar Medidas
                  </span>

                  {poolRegMsg && (
                    <div id="pool-registration-success" className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl text-[10px] font-bold border border-emerald-100 flex items-center gap-1.5">
                      <Check className="w-4 h-4 shrink-0" />
                      {poolRegMsg}
                    </div>
                  )}

                  <form onSubmit={handleRegisterPool} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end" id="pool-reg-form">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Revestimento:</label>
                      <select
                        id="pool-reg-select-type"
                        value={poolType}
                        onChange={(e) => setPoolType(e.target.value)}
                        className="w-full p-2 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="fibra">Fibra</option>
                        <option value="vinil">Vinil</option>
                        <option value="alvenaria">Azulejos / Alvenaria</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Capacidade (m³):</label>
                      <input
                        id="pool-reg-input-volume"
                        type="number"
                        min="2000"
                        max="200000"
                        step="1000"
                        value={poolVol}
                        onChange={(e) => setPoolVol(parseInt(e.target.value) || 0)}
                        placeholder="Ex: 25000"
                        className="w-full p-2 border border-slate-200 bg-white rounded-xl focus:border-primary outline-transparent"
                      />
                    </div>

                    <button
                      id="pool-reg-submit"
                      type="submit"
                      className="py-2.5 px-3 bg-secondary hover:bg-primary text-white font-bold rounded-xl text-[11px] uppercase tracking-wide cursor-pointer transition-colors"
                    >
                      Salvar Alteração
                    </button>
                  </form>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-slate-400 text-[10px]">
                    Cadastrado como: <strong>{currentUser.email}</strong>
                  </div>
                  <button
                    id="dashboard-logout-action"
                    onClick={onLogout}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg font-bold"
                  >
                    Sair da Conta (Logout)
                  </button>
                </div>

              </motion.div>
            ) : (
              /* LOGIN & SIGNUP FORMS FLOW (VISUALLY SPLENDID) */
              <motion.div
                key="auth-forms"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 flex-1 text-xs"
              >
                {/* Form choice tabs */}
                <div className="flex bg-slate-100 rounded-2xl p-1" id="auth-tabs">
                  <button
                    id="tab-select-login"
                    onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
                    className={`flex-1 py-2.5 text-center font-bold rounded-xl transition-all cursor-pointer ${
                      authMode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Entrar (Login)
                  </button>
                  <button
                    id="tab-select-register"
                    onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
                    className={`flex-1 py-2.5 text-center font-bold rounded-xl transition-all cursor-pointer ${
                      authMode === 'register' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Cadastro Novo
                  </button>
                </div>

                {/* Quick login tooltips to guide evaluation instantly */}
                <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3" id="quick-evaluator-presets">
                  <div className="text-left">
                    <span className="block font-bold text-[#000a8f] text-[11px]">Dica do Desenvolvedor:</span>
                    <p className="text-[10px] text-slate-500 font-light">
                      Use as credenciais pré-salvas gratuitas para testar o Painel do Cliente agora!
                    </p>
                  </div>
                  <button
                    id="quick-login-action-btn"
                    onClick={handleQuickLogin}
                    className="py-2 px-3 bg-[#000a8f] hover:bg-secondary text-white font-black uppercase text-[10px] tracking-wider rounded-xl cursor-pointer shadow-md shadow-sky-500/10 flex items-center gap-1 shrink-0"
                  >
                    Quick-Login 1-Clique <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Interactive Error Container */}
                {errorMsg && (
                  <div id="auth-errors" className="p-3 bg-rose-50 text-rose-800 border-l-4 border-rose-600 rounded-xl font-bold">
                    {errorMsg}
                  </div>
                )}

                {/* Form body */}
                <form onSubmit={handleFormSubmit} className="space-y-4" id="portal-form-tag">
                  {authMode === 'register' && (
                    <div className="space-y-1">
                      <label className="block font-semibold text-slate-700">Seu Nome Completo:</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="portal-input-reg-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="EX: Marcos Felippe"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-transparent"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block font-semibold text-slate-700">E-mail Cadastrado:</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="portal-input-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: marcos@mendes.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-semibold text-slate-700">Senha Secreta:</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="portal-input-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 5 caracteres"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary outline-transparent"
                      />
                    </div>
                  </div>

                  {authMode === 'register' && (
                    <div className="space-y-1">
                      <label className="block font-semibold text-slate-700">Celular / WhatsApp (Opcional):</label>
                      <input
                        id="portal-input-phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (16) 99193-9089"
                        className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary outline-transparent"
                      />
                    </div>
                  )}

                  <button
                    id="submit-auth-action"
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-[#0029a3] text-white font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer text-center text-xs"
                  >
                    {authMode === 'login' ? 'Entrar Agora' : 'Finalizar Cadastro'}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center pt-4 border-t border-slate-100 mt-4">
            <button
              id="close-portal-action-bottom"
              onClick={onClose}
              className="text-[11px] text-[#000a8f] font-bold uppercase tracking-wider hover:underline cursor-pointer"
            >
              Voltar ao Site Inicial
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
