
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveActivity } from '../historyService';

const SURF_STEPS = [
  { title: "Identifica la Ola", description: "¿En qué parte de tu cuerpo vive este antojo ahora?", icon: "location_searching", instruction: "Cierra los ojos y localiza la sensación.", waveHeight: "h-20" },
  { title: "Observa el Pico", description: "El antojo está llegando a su máximo. No luches contra él.", icon: "trending_up", instruction: "Siente la intensidad sin actuar.", waveHeight: "h-64" },
  { title: "Respira y Surfea", description: "Imagina que estás sobre una tabla. Tu respiración es tu equilibrio.", icon: "air", instruction: "Haz 3 respiraciones profundas ahora.", waveHeight: "h-40" },
  { title: "La Ola se Retira", description: "Siente cómo la tensión disminuye. El antojo no es una orden.", icon: "water_lux", instruction: "Disfruta de la calma que regresa.", waveHeight: "h-12" }
];

const UrgeSurfingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const step = SURF_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < SURF_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const now = new Date();
      saveActivity({
        type: 'urge',
        title: 'Urge Surfing',
        value: 'Surfeado con éxito',
        icon: 'surfing',
        color: 'text-orange-400',
        date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
        details: { result: 'Ola de antojo gestionada sin actuar' }
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen text-white font-display overflow-hidden">
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity"><span className="material-symbols-outlined text-2xl">close</span></button>
        <div className="text-center"><h1 className="text-orange-400 text-[10px] font-black tracking-[0.4em] uppercase italic">Gestión de Impulsos</h1></div>
        <div className="w-10"></div>
      </header>

      <div className="flex justify-center gap-2 mt-4">
        {SURF_STEPS.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-orange-400' : 'w-2 bg-white/10'}`} />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center relative">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pointer-events-none opacity-20"><div className={`w-full ${step.waveHeight} bg-gradient-to-t from-orange-400 to-transparent transition-all duration-1000 ease-in-out blur-3xl`}></div></div>
        <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-12 duration-700 flex flex-col items-center z-10">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-orange-400/20 blur-[60px] rounded-full scale-150 animate-pulse"></div>
            <div className="w-24 h-24 rounded-[32px] bg-[#112117] border border-orange-400/30 flex items-center justify-center text-orange-400 relative z-10 shadow-2xl"><span className="material-symbols-outlined text-[48px] filled">{step.icon}</span></div>
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight mb-4 text-white">{step.title}</h2>
          <p className="text-[#a0afaa] text-lg font-medium leading-relaxed max-w-xs mb-10">{step.description}</p>
          <div className="bg-orange-400/10 border border-orange-400/20 rounded-2xl px-6 py-4 inline-flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span><span className="text-orange-400 text-[11px] font-black uppercase tracking-widest italic">{step.instruction}</span></div>
        </div>
      </main>

      <footer className="p-8 pb-12 flex flex-col items-center gap-6 z-20">
        <button onClick={handleNext} className="w-full h-16 rounded-[24px] bg-orange-400 text-[#0d1611] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(251,146,60,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"><span>{currentStep === SURF_STEPS.length - 1 ? 'He surfeado el antojo' : 'Siguiente'}</span><span className="material-symbols-outlined font-black">{currentStep === SURF_STEPS.length - 1 ? 'surfing' : 'arrow_forward'}</span></button>
      </footer>
    </div>
  );
};

export default UrgeSurfingPage;
