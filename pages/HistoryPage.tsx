
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities, seedHistoryData } from '../historyService';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    seedHistoryData();
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [viewingActivity, setViewingActivity] = useState<any | null>(null);

  const realActivities = useMemo(() => getActivities(), [refreshTrigger]);

  const data = useMemo(() => {
    const completed: Record<string, boolean> = {};
    const activities: Record<string, any[]> = {};
    
    realActivities.forEach(act => {
      const key = act.date;
      // Solo marcamos como completado si hay al menos un check-in
      if (act.type === 'checkin') completed[key] = true;
      
      if (!activities[key]) activities[key] = [];
      activities[key].push(act);
    });

    return { completed, activities };
  }, [realActivities]);

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // SEMANA INICIA EN LUNES (0=L, 6=D)
  const rawStartDay = new Date(year, month, 1).getDay();
  const startDay = (rawStartDay + 6) % 7; 

  const changeMonth = (offset: number) => {
    const nextDate = new Date(year, month + offset, 1);
    setCurrentMonth(nextDate);
    if (nextDate.getMonth() === today.getMonth() && nextDate.getFullYear() === today.getFullYear()) {
        setSelectedDay(today.getDate());
    } else {
        setSelectedDay(1);
    }
  };

  const dateKey = `${year}-${month}-${selectedDay}`;
  const dayActivities = data.activities[dateKey] || [];

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen font-display pb-32">
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="text-white text-[10px] font-black tracking-[0.4em] uppercase italic opacity-60">PROGRESO SOMÁTICO</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 pt-4 space-y-8 overflow-y-auto no-scrollbar">
        <section className="bg-[#112117] rounded-[48px] p-8 border border-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col">
              <h2 className="text-white text-[32px] font-black tracking-tight leading-none italic">{monthNames[month]}</h2>
              <span className="text-primary font-black text-[13px] tracking-[0.3em] mt-1">{year}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => changeMonth(-1)} className="w-10 h-10 rounded-xl bg-[#0d1611] border border-white/5 flex items-center justify-center text-primary active:scale-90 transition-all hover:bg-white/5">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button onClick={() => changeMonth(1)} className="w-10 h-10 rounded-xl bg-[#0d1611] border border-white/5 flex items-center justify-center text-primary active:scale-90 transition-all hover:bg-white/5">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-5 text-center items-center">
            {["L", "M", "M", "J", "V", "S", "D"].map(d => (
              <span key={d} className="text-[10px] font-black text-[#3c4a41] uppercase tracking-[0.2em] mb-2">{d}</span>
            ))}
            {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const key = `${year}-${month}-${day}`;
              const completed = data.completed[key];
              const selected = selectedDay === day;
              
              return (
                <button key={day} onClick={() => setSelectedDay(day)} className="relative flex flex-col items-center justify-center outline-none group">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[16px] font-black transition-all duration-300 relative ${
                    completed ? 'bg-primary text-[#0d1611] shadow-[0_0_20px_rgba(25,230,107,0.4)]' : 'text-[#3c4a41] group-hover:text-white/40'
                    } ${selected ? 'ring-2 ring-white ring-offset-4 ring-offset-[#112117] scale-105 z-10 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : ''}`}>
                    {day}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4 pb-12" key={selectedDay}>
          <h3 className="text-[#5c6e64] text-[11px] font-black uppercase tracking-[0.25em] px-1 italic">
            REGISTROS DEL {selectedDay} DE {monthNames[month].toUpperCase()}
          </h3>
          
          <div className="space-y-3">
            {dayActivities.length > 0 ? (
              dayActivities.map((act, idx) => (
                <div key={act.id || idx} onClick={() => setViewingActivity(act)} className="w-full bg-[#112117] rounded-[32px] p-5 border border-white/[0.04] flex items-center gap-4 shadow-xl active:scale-[0.98] transition-all cursor-pointer group">
                  <div className={`w-12 h-12 rounded-[20px] bg-[#0d1611] border border-white/5 flex items-center justify-center shrink-0 ${act.color} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-[24px] filled">{act.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-white text-[15px] font-black italic">{act.title}</h4>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mt-0.5 ${act.color}`}>{act.value}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#5c6e64] text-[20px] opacity-20 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </div>
              ))
            ) : (
              <div className="bg-[#112117]/50 rounded-[32px] p-10 border border-dashed border-white/5 text-center flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-[#2d3a33]">history</span>
                <p className="text-[#5c6e64] text-xs font-black uppercase tracking-widest italic opacity-40">Sin actividad registrada</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {viewingActivity && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setViewingActivity(null)}></div>
          <div className="relative w-full max-w-md bg-[#112117] rounded-[44px] border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-12">
            <div className="p-10 pb-4 flex justify-between items-start">
              <div className="flex items-center gap-5">
                <div className={`w-16 h-16 rounded-[24px] bg-[#0d1611] flex items-center justify-center ${viewingActivity.color} border border-white/5 shadow-inner`}>
                  <span className={`material-symbols-outlined text-[36px] filled`}>{viewingActivity.icon}</span>
                </div>
                <div>
                  <h2 className="text-white text-xl font-black italic uppercase tracking-tight">{viewingActivity.title}</h2>
                  <p className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.2em]">{selectedDay} {monthNames[month]}</p>
                </div>
              </div>
              <button onClick={() => setViewingActivity(null)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 active:scale-90 transition-all"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="px-10 pb-12 pt-4">
              <div className="bg-[#0d1611] p-8 rounded-[36px] border border-white/5 text-white/80 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                   <span className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.3em]">Resultado</span>
                   <span className="text-primary font-black italic">{viewingActivity.value}</span>
                </div>
                {viewingActivity.details?.sensations && viewingActivity.details.sensations.length > 0 && (
                  <div className="space-y-3">
                    <span className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.3em] block">Sensaciones</span>
                    <div className="flex flex-wrap gap-2">
                      {viewingActivity.details.sensations.map((s: string) => (
                        <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold text-white/60">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-2">
                   <span className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.3em] block mb-3">Reflexión</span>
                   <p className="italic font-bold text-[14px] leading-relaxed text-white opacity-80">"{viewingActivity.details?.reflection || 'Registro guardado'}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
