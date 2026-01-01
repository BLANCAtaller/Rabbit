
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveActivity } from '../historyService';

type HungerType = 'physical' | 'emotional' | 'thirst' | null;

const HungerMappingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verdict, setVerdict] = useState<HungerType>(null);

  const calculateVerdict = (type: HungerType) => {
    setVerdict(type);
    setStep(3);
    
    const now = new Date();
    const verdictLabels: Record<string, string> = { physical: 'Hambre Física', emotional: 'Hambre Emocional', thirst: 'Sed' };
    
    saveActivity({
      type: 'hunger',
      title: 'Mapeo de Hambre',
      value: verdictLabels[type || 'thirst'],
      icon: 'restaurant',
      color: 'text-orange-400',
      date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
      details: { verdict: type, recommendation: 'Escucha consciente del cuerpo completada' }
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen text-white font-display">
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity"><span className="material-symbols-outlined text-2xl">close</span></button>
        <div className="text-center"><h1 className="text-orange-400 text-[10px] font-black tracking-[0.4em] uppercase">Mapeo de Hambre</h1></div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-4 pb-20 overflow-y-auto no-scrollbar">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8 py-10">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-400/10 rounded-full flex items-center justify-center text-blue-400 mx-auto border border-blue-400/20"><span className="material-symbols-outlined text-[40px] filled">water_drop</span></div>
              <h2 className="text-3xl font-black italic uppercase tracking-tight">Primero, descarta la sed</h2>
              <p className="text-[#a0afaa] text-lg font-medium leading-relaxed">Bebe un vaso de agua ahora mismo.</p>
            </div>
            <div className="bg-[#112117] border border-white/5 rounded-[32px] p-6 space-y-4 shadow-xl">
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => calculateVerdict('thirst')} className="w-full p-5 rounded-2xl bg-blue-400/10 border border-blue-400/20 text-blue-400 font-bold text-left flex items-center justify-between group hover:bg-blue-400/20 transition-all"><span>La sensación disminuyó</span><span className="material-symbols-outlined">check_circle</span></button>
                <button onClick={() => setStep(2)} className="w-full p-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-left flex items-center justify-between group hover:bg-white/10 transition-all"><span>Sigo sintiendo "hambre"</span><span className="material-symbols-outlined">arrow_forward</span></button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-8 py-6">
            <h2 className="text-2xl font-black italic uppercase tracking-tight text-center">Analiza la sensación</h2>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => calculateVerdict('physical')} className="relative overflow-hidden rounded-[28px] bg-[#112117] p-6 border border-white/5 text-left group hover:border-orange-400/40 transition-all"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-orange-400/10 flex items-center justify-center text-orange-400 shrink-0"><span className="material-symbols-outlined text-[28px] filled">restaurant</span></div><div><h4 className="text-lg font-bold text-white mb-1">Hambre Física</h4><p className="text-[#a0afaa] text-xs">Apareció de forma gradual...</p></div></div></button>
              <button onClick={() => calculateVerdict('emotional')} className="relative overflow-hidden rounded-[28px] bg-[#112117] p-6 border border-white/5 text-left group hover:border-red-400/40 transition-all"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-2xl bg-red-400/10 flex items-center justify-center text-red-400 shrink-0"><span className="material-symbols-outlined text-[28px] filled">favorite</span></div><div><h4 className="text-lg font-bold text-white mb-1">Hambre Emocional</h4><p className="text-[#a0afaa] text-xs">Apareció de forma repentina...</p></div></div></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in zoom-in-95 duration-700 flex flex-col items-center text-center space-y-10 py-10">
            <div className="relative"><div className={`absolute inset-0 blur-[60px] rounded-full scale-150 animate-pulse ${verdict === 'physical' ? 'bg-orange-400/20' : verdict === 'emotional' ? 'bg-red-400/20' : 'bg-blue-400/20'}`}></div><div className={`w-32 h-32 rounded-[40px] bg-[#112117] border-2 flex items-center justify-center relative z-10 shadow-2xl ${verdict === 'physical' ? 'border-orange-400/30 text-orange-400' : verdict === 'emotional' ? 'border-red-400/30 text-red-400' : 'border-blue-400/30 text-blue-400'}`}><span className="material-symbols-outlined text-[64px] filled">{verdict === 'physical' ? 'restaurant' : verdict === 'emotional' ? 'sentiment_dissatisfied' : 'water_drop'}</span></div></div>
            <h2 className="text-4xl font-black italic uppercase tracking-tight">{verdict === 'physical' ? 'Hambre Real' : verdict === 'emotional' ? 'Hambre del Alma' : 'Solo era Sed'}</h2>
            <button onClick={() => navigate('/dashboard')} className={`w-full h-16 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 transition-all ${verdict === 'physical' ? 'bg-orange-400 text-[#0d1611]' : verdict === 'emotional' ? 'bg-red-400 text-[#0d1611]' : 'bg-blue-400 text-[#0d1611]'}`}><span>Finalizar</span><span className="material-symbols-outlined font-black">arrow_forward</span></button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HungerMappingPage;
