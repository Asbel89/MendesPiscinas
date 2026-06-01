import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import PoolCalculator from './components/PoolCalculator';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import ClientPortal from './components/ClientPortal';
import WhatsappWidget from './components/WhatsappWidget';
import { ClientUser } from './types';
import { Waves, MapPin, Mail, Phone, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState('Limpeza Periódica (Mensalista)');
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  
  // Client Authentication simulated states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<ClientUser | null>(null);

  // Intersection Observer to track active section scrolling
  useEffect(() => {
    const sections = ['home', 'services', 'gallery', 'calculator', 'testimonials', 'booking'];
    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.25, rootMargin: '-80px 0px -20% 0px' }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.element);
        }
      });
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  const handleSelectServiceAndScroll = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    handleScrollToSection('booking');
  };

  const handleLoginSuccess = (user: ClientUser) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    // don't auto close so they see the dashboard logged-in state of gorgeous pixels
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setIsClientPortalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-[#000a8f] flex flex-col justify-between relative overflow-hidden" id="mendes-full-app-root">
      
      {/* Dynamic Floating Glassmorphic Background Orbs */}
      <div className="fixed top-20 -right-20 w-[500px] h-[500px] bg-[#0029a3]/10 rounded-full blur-[125px] pointer-events-none z-0 animate-pulse"></div>
      <div className="fixed top-[40%] -left-48 w-[600px] h-[600px] bg-[#000a8f]/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[20%] -right-40 w-[700px] h-[700px] bg-sky-400/[0.08] rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[5%] -left-20 w-[450px] h-[450px] bg-[#0029a3]/8 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* 1. BRAND HEADER */}
      <Header
        onNavigate={handleScrollToSection}
        activeSection={activeSection}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. DYNAMIC CONTENT MAIN FRAMEWORK */}
      <main className="flex-1">
        
        {/* SECTION: HOME */}
        <Hero
          onScrollToSection={handleScrollToSection}
          onOpenBooking={() => handleScrollToSection('booking')}
        />

        {/* SECTION: SERVICES */}
        <Services onSelectServiceAndBook={handleSelectServiceAndScroll} />

        {/* SECTION: GALLERY BEFORE/AFTER */}
        <Gallery />

        {/* SECTION: INTERACTIVE WATER CALCULATOR */}
        <PoolCalculator />

        {/* SECTION: TESTIMONIALS */}
        <Testimonials />

        {/* SECTION: SCHEDULING ORÇAMENTO */}
        <BookingForm initialServiceSelected={selectedService} />

      </main>

      {/* 4. PROFESSIONAL CLEAN CORPORATE FOOTER */}
      <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800" id="mendes-footer flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5" id="footer-data-matrix">
            
            {/* Column 1: Mendes Branding info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Waves className="w-8 h-8 text-sky-400" />
                <div>
                  <span className="font-extrabold text-lg uppercase tracking-wider block text-white leading-none">Mendes</span>
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">Piscinas</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Tratamento profissional preventivo de piscinas na região de Ribeirão Preto. Confiança, segurança biológica e águas transparentes garantidas para sua diversão.
              </p>
              
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 p-3 rounded-2xl max-w-xs" id="footer-stamp">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tratadore Certificado de Águas</span>
              </div>
            </div>

            {/* Column 2: Direct Navigation shortcuts */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-widest text-sky-400">Atalhos rápidos</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                {['home', 'services', 'gallery', 'calculator', 'testimonials', 'booking'].map((linkId) => {
                  const labels: Record<string, string> = {
                    home: 'Página Inicial',
                    services: 'Nossos Serviços',
                    gallery: 'Casos Antes & Depois',
                    calculator: 'Calculadora de Química',
                    testimonials: 'Opiniões de Clientes',
                    booking: 'Fazer Agendamento'
                  };
                  return (
                    <li key={linkId}>
                      <a
                        id={`footer-lbl-${linkId}`}
                        href={`#${linkId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleScrollToSection(linkId);
                        }}
                        className="hover:text-white transition-colors cursor-pointer text-left block"
                      >
                        {labels[linkId]}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Coverage Regions and parameters */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-xs uppercase tracking-widest text-sky-400">Região de Atendimento</h4>
              <p className="text-slate-400 leading-relaxed">
                Atendemos residências, condomínios fechados, chácaras de veraneio e clubes rústicos em:
              </p>
              <ul className="space-y-1 text-slate-300 font-semibold grid grid-cols-2 gap-1" id="footer-cities">
                <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-sky-400" /> Ribeirão Preto</li>
                <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-sky-400" /> Cravinhos</li>
                <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-sky-400" /> Bonfim Paulista</li>
                <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-sky-400" /> Jurucê</li>
                <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-sky-400" /> Jardinópolis</li>
                <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-sky-400" /> Brodowski</li>
              </ul>
            </div>

            {/* Column 4: Concrete contact numbers */}
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-xs uppercase tracking-widest text-sky-400">Fale com Mendes</h4>
              <div className="space-y-3" id="footer-contact-matrix">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <span className="text-slate-400 leading-normal">Atendimento central: Ribeirão Preto — SP</span>
                </div>
                <a href="https://wa.me/5516991939089" target="_blank" referrerPolicy="no-referrer" className="flex items-center gap-2.5 hover:text-sky-300">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-slate-300 font-bold">(16) 99193-9089</span>
                </a>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <a href="mailto:mendespiscinasrp@gmail.com" className="text-slate-300 hover:text-sky-300 transition-all font-semibold">mendespiscinasrp@gmail.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* Social legal copy notes */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>
              Mendes Piscinas & Tratamentos Químicos Certificados.
            </p>
            <div className="flex items-center gap-1 text-slate-400">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Cuidado profissional evita infecções, micose e ardor ocular nas crianças.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 5. INTERACTIVE CLIENT PORTAL MODAL */}
      <AnimatePresence>
        {isClientPortalOpen && (
          <ClientPortal
            isOpen={isClientPortalOpen}
            onClose={() => setIsClientPortalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>

      {/* 6. WHATSAPP FLOATING WIDGET SMART COMPONENT */}
      <WhatsappWidget />

    </div>
  );
}
