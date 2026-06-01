import React, { useState, useRef } from 'react';
import { Image, Sparkles, Filter, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<string>('item-1');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0-100)
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'green', label: 'Água Verde Recup' },
    { id: 'fiber', label: 'Piscina de Fibra' },
    { id: 'masonry', label: 'Piscina de Azulejo' },
    { id: 'post-party', label: 'Pós-Festa / Eventos' },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'item-1',
      category: 'green',
      title: 'Tratamento Choque Água Parada',
      description: 'Condomínio Quinta dos Ventos — Esta piscina estava interditada há 4 semanas devido a algas flutuantes e alta turbidez. Recuperamos sem esvaziar nenhum litro!',
      beforeUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800', // green, swampy
      afterUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800', // crystal pool
      date: 'Maio, 2026'
    },
    {
      id: 'item-2',
      category: 'fiber',
      title: 'Manutenção Mensal em Fibra',
      description: 'Residencial San Marco — Limpeza regular preventiva executada semanalmente, preservando o brilho da resina protetora da fibra e os parâmetros químicos perfeitos.',
      beforeUrl: 'https://images.unsplash.com/photo-1572331165267-85462a458a45?auto=format&fit=crop&q=80&w=800', // dusty pool
      afterUrl: 'https://images.unsplash.com/photo-1560156523-a54b38d61391?auto=format&fit=crop&q=80&w=800', // pristine pool
      date: 'Abril, 2026'
    },
    {
      id: 'item-3',
      category: 'masonry',
      title: 'Recuperação de Piscina de Alvenaria',
      description: 'Chácara Bonfim Paulista — Esfregamento cuidadoso de rejuntes escuros contaminados por fungos e ajuste de decantação pesada de poeira pós-vendaval.',
      beforeUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800', // dirty water pool
      afterUrl: 'https://images.unsplash.com/photo-1575424909138-46b05e5919ec?auto=format&fit=crop&q=80&w=800', // glowing water pool
      date: 'Março, 2026'
    },
    {
      id: 'item-4',
      category: 'post-party',
      title: 'Limpeza Emergencial Pós-Temporada',
      description: 'Jardim Botânico — Limpeza expressa pós-feriado prolongado familiar. Retirada de folhas em excesso, protetores solares suspensos e sanitização microbiana de choque.',
      beforeUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800', // messy beachy/dirty
      afterUrl: 'https://images.unsplash.com/photo-1500333931390-1fc6f0be31b6?auto=format&fit=crop&q=80&w=800', // clear glowing pool water
      date: 'Fevereiro, 2026'
    }
  ];

  const filteredItems = galleryItems.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  const activeItemDetails = galleryItems.find(item => item.id === selectedItem) || galleryItems[0];

  // Drag interaction physics logic for custom slide-reveal
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left-click is held down
      handleMove(e.clientX);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50/30 border-b border-blue-100/50 backdrop-blur-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#000a8f] bg-sky-100 px-3 py-1.5 rounded-full inline-block mb-3">
            Portfólio & Resultados
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Nossa Galeria Antes & Depois
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Veja a transformação de piscinas reais cuidadas por nossa equipe. Deslize a barra para comparar o estado original com o resultado final cristalino!
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" id="gallery-category-header">
          <Filter className="w-4 h-4 text-slate-500 mr-2 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`gallery-filter-btn-${cat.id}`}
              onClick={() => {
                setActiveCategory(cat.id);
                // Auto switch selected item if its category is filtered out
                const correctItems = galleryItems.filter(i => cat.id === 'all' || i.category === cat.id);
                if (correctItems.length > 0 && !correctItems.find(i => i.id === selectedItem)) {
                  setSelectedItem(correctItems[0].id);
                }
              }}
              className={`py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#000a8f] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Compare Slider and project selection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COMPARATIVE SLIDER COMPONENT (7 Columns) */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onClick={handleContainerClick}
              id="gallery-compare-slider"
              className="relative h-96 sm:h-[450px] w-full rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/5 border border-blue-100 cursor-ew-resize select-none bg-blue-50/50"
            >
              {/* After Image (Full background) - Standard Pool Representation */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-sky-200 flex items-center justify-center">
                  {/* Styled clean pool substitute representation */}
                  <span className="text-xs text-sky-800 uppercase font-bold">Carregando Depois...</span>
                </div>
                {/* Fallback pattern simulation that represents absolute cleanliness vs algae */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-300" 
                  style={{ 
                    backgroundImage: `url(${activeItemDetails.afterUrl})` 
                  }}
                />
                
                {/* Clean label indicator on after */}
                <div className="absolute bottom-4 right-4 z-20 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" /> DEPOIS (Mendes)
                </div>
              </div>

              {/* Before Image (Clipping Masked layout on top) - Dirty greenish overlay */}
              <div
                className="absolute inset-y-0 left-0 z-10 w-full overflow-hidden transition-all duration-75 pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 w-[400px] sm:w-[600px] lg:w-[800px] h-full">
                  <div className="absolute inset-0 bg-[#344122] flex items-center justify-center">
                    <span className="text-xs text-[#a0ba6c] font-bold">Carregando Antes...</span>
                  </div>
                  {/* Actual Before simulated image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${activeItemDetails.beforeUrl})`,
                      // green tint filter to ensure dirty/muddy feeling perfectly matches
                      filter: 'sepia(40%) saturate(140%) hue-rotate(60deg) brightness(85%) contrast(105%)'
                    }}
                  />
                </div>

                {/* Dirty label indicator on before */}
                <div className="absolute bottom-4 left-4 z-20 bg-amber-800/95 backdrop-blur-md text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md">
                  ANTES (Estado Crítico)
                </div>
              </div>

              {/* Sliding Handle bar */}
              <div
                className="absolute inset-y-0 z-30 w-1 bg-white cursor-ew-resize pointer-events-none shadow-2xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-2xl border border-slate-300">
                  <div className="flex gap-0.5 items-center justify-center">
                    <ChevronLeft className="w-3 h-3 text-primary shrink-0" />
                    <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                  </div>
                </div>
              </div>

              {/* Slide instruction bubble */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-white/10 shadow-lg">
                <HelpCircle className="w-3.5 h-3.5 text-sky-300" /> Arraste para comparar
              </div>

            </div>

            {/* Quick explanation tag */}
            <p className="text-center text-xs text-slate-500 italic">
              *Arraste e solte o círculo branco para os lados para ver a diferença em mínimos detalhes.
            </p>
          </div>

          {/* PROJECT DESCRIPTION AND DETAILS SELECTOR (5 Columns) */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            
            {/* Project List Selector */}
            <div className="backdrop-blur-md bg-white/40 border border-blue-100 shadow-xl shadow-blue-900/5 rounded-[32px] p-6 space-y-3" id="gallery-project-cards">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">
                Selecione Outro Caso de Sucesso:
              </span>

              <div className="space-y-2.5">
                {filteredItems.map((item) => {
                  const isActive = selectedItem === item.id;
                  return (
                    <div
                      key={item.id}
                      id={`project-thumb-${item.id}`}
                      onClick={() => {
                        setSelectedItem(item.id);
                        setSliderPosition(50); // reset position slider
                      }}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#000a8f] bg-white/60 shadow-md shadow-blue-900/5'
                          : 'border-slate-200/50 hover:border-slate-300/60 hover:bg-white/20'
                      }`}
                    >
                      {/* Image Thumbnail wrapper */}
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100 relative">
                        <div 
                          className="absolute inset-0 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${item.afterUrl})` }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                          {item.title}
                        </h4>
                        <span className="block text-[10px] text-slate-500 mt-0.5 font-semibold uppercase">
                          {item.date} — {item.category === 'green' ? 'Água Verde' : item.category === 'fiber' ? 'Fibra' : item.category === 'masonry' ? 'Azulejo' : 'Pós-Festa'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Case details card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="backdrop-blur-md bg-white/40 border border-blue-100 rounded-[32px] p-6 shadow-xl shadow-blue-900/5 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                    {activeItemDetails.title}
                  </h3>
                  <span className="text-[10px] font-bold bg-sky-100 text-[#000a8f] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {activeItemDetails.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {activeItemDetails.description}
                </p>

                {/* Guarantee label footer */}
                <div className="flex items-center gap-3 bg-[#000a8f]/5 rounded-2xl p-4 border border-[#000a8f]/10">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-xs text-primary">Garantia Mendes</span>
                    <span className="block text-[10px] text-slate-500">Agilidade, decantação ideal sem cloro excessivo.</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
