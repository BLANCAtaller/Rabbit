
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GROUNDING_STEPS = [
  {
    count: 5,
    sense: "Vista",
    title: "5 cosas que puedes VER",
    description: "Busca objetos a tu alrededor. Nota los colores, las sombras y las formas. No juzgues, solo identifica.",
    icon: "visibility",
    examples: "Ej: Una planta, un cuadro, una grieta en la pared."
  },
  {
    count: 4,
    sense: "Tacto",
    title: "4 cosas que puedes TOCAR",
    description: "Siente la textura de lo que te rodea. ¿Es suave, rugoso, frío o cálido? Nota el peso de tu cuerpo sobre la silla.",
    icon: "touch_app",
    examples: "Ej: Tu ropa, tu cabello, la mesa, tus propias manos."
  },
  {
    count: 3,
    sense: "Oído",
    title: "3 cosas que puedes ESCUCHAR",
    description: "Presta atención a los sonidos que normalmente ignoras. Busca uno lejano, uno cercano y uno dentro de ti.",
    icon: "hearing",
    examples: "Ej: El tráfico, un reloj, tu propia respiración."
  },
  {
    count: 2,
    sense: "Olfato",
    title: "2 cosas que puedes OLER",
    description: "Inhala profundamente. Intenta distinguir dos aromas diferentes en el ambiente o en tu propia piel.",
    icon: "filter_vintage",
    examples: "Ej: Café, detergente en tu ropa, el aire fresco."
  },
  {
    count: 1,
    sense: "Gusto",
    title: "1 cosa que puedes SABOREAR",
    description: "Nota el sabor que hay en tu boca ahora mismo o imagina el sabor de tu comida favorita.",
    icon: "restaurant",
    examples: "Ej: Pasta de dientes, agua, o el recuerdo de una fruta."
  }
];

const GroundingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const step = GROUNDING_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < GROUNDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen text-white font-display overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="text-center">
          <h1 className="text-orange-400 text-[10px] font-black tracking-[0.4em] uppercase italic">Grounding Zen</h1>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Progress Bar */}
      <div className="px-10 mt-4 h-1 w-full flex gap-1.5">
        {GROUNDING_STEPS.map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 h-full rounded-full transition-all duration-700 ${i <= currentStep ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]' : 'bg-white/5'}`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center relative">
        <div key={currentStep} className="animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center">
          
          {/* Sense Badge */}
          <div className="mb-6 px-4 py-1.5 rounded-full bg-orange-400/10 border border-orange-400/20">
            <span className="text-orange-400 text-[11px] font-black uppercase tracking-[0.2em]">{step.sense}</span>
          </div>

          {/* Number Display */}
          <div className="relative mb-8">
            <span className="text-[120px] font-black leading-none text-white/5 absolute -top-16 left-1/2 -translate-x-1/2 select-none">
              {step.count}
            </span>
            <div className="w-24 h-24 rounded-[32px] bg-[#112117] border border-orange-400/30 flex items-center justify-center text-orange-400 relative z-10 shadow-2xl">
              <span className="material-symbols-outlined text-[48px] filled">{step.icon}</span>
            </div>
          </div>

          <h2 className="text-3xl font-black italic uppercase tracking-tight mb-4 text-white leading-tight">
            {step.title}
          </h2>
          
          <p className="text-[#a0afaa] text-lg font-medium leading-relaxed max-w-xs mb-8">
            {step.description}
          </p>

          <div className="text-[#5c6e64] text-xs font-bold italic opacity-60 max-w-[200px]">
            {step.examples}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-8 pb-12 flex flex-col items-center gap-6">
        <button 
          onClick={handleNext}
          className="w-full h-16 rounded-[24px] bg-orange-400 text-[#0d1611] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(251,146,60,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>{currentStep === GROUNDING_STEPS.length - 1 ? 'He vuelto al presente' : 'Siguiente'}</span>
          <span className="material-symbols-outlined font-black">
            {currentStep === GROUNDING_STEPS.length - 1 ? 'zen_mode' : 'arrow_forward'}
          </span>
        </button>
        
        <div className="flex items-center gap-2">
           <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
           <p className="text-[#5c6e64] text-[10px] font-bold uppercase tracking-widest">
             {5 - currentStep} de 5 sentidos restantes
           </p>
        </div>
      </footer>
    </div>
  );
};

export default GroundingPage;
