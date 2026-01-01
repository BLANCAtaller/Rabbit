
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MINDFUL_STEPS = [
  {
    title: "Pausa y Gratitud",
    description: "Antes de empezar, dedica un momento a agradecer. Reconoce el esfuerzo de quienes cultivaron y prepararon este alimento.",
    icon: "auto_awesome",
    instruction: "Coloca tus manos cerca del plato y respira.",
    theme: "text-primary"
  },
  {
    title: "Usa tus Ojos",
    description: "Observa los colores, las formas y las texturas en tu plato como si fuera la primera vez que los ves.",
    icon: "visibility",
    instruction: "Nota 3 colores diferentes en tu comida.",
    theme: "text-primary"
  },
  {
    title: "Inhala el Aroma",
    description: "Acerca la comida y respira su aroma. Nota cómo responde tu cuerpo: ¿hay más saliva? ¿sientes hambre en el estómago?",
    icon: "filter_vintage",
    instruction: "Haz una inhalación profunda.",
    theme: "text-primary"
  },
  {
    title: "Masticación Lenta",
    description: "Toma un bocado pequeño. Suelta el cubierto. Mastica al menos 20 veces, notando cómo cambia la textura y el sabor.",
    icon: "restaurant",
    instruction: "Saborea cada instante antes de tragar.",
    theme: "text-primary"
  },
  {
    title: "Escucha la Saciedad",
    description: "A mitad de tu comida, detente. Pregúntale a tu cuerpo: ¿Cuánta energía necesito realmente ahora? No tienes que terminar el plato.",
    icon: "accessibility_new",
    instruction: "Escucha tu señal interna de plenitud.",
    theme: "text-primary"
  }
];

const MindfulEatingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const step = MINDFUL_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < MINDFUL_STEPS.length - 1) {
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
          <h1 className="text-primary text-[10px] font-black tracking-[0.4em] uppercase italic">Hábito Consciente</h1>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {MINDFUL_STEPS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-primary shadow-[0_0_8px_rgba(25,230,107,0.4)]' : 'w-2 bg-white/10'}`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center relative">
        <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-12 duration-700 flex flex-col items-center z-10">
          
          {/* Main Visual Icon */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 animate-pulse"></div>
            <div className="w-28 h-28 rounded-[36px] bg-[#112117] border border-primary/30 flex items-center justify-center text-primary relative z-10 shadow-2xl overflow-hidden">
              <span className="material-symbols-outlined text-[56px] filled">{step.icon}</span>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            </div>
          </div>

          <h2 className="text-3xl font-black italic uppercase tracking-tight mb-4 text-white leading-tight">
            {step.title}
          </h2>
          
          <p className="text-[#a0afaa] text-lg font-medium leading-relaxed max-w-xs mb-10">
            {step.description}
          </p>

          {/* Action Callout */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 inline-flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-primary text-[11px] font-black uppercase tracking-widest italic">
              {step.instruction}
            </span>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-8 pb-12 flex flex-col items-center gap-6 z-20">
        <button 
          onClick={handleNext}
          className="w-full h-16 rounded-[24px] bg-primary text-[#0d1611] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(25,230,107,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span>{currentStep === MINDFUL_STEPS.length - 1 ? 'He comido con conciencia' : 'Siguiente Paso'}</span>
          <span className="material-symbols-outlined font-black">
            {currentStep === MINDFUL_STEPS.length - 1 ? 'task_alt' : 'arrow_forward'}
          </span>
        </button>
        
        {currentStep > 0 ? (
          <button 
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-[#5c6e64] text-[11px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors"
          >
            Volver
          </button>
        ) : (
            <p className="text-[#5c6e64] text-[10px] font-bold uppercase tracking-widest">Disfruta el presente</p>
        )}
      </footer>
    </div>
  );
};

export default MindfulEatingPage;
