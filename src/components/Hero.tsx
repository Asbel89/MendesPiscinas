import React, { useState } from 'react';
import { Sparkles, ArrowRight, Droplets, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export default function Hero({ onScrollToSection, onOpenBooking }: HeroProps) {
  const [waterCleanStatus, setWaterCleanStatus] = useState<'dirty' | 'clean'>('dirty');

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 lg:pt-36 lg:pb-28 bg-gradient-to-br from-slate-900 via-blue-950 to-primary text-white overflow-hidden"
    >
      {/* Decorative Wave Background */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-56 fill-current text-sky-400"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,138.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Radiant Floating Light Bubbles */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-sky-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse delay-700"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text Information */}
          <div className="col-span-1 lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-sky-300 text-xs font-bold tracking-wider uppercase mb-2 mx-auto lg:mx-0"
            >
              Sua piscina perfeita o ano inteiro
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
            >
              Deixamos sua Piscina <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-200">
                Limpa e Cristalina!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light"
            >
              Esqueça o trabalho duro e aproveite os melhores momentos. Oferecemos manutenção periódica, correção química, pós-festa e recuperação intensiva com pontualidade e segurança.
            </motion.p>

            {/* Core Features Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl shadow-lg">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">Química Ideal</span>
                  <span className="text-xs text-slate-300">pH & Cloro perfeitos</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl shadow-lg">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">100% Saudável</span>
                  <span className="text-xs text-slate-300">Proteção à pele</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl shadow-lg">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-bold text-sm text-white">Atendimento</span>
                  <span className="text-xs text-slate-300">Rápido e pontual</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6"
            >
              <button
                id="hero-booking-cta"
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 font-bold bg-[#000a8f] text-white hover:bg-[#0029a3] border-2 border-transparent rounded-2xl shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              >
                Solicitar Orçamento Grátis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                id="hero-whatsapp-cta"
                href="https://wa.me/5516991939089"
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 font-bold bg-white/10 backdrop-blur-md text-white border-2 border-white/25 hover:bg-white hover:text-[#000a8f] rounded-2xl transition-all cursor-pointer"
              >
                Falar com Especialista
              </a>
            </motion.div>
          </div>

          {/* Interactive Restoration Showcase Widget */}
          <div className="col-span-1 lg:col-span-12 xl:col-span-5 flex justify-center mt-6 lg:mt-0 lg:col-start-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-sm rounded-[40px] overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-6"
            >
              <h3 className="font-bold text-sky-200 text-sm mb-1 uppercase tracking-widest text-center">
                Simulador de Tratamento
              </h3>
              <p className="text-xs text-slate-300 text-center mb-4">
                Veja o efeito do cuidado Mendes Piscinas:
              </p>

              {/* Dynamic pool image preview based on state */}
              <div id="simulated-pool-container" className="relative h-48 rounded-2xl overflow-hidden shadow-inner mb-6">
                {/* Pool base image representation */}
                <div
                  className={`absolute inset-0 transition-all duration-1000 ${
                    waterCleanStatus === 'dirty'
                      ? 'bg-gradient-to-b from-[#4d663a] to-[#2b4c1f]'
                      : 'bg-gradient-to-b from-sky-400 to-sky-700'
                  }`}
                >
                  {/* Rippling effects inside */}
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse"></div>
                  
                  {/* Floating leaves or sparkling stars depending on status */}
                  {waterCleanStatus === 'dirty' ? (
                    <div id="simulated-dirty-leaves" className="absolute inset-0 flex flex-wrap justify-around items-center p-6 text-yellow-800/80">
                      <span className="block w-4 h-4 bg-yellow-900/60 rounded-full blur-xs transform translate-x-4 translate-y-8"></span>
                      <span className="block w-6 h-3 bg-yellow-900/40 rounded-full blur-xs transform -translate-x-12 -translate-y-4"></span>
                      <span className="block w-3 h-3 bg-green-950/80 rounded-full blur-xs"></span>
                      <span className="block text-[10px] bg-green-900/30 text-lime-400 px-2 py-0.5 rounded-full absolute top-12 left-24">Água Verde</span>
                    </div>
                  ) : (
                    <div id="simulated-clean-sparkles" className="absolute inset-0 flex justify-center items-center">
                      <div className="absolute inset-x-8 top-12 flex justify-between">
                        <Sparkles className="w-5 h-5 text-sky-100 animate-spin" />
                        <Sparkles className="w-6 h-6 text-teal-100 animate-pulse" />
                      </div>
                      <div className="absolute inset-x-16 bottom-8 flex justify-around">
                        <Sparkles className="w-4 h-4 text-white animate-bounce" />
                        <span className="block text-[10px] bg-sky-200/20 text-sky-100 font-bold tracking-tight px-2 py-0.5 rounded-full">
                          100% Cristalina & Saudável
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Left side Tag label */}
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 uppercase">
                  Piscina Real
                </span>

                {/* Water health readout bar overlay */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/70 backdrop-blur-md rounded-xl p-2 border border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-300">pH: <strong className={waterCleanStatus === 'dirty' ? 'text-amber-400' : 'text-emerald-400'}>{waterCleanStatus === 'dirty' ? '8.4 (Alcalino)' : '7.4 (Ideal)'}</strong></span>
                  <span className="text-slate-300">Cloro: <strong className={waterCleanStatus === 'dirty' ? 'text-rose-400' : 'text-emerald-400'}>{waterCleanStatus === 'dirty' ? '0.1 ppm (Abaixo)' : '2.0 ppm (Ideal)'}</strong></span>
                </div>
              </div>

              {/* State Toggles buttons */}
              <div className="grid grid-cols-2 gap-3" id="sim-water-actions">
                <button
                  id="sim-btn-dirty"
                  onClick={() => setWaterCleanStatus('dirty')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    waterCleanStatus === 'dirty'
                      ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                      : 'border-white/10 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  Antes (Suja/Verde)
                </button>
                <button
                  id="sim-btn-clean"
                  onClick={() => setWaterCleanStatus('clean')}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    waterCleanStatus === 'clean'
                      ? 'bg-sky-500/30 border-sky-400 text-sky-200 shadow-md shadow-sky-500/10'
                      : 'border-white/10 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  Depois (Tratada ✨)
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-sky-100/70 italic">
                  &ldquo;A água mudou de cor em menos de 24 horas!&rdquo;
                </p>
                <span className="block text-[10px] text-slate-400 mt-1 font-bold">
                  — Depoimento de Marcos F., Ribeirão Preto
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
