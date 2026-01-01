
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const EmotionDiaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'text' | 'audio'>('audio');
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState({ min: 0, sec: 0, ms: 0 });
  const [isTextFocused, setIsTextFocused] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Simulación de cronómetro real
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setTime(prev => {
          let nextMs = prev.ms + 7;
          let nextSec = prev.sec;
          let nextMin = prev.min;

          if (nextMs >= 100) {
            nextMs = 0;
            nextSec += 1;
          }
          if (nextSec >= 60) {
            nextSec = 0;
            nextMin += 1;
          }
          return { min: nextMin, sec: nextSec, ms: nextMs };
        });
      }, 70);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleReset = () => {
    setIsRecording(false);
    setTime({ min: 0, sec: 0, ms: 0 });
  };

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  // Determinar si debemos mostrar el área de audio
  // Se oculta si estamos en la pestaña de texto O si el usuario está enfocado escribiendo notas en la de audio
  const showAudioUI = tab === 'audio' && !isTextFocused;

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-6 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white opacity-80 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
        </button>
        <div className="text-center">
          <h1 className="text-white text-[15px] font-black tracking-widest uppercase italic">NUEVA ENTRADA</h1>
          <p className="text-[#5c6e64] text-[10px] font-bold mt-0.5">Hoy, 14 de Octubre • 09:41 AM</p>
        </div>
        <div className="w-6"></div>
      </header>

      {/* Tabs Selector */}
      <div className="px-6 mt-6 shrink-0">
        <div className="flex bg-[#112117] p-1.5 rounded-[22px] border border-white/5 shadow-inner relative">
          <button 
            onClick={() => { setTab('text'); setIsTextFocused(false); }}
            className={`flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold text-sm z-10 ${tab === 'text' ? 'bg-[#1a2e23] text-white shadow-lg' : 'text-[#5c6e64]'}`}
          >
            <span className={`material-symbols-outlined text-[18px] ${tab === 'text' ? 'filled' : ''}`}>notes</span>
            Texto
          </button>
          <button 
            onClick={() => { setTab('audio'); setIsTextFocused(false); }}
            className={`flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold text-sm z-10 ${tab === 'audio' ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg' : 'text-[#5c6e64]'}`}
          >
            <span className={`material-symbols-outlined text-[18px] ${tab === 'audio' ? 'filled' : ''}`}>mic</span>
            Audio
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-6 pt-8 relative overflow-hidden">
        
        {/* AUDIO RECORDING UI: Solo se muestra si estamos en pestaña Audio y NO estamos escribiendo notas */}
        {tab === 'audio' && (
          <div className={`flex flex-col items-center transition-all duration-500 origin-top ${showAudioUI ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute h-0 overflow-hidden'}`}>
            {/* Timer Display */}
            <div className="flex items-center gap-4 mb-5">
              <TimerBox value={formatNum(time.min)} label="MIN" active={time.min > 0} />
              <span className="text-primary font-black text-2xl -mt-6 opacity-40">:</span>
              <TimerBox value={formatNum(time.sec)} label="SEC" active={isRecording || time.sec > 0} />
              <span className="text-primary font-black text-2xl -mt-6 opacity-40">:</span>
              <TimerBox value={formatNum(time.ms)} label="MS" active={isRecording} />
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-2.5 mb-10">
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${isRecording ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gray-700'}`}></div>
              <span className={`text-[11px] font-black uppercase tracking-[0.25em] transition-colors duration-300 ${isRecording ? 'text-red-500' : 'text-[#5c6e64]'}`}>
                {isRecording ? 'GRABANDO' : 'LISTO PARA GRABAR'}
              </span>
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-2 h-20 mb-12 w-full max-w-[280px]">
              {[0.3, 0.5, 0.4, 0.8, 1, 0.6, 0.9, 0.7, 0.8, 1, 0.5, 0.4, 0.6, 0.3].map((h, i) => (
                <div 
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-500 ${isRecording ? 'bg-primary shadow-[0_0_8px_rgba(25,230,107,0.4)]' : 'bg-[#1a2e23]'}`}
                  style={{ 
                    height: isRecording ? `${h * 100}%` : '15%',
                    animation: isRecording ? `waveform 0.8s ease-in-out infinite ${i * 0.05}s` : 'none'
                  }}
                ></div>
              ))}
            </div>

            {/* Recording Main Controls */}
            <div className="flex items-center justify-center gap-8 mb-10 relative">
              <button 
                onClick={handleReset}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 active:scale-90 transition-all z-10"
              >
                <span className="material-symbols-outlined text-2xl">refresh</span>
              </button>
              
              <div className="relative group">
                {isRecording && (
                  <div className="absolute inset-0 bg-white/20 blur-[30px] rounded-full animate-pulse scale-125"></div>
                )}
                <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className="relative w-[92px] h-[92px] rounded-full bg-white flex items-center justify-center text-[#0d1611] shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-95 transition-all z-10"
                >
                  <span className="material-symbols-outlined text-[48px] filled">
                    {isRecording ? 'pause' : 'play_arrow'}
                  </span>
                </button>
              </div>

              <button 
                onClick={() => setIsRecording(false)}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 active:scale-90 transition-all z-10"
              >
                <span className="material-symbols-outlined text-2xl filled">stop</span>
              </button>
            </div>
          </div>
        )}

        {/* TEXT ENTRY AREA */}
        <div className={`flex flex-col transition-all duration-500 ${tab === 'text' || isTextFocused ? 'flex-1' : ''}`}>
          <h4 className={`text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-1 transition-all ${tab === 'text' ? 'text-primary' : ''}`}>
            {tab === 'text' ? 'DIARIO DE PENSAMIENTOS' : 'NOTAS ADICIONALES (OPCIONAL)'}
          </h4>
          <div className={`relative group flex-1 flex flex-col`}>
            <textarea 
              ref={textAreaRef}
              onFocus={() => setIsTextFocused(true)}
              onBlur={() => {
                // Solo perdemos el foco si el campo está vacío, para mantener la vista limpia mientras escriben
                if (textAreaRef.current?.value === '') {
                  setIsTextFocused(false);
                }
              }}
              placeholder={tab === 'text' ? "¿Qué tienes en mente hoy? Escribe libremente..." : "Añade contexto escrito a tu grabación..."}
              className={`w-full bg-[#112117] rounded-[28px] border border-white/5 p-6 text-sm text-white placeholder-[#2d3a33] focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all resize-none font-medium ${tab === 'text' || isTextFocused ? 'flex-1 mb-4' : 'h-32 mb-10'}`}
            ></textarea>
            
            {/* Si estamos enfocados o en modo texto, añadimos un botón para volver a ver el audio si se necesita (solo en modo audio) */}
            {isTextFocused && tab === 'audio' && (
              <button 
                onClick={() => setIsTextFocused(false)}
                className="absolute top-4 right-4 text-primary bg-primary/10 px-3 py-1 rounded-full text-[10px] font-bold border border-primary/20 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
                Ver grabadora
              </button>
            )}
            
            <div className="absolute bottom-8 right-6 text-[#2d3a33] text-[10px] font-bold opacity-50">
              Autoguardado activado
            </div>
          </div>
        </div>
      </main>

      {/* Footer Final Actions */}
      <div className="p-6 flex gap-4 pb-12 bg-[#0d1611] shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="flex-1 h-15 rounded-2xl bg-[#1a2e23] border border-white/5 text-white/80 font-bold flex items-center justify-center gap-2 hover:bg-[#22382b] hover:text-white transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
          Descartar
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex-[2] h-15 rounded-2xl bg-primary text-[#0d1611] font-black flex items-center justify-center gap-2 shadow-[0_12px_30px_rgba(25,230,107,0.25)] hover:bg-primary/90 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[20px] font-black">check</span>
          Guardar Entrada
        </button>
      </div>

      <style>{`
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.8); opacity: 0.6; }
          50% { transform: scaleY(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const TimerBox = ({ value, label, active }: { value: string, label: string, active?: boolean }) => (
  <div className="flex flex-col items-center gap-2.5">
    <div className={`w-[66px] h-[66px] rounded-[22px] flex items-center justify-center border-2 transition-all duration-500 ${active ? 'bg-[#1a2e23] border-primary/40 shadow-[0_0_20px_rgba(25,230,107,0.1)]' : 'bg-[#112117] border-white/5'}`}>
      <span className={`text-[30px] font-black tracking-tight ${active ? 'text-primary' : 'text-white opacity-40'}`}>{value}</span>
    </div>
    <span className={`text-[9px] font-black tracking-[0.2em] transition-colors duration-300 ${active ? 'text-primary/60' : 'text-[#5c6e64]'}`}>{label}</span>
  </div>
);

export default EmotionDiaryPage;
