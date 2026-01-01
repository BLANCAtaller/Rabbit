
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Phase = 'inhale' | 'hold' | 'exhale' | 'hold-out';

interface BreathingTechnique {
  id: string;
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdOut: number;
  description: string;
}

const TECHNIQUES: BreathingTechnique[] = [
  { id: 'square', name: 'Respiración Cuadrada', inhale: 4, hold: 4, exhale: 4, holdOut: 4, description: 'Para equilibrar y calmar.' },
  { id: '478', name: 'Técnica 4-7-8', inhale: 4, hold: 7, exhale: 8, holdOut: 0, description: 'Para ansiedad y sueño.' },
  { id: 'coherent', name: 'Coherencia', inhale: 5, hold: 0, exhale: 5, holdOut: 0, description: 'Para enfoque y claridad.' },
];

const GuidedBreathingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [technique, setTechnique] = useState(TECHNIQUES[0]);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [timeLeft, setTimeLeft] = useState(technique.inhale);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            switch (phase) {
              case 'inhale':
                if (technique.hold > 0) {
                  setPhase('hold');
                  return technique.hold;
                }
                setPhase('exhale');
                return technique.exhale;
              case 'hold':
                setPhase('exhale');
                return technique.exhale;
              case 'exhale':
                if (technique.holdOut > 0) {
                  setPhase('hold-out');
                  return technique.holdOut;
                }
                setCycleCount(c => c + 1);
                setPhase('inhale');
                return technique.inhale;
              case 'hold-out':
                setCycleCount(c => c + 1);
                setPhase('inhale');
                return technique.inhale;
              default:
                return technique.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(technique.inhale);
      setPhase('inhale');
    }
    return () => clearInterval(timer);
  }, [isActive, phase, technique]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'INHALA';
      case 'hold': return 'MANTÉN';
      case 'exhale': return 'EXHALA';
      case 'hold-out': return 'MANTÉN';
      default: return '';
    }
  };

  const getScale = () => {
    if (!isActive) return 'scale-90';
    switch (phase) {
      case 'inhale': return 'scale-[1.6]';
      case 'hold': return 'scale-[1.6]';
      case 'exhale': return 'scale-90';
      case 'hold-out': return 'scale-90';
      default: return 'scale-100';
    }
  };

  const getBubbleColor = () => {
    switch (phase) {
      case 'inhale': return 'bg-primary/20 shadow-[0_0_80px_rgba(25,230,107,0.3)]';
      case 'hold': return 'bg-[#38bdf8]/15 shadow-[0_0_80px_rgba(56,189,248,0.2)]';
      case 'exhale': return 'bg-[#2dd4bf]/10 shadow-[0_0_60px_rgba(45,212,191,0.15)]';
      default: return 'bg-white/5';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen font-display overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 z-50">
        <button onClick={() => navigate(-1)} className="text-white opacity-40 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <div className="text-center">
          <h1 className="text-white text-[12px] font-black tracking-[0.3em] uppercase italic opacity-40">Modo Zen Activo</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative">
        
        {/* Background Decorative Pillars (Como en la imagen) */}
        <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-20 pointer-events-none">
          <div className="w-24 h-4/5 rounded-full border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent"></div>
          <div className="w-32 h-full rounded-full border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent"></div>
          <div className="w-24 h-4/5 rounded-full border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent"></div>
        </div>

        {/* GUIDED VISUALIZATION AREA */}
        <div className="relative flex flex-col items-center justify-center w-full h-[400px]">
          
          {/* THE EXPANDING BUBBLE (Core) */}
          <div 
            className={`absolute rounded-full transition-all ease-in-out blur-[2px] ${getScale()} ${getBubbleColor()}`}
            style={{ 
              width: '180px', 
              height: '180px',
              transitionDuration: `${isActive ? (phase === 'inhale' ? technique.inhale : technique.exhale) * 1000 : 1000}ms`
            }}
          >
             {/* Inner Glow Core */}
             <div className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"></div>
          </div>

          {/* TIMER BUBBLE (Orbiting Top) */}
          <div className={`absolute top-0 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
             <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border border-primary/40 bg-[#0d1611]/80 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(25,230,107,0.2)]">
                  <span className="text-3xl font-black tracking-tighter text-[#2dd4bf] drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">
                    {timeLeft}
                  </span>
                  <span className="text-[8px] font-black text-white/30 tracking-[0.3em] -mt-1 uppercase">SEG</span>
                </div>
                {/* Thin connection line */}
                <div className="w-px h-12 bg-gradient-to-b from-primary/30 to-transparent mt-1"></div>
             </div>
          </div>

          {/* MAIN PHASE TEXT (Center Over Bubble) */}
          <div className="relative z-20 text-center flex flex-col items-center justify-center pt-10">
            <h2 className={`text-[56px] font-black tracking-[0.3em] transition-all duration-1000 uppercase italic ${isActive ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}>
              {isActive ? getPhaseText() : 'LISTO'}
            </h2>
            
            {/* Cycle Count */}
            <div className={`mt-10 transition-all duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
               <span className="text-[#5c6e64] text-[11px] font-black uppercase tracking-[0.4em]">
                 Ciclos completados: <span className="text-white ml-2">{cycleCount}</span>
               </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 z-30">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`h-24 w-24 rounded-full flex items-center justify-center transition-all duration-500 active:scale-90 relative group ${isActive ? 'bg-[#1a2e23] border border-white/10 text-white shadow-2xl' : 'bg-white text-[#0d1611] shadow-[0_20px_60px_rgba(255,255,255,0.2)]'}`}
          >
            {!isActive && <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>}
            <span className="material-symbols-outlined text-[48px] filled transition-transform group-hover:scale-110">
              {isActive ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        {/* Technique Selection (Oculto mientras respira) */}
        {!isActive && (
           <div className="absolute bottom-24 w-full px-6 flex flex-col gap-2 items-center animate-in fade-in duration-1000">
             <span className="text-[9px] font-black text-[#5c6e64] tracking-[0.3em] uppercase mb-2">Selecciona Técnica</span>
             <div className="flex gap-2 w-full max-w-[340px]">
                {TECHNIQUES.map(t => (
                  <button 
                    key={t.id}
                    onClick={() => { setTechnique(t); setTimeLeft(t.inhale); }}
                    className={`flex-1 py-3 px-1 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all border ${technique.id === t.id ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-white/5 border-transparent text-[#5c6e64]'}`}
                  >
                    {t.name.split(' ')[1] || t.name.split(' ')[0]}
                  </button>
                ))}
             </div>
           </div>
        )}

      </main>

      {/* Finishing Session */}
      {isActive && (
        <div className="p-10 pb-16 text-center z-50">
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 rounded-full bg-white/5 border border-white/5 text-white/40 font-black text-[10px] tracking-[0.4em] uppercase hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
          >
            Finalizar Sesión
          </button>
        </div>
      )}

      <style>{`
        @keyframes orbit-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default GuidedBreathingPage;
