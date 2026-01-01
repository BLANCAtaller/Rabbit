
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type Category = 'Personal' | 'Emocional' | 'Salud' | 'Nutrición' | 'Social' | 'Descanso' | 'Mente' | 'Laboral' | 'Hábito' | 'Otro';

interface AchievementCategory {
  id: Category;
  label: string;
  icon: string;
}

const CATEGORIES: AchievementCategory[] = [
  { id: 'Personal', label: 'Personal', icon: 'person' },
  { id: 'Emocional', label: 'Emocional', icon: 'favorite' },
  { id: 'Salud', label: 'Salud', icon: 'fitness_center' },
  { id: 'Nutrición', label: 'Nutrición', icon: 'nutrition' },
  { id: 'Social', label: 'Social', icon: 'groups' },
  { id: 'Descanso', label: 'Descanso', icon: 'bedtime' },
  { id: 'Mente', label: 'Mente', icon: 'self_improvement' },
  { id: 'Laboral', label: 'Laboral', icon: 'work' },
  { id: 'Hábito', label: 'Hábito', icon: 'repeat' },
  { id: 'Otro', label: 'Otro', icon: 'more_horiz' },
];

const AchievementsPage: React.FC = () => {
  const navigate = useNavigate();
  const dateInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['Personal']);
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  const displayDate = new Date(selectedDate + 'T12:00:00')
    .toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    })
    .replace('.', '');

  const handleDateContainerClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        try {
          dateInputRef.current.showPicker();
        } catch (e) {
          dateInputRef.current.click();
        }
      } else {
        dateInputRef.current.click();
      }
    }
  };

  const toggleCategory = (catId: Category) => {
    setSelectedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId)
        : [...prev, catId]
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark min-h-screen font-display overflow-y-auto no-scrollbar selection:bg-primary/30 transition-colors duration-500">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md transition-colors">
        <button onClick={() => navigate(-1)} className="text-black/40 dark:text-white/40 hover:text-primary transition-all">
          <span className="material-symbols-outlined text-2xl">chevron_left</span>
        </button>
        <div className="text-center">
          <h1 className="text-black dark:text-white text-[15px] font-bold transition-colors">Nuevo Logro</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 pt-6 pb-44 space-y-9">
        {/* Title Section */}
        <div className="space-y-1">
          <h2 className="text-black dark:text-white text-[32px] font-extrabold leading-[1.1] tracking-tight transition-colors">
            Celebra tus <br/>
            <span className="text-primary">pequeñas victorias</span>
          </h2>
          <p className="text-[#5c6e64] text-sm font-medium leading-relaxed transition-colors">
            Reconocer tus avances ayuda a regular tus emociones.
          </p>
        </div>

        {/* Date Selector Section */}
        <div className="space-y-3">
          <label className="text-black/40 dark:text-white/60 text-[11px] font-black uppercase tracking-[0.2em] pl-1 transition-colors">Fecha</label>
          
          <input 
            type="date" 
            ref={dateInputRef}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="sr-only"
          />

          <div 
            onClick={handleDateContainerClick}
            className="w-full bg-white dark:bg-[#112117] border border-black/5 dark:border-white/5 rounded-[28px] p-5 flex items-center justify-between group hover:border-primary/20 active:scale-[0.985] transition-all cursor-pointer shadow-sm dark:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[18px] bg-black/5 dark:bg-[#1a2e23] border border-black/5 dark:border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                <span className="material-symbols-outlined text-2xl font-light">calendar_today</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.15em] leading-none mb-1.5 transition-colors">
                  {isToday ? 'Hoy' : 'Seleccionado'}
                </span>
                <span className="text-black dark:text-white font-black text-[20px] leading-none lowercase tracking-tight transition-colors">
                  {displayDate}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#5c6e64] group-hover:text-primary transition-colors">expand_more</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-3">
          <label className="text-black/40 dark:text-white/60 text-[11px] font-black uppercase tracking-[0.2em] pl-1 transition-colors">Descripción</label>
          <div className="relative">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="¿Qué lograste hoy? Incluso si fue pequeño, cuenta..."
              className="w-full h-44 bg-white dark:bg-[#112117] border border-black/5 dark:border-white/5 rounded-[28px] p-6 text-black dark:text-white placeholder-[#2d3a33] focus:outline-none focus:border-primary/20 focus:ring-1 focus:ring-primary/10 transition-all resize-none font-medium leading-relaxed shadow-sm dark:shadow-lg"
            ></textarea>
            <div className="absolute bottom-5 right-6 text-primary/30">
              <span className="material-symbols-outlined text-[20px] filled">edit_note</span>
            </div>
          </div>
        </div>

        {/* Category Selector Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-black/40 dark:text-white/60 text-[11px] font-black uppercase tracking-[0.2em] transition-colors">Categoría</label>
            <span className="text-[10px] text-primary/60 font-bold uppercase tracking-wider">{selectedCategories.length} seleccionadas</span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-5 py-3.5 rounded-[20px] border-2 transition-all duration-300 font-bold text-sm ${
                    isSelected
                    ? 'bg-primary border-primary text-[#0d1611] shadow-[0_8px_25px_rgba(25,230,107,0.3)] scale-105 z-10'
                    : 'bg-white dark:bg-[#112117]/60 border-black/5 dark:border-white/5 text-[#5c6e64] dark:text-[#5c6e64] hover:border-primary/20 hover:text-black dark:hover:text-white/80'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'filled' : ''}`}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer / Guardar Button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent z-40 transition-colors">
        <button 
          onClick={() => navigate('/dashboard')}
          disabled={selectedCategories.length === 0}
          className={`w-full h-15 rounded-[22px] flex items-center justify-center gap-3 transition-all font-black text-lg ${
            selectedCategories.length > 0 
            ? 'bg-primary text-[#0d1611] shadow-lg active:scale-[0.97]' 
            : 'bg-black/10 dark:bg-[#1a2e23] text-[#5c6e64] opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="material-symbols-outlined font-black">check_circle</span>
          <span>{selectedCategories.length > 0 ? 'Guardar Logro' : 'Selecciona una categoría'}</span>
        </button>
      </div>
    </div>
  );
};

export default AchievementsPage;
