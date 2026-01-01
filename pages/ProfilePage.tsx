
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { exportHistory, importHistory } from '../historyService';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  photo: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Ana García',
  email: 'ana.garcia@email.com',
  bio: 'Enfocada en mi bienestar somático y mental.',
  photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLU9A1AwQYEZocBCUIR-G9TrCBE16RSJsFNoKY2Tcz78YpA2pUJgUZnXKieJO28pl8CDtZCFmi47gRQqAeM5a0yCJ3mUtM4yCvtidO7Zpnp8q4fWFMKuqAKj4pr5ViCCkaTwb8oV7VPl_EsNHopKtW9-RY8nF4GCYB67ywppXGhnLakm_rcC4GovdVFwJEwezrZNytOPm8OgRIDlM1fxV-rKd1lEN69R2Fwwq0CHvOH3FDslh_eg7uwIO-i6kFWgVdQSD2CJThOI'
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language, setLanguage, t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const saved = localStorage.getItem('chase_the_rabbit_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing profile", e);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLanguageChange = (lang: 'ESPAÑOL' | 'ENGLISH') => {
    setLanguage(lang);
    setTimeout(() => setShowLanguageSelector(false), 300);
  };

  const handleExport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    exportHistory();
  };

  const handleImportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importHistory(content);
        if (success) {
          alert("¡Historial importado con éxito! Los datos han sido fusionados.");
          window.location.reload();
        } else {
          alert("Error al importar el archivo. El formato no es válido o está corrupto.");
        }
      };
      reader.readAsText(file);
    }
    e.target.value = ''; // Reset
  };

  const confirmDeleteAccount = () => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    // Pequeño delay para asegurar que el DOM responda
    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-background-light dark:bg-[#0d1611] pb-32 overflow-y-auto no-scrollbar transition-colors duration-500">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileImport} 
        accept=".json" 
        className="hidden" 
      />

      {/* Header Bar */}
      <header className="sticky top-0 z-20 bg-background-light/95 dark:bg-[#0d1611]/95 backdrop-blur-md flex items-center justify-between p-4 px-6 border-b border-black/5 dark:border-white/5 transition-colors">
        <button 
          onClick={() => navigate(-1)} 
          className="text-black/60 dark:text-white hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full active:bg-black/5 dark:active:bg-white/5"
          aria-label="Volver"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-base font-bold text-black dark:text-white tracking-tight">{t('prof.title')}</h1>
        <div className="w-10"></div>
      </header>

      {/* Profile Header Section */}
      <section className="flex flex-col items-center pt-8 pb-10 px-6 text-center">
        <div className="relative mb-5 group">
          <div 
            className="w-[110px] h-[110px] rounded-[38px] bg-cover bg-center border-[3px] border-black/5 dark:border-[#1a2e23] shadow-2xl overflow-hidden ring-4 ring-black/5 dark:ring-[#112117]/50 transition-colors"
            style={{ backgroundImage: `url('${profile.photo}')` }}
          ></div>
          <button 
            onClick={() => navigate('/edit-profile')}
            className="absolute bottom-0 right-0 bg-primary text-background-dark w-9 h-9 rounded-[14px] shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-[3px] border-white dark:border-[#0d1611]"
            aria-label="Editar foto"
          >
            <span className="material-symbols-outlined text-[18px] filled">edit</span>
          </button>
        </div>
        
        <h2 className="text-[24px] font-black text-black dark:text-white mb-1 italic tracking-tight transition-colors">{profile.name}</h2>
        <p className="text-[#5c6e64] text-[13px] font-bold mb-5">{profile.email}</p>
        
        <div className="bg-black/5 dark:bg-[#1a2e23] px-5 py-2 rounded-2xl border border-black/5 dark:border-primary/10 mb-2 transition-colors">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{t('prof.member_since')}</p>
        </div>
      </section>

      {/* Settings Sections */}
      <div className="px-6 space-y-8">
        <section>
          <h3 className="text-[#5c6e64] text-[11px] font-extrabold uppercase tracking-widest mb-3 pl-1 opacity-60 italic">{t('prof.my_account')}</h3>
          <div className="bg-white dark:bg-[#112117] rounded-[32px] overflow-hidden border border-black/5 dark:border-white/[0.03] divide-y divide-black/5 dark:divide-white/[0.03] shadow-sm dark:shadow-xl transition-all">
            <SettingsItem icon="edit" label={t('prof.edit')} onClick={() => navigate('/edit-profile')} />
            <SettingsItem icon="lock" label={t('prof.password')} onClick={() => {}} />
          </div>
        </section>

        <section>
          <h3 className="text-[#5c6e64] text-[11px] font-extrabold uppercase tracking-widest mb-3 pl-1 opacity-60 italic">{t('prof.settings')}</h3>
          <div className="bg-white dark:bg-[#112117] rounded-[32px] overflow-hidden border border-black/5 dark:border-white/[0.03] divide-y divide-black/5 dark:divide-white/[0.03] shadow-sm dark:shadow-xl transition-all">
            <SettingsItem 
              icon="language" 
              label={t('prof.language')} 
              value={language} 
              onClick={() => setShowLanguageSelector(true)} 
            />
            
            <button 
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between p-4 px-6 hover:bg-black/[0.04] dark:hover:bg-white/[0.01] transition-colors cursor-pointer group text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-[14px] bg-black/5 dark:bg-[#1a2e23] flex items-center justify-center text-primary border border-black/5 dark:border-white/5 shadow-inner transition-colors">
                  <span className="material-symbols-outlined text-[20px] filled">
                    {isDark ? 'dark_mode' : 'light_mode'}
                  </span>
                </div>
                <span className="text-[15px] font-bold text-black dark:text-white transition-colors">{t('prof.dark_mode')}</span>
              </div>
              <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-black/10'}`}>
                <span 
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 shadow-sm ${isDark ? 'translate-x-6' : 'translate-x-1'}`} 
                />
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[#5c6e64] text-[11px] font-extrabold uppercase tracking-widest mb-3 pl-1 opacity-60 italic">{t('prof.data')}</h3>
          <div className="bg-white dark:bg-[#112117] rounded-[32px] overflow-hidden border border-black/5 dark:border-white/[0.03] divide-y divide-black/5 dark:divide-white/[0.03] shadow-sm dark:shadow-xl transition-all">
            <SettingsItem 
              icon="download" 
              label={t('prof.export')} 
              onClick={handleExport} 
            />
            <SettingsItem 
              icon="upload" 
              label="Importar Historial" 
              onClick={handleImportClick} 
            />
            <SettingsItem 
              icon="delete" 
              label={t('prof.delete')} 
              labelColor="text-red-400" 
              iconBg="bg-red-500/10" 
              iconColor="text-red-400" 
              onClick={(e) => { e.preventDefault(); setShowDeleteConfirm(true); }} 
            />
          </div>
        </section>

        <div className="pt-4 flex flex-col items-center gap-4 pb-12">
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-white dark:bg-[#1a2e23] text-black dark:text-white font-black py-4 rounded-[22px] border border-black/5 dark:border-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all active:scale-[0.98] shadow-lg"
          >
            {t('prof.logout')}
          </button>
          <p className="text-[10px] text-[#5c6e64] font-black uppercase tracking-widest opacity-40">Versión 2.0.3 • Chase the Rabbit</p>
        </div>
      </div>

      {/* Language Selector Overlay */}
      {showLanguageSelector && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLanguageSelector(false)}></div>
          <div className="relative w-full max-w-md bg-white dark:bg-[#112117] rounded-[44px] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-12 duration-500">
            <div className="p-8 pb-4 flex justify-between items-center">
              <h2 className="text-black dark:text-white text-xl font-black italic uppercase tracking-tight transition-colors">{t('prof.select_lang')}</h2>
              <button onClick={() => setShowLanguageSelector(false)} className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/40 dark:text-white/40 active:scale-90 transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="px-8 pb-10 pt-4 space-y-3">
              <LanguageOption label="Español" sub="ESPAÑOL" active={language === 'ESPAÑOL'} onClick={() => handleLanguageChange('ESPAÑOL')} />
              <LanguageOption label="Inglés" sub="ENGLISH" active={language === 'ENGLISH'} onClick={() => handleLanguageChange('ENGLISH')} />
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1a2e23] rounded-[40px] p-8 border border-red-500/20 shadow-[0_0_80px_rgba(239,68,68,0.2)] flex flex-col items-center text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
               <span className="material-symbols-outlined text-[42px] filled">warning</span>
            </div>
            <h2 className="text-black dark:text-white text-2xl font-black italic uppercase tracking-tight mb-3">¿Estás seguro?</h2>
            <p className="text-[#5c6e64] text-sm leading-relaxed mb-8">Esta acción borrará todo tu historial, perfil y progreso de forma permanente. <strong>No hay vuelta atrás.</strong></p>
            
            <div className="w-full space-y-3">
              <button 
                onClick={confirmDeleteAccount}
                className="w-full h-14 bg-red-500 text-white font-black uppercase italic tracking-tight rounded-2xl shadow-lg shadow-red-500/20 active:scale-95 transition-all"
              >
                Eliminar para siempre
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full h-14 bg-black/5 dark:bg-white/5 text-black dark:text-white font-bold rounded-2xl active:scale-95 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface LanguageOptionProps {
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({ label, sub, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-5 rounded-[28px] border-2 transition-all duration-300 ${
      active 
        ? 'bg-primary/10 dark:bg-[#1a2e23] border-primary shadow-[0_0_25px_rgba(25,230,107,0.2)] scale-[1.02]' 
        : 'bg-black/5 dark:bg-[#0d1611] border-transparent opacity-60 grayscale'
    }`}
  >
    <div className="flex flex-col items-start leading-tight text-left">
      <span className="text-black dark:text-white font-black text-lg italic tracking-tight transition-colors">{label}</span>
      <span className={`text-[10px] font-black uppercase tracking-[0.25em] mt-1 ${active ? 'text-primary' : 'text-[#5c6e64]'} transition-colors`}>{sub}</span>
    </div>
    {active && (
      <div className="w-8 h-8 rounded-full bg-primary text-white dark:text-[#0d1611] flex items-center justify-center shadow-lg transition-colors">
        <span className="material-symbols-outlined text-[20px] font-black">check</span>
      </div>
    )}
  </button>
);

interface SettingsItemProps {
  icon: string;
  label: string;
  value?: string;
  hasExternal?: boolean;
  labelColor?: string;
  iconBg?: string;
  iconColor?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  icon, label, value, hasExternal, onClick,
  labelColor, 
  iconBg = "bg-black/5 dark:bg-[#1a2e23]", 
  iconColor = "text-primary" 
}) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 px-6 hover:bg-black/[0.04] dark:hover:bg-white/[0.02] transition-all group text-left cursor-pointer active:bg-black/[0.08] dark:active:bg-white/[0.04] outline-none"
  >
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-[16px] ${iconBg} flex items-center justify-center ${iconColor} border border-black/5 dark:border-white/5 group-hover:scale-105 transition-all shadow-inner`}>
        <span className="material-symbols-outlined text-[22px] filled">{icon}</span>
      </div>
      <div className="flex flex-col items-start leading-tight">
        <span className={`text-[15px] font-bold tracking-tight transition-colors ${labelColor || 'text-black dark:text-white'}`}>{label}</span>
        {value && <span className="text-[10px] font-black text-[#5c6e64] mt-1.5 uppercase tracking-[0.2em]">{value}</span>}
      </div>
    </div>
    <span className="material-symbols-outlined text-[#3c4a41] text-[20px] group-hover:text-black dark:group-hover:text-white/40 transition-colors">{hasExternal ? 'open_in_new' : 'chevron_right'}</span>
  </button>
);

export default ProfilePage;
