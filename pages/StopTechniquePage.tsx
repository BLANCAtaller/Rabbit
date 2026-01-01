
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveActivity } from '../historyService';

const STOP_STEPS = [
  { letter: 'S', title: 'Para (Stop)', description: 'Detén lo que estés haciendo. Haz una pausa física total.', icon: 'pan_tool', instruction: 'Quédate inmóvil por 5 segundos.' },
  { letter: 'T', title: 'Respira (Take a breath)', description: 'Lleva aire a tu abdomen. Siente cómo entra y sale.', icon: 'air', instruction: 'Haz 3 respiraciones profundas ahora.' },
  { letter: 'O', title: 'Observa (Observe)', description: '¿Qué sientes en tu cuerpo? ¿Qué pensamientos cruzan tu mente?', icon: 'visibility', instruction: 'Identifica 2 sensaciones físicas.' },
  { letter: 'P', title: 'Procede (Proceed)', description: 'Elige una acción que te cuide. Procede con conciencia.', icon: 'directions_walk', instruction: 'Elige tu siguiente paso con calma.' }
];

const StopTechniquePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const step = STOP_STEPS[currentStep];

  const next = () => {
    if (currentStep < STOP_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const now = new Date();
      saveActivity({
        type: 'stop',
        title: 'Técnica STOP',
        value: 'Completada',
        icon: 'pan_tool',
        color: 'text-red-400',
        date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
        details: { status: 'Regulación completada vía técnica STOP' }
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen text-white font-display">
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity"><span className="material-symbols-outlined text-2xl">close</span></button>
        <div className="text-center"><h1 className="text-red-400 text-[10px] font-black tracking-[0.4em] uppercase">Técnica de Rescate</h1></div>
        <div className="w-10"></div>
      </header>

      <div className="px-10 pt-4 flex justify-between relative">
        <div className="absolute top-1/2 left-10 right-10 h-px bg-white/5 -translate-y-1/2"></div>
        {STOP_STEPS.map((s, i) => (
          <div key={s.letter} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 border-2 ${i <= currentStep ? 'bg-red-400 border-red-400 text-[#0d1611]' : 'bg-[#112117] border-white/10 text-white/20'}`}>{s.letter}</div>
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-8 duration-700 flex flex-col items-center">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-red-400/20 blur-[80px] rounded-full scale-150 animate-pulse"></div>
            <div className="w-32 h-32 rounded-[40px] bg-[#112117] border-2 border-red-400/30 flex items-center justify-center text-red-400 relative z-10 shadow-2xl"><span className="material-symbols-outlined text-[64px] filled">{step.icon}</span></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-red-400 flex items-center justify-center text-[#0d1611] font-black text-2xl shadow-lg border-4 border-[#0d1611]">{step.letter}</div>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tight mb-4 text-white">{step.title}</h2>
          <p className="text-[#a0afaa] text-lg font-medium leading-relaxed max-w-xs mb-10">{step.description}</p>
          <div className="bg-red-400/10 border border-red-400/20 rounded-2xl px-6 py-4 inline-flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span><span className="text-red-400 text-xs font-black uppercase tracking-widest italic">{step.instruction}</span></div>
        </div>
      </main>

      <footer className="p-8 pb-12 flex flex-col items-center gap-6">
        <button onClick={next} className="w-full h-16 rounded-[24px] bg-red-400 text-[#0d1611] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(248,113,113,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"><span>{currentStep === STOP_STEPS.length - 1 ? 'He terminado' : 'Siguiente Paso'}</span><span className="material-symbols-outlined font-black">{currentStep === STOP_STEPS.length - 1 ? 'done_all' : 'arrow_forward'}</span></button>
      </footer>
    </div>
  );
};

export default StopTechniquePage;
