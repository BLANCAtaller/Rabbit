
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SCAN_STEPS = [
  {
    title: "La Raíz",
    focus: "Pies y Piernas",
    description: "Siente el peso de tus pies en el suelo. Imagina que echas raíces. Suelta cualquier tensión en tus pantorrillas y muslos.",
    icon: "vertical_align_bottom",
    instruction: "Siente la gravedad sosteniéndote."
  },
  {
    title: "El Centro de Control",
    focus: "Vientre y Órganos Digestivos",
    description: "Lleva tu atención al estómago. ¿Sientes nudos, vacío o calor? Respira expandiendo el abdomen para dar espacio a tus órganos.",
    icon: "settings_accessibility",
    instruction: "Relaja el plexo solar ahora."
  },
  {
    title: "El Templo del Aire",
    focus: "Pecho, Pulmones y Corazón",
    description: "Nota el latido de tu corazón. Siente cómo tus pulmones se expanden sin esfuerzo. Libera la presión que guardas en el esternón.",
    icon: "favorite",
    instruction: "Suelta la coraza del pecho."
  },
  {
    title: "El Puente",
    focus: "Hombros y Garganta",
    description: "Suelta la carga de tus hombros. Relaja la mandíbula y la garganta. Deja que las palabras y tensiones no expresadas se disuelvan.",
    icon: "voice_over_off",
    instruction: "Suelta el peso de tus hombros."
  },
  {
    title: "La Claridad",
    focus: "Cara, Ojos y Mente",
    description: "Suelta el entrecejo. Relaja los músculos alrededor de tus ojos. Siente cómo tu mente se vuelve un espacio amplio y tranquilo.",
    icon: "wb_sunny",
    instruction: "Borra la tensión de tu frente."
  }
];

const BodyScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const step = SCAN_STEPS[currentStep];

  // Efecto para la barra de carga al presionar "Liberar"
  useEffect(() => {
    let interval: any;
    if (isPressing && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => prev + 2);
      }, 30);
    } else if (progress >= 100) {
      handleStepComplete();
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPressing, progress]);

  const handleStepComplete = () => {
    setIsPressing(false);
    setProgress(0);
    if (currentStep < SCAN_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen text-white font-display overflow-hidden">
      {/* Background Scanning Light Effect */}
      <div 
        className="absolute left-0 right-0 h-1 bg-primary/40 blur-md transition-all duration-1000 ease-in-out z-0"
        style={{ top: `${(currentStep / SCAN_STEPS.length) * 100}%` }}
      ></div>

      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="text-center">
          <h1 className="text-primary text-[10px] font-black tracking-[0.4em] uppercase italic">Conexión Somática</h1>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Vertical Progress Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
        {SCAN_STEPS.map((_, i) => (
          <div 
            key={i} 
            className={`w-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'h-8 bg-primary shadow-[0_0_10px_rgba(25,230,107,0.6)]' : i < currentStep ? 'h-2 bg-primary/30' : 'h-2 bg-white/10'}`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-10 text-center relative z-10">
        <div key={currentStep} className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center">
          
          <div className="text-primary text-[11px] font-black uppercase tracking-[0.3em] mb-2">{step.focus}</div>
          <h2 className="text-4xl font-black italic uppercase tracking-tight mb-6 leading-none">{step.title}</h2>
          
          <div className="relative mb-10">
            <div className={`absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 transition-transform duration-1000 ${isPressing ? 'scale-[2.5] opacity-40' : 'animate-pulse'}`}></div>
            <div className="w-28 h-28 rounded-[40px] bg-[#112117] border border-primary/30 flex items-center justify-center text-primary relative z-10 shadow-2xl">
              <span className="material-symbols-outlined text-[56px] filled">{step.icon}</span>
            </div>
          </div>

          <p className="text-[#a0afaa] text-lg font-medium leading-relaxed max-w-xs mb-12">
            {step.description}
          </p>
        </div>
      </main>

      <footer className="p-10 pb-16 flex flex-col items-center gap-6 z-20">
        <div className="w-full flex flex-col items-center gap-4">
          <p className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.2em]">
            {isPressing ? 'Mantén presionado para liberar...' : 'Pulsa y mantén el botón'}
          </p>
          
          <div className="relative">
            {/* Ring progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="text-white/5"
              />
              <circle
                cx="50" cy="50" r="45"
                fill="none" stroke="currentColor" strokeWidth="3"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                className="text-primary transition-all duration-75"
              />
            </svg>

            <button 
              onMouseDown={() => setIsPressing(true)}
              onMouseUp={() => setIsPressing(false)}
              onTouchStart={() => setIsPressing(true)}
              onTouchEnd={() => setIsPressing(false)}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 ${isPressing ? 'bg-primary text-[#0d1611] shadow-[0_0_30px_rgba(25,230,107,0.4)]' : 'bg-[#1a2e23] text-primary border border-primary/20'}`}
            >
              <span className="material-symbols-outlined text-[40px] filled">
                {isPressing ? 'air' : 'fingerprint'}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-primary/5 px-4 py-2 rounded-2xl border border-primary/10">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
          <span className="text-primary text-[10px] font-black uppercase tracking-widest">{step.instruction}</span>
        </div>
      </footer>
    </div>
  );
};

export default BodyScanPage;
