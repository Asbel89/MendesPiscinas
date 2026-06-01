import React, { useState } from 'react';
import { Star, MessageSquare, Quote, User, Sparkles, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([
    {
      id: 'testimonial-1',
      name: 'Roberta Silva',
      location: 'Condomínio San Marco, Ribeirão Preto',
      rating: 5,
      text: 'O serviço do Mendes é espetacular! Antes, nossa piscina de azulejo vivia cheia de algas nas paredes devido ao vento constante da chácara. Agora com as visitas semanais ela está sempre brilhando. Pontualidade britânica e muito capricho.',
      date: '12/05/2026'
    },
    {
      id: 'testimonial-2',
      name: 'Gustavo Lima',
      location: 'Chácara Bonfim Paulista',
      rating: 5,
      text: 'Chamei para fazer tratamento de choque emergencial de água verde acumulada há semanas. Fiquei impressionado: no dia seguinte a água já estava totalmente clarificada e azul cristalina. Profissional muito honesto e de alto conhecimento técnico!',
      date: '28/04/2026'
    },
    {
      id: 'testimonial-3',
      name: 'Dr. Daniel Felippe',
      location: 'Residencial Quinta dos Ventos',
      rating: 5,
      text: 'O que mais prezo na equipe Mendes é o equilíbrio químico. Tenho crianças pequenas que adoravam piscina mas sempre ficavam com olhos vermelhos ou tosse. O Mendes ajustou alcalinidade e pH de forma cirúrgica. Água saudável verdadeira.',
      date: '10/04/2026'
    }
  ]);

  // Form states
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formText, setFormText] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form submission handler
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) return;

    const newTestimonial: Testimonial = {
      id: `testimonial-custom-${Date.now()}`,
      name: formName,
      location: formLocation.trim() ? formLocation : 'Ribeirão Preto e Região',
      rating: formRating,
      text: formText,
      date: new Date().toLocaleDateString('pt-BR')
    };

    setTestimonialsList([newTestimonial, ...testimonialsList]);
    setSuccessMsg(true);

    // Reset fields
    setFormName('');
    setFormLocation('');
    setFormText('');
    setFormRating(5);

    // Fade out success msg after 4 seconds
    setTimeout(() => {
      setSuccessMsg(false);
      setShowForm(false);
    }, 4000);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50/30 border-b border-blue-100/50 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#000a8f] bg-sky-100 px-3 py-1.5 rounded-full inline-block mb-3">
            Depoimentos de Sucesso
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quem Usa, Recomenda o Mendes
          </h2>
          <p className="mt-4 text-base text-slate-600">
            A satisfação dos nossos clientes é o nosso maior diferencial. Leia histórias reais e deixe também o seu depoimento logo abaixo!
          </p>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Testimonials Grid Slider (7 cols) */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="testimonials-list-grid">
              {testimonialsList.map((t) => (
                <div
                  key={t.id}
                  id={`review-${t.id}`}
                  className="backdrop-blur-md bg-white/40 border border-blue-100/60 rounded-[32px] p-6 relative hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col justify-between"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-sky-200/50" />
                  
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-light italic leading-relaxed whitespace-normal break-words">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-200/80">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {t.name.split('')[0]}
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-slate-800">{t.name}</span>
                      <span className="block text-[10px] text-[#0029a3] font-medium truncate max-w-[160px] sm:max-w-[200px]">
                        {t.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                id="toggle-write-review-btn"
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 px-6 py-3 font-bold text-xs uppercase tracking-wider text-primary border-2 border-primary hover:bg-[#000a8f] hover:text-white rounded-full transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                {showForm ? 'Fechar Formulário' : 'Deixar Minha Avaliação'}
              </button>
            </div>
          </div>

          {/* Right: Review submission context or Form (5 cols) */}
          <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-24">
            
            <AnimatePresence mode="wait">
              {showForm ? (
                /* Interactive submission Form */
                <motion.div
                  key="testimonial-submission-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="backdrop-blur-md bg-white/40 border border-blue-100 rounded-[32px] p-6 shadow-xl shadow-blue-900/5 space-y-4"
                  id="testimonial-booking-box"
                >
                  <div className="flex items-center gap-2 text-primary border-b border-sky-100 pb-3">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                      Deixar Depoimento
                    </h3>
                  </div>

                  {successMsg ? (
                    <div className="py-8 text-center space-y-3" id="review-success-msg">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                        <CheckCircle className="w-6 h-6 animate-bounce" />
                      </div>
                      <h4 className="font-extrabold text-[#000a8f] text-sm uppercase tracking-wider">
                        Depoimento Enviado!
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">
                        Muito obrigado por compartilhar sua opinião! Ela ajuda o Mendes e orienta novos clientes interessados.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleAddReview} className="space-y-4 text-xs" id="review-submission-htmlform">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">Seu Nome Completo:</label>
                        <input
                          id="review-input-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Ex: Roberta S. de Souza"
                          className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-transparent"
                        />
                      </div>

                      {/* Location / Condo */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700">Bairro ou Condomínio:</label>
                        <input
                          id="review-input-location"
                          type="text"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="Ex: Condomínio Quinta dos Ventos, Ribeirão Preto"
                          className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-transparent"
                        />
                      </div>

                      {/* Stars system */}
                      <div className="space-y-1.5">
                        <label className="block font-bold text-slate-700">Nota de Avaliação:</label>
                        <div id="review-form-stars" className="flex items-center gap-1.5 py-1">
                          {Array.from({ length: 5 }).map((_, i) => {
                            const starValue = i + 1;
                            const isActive = hoverRating !== null ? starValue <= hoverRating : starValue <= formRating;

                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setFormRating(starValue)}
                                onMouseEnter={() => setHoverRating(starValue)}
                                onMouseLeave={() => setHoverRating(null)}
                                className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    isActive ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="space-y-1">
                        <label className="block font-bold text-slate-700 font-sans">Opinião / Feedback:</label>
                        <textarea
                          id="review-input-text"
                          required
                          value={formText}
                          onChange={(e) => setFormText(e.target.value)}
                          rows={4}
                          placeholder="Como foi sua experiência com Mendes Piscinas? Ficou satisfeito?"
                          className="w-full p-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-transparent resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        id="review-submit-action"
                        type="submit"
                        className="w-full py-3.5 bg-primary hover:bg-[#0029a3] text-white font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Enviar Meu Depoimento
                      </button>
                    </form>
                  )}
                </motion.div>
              ) : (
                /* Information display widget when form is hidden */
                <motion.div
                  key="testimonial-static-promo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  id="testimonial-branding-box"
                  className="backdrop-blur-md bg-[#000a8f]/80 text-white rounded-[32px] p-6 shadow-2xl shadow-blue-950/20 border border-white/10 relative overflow-hidden text-center space-y-4"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-500/10 rounded-full filter blur-xl animate-pulse"></div>

                  <span className="text-[10px] bg-white/20 border border-white/10 px-3 py-1 rounded-full uppercase font-bold text-sky-200 inline-block">
                    Manutenção Reconhecida
                  </span>

                  <h3 className="font-extrabold text-lg sm:text-xl leading-tight">
                    Preocupados com cada gota d'água
                  </h3>

                  <p className="text-xs text-sky-100 max-w-sm mx-auto font-light leading-relaxed">
                    Nossa maior publicidade são os resultados compartilhados. Cuidamos do PH, da turbidez e limpamos impurezas difíceis para garantir saúde física e tranquilidade em sua casa.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-left" id="promo-stats-cards">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                      <span className="block text-xl font-bold text-white">4.9 / 5.0</span>
                      <span className="text-[10px] text-sky-200">Nota Média Google</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center">
                      <span className="block text-xl font-bold text-white">+120</span>
                      <span className="text-[10px] text-sky-200">Clientes Atendidos</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-sky-200 font-bold">
                    Limpando em Ribeirão Preto, Bonfim, Cravinhos e Jurucê.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
