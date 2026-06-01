import React, { useState, useEffect } from 'react';
import { Waves, Menu, X, User, Phone, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenClientPortal: () => void;
  isLoggedIn: boolean;
  currentUser: any;
  onLogout: () => void;
}

export default function Header({
  onNavigate,
  activeSection,
  onOpenClientPortal,
  isLoggedIn,
  currentUser,
  onLogout
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'services', label: 'Serviços' },
    { id: 'gallery', label: 'Antes & Depois' },
    { id: 'calculator', label: 'Calculadora de Piscina' },
    { id: 'testimonials', label: 'Depoimentos' },
    { id: 'booking', label: 'Agendar Orçamento' },
  ];

  const handleMenuClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/40 backdrop-blur-md shadow-lg shadow-blue-900/5 py-3 border-b border-blue-100/60'
          : 'bg-white/5 backdrop-blur-md border-b border-white/10 py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo"
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleMenuClick('home')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
              <Waves className="w-6 h-6 animate-pulse" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <span className={`font-black tracking-wider text-xl uppercase ${scrolled ? 'text-[#000a8f]' : 'text-white'}`}>
                Mendes
              </span>
              <span className="block text-xs font-bold tracking-widest text-sky-500 uppercase -mt-1">
                Piscinas
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.id}
                id={`nav-${item.id}`}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.id);
                }}
                className={`text-sm font-semibold relative py-1.5 transition-colors cursor-pointer ${
                  scrolled
                    ? activeSection === item.id
                      ? 'text-[#000a8f]'
                      : 'text-slate-600 hover:text-primary'
                    : activeSection === item.id
                      ? 'text-white font-bold'
                      : 'text-sky-100 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      scrolled ? 'bg-[#000a8f]' : 'bg-white'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Deskop CTA and Client Area */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              id="cta-whatsapp-header"
              href="https://wa.me/5516991939089"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              (16) 99193-9089
            </a>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  id="client-portal-btn-logged"
                  onClick={onOpenClientPortal}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full border border-sky-300/40 bg-white/20 hover:bg-white/40 transition-colors pointer-events-auto cursor-pointer text-[#000a8f] backdrop-blur-md shadow-sm"
                >
                  <User className="w-3.5 h-3.5" />
                  Olá, {currentUser?.name.split(' ')[0]}
                </button>
                <button
                  id="header-logout-btn"
                  onClick={onLogout}
                  title="Sair"
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50/50 backdrop-blur-sm rounded-full transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="client-portal-btn-login"
                onClick={onOpenClientPortal}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full border transition-all cursor-pointer backdrop-blur-md ${
                  scrolled
                    ? 'border-[#000a8f]/30 bg-[#000a8f]/10 text-[#000a8f] hover:bg-[#000a8f] hover:text-white'
                    : 'border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#000a8f]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Área do Cliente
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              id="cta-whatsapp-mobile"
              href="https://wa.me/5516991939089"
              target="_blank"
              referrerPolicy="no-referrer"
              className="p-2 text-white bg-emerald-600 rounded-full shadow-md"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              id="mobile-drawer-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                scrolled ? 'text-[#000a8f] hover:bg-sky-50' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Abrir Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-sky-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  id={`nav-mob-${item.id}`}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.id);
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-sky-50 text-[#000a8f]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#000a8f]'
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <button
                      id="mobile-logged-client"
                      onClick={() => {
                        onOpenClientPortal();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 justify-center w-full px-4 py-3 rounded-lg text-sm font-bold bg-[#000a8f] text-white shadow-md hover:bg-[#0029a3]"
                    >
                      <User className="w-4 h-4" />
                      Minha Conta ({currentUser?.name.split(' ')[0]})
                    </button>
                    <button
                      id="mobile-logout-btn"
                      onClick={() => {
                        onLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 justify-center w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair da Conta
                    </button>
                  </>
                ) : (
                  <button
                    id="mobile-portal-login"
                    onClick={() => {
                      onOpenClientPortal();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 justify-center w-full px-4 py-3 rounded-lg text-sm font-bold bg-[#000a8f] text-white shadow-md hover:bg-[#0029a3]"
                  >
                    <User className="w-4 h-4" />
                    Área do Cliente (Login)
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
