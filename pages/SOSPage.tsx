
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOSPage: React.FC = () => {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [showExtraSupport, setShowExtraSupport] = useState(false);

  const handleEmergencyCall = () => {
    const phoneNumber = "5219831077621";
    const message = encodeURIComponent("S.O.S: Necesito asistencia psicológica urgente. Los pasos iniciales no me han ayudado a regularme.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="relative flex-1 flex flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors duration-500">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-black/5 dark:border-white/5 transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-black/60 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </div>
          <h2 className="text-red-500 dark:text-red-400 text-sm font-bold leading-tight tracking-wide uppercase transition-colors">Modo SOS Activo</h2>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex size-12 cursor-pointer items-center justify-center rounded-full text-black/60 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-black dark:text-white tracking-tight text-[32px] font-bold leading-tight text-left mb-2 transition-colors">
          Protocolo de <br/> <span className="text-primary">Emergencia</span>
        </h1>
        <p className="text-black/60 dark:text-gray-300 text-base font-normal leading-relaxed transition-colors">
          Hemos detectado signos de fatiga aguda. Sigue estos pasos prioritarios para estabilizar tu sistema nervioso.
        </p>
      </div>

      {/* Primary Action Card */}
      <div className="p-4">
        <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-surface-dark shadow-lg ring-1 ring-black/5 dark:ring-white/5 transition-colors">
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/90 px-2 py-1 text-xs font-bold text-background-dark backdrop-blur-md">
              <span className="material-symbols-outlined text-[16px] filled">medical_services</span>
              PRIORIDAD ALTA
            </span>
          </div>
          <div 
            className="w-full h-48 bg-center bg-cover bg-no-repeat relative"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDKgq7lULyh8rgjungV05cdQvtsWWH0HkOC6ZR7TVEAfVf-T_xgZK6-7Ub7G_PP6Ym9Xf0v4dlwRXTv3dX-dMLoRoEjs8P17Yo5mJAxgoD9ABwwbGmz7IaT4htDSp7cQrdstUvE2UFsObXFqJlfhXE18SQyUCVkQ8kLIiWPPYnwBOWM6J9B4oWRFevRTaAAUCcKckPpheMPPbPwdGNvgmHduYQ9ehXyt1mAp9Q9SOY-kWiPkoIBF5XEufChBJMaJ2ukhFAKQKBLnkw")' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
          <div className="flex flex-col gap-3 p-5">
            <div>
              <h3 className="text-black dark:text-white text-xl font-bold leading-tight transition-colors">Hidratación Salina</h3>
              <p className="text-[#a0afaa] text-sm mt-1 transition-colors">Restaura el equilibrio electrolítico inmediato.</p>
            </div>
            <div className="rounded-lg bg-black/5 dark:bg-background-dark/50 p-3 border border-black/5 dark:border-white/5 transition-colors">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
                <p className="text-black/80 dark:text-gray-200 text-sm leading-snug transition-colors">Disuelve <strong>1/2 cdta. de sal rosada</strong> en un vaso de agua tibia.</p>
              </div>
              <div className="flex gap-3 mt-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
                <p className="text-black/80 dark:text-gray-200 text-sm leading-snug transition-colors">Bebe lentamente durante 2 minutos.</p>
              </div>
            </div>
            <button 
              onClick={() => setDone(!done)}
              className={`mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl h-12 transition-all text-base font-bold shadow-lg ${done ? 'bg-black/10 text-[#a0afaa]' : 'bg-primary text-background-dark'}`}
            >
              <span className="material-symbols-outlined mr-2">{done ? 'check_circle' : 'circle'}</span>
              {done ? 'Hecho' : 'Marcar como hecho'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Checklist */}
      <div className="px-4 py-2 pb-12">
        <h2 className="text-black dark:text-white text-lg font-bold leading-tight px-1 pb-3 pt-2 flex items-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-primary">checklist</span>
          Lista de verificación rápida
        </h2>
        <div className="flex flex-col gap-3">
          <ChecklistItem icon="bolt" title="Magnesio" subtitle="¿Tomaste tu dosis hoy?" iconBg="bg-blue-500/10" iconColor="text-blue-500" />
          <ChecklistItem icon="air" title="Respiración 4-7-8" subtitle="Calma el sistema nervioso" iconBg="bg-purple-500/10" iconColor="text-purple-500" hasButton onButtonClick={() => navigate('/breathing')} />
          <ChecklistItem icon="restaurant" title="Proteína rápida" subtitle="Si sientes temblores" iconBg="bg-orange-500/10" iconColor="text-orange-500" />
          <ChecklistItem 
            icon="support_agent" 
            title="Ayuda Profesional" 
            subtitle="Psic. Giovanna Bardales" 
            iconBg="bg-red-500/10" 
            iconColor="text-red-500" 
            hasButton 
            buttonLabel="Contactar"
            onButtonClick={handleEmergencyCall} 
          />
        </div>
      </div>

      <div className="h-56"></div>

      {/* Sticky Bottom Feedback con Lógica Evolutiva */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent max-w-md mx-auto z-50 transition-colors">
        {!showExtraSupport ? (
          <div className="flex flex-col items-center gap-3 rounded-[28px] bg-white dark:bg-[#1a2e23]/90 p-5 backdrop-blur-xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 animate-in slide-in-from-bottom-5 duration-500 transition-colors">
            <p className="text-black dark:text-white text-sm font-bold tracking-tight transition-colors">¿Cómo te sientes después de estos pasos?</p>
            <div className="flex w-full gap-3">
              <button 
                onClick={() => setShowExtraSupport(true)}
                className="flex-1 h-12 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#a0afaa] hover:text-black dark:hover:text-white text-[15px] font-bold transition-all border border-black/5 dark:border-white/5 active:scale-95"
              >
                Igual
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-background-dark text-[15px] font-black transition-all shadow-lg active:scale-95"
              >
                Mejor
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 rounded-[32px] bg-red-50 dark:bg-[#221212]/95 p-6 backdrop-blur-2xl shadow-xl border border-red-500/20 animate-in zoom-in-95 duration-500 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0 transition-colors">
                <span className="material-symbols-outlined filled">info</span>
              </div>
              <div className="space-y-1">
                <p className="text-black dark:text-white text-base font-bold leading-tight transition-colors">Es normal. La regulación toma tiempo.</p>
                <p className="text-red-500/60 dark:text-red-300/60 text-xs font-medium transition-colors">¿Deseas probar una herramienta más profunda o hablar con un profesional?</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 pt-1">
              <button 
                onClick={() => navigate('/stop-technique')}
                className="w-full h-12 rounded-2xl bg-red-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">pan_tool</span>
                Iniciar Técnica STOP
              </button>
              <button 
                onClick={handleEmergencyCall}
                className="w-full h-12 rounded-2xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Hablar con Giovanna
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="w-full py-2 text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.2em] mt-1"
              >
                Cerrar Protocolo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ChecklistItemProps {
  icon: string;
  title: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
  hasButton?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ icon, title, subtitle, iconBg, iconColor, hasButton, buttonLabel = "Iniciar", onButtonClick }) => {
  return (
    <div className="group flex items-center justify-between rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition-all hover:bg-black/5 dark:hover:bg-white/5">
      <div className="flex items-center gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg} ${iconColor} transition-colors`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-black dark:text-white font-semibold text-base transition-colors">{title}</span>
          <span className="text-[#a0afaa] text-xs transition-colors">{subtitle}</span>
        </div>
      </div>
      {hasButton ? (
        <button 
          onClick={onButtonClick}
          className="flex h-9 min-w-[80px] items-center justify-center rounded-lg bg-black/5 dark:bg-white/10 px-3 text-sm font-medium text-black/60 dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all border border-black/5 dark:border-white/5"
        >
          {buttonLabel}
        </button>
      ) : (
        <label className="relative inline-flex cursor-pointer items-center">
          <input className="peer sr-only" type="checkbox"/>
          <div className="peer h-6 w-11 rounded-full bg-gray-200 dark:bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white transition-colors"></div>
        </label>
      )}
    </div>
  );
};

export default SOSPage;
