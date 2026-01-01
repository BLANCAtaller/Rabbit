
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const STRETCH_STEPS = [
  {
    title: "Liberación de Cuello",
    focus: "Trapecio y Cervicales",
    description: "Deja caer tu oreja derecha hacia tu hombro derecho. Siente el peso de tu cabeza estirando el lateral izquierdo. No empujes, solo deja que la gravedad actúe.",
    icon: "architecture",
    instruction: "Respira hacia el costado de tu cuello.",
    duration: 30
  },
  {
    title: "Apertura de Pecho",
    focus: "Pectorales y Pulmones",
    description: "Entrelaza tus manos detrás de tu espalda. Estira los brazos y abre el pecho hacia el cielo. Esto contrarresta la postura de cierre por ansiedad.",
    icon: "expand",
    instruction: "Inhala expandiendo el esternón.",
    duration: 30
  },
  {
    title: "Torsión de Columna",
    focus: "Órganos Internos",
    description: "Sentado, gira suavemente tu torso hacia la derecha usando la silla como apoyo. Mira por encima de tu hombro. Esto 'exprime' el estrés de tus órganos.",
    icon: "sync",
    instruction: "Exhala al girar un poco más.",
    duration: 30
  },
  {
    title: "El Abrazo",
    focus: "Espalda Alta y Fascia",
    description: "Cruza tus brazos frente a ti y trata de tocar tus omóplatos. Inclina la barbilla al pecho y redondea la espalda. Siente cómo se separan tus vértebras.",
    icon: "front_hand",
    instruction: "Siente el espacio entre tus hombros.",
    duration: 30
  },
  {
    title: "Alcanza el Cielo",
    focus: "Sistema Nervioso Total",
    description: "Estira ambos brazos hacia arriba lo más que puedas. Imagina que creces desde las costillas. Estira un brazo y luego el otro.",
    icon: "vertical_align_top",
    instruction: "Libera todo el aire al bajar los brazos.",
    duration: 30
  }
];

const GentleStretchesPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const step = STRETCH_STEPS[currentStep];
  
  const requestRef = useRef<number>(null);
  const previousTimeRef = useRef<number>(null);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - (previousTimeRef.current || time);
      
      setElapsedMs((prev) => {
        const nextValue = prev + deltaTime;
        const totalDurationMs = step.duration * 1000;
        
        if (nextValue >= totalDurationMs) {
          setIsPaused(true);
          return totalDurationMs;
        }
        return nextValue;
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isPaused && elapsedMs < step.duration * 1000) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      previousTimeRef.current = undefined;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused, currentStep]);

  const handleNext = () => {
    if (currentStep < STRETCH_STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setElapsedMs(0);
      setIsPaused(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleToggle = () => {
    if (elapsedMs >= step.duration * 1000) {
      setElapsedMs(0);
    }
    setIsPaused(!isPaused);
  };

  const progress = (elapsedMs / (step.duration * 1000)) * 100;
  const timeLeft = Math.max(0, Math.ceil(step.duration - elapsedMs / 1000));

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen text-white font-display overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="text-center">
          <h1 className="text-primary text-[10px] font-black tracking-[0.4em] uppercase italic">Movimiento Somático</h1>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Progress Circles */}
      <div className="flex justify-center gap-3 mt-4">
        {STRETCH_STEPS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-700 ${i === currentStep ? 'w-10 bg-primary shadow-[0_0_12px_rgba(25,230,107,0.6)]' : i < currentStep ? 'w-4 bg-primary/40' : 'w-4 bg-white/10'}`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center relative">
        <div key={currentStep} className="animate-in fade-in slide-in-from-right-8 duration-700 flex flex-col items-center w-full">
          
          <div className="text-primary text-[11px] font-black uppercase tracking-[0.3em] mb-2">{step.focus}</div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight mb-8 leading-tight">{step.title}</h2>
          
          {/* Main Visual with Centered Fluid Timer Ring */}
          <div className="relative mb-12 flex items-center justify-center w-64 h-64">
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-primary/5 blur-[60px] rounded-full transition-opacity duration-1000 ${!isPaused ? 'opacity-100' : 'opacity-20'}`}></div>
            
            <svg 
              viewBox="0 0 256 256"
              className="w-full h-full -rotate-90 overflow-visible"
            >
              {/* Static Background Track */}
              <circle
                cx="128"
                cy="128"
                r="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-white/5"
              />
              {/* Fluid Progress Bar with correct filter */}
              <circle
                cx="128"
                cy="128"
                r="100"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray="628.3"
                strokeDashoffset={628.3 - (628.3 * progress) / 100}
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 12px rgba(25, 230, 107, 0.7))',
                }}
                className="text-primary transition-all duration-[16ms] ease-linear"
              />
            </svg>

            {/* Perfectly Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className={`w-28 h-28 rounded-[36px] bg-[#112117] border border-primary/20 flex items-center justify-center text-primary shadow-2xl mb-3 transition-all duration-1000 ${!isPaused ? 'scale-110 animate-pulse-slow' : 'scale-100'}`}>
                <span className="material-symbols-outlined text-[64px] filled">{step.icon}</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-4xl font-black text-white tabular-nums leading-none">{timeLeft}</span>
                <span className="text-sm font-bold text-primary/60 uppercase">s</span>
              </div>
            </div>
          </div>

          <p className="text-[#a0afaa] text-lg font-medium leading-relaxed max-w-xs mb-10 min-h-[5.5rem]">
            {step.description}
          </p>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl px-6 py-3 inline-flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full bg-primary ${!isPaused ? 'animate-ping' : ''}`}></span>
            <span className="text-primary text-[10px] font-black uppercase tracking-widest italic">
              {step.instruction}
            </span>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-8 pb-16 flex flex-col items-center gap-6 z-10">
        <div className="flex w-full gap-4">
            <button 
              onClick={handleToggle}
              className={`flex-1 h-16 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${isPaused ? 'bg-white text-[#0d1611]' : 'bg-[#1a2e23] text-white border border-white/10'}`}
            >
              <span className="material-symbols-outlined filled">
                {isPaused ? (elapsedMs >= step.duration * 1000 ? 'refresh' : 'play_arrow') : 'pause'}
              </span>
              <span>{isPaused ? (elapsedMs >= step.duration * 1000 ? 'Reiniciar' : 'Empezar') : 'Pausar'}</span>
            </button>

            <button 
              onClick={handleNext}
              disabled={!isPaused && elapsedMs < step.duration * 1000}
              className={`flex-1 h-16 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${elapsedMs >= step.duration * 1000 ? 'bg-primary text-[#0d1611] shadow-[0_15px_40px_rgba(25,230,107,0.3)]' : 'bg-[#112117] text-[#5c6e64] border border-white/5 opacity-50'}`}
            >
              <span>{currentStep === STRETCH_STEPS.length - 1 ? 'Finalizar' : 'Siguiente'}</span>
              <span className="material-symbols-outlined font-black">arrow_forward</span>
            </button>
        </div>
        
        <p className="text-[#5c6e64] text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Sincroniza tu respiración con el círculo</p>
      </footer>
    </div>
  );
};

export default GentleStretchesPage;
