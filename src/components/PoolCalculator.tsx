import React, { useState, useEffect } from 'react';
import { HelpCircle, Droplet, Calculator, RefreshCw, Layers, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';

export default function PoolCalculator() {
  const [shape, setShape] = useState<'rectangular' | 'round' | 'oval'>('rectangular');
  
  // Dimensions state variables
  const [length, setLength] = useState<number>(8); // meters
  const [width, setWidth] = useState<number>(4); // meters
  const [depth, setDepth] = useState<number>(1.4); // meters (average depth)
  const [diameter, setDiameter] = useState<number>(5); // meters for round pool
  
  // Calculated Volume
  const [volume, setVolume] = useState<number>(0);
  const [treatmentType, setTreatmentType] = useState<'regular' | 'shock'>('regular');

  // Trigger recalculation inside useEffect whenever standard parameters shift
  useEffect(() => {
    let calculatedLiters = 0;
    if (shape === 'rectangular') {
      calculatedLiters = length * width * depth * 1000;
    } else if (shape === 'round') {
      // Formula: Dia * Dia * Prof * 785
      calculatedLiters = diameter * diameter * depth * 785;
    } else if (shape === 'oval') {
      // Formula: Comp * Larg * Prof * 785
      calculatedLiters = length * width * depth * 785;
    }
    setVolume(Math.round(calculatedLiters));
  }, [shape, length, width, depth, diameter]);

  // Compute recommendation indexes
  const getChemicalsRecommendation = () => {
    const isShock = treatmentType === 'shock';
    
    // Ratios based on 10,000 Liters (10m3):
    // Chlorine: Regular = 40g per 10m3 (4g/1000l) | Shock = 150g per 10m3 (15g/1000l)
    // Clarifier: Regular = 40ml per 10m3 (4ml/1000l) | Shock = 100ml per 10m3 (10ml/1000l)
    // Algaecide: Regular = 50ml per 10m3 (5ml/1000l) | Shock = 150ml per 10m3 (15ml/1000l)
    // pH Reducer / Elevator: average ~150g per 10m3 to adjust average differences
    
    const factor = volume / 10000;
    
    return {
      chlorine: Math.round(isShock ? factor * 140 : factor * 40),
      clarifier: Math.round(isShock ? factor * 100 : factor * 35),
      algaecide: Math.round(isShock ? factor * 120 : factor * 50),
      adjuster: Math.round(factor * 120),
      filtrationHours: shape === 'rectangular' ? Math.round(6 + (volume / 15000)) : Math.round(5 + (volume / 18000))
    };
  };

  const chemicalData = getChemicalsRecommendation();

  return (
    <section id="calculator" className="py-20 bg-slate-50/20 border-b border-blue-100/50 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#000a8f] bg-sky-100 px-3 py-1.5 rounded-full inline-block mb-3">
            Ferramenta Interativa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculadora Mendes de Água e Química
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Descubra as dimensões corretas da sua piscina e a quantidade ideal de produtos. Esqueça desperdícios e garanta a segurança dos banhistas!
          </p>
        </div>

        {/* Outer Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Inputs Section */}
          <div className="col-span-1 lg:col-span-6 backdrop-blur-md bg-white/40 rounded-[32px] p-6 border border-blue-100/60 shadow-xl shadow-blue-900/5 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Step 1: Shape Choice */}
              <div>
                <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-3">
                  Passo 1: Qual é o formato da sua piscina?
                </span>
                <div className="grid grid-cols-3 gap-3" id="calc-shape-container">
                  {(['rectangular', 'round', 'oval'] as const).map((s) => (
                    <button
                      key={s}
                      id={`calc-shape-btn-${s}`}
                      onClick={() => setShape(s)}
                      className={`py-3.5 px-2 rounded-2xl font-bold text-xs uppercase tracking-wider border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                        shape === s
                          ? 'border-[#000a8f] bg-[#000a8f] text-white shadow-lg'
                          : 'border-slate-200 bg-white/55 hover:bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Layers className="w-5 h-5 shrink-0" />
                      {s === 'rectangular' ? 'Rentágular' : s === 'round' ? 'Redonda' : 'Ovalada'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Dimensions sliders */}
              <div className="space-y-5 border-t border-slate-200 pt-5">
                <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Passo 2: Informe as medidas exatas
                </span>

                {shape !== 'round' ? (
                  <>
                    {/* Length Input */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700">Comprimento (m)</span>
                        <span className="text-primary font-black bg-sky-100 px-2 py-0.5 rounded-md">
                          {length.toFixed(1)} m
                        </span>
                      </div>
                      <input
                        id="calc-input-length"
                        type="range"
                        min="2"
                        max="25"
                        step="0.5"
                        value={length}
                        onChange={(e) => setLength(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000a8f]"
                      />
                    </div>

                    {/* Width Input */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700">Largura (m)</span>
                        <span className="text-primary font-black bg-sky-100 px-2 py-0.5 rounded-md">
                          {width.toFixed(1)} m
                        </span>
                      </div>
                      <input
                        id="calc-input-width"
                        type="range"
                        min="1"
                        max="12"
                        step="0.5"
                        value={width}
                        onChange={(e) => setWidth(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000a8f]"
                      />
                    </div>
                  </>
                ) : (
                  /* Diameter Input (Round shape) */
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700">Diâmetro (m)</span>
                      <span className="text-primary font-black bg-sky-100 px-2 py-0.5 rounded-md">
                        {diameter.toFixed(1)} m
                      </span>
                    </div>
                    <input
                      id="calc-input-diameter"
                      type="range"
                      min="1.5"
                      max="15"
                      step="0.5"
                      value={diameter}
                      onChange={(e) => setDiameter(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000a8f]"
                    />
                  </div>
                )}

                {/* Depth Range Slider (shared) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1">
                      Profundidade Média (m)
                      <span className="group relative text-slate-400">
                        <HelpCircle className="w-3.5 h-3.5 cursor-help" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-slate-800 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none line-clamp-3">
                          Soma a parte rasa e a profunda e divide por dois para achar a média ideal.
                        </span>
                      </span>
                    </span>
                    <span className="text-primary font-black bg-sky-100 px-2 py-0.5 rounded-md">
                      {depth.toFixed(2)} m
                    </span>
                  </div>
                  <input
                    id="calc-input-depth"
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={depth}
                    onChange={(e) => setDepth(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000a8f]"
                  />
                </div>
              </div>

              {/* Step 3: Treatment Preset Toggler */}
              <div className="space-y-3 border-t border-slate-200 pt-5">
                <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Passo 3: Estado Atual da Água
                </span>
                <div className="grid grid-cols-2 gap-3" id="calc-state-selectors">
                  <button
                    id="treatment-btn-regular"
                    onClick={() => setTreatmentType('regular')}
                    className={`py-3.5 px-3 rounded-2xl font-bold text-xs uppercase tracking-wider border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      treatmentType === 'regular'
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800 font-extrabold backdrop-blur-md shadow-sm'
                        : 'border-slate-200 bg-white/45 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <Check className={`w-4 h-4 text-emerald-600 ${treatmentType === 'regular' ? 'opacity-100' : 'opacity-0'}`} />
                    Manutenção Clássica (Limpa)
                  </button>
                  <button
                    id="treatment-btn-shock"
                    onClick={() => setTreatmentType('shock')}
                    className={`py-3.5 px-3 rounded-2xl font-bold text-xs uppercase tracking-wider border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      treatmentType === 'shock'
                        ? 'border-rose-600 bg-rose-50/50 text-rose-800 font-bold backdrop-blur-md shadow-sm'
                        : 'border-slate-200 bg-white/45 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <Check className={`w-4 h-4 text-rose-600 ${treatmentType === 'shock' ? 'opacity-100' : 'opacity-0'}`} />
                    Tratamento Choque (Água Verde)
                  </button>
                </div>
              </div>

            </div>

            {/* Helper formulas metrics banner */}
            <div className="mt-6 pt-4 border-t border-slate-200 bg-slate-100/60 p-3 rounded-2xl text-[11px] text-slate-500 flex justify-between">
              <span>
                Fórmula:{' '}
                {shape === 'rectangular'
                  ? 'Comp × Larg × Prof'
                  : 'Diâm × Diâm × Prof × 0.785'}
              </span>
              <span className="font-bold">Mendes Tecnologia de Água</span>
            </div>
          </div>

          {/* Dynamic Chemical Dashboard Outputs (Right Side) */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-between backdrop-blur-md bg-[#000a8f]/80 text-white rounded-[32px] p-6 sm:p-8 shadow-2xl shadow-blue-950/20 border border-white/10 relative overflow-hidden">
            
            {/* Visual ripple effects in background */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-sky-400/20 rounded-full filter blur-xl"></div>
            
            <div className="relative z-10 space-y-6">
              {/* Header metrics */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-sky-200">
                  <Calculator className="w-5 h-5" />
                  <span className="font-bold text-xs uppercase tracking-widest">Resultado</span>
                </div>
                <span className="text-[10px] bg-white/20 border border-white/10 px-2 py-0.5 rounded-full font-bold">
                  Parâmetro: {treatmentType === 'regular' ? 'Prevenção' : 'Ação de Choque'}
                </span>
              </div>

              {/* Massive Liters Showcase */}
              <div className="text-center py-4 bg-white/5 rounded-3xl border border-white/10 relative">
                <span className="block text-xs text-sky-200 font-bold uppercase tracking-widest">
                  Volume Total Estimado
                </span>
                <span className="text-3xl sm:text-4xl font-black block mt-1" id="calculated-volume-output">
                  {volume.toLocaleString('pt-BR')}{' '}
                  <span className="text-lg font-light text-sky-200">Litros</span>
                </span>
                <span className="block text-[11px] text-slate-300 mt-1">
                  Equivale a apx. <strong>{(volume / 1000).toFixed(1)} m³</strong> de água
                </span>
              </div>

              {/* Chemical quantities dashboard details */}
              <div className="space-y-3 mt-4" id="chemical-calculations-overview">
                <span className="block text-xs font-extrabold text-sky-200 uppercase tracking-widest mb-2">
                  Dosagens Recomendadas:
                </span>

                {/* Chlorine item */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 w-9 h-9 rounded-xl bg-orange-500/20 text-orange-200 flex items-center justify-center">
                      <Droplet className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold font-sans">Cloro Estabilizado</span>
                      <span className="text-[10px] text-sky-200">Sanitização ativa</span>
                    </div>
                  </div>
                  <span className="font-black text-base" id="chem-chlorine">
                    {chemicalData.chlorine} g
                  </span>
                </div>

                {/* Algaecide item */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 w-9 h-9 rounded-xl bg-green-500/20 text-green-200 flex items-center justify-center">
                      <Droplet className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold font-sans">
                        {treatmentType === 'regular' ? 'Algicida de Manutenção' : 'Algicida de Choque'}
                      </span>
                      <span className="text-[10px] text-sky-200">Eliminação de algas</span>
                    </div>
                  </div>
                  <span className="font-black text-base" id="chem-algaecide">
                    {chemicalData.algaecide} mL
                  </span>
                </div>

                {/* Clarifier item */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 w-9 h-9 rounded-xl bg-sky-500/20 text-sky-200 flex items-center justify-center">
                      <Droplet className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold font-sans">Clarificante / Floculante</span>
                      <span className="text-[10px] text-sky-200">Agrupar impurezas</span>
                    </div>
                  </div>
                  <span className="font-black text-base" id="chem-clarifier">
                    {chemicalData.clarifier} mL
                  </span>
                </div>

                {/* Decantador / Sulfato recommendation when shock */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/15 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 w-9 h-9 rounded-xl bg-amber-500/20 text-amber-200 flex items-center justify-center">
                      <Droplet className="w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold font-sans">Ajustador Alcalinidade (pH)</span>
                      <span className="text-[10px] text-sky-200">Estabilização química</span>
                    </div>
                  </div>
                  <span className="font-black text-base" id="chem-adjuster">
                    {chemicalData.adjuster} g
                  </span>
                </div>
              </div>

              {/* Time required helper */}
              <div className="bg-sky-500/20 p-4 rounded-2xl border border-sky-400/20 text-xs flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-sky-300 mt-0.5 shrink-0" />
                <p className="text-sky-100 flex-1 whitespace-normal">
                  Após aplicar os reagentes, mantenha o motor filtrando por cerca de{' '}
                  <strong className="text-white text-sm">{chemicalData.filtrationHours} horas</strong>. Em casos de decantação, aguarde a poeira acumular totalmente no fundo antes de aspirar drenando.
                </p>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
              <span className="text-sky-200 font-medium">Bateu dúvida de como aplicar?</span>
              <a
                id="calc-whatsapp-contact"
                href={`https://wa.me/5516991939089?text=Olá Mendes! Calculei o volume de ${volume} Litros na sua calculadora e preciso de ajuda profissional com o tratamento.`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-[10px] tracking-wider rounded-lg transition-transform hover:scale-[1.02]"
              >
                Chamar para Limpar!
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
