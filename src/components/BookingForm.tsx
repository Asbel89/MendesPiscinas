import React, { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle2, ChevronRight, User, Phone, Mail, FileText, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { BookingRequest } from '../types';

interface BookingFormProps {
  initialServiceSelected?: string;
}

export default function BookingForm({ initialServiceSelected = 'Limpeza Periódica (Mensalista)' }: BookingFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [poolType, setPoolType] = useState('fibra');
  const [poolSize, setPoolSize] = useState('media');
  const [preferredPeriod, setPreferredPeriod] = useState<'manha' | 'tarde'>('manha');
  const [notes, setNotes] = useState('');
  const [serviceSelected, setServiceSelected] = useState(initialServiceSelected);

  // Custom Interative Calendar logic
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const currentMonth = 'Junho, 2026';
  const monthDays = [
    { day: 1, label: 'Seg', disabled: false },
    { day: 2, label: 'Ter', disabled: false },
    { day: 3, label: 'Qua', disabled: false },
    { day: 4, label: 'Qui', disabled: false },
    { day: 5, label: 'Sex', disabled: false },
    { day: 6, label: 'Sáb', disabled: false },
    { day: 7, label: 'Dom', disabled: true },
    { day: 8, label: 'Seg', disabled: false },
    { day: 9, label: 'Ter', disabled: false },
    { day: 10, label: 'Qua', disabled: false },
    { day: 11, label: 'Qui', disabled: false },
    { day: 12, label: 'Sex', disabled: false },
    { day: 13, label: 'Sáb', disabled: false },
    { day: 14, label: 'Dom', disabled: true },
    { day: 15, label: 'Seg', disabled: false },
    { day: 16, label: 'Ter', disabled: false },
    { day: 17, label: 'Qua', disabled: false },
    { day: 18, label: 'Qui', disabled: false },
    { day: 19, label: 'Sex', disabled: false },
    { day: 20, label: 'Sáb', disabled: false },
    { day: 21, label: 'Dom', disabled: true },
    { day: 22, label: 'Seg', disabled: false },
    { day: 23, label: 'Ter', disabled: false },
    { day: 24, label: 'Qua', disabled: false },
    { day: 25, label: 'Qui', disabled: false },
    { day: 26, label: 'Sex', disabled: false },
    { day: 27, label: 'Sáb', disabled: false },
    { day: 28, label: 'Dom', disabled: true },
    { day: 29, label: 'Seg', disabled: false },
    { day: 30, label: 'Ter', disabled: false }
  ];

  // Submission Status
  const [submissionCompleted, setSubmissionCompleted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingRequest | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    const chosenDay = selectedDay ? `${selectedDay}/06/2026` : 'A combinar';
    const requestDetails: BookingRequest = {
      id: `request-${Date.now()}`,
      clientName: name,
      phone: phone,
      email: email,
      poolType: poolType === 'fibra' ? 'Fibra' : poolType === 'vinil' ? 'Vinil' : 'Alvenaria/Pastilha',
      poolSize: poolSize === 'pequena' ? 'Pequena (< 15.000 L)' : poolSize === 'media' ? 'Média (15.000 a 40.000 L)' : 'Grande (> 40.000 L)',
      preferredDate: chosenDay,
      preferredPeriod: preferredPeriod,
      additionalNotes: notes,
      status: 'pending'
    };

    setBookingDetails(requestDetails);
    setSubmissionCompleted(true);
  };

  // Generate dynamic custom whatsapp query string
  const generateWhatsappUrl = () => {
    if (!bookingDetails) return 'https://wa.me/5516991939089';
    
    const formattedMessage = `Olá Mendes Piscinas! Gostaria de agendar um orçamento público de limpeza de piscina:
- *Nome*: ${bookingDetails.clientName}
- *Contato*: ${bookingDetails.phone}
- *Revestimento*: ${bookingDetails.poolType}
- *Dimensão*: ${bookingDetails.poolSize}
- *Data desejada*: ${bookingDetails.preferredDate} (${bookingDetails.preferredPeriod === 'manha' ? 'Período da Manhã' : 'Período da Tarde'})
- *Desejo contratar*: ${serviceSelected}
- *Observações*: ${bookingDetails.additionalNotes || 'Nenhuma'}`;

    return `https://wa.me/5516991939089?text=${encodeURIComponent(formattedMessage)}`;
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setSelectedDay(null);
    setNotes('');
    setSubmissionCompleted(false);
    setBookingDetails(null);
  };

  return (
    <section id="booking" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full filter blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-300 bg-white/10 border border-white/10 px-3 py-1.5 rounded-full inline-block mb-3">
            Agendamento Rápido
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Solicite seu Orçamento Gratuito
          </h2>
          <p className="mt-4 text-base text-slate-300">
            Preencha os dados e escolha um dia conveniente. Enviamos uma proposta justa e personalizada pelo WhatsApp sem compromisso!
          </p>
        </div>

        {/* Form panel container */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-[36px] overflow-hidden shadow-2xl p-6 sm:p-10">
          
          {submissionCompleted && bookingDetails ? (
            /* SUCCESS BOOKING STATE (SEMANTIC CONFIRMATION + DYNAMIC CTA) */
            <div id="booking-success-container" className="py-10 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <h3 className="font-extrabold text-xl text-emerald-400 tracking-tight">
                Orçamento Iniciado com Sucesso!
              </h3>

              <div className="bg-white/5 border border-white/15 p-5 rounded-2xl max-w-md mx-auto text-left text-xs space-y-3">
                <span className="block font-bold text-sky-200 border-b border-white/10 pb-2 uppercase tracking-widest text-[10px]">
                  Resumo da Proposta de Visita:
                </span>
                <p className="text-slate-200"><strong className="text-white">Nome:</strong> {bookingDetails.clientName}</p>
                <p className="text-slate-200"><strong className="text-white">Capacidade:</strong> {bookingDetails.poolSize}</p>
                <p className="text-slate-200"><strong className="text-white">Data Escolhida:</strong> {bookingDetails.preferredDate}</p>
                <p className="text-slate-200"><strong className="text-white">Período:</strong> {bookingDetails.preferredPeriod === 'manha' ? 'Manhã' : 'Tarde'}</p>
                <p className="text-slate-200"><strong className="text-white">Serviço:</strong> {serviceSelected}</p>
              </div>

              <div className="space-y-4 pt-4 max-w-sm mx-auto">
                <p className="text-xs text-slate-300 font-light font-sans leading-relaxed">
                  Para agilizar a visita e encaminhar fotos da sua piscina, clique no botão abaixo para **enviar imediatamente** esses detalhes para nosso WhatsApp de atendimento!
                </p>

                <a
                  id="send-booking-whatsapp"
                  href={generateWhatsappUrl()}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-xs tracking-wider rounded-full shadow-lg transition-all"
                >
                  Confirmar Proposta no WhatsApp
                  <ChevronRight className="w-4 h-4" />
                </a>

                <button
                  id="reset-booking-form"
                  onClick={handleResetForm}
                  className="text-xs text-sky-300 hover:underline pt-2 block mx-auto cursor-pointer"
                >
                  Fazer nova solicitação de agendamento
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE BOOKING REQUEST FORM */
            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-slate-300" id="booking-main-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Information Fields Column */}
                <div className="space-y-4">
                  <span className="block text-xs font-bold text-sky-300 uppercase tracking-widest border-b border-white/10 pb-2">
                    Informações Pessoais:
                  </span>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="block text-slate-200 font-bold">Seu Nome/Razão Social:</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="booking-input-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: João Ferreira da Silva"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 outline-transparent text-white"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label className="block text-slate-200 font-bold">WhatsApp p/ Orçamento:</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="booking-input-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex: (16) 99193-9089"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 outline-transparent text-white"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label className="block text-slate-200 font-bold">E-mail para relatórios:</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="booking-input-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex: joao@gmail.com"
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 outline-transparent text-white"
                      />
                    </div>
                  </div>

                  {/* Service selection dropdown */}
                  <div className="space-y-1 pt-1">
                    <label className="block text-slate-200 font-bold">Serviço de Maior Interesse:</label>
                    <select
                      id="booking-select-service"
                      value={serviceSelected}
                      onChange={(e) => setServiceSelected(e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-white/10 rounded-xl text-white outline-transparent"
                    >
                      <option value="Limpeza Periódica (Mensalista)">Manutenção Semanal (Mensalistas)</option>
                      <option value="Tratamento de Choque (Água Verde)">Tratamento de Choque (Água Verde/Parada)</option>
                      <option value="Ajuste Químico Preventivo">Ajuste Químico Preventivo de pH/Cloro</option>
                      <option value="Limpeza Emergencial Pós-Festa">Limpeza de Emergência Pós-Temporada</option>
                      <option value="Opções de Combo Personalizado">Opções de Combo Personalizado</option>
                    </select>
                  </div>
                </div>

                {/* Pool Dimensions and calendar Column */}
                <div className="space-y-4">
                  <span className="block text-xs font-bold text-sky-300 uppercase tracking-widest border-b border-white/10 pb-2">
                    Características & Agendamento:
                  </span>

                  {/* Pool type & Size grids */}
                  <div className="grid grid-cols-2 gap-3" id="booking-attributes-grid">
                    <div>
                      <label className="block text-slate-200 font-semibold mb-1">Revestimento:</label>
                      <select
                        id="booking-select-type"
                        value={poolType}
                        onChange={(e) => setPoolType(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-white/10 rounded-xl text-white outline-transparent"
                      >
                        <option value="fibra">Fibra</option>
                        <option value="vinil">Vinil</option>
                        <option value="azulejo">Azulejo / Alvenaria</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-200 font-semibold mb-1">Dimensão:</label>
                      <select
                        id="booking-select-size"
                        value={poolSize}
                        onChange={(e) => setPoolSize(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-white/10 rounded-xl text-white outline-transparent"
                      >
                        <option value="pequena">Pequena (&lt; 15m³)</option>
                        <option value="media">Média (15 a 40m³)</option>
                        <option value="grande">Grande (&gt; 40m³)</option>
                      </select>
                    </div>
                  </div>

                  {/* Preffered period radio selector */}
                  <div id="booking-period-selector" className="space-y-1">
                    <label className="block text-slate-200 font-bold mb-1.5">Período Preferencial:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        id="period-btn-manha"
                        onClick={() => setPreferredPeriod('manha')}
                        className={`py-2 px-2.5 rounded-xl border text-center font-bold tracking-wide transition-all cursor-pointer ${
                          preferredPeriod === 'manha'
                            ? 'bg-[#000a8f] border-primary text-white'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        Período da Manhã (08:00 - 12:00)
                      </button>
                      <button
                        type="button"
                        id="period-btn-tarde"
                        onClick={() => setPreferredPeriod('tarde')}
                        className={`py-2 px-2.5 rounded-xl border text-center font-bold tracking-wide transition-all cursor-pointer ${
                          preferredPeriod === 'tarde'
                            ? 'bg-[#000a8f] border-primary text-white'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        Período da Tarde (13:00 - 17:30)
                      </button>
                    </div>
                  </div>

                  {/* INTERACTIVE CALENDAR DATE SELECTOR */}
                  <div className="space-y-2">
                    <label className="block text-slate-200 font-bold flex items-center justify-between text-xs">
                      <span>Escolha o Dia do Orçamento:</span>
                      <span className="text-sky-300 font-semibold">{currentMonth}</span>
                    </label>

                    <div className="bg-slate-950/40 backdrop-blur-sm p-3 rounded-2xl border border-white/10 shadow-inner" id="booking-calendar-box">
                      {/* Grid representation */}
                      <div className="grid grid-cols-5 gap-1 text-center font-bold text-[9px] text-[#0029a3] mb-1.5 uppercase tracking-wider">
                        <span>Seg</span>
                        <span>Ter</span>
                        <span>Qua</span>
                        <span>Qui</span>
                        <span>Sex</span>
                      </div>

                      <div className="grid grid-cols-5 gap-1.5">
                        {monthDays.map((md, idx) => {
                          const isSelected = selectedDay === md.day;
                          return (
                            <button
                              key={idx}
                              id={`calendar-day-btn-${md.day}`}
                              type="button"
                              onClick={() => setSelectedDay(md.day)}
                              className={`py-1 text-[11px] font-extrabold rounded-md transition-all cursor-pointer flex flex-col items-center ${
                                isSelected
                                  ? 'bg-[#000a8f] text-white shadow-md'
                                  : 'bg-white/5 text-slate-300 hover:bg-white/15'
                              }`}
                            >
                              <span>{md.day}</span>
                            </button>
                          );
                        })}
                      </div>

                      <span className="block text-[9px] text-slate-500 mt-2 text-center">
                        *Limpamos de Segunda a Sexta. Sábados sob combinados urgentes.
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Extra details message */}
              <div className="space-y-1">
                <label className="block text-slate-200 font-bold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 shrink-0" /> Mensagem ou Ponto de Referência (Opcional):
                </label>
                <textarea
                  id="booking-input-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Ex: Piscina localizada no fundo da área de churrasco, possui portão lateral aberto..."
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 outline-transparent text-white resize-none leading-normal"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left text-[10px] text-slate-400 max-w-sm flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Aguarde confirmação imediata da equipe Mendes após envio de orçamento.</span>
                </div>

                <button
                  id="submit-booking-action"
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#000a8f] hover:bg-[#0029a3] text-white font-black uppercase tracking-wider text-xs rounded-full shadow-lg transition-transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Solicitar Visita Gratuita
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
