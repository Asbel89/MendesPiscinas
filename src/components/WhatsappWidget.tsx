import React, { useState } from 'react';
import { Phone, MessageSquare, X, Send, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsappWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickQuestions = [
    {
      label: 'Orçamento Mensal',
      text: 'Olá Mendes! Gostaria de um orçamento para limpeza preventiva mensal na minha piscina de residência.',
    },
    {
      label: 'Tratar Água Verde 🦠',
      text: 'Olá Mendes! Minha piscina está verde e turva. Gostaria de agendar um tratamento de choque de recuperação.',
    },
    {
      label: 'Visita Avulsa',
      text: 'Olá Mendes! Preciso de uma aspiração e ajuste químico avulso para este fim de semana.',
    },
    {
      label: 'Troca de Areia do Filtro ⚙️',
      text: 'Olá Mendes! Gostaria de consultar preços para troca de areia do meu filtro de piscina.',
    },
  ];

  const handleSendPrompt = (text: string) => {
    const finalMsg = encodeURIComponent(text);
    const url = `https://wa.me/5516991939089?text=${finalMsg}`;
    window.open(url, '_blank', 'noreferrer,noopener');
    setIsOpen(false);
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleSendPrompt(customMsg);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end" id="whatsapp-assistance-widget">
      
      {/* Help Bubble Drawer Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="whatsapp-chat-bubble"
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 25 }}
            className="w-72 sm:w-80 bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 mb-4 text-xs select-none"
          >
            {/* Header branding */}
            <div className="bg-[#000a8f] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold relative">
                  <Phone className="w-4 h-4 text-white animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-300 rounded-full border border-primary"></span>
                </div>
                <div>
                  <span className="block font-extrabold text-sm font-sans tracking-wide">Mendes Atendimento</span>
                  <span className="block text-[9px] text-sky-200 uppercase font-bold tracking-wider">Online — Responde rápido</span>
                </div>
              </div>

              <button
                id="close-whatsapp-chat"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Bubble contents */}
            <div className="p-4 space-y-4 bg-slate-50 max-h-80 overflow-y-auto">
              
              <div className="bg-white border border-slate-200 p-3 rounded-2xl space-y-1">
                <span className="block font-bold text-slate-800 text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" /> Edson Mendes:
                </span>
                <p className="text-slate-500 font-light leading-relaxed">
                  Olá! Como posso deixar sua piscina limpa hoje? Escolha uma opção de contato rápido abaixo ou digite sua dúvida:
                </p>
              </div>

              {/* Quick interactive questions */}
              <div className="space-y-2">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                  Dúvidas Rápidas Comuns:
                </span>

                <div className="grid grid-cols-1 gap-1.5" id="wa-assistant-links">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      id={`wa-quick-btn-${idx}`}
                      onClick={() => handleSendPrompt(q.text)}
                      className="w-full text-left p-2.5 bg-white hover:bg-sky-50 border border-slate-200 hover:border-primary/30 rounded-xl transition-all cursor-pointer font-semibold text-[11px] text-[#000a8f] block truncate"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom input textbox converter */}
              <form onSubmit={handleCustomFormSubmit} className="pt-2 border-t border-slate-200 flex items-center gap-2" id="wa-custom-submit">
                <input
                  id="wa-custom-input"
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Escreva sua mensagem personalizada..."
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl outline-transparent text-slate-700"
                />
                <button
                  id="wa-custom-submit-btn"
                  type="submit"
                  className="p-2.5 bg-emerald-600 rounded-xl text-white hover:bg-emerald-500 shrink-0 cursor-pointer"
                  title="Enviar"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

            <div className="bg-slate-100 p-2 border-t border-slate-200 text-center text-[10px] text-slate-400">
              Link oficial Mende: <strong>wa.me/5516991939089</strong>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Icon markup */}
      <button
        id="whatsapp-floating-action-button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-emerald-900/50 transition-all hover:scale-105 select-none relative group cursor-pointer"
        aria-label="Abrir suporte WhastApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 rounded-full text-[9px] font-bold text-white flex items-center justify-center animate-bounce">
          1
        </span>
        {isOpen ? (
          <X className="w-6 h-6 animate-spin" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

    </div>
  );
}
