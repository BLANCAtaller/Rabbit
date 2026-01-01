
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell, ComposedChart } from 'recharts';
import { useTranslation } from '../context/LanguageContext';
import { getActivities } from '../historyService';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const label = payload[0].payload.label || payload[0].payload.name;
    const value = Math.round(payload[0].value);
    
    let status = "REGULADO";
    let statusColor = "text-primary";
    if (value < 40) { status = "ALERTA"; statusColor = "text-red-400"; }
    else if (value < 70) { status = "TENSIÓN"; statusColor = "text-yellow-400"; }

    return (
      <div className="bg-[#0d1611]/95 border border-white/10 p-4 rounded-[24px] shadow-2xl backdrop-blur-2xl ring-1 ring-white/5 min-w-[120px]">
        <p className="text-[9px] font-black text-[#5c6e64] uppercase tracking-[0.2em] mb-2 border-b border-white/5 pb-2">{label}</p>
        <div className="flex flex-col gap-1">
          <p className={`text-[10px] font-black tracking-widest ${statusColor}`}>{status}</p>
          <p className="text-white text-[22px] font-black italic leading-none">{value} <span className="text-[9px] text-[#5c6e64] not-italic font-bold opacity-60">PTS</span></p>
        </div>
      </div>
    );
  }
  return null;
};

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'week' | 'month' | 'total'>('week');
  const [viewDate, setViewDate] = useState(new Date());

  const allActivities = useMemo(() => getActivities(), []);
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  // DATOS DE GRÁFICA: SIEMPRE LUNES A DOMINGO
  const unifiedData = useMemo(() => {
    const checkins = allActivities.filter(a => a.type === 'checkin');
    const getColor = (avg: number) => {
      if (avg < 40) return '#f87171'; 
      if (avg < 70) return '#eab308'; 
      return '#19e66b'; 
    };

    if (filter === 'week') {
      const startOfWeek = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() - (viewDate.getDay() === 0 ? 6 : viewDate.getDay() - 1));
      const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
      
      return dayLabels.map((day, idx) => {
        const targetDate = new Date(startOfWeek);
        targetDate.setDate(startOfWeek.getDate() + idx);
        const dateKey = `${targetDate.getFullYear()}-${targetDate.getMonth()}-${targetDate.getDate()}`;
        const dCheckins = checkins.filter(a => a.date === dateKey);
        const avg = dCheckins.length > 0 ? dCheckins.reduce((s, c) => s + (c.details?.mood || 50), 0) / dCheckins.length : 0;
        return { label: day, val: avg, color: getColor(avg), dateKey };
      });

    } else if (filter === 'month') {
      const weekLabels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5'];
      return weekLabels.map((label, idx) => {
        const mCheckins = checkins.filter(a => {
          const d = new Date(a.timestamp);
          const weekNum = Math.floor((d.getDate() - 1) / 7);
          return weekNum === idx && d.getMonth() === viewDate.getMonth() && d.getFullYear() === viewDate.getFullYear();
        });
        const avg = mCheckins.length > 0 ? mCheckins.reduce((s, c) => s + (c.details?.mood || 50), 0) / mCheckins.length : 0;
        return { label, val: avg, color: getColor(avg) };
      }).filter(d => d.val > 0 || d.label !== 'Sem 5');

    } else {
      const monthsMap: Record<string, {m: number, y: number, label: string, sum: number, count: number}> = {};
      checkins.forEach(a => {
        const d = new Date(a.timestamp);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (!monthsMap[key]) {
          monthsMap[key] = { m: d.getMonth(), y: d.getFullYear(), label: `${monthNames[d.getMonth()]}`, sum: 0, count: 0 };
        }
        monthsMap[key].sum += (a.details?.mood || 50);
        monthsMap[key].count += 1;
      });
      return Object.values(monthsMap).sort((a, b) => (a.y * 12 + a.m) - (b.y * 12 + b.m))
        .map(m => ({ label: m.label, val: m.sum / m.count, color: getColor(m.sum / m.count) }));
    }
  }, [allActivities, filter, viewDate]);

  // ESTADÍSTICAS (Sincronizadas por dateKey)
  const stats = useMemo(() => {
    const allCheckins = allActivities.filter(a => a.type === 'checkin');
    let filteredCount = 0;
    let label = "";

    if (filter === 'week') {
      // Contar exactamente lo que hay en los dateKeys mostrados en la gráfica
      filteredCount = unifiedData.reduce((acc, curr) => {
        const dCheckins = allCheckins.filter(a => a.date === curr.dateKey);
        return acc + dCheckins.length;
      }, 0);
      const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), viewDate.getDate() - (viewDate.getDay() === 0 ? 6 : viewDate.getDay() - 1));
      label = `SEM. ${start.getDate()} ${monthNames[start.getMonth()].toUpperCase()}`;
    } else if (filter === 'month') {
      filteredCount = allCheckins.filter(a => {
        const d = new Date(a.timestamp);
        return d.getMonth() === viewDate.getMonth() && d.getFullYear() === viewDate.getFullYear();
      }).length;
      label = monthNames[viewDate.getMonth()].toUpperCase();
    } else {
      filteredCount = allCheckins.length;
      label = "TOTAL";
    }

    const uniqueDays: number[] = Array.from<number>(new Set(allCheckins.map(a => {
      const d = new Date(a.timestamp);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }))).sort((a: number, b: number) => b - a);

    let streak = 0;
    if (uniqueDays.length > 0) {
      streak = 1;
      for (let i = 0; i < uniqueDays.length - 1; i++) {
        if ((uniqueDays[i] as number) - (uniqueDays[i+1] as number) === 86400000) streak++;
        else break;
      }
    }

    return { streak, displayCount: filteredCount, periodLabel: label };
  }, [allActivities, filter, viewDate, unifiedData]);

  const navigatePeriod = (direction: number) => {
    const newDate = new Date(viewDate);
    if (filter === 'week') newDate.setDate(viewDate.getDate() + (direction * 7));
    else if (filter === 'month') newDate.setMonth(viewDate.getMonth() + direction);
    setViewDate(newDate);
  };

  const avgLevelText = useMemo(() => {
    const activeData = unifiedData.filter(d => d.val > 0);
    if (activeData.length === 0) return '---';
    const avg = activeData.reduce((acc, curr) => acc + curr.val, 0) / activeData.length;
    if (avg > 70) return 'ALTO';
    if (avg > 40) return 'MEDIO';
    return 'BAJO';
  }, [unifiedData]);

  return (
    <div className="relative flex-1 flex flex-col bg-[#0d1611] pb-44 font-display overflow-y-auto no-scrollbar">
      <div className="h-10 w-full shrink-0"></div>
      
      <header className="px-6 pb-2 pt-2">
        <h2 className="text-[10px] font-black text-[#5c6e64] uppercase tracking-[0.25em] mb-1 italic">Métricas Biométricas</h2>
        <div className="flex justify-between items-center">
          <h1 className="text-[34px] font-black text-white tracking-tight leading-tight italic">Progreso</h1>
          <button onClick={() => navigate('/history')} className="w-11 h-11 rounded-[16px] bg-[#1a2e23] border border-white/5 flex items-center justify-center text-primary shadow-sm active:scale-90 transition-all">
            <span className="material-symbols-outlined text-[24px]">history</span>
          </button>
        </div>
      </header>

      <div className="px-6 mt-6 shrink-0">
        <div className="flex bg-[#0d1611] p-1.5 rounded-[24px] border border-white/5 shadow-inner">
           {(['week', 'month', 'total'] as const).map((f) => (
              <button key={f} onClick={() => { setFilter(f); setViewDate(new Date()); }} className={`flex-1 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 ${filter === f ? 'bg-primary text-[#0d1611] shadow-[0_0_25px_rgba(25,230,107,0.4)] scale-[1.02]' : 'text-[#5c6e64]'}`}>
                {f === 'week' ? 'Sem' : f === 'month' ? 'Mes' : 'Tot'}
              </button>
           ))}
        </div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 mt-8">
        <div className="bg-[#112117] rounded-[44px] p-7 border border-white/[0.03] flex flex-col justify-between shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-[20px] filled">local_fire_department</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">RACHA</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[54px] font-black text-white leading-none tracking-tighter">{stats.streak}</span>
            <span className="text-[11px] font-black text-[#5c6e64] uppercase tracking-widest italic">DÍAS</span>
          </div>
        </div>
        <div className="bg-[#112117] rounded-[44px] p-7 border border-white/[0.03] flex flex-col justify-between shadow-2xl text-left relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#38bdf8]">
              <span className="material-symbols-outlined text-[20px] filled">check_circle</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{stats.periodLabel}</span>
            </div>
            {filter !== 'total' && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => navigatePeriod(-1)} className="p-1 hover:text-white text-[#5c6e64]"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                <button onClick={() => navigatePeriod(1)} className="p-1 hover:text-white text-[#5c6e64]"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
              </div>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[54px] font-black text-white leading-none tracking-tighter transition-all duration-300">{stats.displayCount}</span>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#5c6e64] uppercase tracking-widest italic leading-none">CHECK-</span>
              <span className="text-[10px] font-black text-[#5c6e64] uppercase tracking-widest italic leading-none">INS</span>
            </div>
          </div>
          {filter !== 'total' && <div className="absolute top-0 right-0 w-16 h-16 bg-[#38bdf8]/5 rotate-45 translate-x-8 -translate-y-8"></div>}
        </div>
      </div>

      <section className="px-5 mt-8 pb-10">
        <div className="bg-[#112117] rounded-[48px] border border-white/[0.04] shadow-2xl overflow-hidden flex flex-col relative">
          <div className="p-8 pb-4 flex justify-between items-start z-10">
             <div className="flex items-center gap-3">
                <div className="w-2.5 h-6 rounded-full bg-primary shadow-[0_0_10px_#19e66b]"></div>
                <div className="flex flex-col">
                  <h3 className="text-white text-[18px] font-black italic tracking-tight leading-none mb-1">Historial de</h3>
                  <h3 className="text-white text-[18px] font-black italic tracking-tight leading-none">Regulación</h3>
                </div>
             </div>
             <div className="px-4 py-3 rounded-[18px] bg-[#0d1611] border border-white/5 flex flex-col items-center min-w-[100px]">
                <span className="text-[#5c6e64] text-[8px] font-black uppercase tracking-[0.2em] mb-1 leading-none">PROMEDIO:</span>
                <span className={`text-[12px] font-black tracking-tight leading-none ${avgLevelText === 'BAJO' ? 'text-red-400' : avgLevelText === 'MEDIO' ? 'text-yellow-400' : 'text-primary'}`}>{avgLevelText}</span>
             </div>
          </div>
          <div className="relative w-full h-[320px] px-2 pt-4">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
               {filter !== 'total' && (
                 <div className="flex items-center gap-3 bg-[#0d1611]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
                    <button onClick={() => navigatePeriod(-1)} className="text-primary hover:scale-110 transition-transform"><span className="material-symbols-outlined">arrow_back</span></button>
                    <span className="text-[9px] font-black text-[#5c6e64] uppercase tracking-[0.4em] pointer-events-none">NAVEGACIÓN</span>
                    <button onClick={() => navigatePeriod(1)} className="text-primary hover:scale-110 transition-transform"><span className="material-symbols-outlined">arrow_forward</span></button>
                 </div>
               )}
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={unifiedData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.02)" strokeDasharray="5 5" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#5c6e64', fontSize: 11, fontWeight: 900 }} dy={10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="val" radius={[12, 12, 12, 12]} barSize={filter === 'week' ? 32 : 50} animationDuration={1000}>
                  {unifiedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.val > 0 ? entry.color : 'rgba(255,255,255,0.03)'} style={{ filter: entry.val > 0 ? `drop-shadow(0 0 8px ${entry.color}44)` : 'none' }} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="h-6 w-full bg-gradient-to-t from-[#0d1611]/20 to-transparent"></div>
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;
