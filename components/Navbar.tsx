
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 dark:bg-[#0d1611]/95 backdrop-blur-3xl border-t border-black/5 dark:border-white/5 px-2 pt-3 pb-8 z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.7)] transition-all duration-500">
      <div className="flex justify-around items-center max-w-sm mx-auto h-16">
        
        {/* Inicio */}
        <button 
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full ${isActive('/dashboard') ? 'text-primary' : 'text-[#3c4a41] dark:text-[#5c6e64]'}`}
        >
          <div className={`w-14 h-11 flex items-center justify-center rounded-[18px] transition-all duration-300 ${isActive('/dashboard') ? 'bg-primary/10 dark:bg-[#1a2e23] shadow-inner' : ''}`}>
            <span className={`material-symbols-outlined text-[28px] ${isActive('/dashboard') ? 'filled' : ''}`}>home</span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.15em]">{t('nav.home')}</span>
        </button>
        
        {/* Herramientas */}
        <button 
          onClick={() => navigate('/tools')}
          className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full ${isActive('/tools') ? 'text-primary' : 'text-[#3c4a41] dark:text-[#5c6e64]'}`}
        >
          <div className={`w-14 h-11 flex items-center justify-center rounded-[18px] transition-all duration-300 ${isActive('/tools') ? 'bg-primary/10 dark:bg-[#1a2e23] shadow-inner' : ''}`}>
            <span className={`material-symbols-outlined text-[28px] ${isActive('/tools') ? 'filled' : ''}`}>grid_view</span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.15em]">{t('nav.tools')}</span>
        </button>

        {/* Central Plus Button */}
        <div className="flex-1 flex justify-center -mt-14">
          <div className="relative p-1.5 bg-background-light dark:bg-[#0d1611] rounded-full transition-colors">
            <button 
              onClick={() => navigate('/check-in')}
              className="w-16 h-16 bg-primary text-white dark:text-[#0d1611] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(25,230,107,0.4)] dark:shadow-[0_0_25px_rgba(25,230,107,0.6)] hover:scale-110 active:scale-95 transition-all relative z-10"
            >
              <span className="material-symbols-outlined text-[40px] font-black">add</span>
            </button>
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10 animate-pulse"></div>
          </div>
        </div>

        {/* Progreso */}
        <button 
          onClick={() => navigate('/progress')}
          className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full ${isActive('/progress') ? 'text-primary' : 'text-[#3c4a41] dark:text-[#5c6e64]'}`}
        >
          <div className={`w-14 h-11 flex items-center justify-center rounded-[18px] transition-all duration-300 ${isActive('/progress') ? 'bg-primary/10 dark:bg-[#1a2e23] shadow-inner' : ''}`}>
            <span className={`material-symbols-outlined text-[28px] ${isActive('/progress') ? 'filled' : ''}`}>bar_chart</span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.15em]">{t('nav.progress')}</span>
        </button>

        {/* Perfil */}
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-all flex-1 h-full ${isActive('/profile') ? 'text-primary' : 'text-[#3c4a41] dark:text-[#5c6e64]'}`}
        >
          <div className={`w-14 h-11 flex items-center justify-center rounded-[18px] transition-all duration-300 ${isActive('/profile') ? 'bg-primary/10 dark:bg-[#1a2e23] shadow-inner' : ''}`}>
            <span className={`material-symbols-outlined text-[28px] ${isActive('/profile') ? 'filled' : ''}`}>person</span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.15em]">{t('nav.profile')}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
