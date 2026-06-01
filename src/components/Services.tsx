import React, { useState } from 'react';
import { Calendar, Zap, Droplet, Sparkles, Wrench, ChevronDown, Check, Calculator, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';

interface ServicesProps {
  onSelectServiceAndBook: (serviceTitle: string) => void;
}

export default function Services({ onSelectServiceAndBook }: ServicesProps) {
  const [expandedId, setExpandedId] = useState<string | null>('limpeza-regular');
  const [selectedServices, setSelectedServices] = useState<string[]>(['limpeza-regular']);
  const [poolType, setPoolType] = useState<'fibra' | 'alvenaria' | 'vinil'>('fibra');
  const [frequency, setFrequency] = useState<'semanal' | 'quinzenal' | 'avulso'>('semanal');

  const servicesData: Service[] = [
    {
      id: 'limpeza-regular',
      title: 'Limpeza Periódica (Mensalista)',
      shortDescription: 'Ideal para manter a qualidade constante.',
      description: 'Manutenção programada que inclui aspiração, escovação das paredes, peneiração de impurezas, limpeza de bordas e aplicação ideal dos produtos químicos essenciais.',
      icon: 'Calendar',
      priceEstimate: 'A partir de R$ 180 /mês',
      benefits: [
        'Visitas regulares de 1 a 2 vezes por semana',
        'Controle completo de pH e Cloro incluso',
        'Escovação e aspiração cuidadosa da sujeira fina',
        'Descontos especiais para contratos mensais garantidos'
      ]
    },
    {
      id: 'tratamento-choque',
      title: 'Tratamento de Choque (Água Verde)',
      shortDescription: 'Sua piscina azul de novo em tempo recorde.',
      description: 'Recuperação profunda para águas escuras, verdes ou paradas sem a necessidade de descarte. Utilizamos algicidas especiais e decantadores de alta potência guiados por especialistas.',
      icon: 'Zap',
      priceEstimate: 'A partir de R$ 150 (Avulso)',
      benefits: [
        'Recuperação total da água em até 24 ou 48 horas',
        'Eliminação de 100% de algas e bactérias nocivas',
        'Economia de água (sem necessidade de esvaziar a piscina)',
        'Ideal para piscinas que ficaram semanas sem purificação'
      ]
    },
    {
      id: 'ajuste-quimico',
      title: 'Ajuste Químico Preventivo',
      shortDescription: 'Proteção garantida para a pele e cabelos.',
      description: 'Aferição profissional com reagentes colorimétricos e reajuste dos índices de PH, Alcalinidade Total e Teor de Dureza Cálcica para evitar ardência nos olhos e fadiga dos materiais.',
      icon: 'Droplet',
      priceEstimate: 'A partir de R$ 80 /visita',
      benefits: [
        'Proteção contra corrosão de aquecedores e bombas',
        'Evita olhos vermelhos e coceira pós-banho nos pequenos',
        'Prolonga a vida útil do revestimento e do rejunte',
        'Prevenção contra proliferação imediata de limo'
      ]
    },
    {
      id: 'limpeza-pos-festa',
      title: 'Limpeza Expressa Pós-Festa',
      shortDescription: 'Retorno instantâneo à ordem depois da folia.',
      description: 'Atendimento emergencial pós-churrascos, festas de aniversário ou alta temporada de verão. Aspiração profunda, desinfecção redobrada e eliminação de gorduras de protetor solar.',
      icon: 'Sparkles',
      priceEstimate: 'A partir de R$ 120 (Sob consulta)',
      benefits: [
        'Remoção acelerada de resíduos flutuantes e óleos corporais',
        'Aspiração máxima de areia acumulada no fundo',
        'Supercloração de emergência para sanitizar a água',
        'Agendamento rápido pós-evento para evitar esverdeamento'
      ]
    },
    {
      id: 'manutencao-preventiva',
      title: 'Verificação e Filtros',
      shortDescription: 'Seus motores funcionando sem problemas.',
      description: 'Revisão técnica completa dos sistemas hidráulicos primários. Limpeza profunda do cesto de skimmer, pré-filtro do motor e avaliação da necessidade de troca de areia do filtro central.',
      icon: 'Wrench',
      priceEstimate: 'Sob orçamento técnico',
      benefits: [
        'Inspeção cuidadosa contra vazamentos na bomba',
        'Retro-lavagem recomendada da areia filtrante',
        'Limpeza física dos reservatórios coletores de folhas',
        'Garantia do fluxo máximo de filtração diária'
      ]
    },
  ];

  // Helper mapping icon string to active Lucide component
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar className="w-6 h-6 shrink-0" />;
      case 'Zap':
        return <Zap className="w-6 h-6 shrink-0" />;
      case 'Droplet':
        return <Droplet className="w-6 h-6 shrink-0" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 shrink-0" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 shrink-0" />;
      default:
        return <Sparkles className="w-6 h-6 shrink-0" />;
    }
  };

  const handleToggleSelectService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) { // keep at least 1
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Dynamically estimate package price
  const calculateTotalEstimate = () => {
    let base = 0;
    
    // Sum rough pricing bases
    if (selectedServices.includes('limpeza-regular')) base += 180;
    if (selectedServices.includes('tratamento-choque')) base += 220;
    if (selectedServices.includes('ajuste-quimico')) base += 80;
    if (selectedServices.includes('limpeza-pos-festa')) base += 130;
    if (selectedServices.includes('manutencao-preventiva')) base += 100;

    // Apply multiplier based on material/types
    let multiplier = 1.0;
    if (poolType === 'vinil') multiplier = 1.1;
    if (poolType === 'alvenaria') multiplier = 1.25; // requires more scrubbing

    // Frequency discounts
    let freqFactor = 1.0;
    if (frequency === 'semanal') freqFactor = 1.0; // monthly rate base
    if (frequency === 'quinzenal') freqFactor = 0.65; // two visits rate
    if (frequency === 'avulso') freqFactor = 0.4; // single task base price

    return Math.round(base * multiplier * freqFactor);
  };

  const activeServicesLabel = () => {
    return servicesData
      .filter(s => selectedServices.includes(s.id))
      .map(s => s.title)
      .join(' + ');
  };

  return (
    <section id="services" className="py-20 bg-slate-50/40 border-t border-b border-blue-100/50 relative overflow-hidden backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#000a8f] bg-sky-100 px-3 py-1.5 rounded-full inline-block mb-3">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cuidado Profissional Passo a Passo
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Oferecemos soluções sob medida de acordo com sua necessidade. Toque nos serviços para ver detalhes completos ou simule um orçamento logo abaixo!
          </p>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Service Cards Left Column */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            {servicesData.map((service) => {
              const isExpanded = expandedId === service.id;
              const isSelected = selectedServices.includes(service.id);

              return (
                <motion.div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  layout
                  className={`backdrop-blur-md bg-white/40 rounded-[32px] p-6 border shadow-xl shadow-blue-900/5 transition-all ${
                    isSelected ? 'border-[#000a8f] bg-white/60' : 'border-slate-200/50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : service.id)}>
                    <div className="flex items-start gap-4">
                      {/* Icon with status-based colors */}
                      <div className={`p-3 rounded-2xl transition-colors ${
                        isSelected ? 'bg-primary text-white' : 'bg-sky-50 text-secondary'
                      }`}>
                        {renderIcon(service.icon)}
                      </div>

                      <div>
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{service.shortDescription}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2" id={`expansion-controls-${service.id}`}>
                      {/* Select Checkbox (simulation toggle) */}
                      <button
                        title={isSelected ? "Desmarcar" : "Simular inclusão"}
                        id={`btn-select-svc-${service.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSelectService(service.id);
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                          isSelected ? 'bg-primary border-primary text-white' : 'border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Expandable Benefits Context */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-slate-100 text-sm space-y-3">
                          <p className="text-slate-600 font-light leading-relaxed">
                            {service.description}
                          </p>
                          <div className="bg-slate-50 p-4 rounded-2xl">
                            <span className="block font-bold text-xs uppercase tracking-wider text-[#000a8f] mb-3">
                              Benefícios inclusos:
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                              {service.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center justify-between text-xs pt-2">
                            <span className="font-bold text-slate-900 border-b border-primary/20 pb-0.5">
                              {service.priceEstimate}
                            </span>
                            <button
                              id={`quick-book-btn-${service.id}`}
                              onClick={() => onSelectServiceAndBook(service.title)}
                              className="px-4 py-2 font-bold uppercase tracking-wider text-xs bg-[#000a8f] text-white rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                            >
                              Agendar Este Serviço
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Calculator Simulation Right Column */}
          <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              layout
              className="backdrop-blur-md bg-[#000a8f]/80 text-white rounded-[32px] p-6 shadow-2xl shadow-blue-950/20 border border-white/10"
              id="budget-simulator-widget"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Calculator className="w-6 h-6 text-sky-200" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg">Simular Pacote Mendes</h3>
                  <p className="text-xs text-sky-100">Crie seu combo e estime um valor médio</p>
                </div>
              </div>

              {/* Pool Type Selection */}
              <div className="space-y-4" id="sim-form-fields">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sky-200 mb-2">
                    Tipo de Revestimento:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['fibra', 'vinil', 'alvenaria'] as const).map((type) => (
                      <button
                        key={type}
                        id={`sim-type-btn-${type}`}
                        onClick={() => setPoolType(type)}
                        className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center capitalize transition-all cursor-pointer ${
                          poolType === type
                            ? 'bg-white text-primary border-white font-extrabold shadow-md'
                            : 'border-white/10 hover:bg-white/5 text-sky-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Visitation Frequency Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-sky-200 mb-2">
                    Frequência de Visitas:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['semanal', 'quinzenal', 'avulso'] as const).map((freq) => (
                      <button
                        key={freq}
                        id={`sim-freq-btn-${freq}`}
                        onClick={() => setFrequency(freq)}
                        className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center capitalize transition-all cursor-pointer ${
                          frequency === freq
                            ? 'bg-white text-primary border-white font-extrabold shadow-md'
                            : 'border-white/10 hover:bg-white/5 text-sky-100'
                        }`}
                      >
                        {freq === 'semanal' ? 'Semanal' : freq === 'quinzenal' ? 'Quinzenal' : 'Unic (Avulso)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Combo Indicators */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="block text-[11px] text-sky-200 font-bold uppercase tracking-wider">
                    Serviços Selecionados para Estimar:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {servicesData
                      .filter(s => selectedServices.includes(s.id))
                      .map(s => (
                        <span
                          key={s.id}
                          className="text-[10px] bg-white/15 border border-white/10 px-2 py-1 rounded-lg flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-300"></span>
                          {s.title.split(' ')[0]}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Estimate Result Counter */}
                <div className="pt-4 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <span className="block text-xs text-sky-200">Estimativa Mensal Média</span>
                    <span className="text-3xl font-black text-white" id="service-price-outcome">
                      R$ {calculateTotalEstimate()}{' '}
                      <span className="text-xs font-light text-sky-200">
                        {frequency === 'avulso' ? '/serviço' : '/mês'}
                      </span>
                    </span>
                  </div>

                  <div className="text-right text-[10px] text-sky-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Valores médios para Ribeirão Preto e região.
                  </div>
                </div>

                {/* Confirm Quote Form Direct Trigger */}
                <button
                  id="submit-combo-booking"
                  onClick={() => onSelectServiceAndBook(activeServicesLabel())}
                  className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-sm rounded-2xl tracking-widest transition-all cursor-pointer shadow-lg hover:shadow-emerald-900/40 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Solicitá Orçamento deste Combo
                </button>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
