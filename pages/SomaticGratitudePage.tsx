
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GRATITUDE_STEPS = [
  {
    title: "Sostén y Movimiento",
    focus: "Esqueleto y Músculos",
    description: "Gracias a mis huesos y músculos por permitirme desplazarme, abrazar y sostener mi peso cada segundo del día sin que yo se lo pida.",
    icon: "accessibility_new",
    instruction: "Siente el peso de tus pies y agradece tu estructura.",
    affirmation: "Mi cuerpo es mi vehículo firme."
  },
  {
    title: "El Ritmo de la Vida",
    focus: "Corazón y Pulmones",
    description: "Gracias a mi corazón por latir rítmicamente y a mis pulmones por oxigenar cada una de mis células, incluso cuando estoy durmiendo.",
    icon: "vital_signs",
    instruction: "Pon una mano en tu pecho y siente tu pulso.",
    affirmation: "Agradezco mi vitalidad constante."
  },
  {
    title: "Alquimia Sagrada",
    focus: "Sistema Digestivo",
    description: "Gracias a mis órganos por transformar el alimento en energía y por trabajar incansablemente para nutrirme y protegerme.",
    icon: "avg_pace",
    instruction: "Lleva tu atención al abdomen con suavidad.",
    affirmation: "Confío en la sabiduría de mi digestión."
  },
  {
    title: "Puentes al Mundo",
    focus: "Sentidos y Nervios",
    description: "Gracias a mis ojos, oídos y sistema nervioso por permitirme percibir la belleza, escuchar música y sentir el contacto de quienes amo.",
    icon: "visibility",
    instruction: "Nota un sonido o color a tu alrededor ahora.",
    affirmation: "Aprecio mi capacidad de sentir."
  },
  {
    title: "Refugio Seguro",
    focus: "El Cuerpo Total",
    description: "Gracias, cuerpo, por ser mi casa. Gracias por hacer lo mejor que puedes con los recursos que tienes. Hoy elijo ser tu aliado.",
    icon: "home_health",
    instruction: "Dándote un suave abrazo o tocando tus hombros.",
    affirmation: "Hago las paces con mi templo."
  }
];

const SomaticGratitudePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const step = GRATITUDE_STEPS[currentStep];

  const handleSendGratitude = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      if (currentStep < GRATITUDE_STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        navigate('/dashboard');
      }
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen text-white font-display overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="text-center">
          <h1 className="text-blue-400 text-[10px] font-black tracking-[0.4em] uppercase italic">Gratitud Somática</h1>
        </div>
        <div className="w-10"></div>
      </header>

      {/* Progress */}
      <div className="flex justify-center gap-3 mt-4">
        {GRATITUDE_STEPS.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-10 bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.6)]' : i < currentStep ? 'w-4 bg-blue-400/40' : 'w-4 bg-white/10'}`}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-10 text-center relative">
        <div key={currentStep} className={`animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center w-full transition-all ${isSending ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
          
          <div className="text-blue-400 text-[11px] font-black uppercase tracking-[0.3em] mb-2">{step.focus}</div>
          <h2 className="text-3xl font-black italic uppercase tracking-tight mb-8 leading-tight">{step.title}</h2>
          
          {/* Central Visual */}
          <div className="relative mb-12">
            {/* Particles or Ring Effect when sending */}
            <div className={`absolute inset-0 bg-blue-400/20 blur-[80px] rounded-full transition-all duration-1000 ${isSending ? 'scale-[2] opacity-60' : 'scale-125 opacity-20 animate-pulse'}`}></div>
            
            <div className="w-32 h-32 rounded-[40px] bg-[#112117] border border-blue-400/30 flex items-center justify-center text-blue-400 relative z-10 shadow-2xl transition-transform duration-500 group">
              <span className={`material-symbols-outlined text-[64px] filled transition-all duration-500 ${isSending ? 'scale-150 rotate-12' : 'scale-100'}`}>{step.icon}</span>
              
              {/* Floating Sparkles */}
              <span className="absolute -top-2 -right-2 material-symbols-outlined text-blue-300 animate-bounce filled">auto_awesome</span>
            </div>
          </div>

          <p className="text-[#a0afaa] text-lg font-medium leading-relaxed max-w-xs mb-8 min-h-[6rem]">
            {step.description}
          </p>

          <div className="bg-blue-400/5 border border-blue-400/10 rounded-2xl px-6 py-3 inline-flex items-center gap-3 mb-4">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest italic leading-tight">
              {step.instruction}
            </span>
          </div>
          
          <div className="text-white/40 text-[13px] font-bold italic">
            "{step.affirmation}"
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="p-8 pb-16 flex flex-col items-center gap-6 z-10">
        <button 
          onClick={handleSendGratitude}
          disabled={isSending}
          className={`w-full h-18 rounded-[28px] font-black text-lg flex items-center justify-center gap-4 transition-all active:scale-[0.98] relative overflow-hidden ${isSending ? 'bg-blue-900/40 text-blue-400' : 'bg-blue-400 text-[#0d1611] shadow-[0_15px_40px_rgba(96,165,250,0.3)]'}`}
        >
          {isSending ? (
            <>
              <span className="material-symbols-outlined animate-spin">sync</span>
              <span>Enviando Aprecio...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined filled">favorite</span>
              <span>{currentStep === GRATITUDE_STEPS.length - 1 ? 'Finalizar Reconocimiento' : 'Enviar Gratitud'}</span>
            </>
          )}
          
          {/* Background loading bar if needed or just visual flair */}
          <div className={`absolute bottom-0 left-0 h-1 bg-white/40 transition-all duration-[1200ms] ease-linear ${isSending ? 'w-full' : 'w-0'}`}></div>
        </button>
        
        <p className="text-[#5c6e64] text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Tu cuerpo escucha tu amabilidad</p>
      </footer>
    </div>
  );
};

export default SomaticGratitudePage;
