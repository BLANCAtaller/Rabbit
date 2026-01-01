
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

const ToolsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleWhatsAppContact = () => {
    const phoneNumber = "5219831077621";
    const message = encodeURIComponent("Hola Psic. Giovanna, necesito una sesión de emergencia. Me encuentro en una situación de crisis somato-emocional.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-500">
      <div className="h-10 w-full shrink-0"></div>
      
      <header className="px-6 pb-6 pt-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(25,230,107,0.8)]"></span>
          <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{t('tools.arsenal')}</h2>
        </div>
        <h1 className="text-[28px] font-extrabold text-black dark:text-white leading-tight transition-colors">{t('tools.title')}</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-40 space-y-12">
        
        {/* RESCATE INMEDIATO */}
        <section className="space-y-5">
          <ToolCategoryTitle title={t('tools.immediate')} icon="emergency" color="text-red-500" />
          <ToolCard 
            title={t('tools.emergency.title')} 
            description={t('tools.emergency.desc')} 
            icon="support_agent" 
            onClick={handleWhatsAppContact}
            tag="Urgente"
            time="24/7"
            theme="red"
            highlight
          />
          <ToolCard 
            title={t('tools.sos.title')} 
            description={t('tools.sos.desc')} 
            icon="warning" 
            onClick={() => navigate('/sos')}
            tag="Prioridad"
            time="2 min"
            theme="red"
          />
          <ToolCard 
            title={t('tools.stop.title')} 
            description={t('tools.stop.desc')} 
            icon="pan_tool" 
            onClick={() => navigate('/stop-technique')} 
            tag="Control"
            time="1 min"
            theme="red"
          />
        </section>

        {/* GESTIÓN DE IMPULSOS */}
        <section className="space-y-5">
          <ToolCategoryTitle title={t('tools.impulses')} icon="waves" color="text-orange-500" />
          <ToolCard 
            title={t('tools.surfing.title')} 
            description={t('tools.surfing.desc')} 
            icon="surfing" 
            onClick={() => navigate('/urge-surfing')} 
            tag="Foco"
            time="10 min"
            theme="orange"
          />
          <ToolCard 
            title={t('tools.grounding.title')} 
            description={t('tools.grounding.desc')} 
            icon="visibility" 
            onClick={() => navigate('/grounding')} 
            tag="Zen"
            time="5 min"
            theme="orange"
          />
          <ToolCard 
            title={t('tools.hunger.title')} 
            description={t('tools.hunger.desc')} 
            icon="restaurant" 
            onClick={() => navigate('/hunger-mapping')} 
            time="2 min"
            tag="Nutrición"
            theme="orange"
          />
        </section>

        {/* CUERPO Y CONCIENCIA */}
        <section className="space-y-5">
          <ToolCategoryTitle title={t('tools.body_mind')} icon="self_improvement" color="text-primary" />
          <ToolCard 
            title={t('dash.breathing_title')} 
            description={t('tools.emergency.desc')} 
            icon="air" 
            onClick={() => navigate('/breathing')}
            time="3 min"
            tag="Básico"
            theme="green"
          />
          <ToolCard 
            title={t('tools.mindful_eat.title')} 
            description={t('tools.mindful_eat.desc')} 
            icon="dining" 
            onClick={() => navigate('/mindful-eating')} 
            time="15 min"
            tag="Hábito"
            theme="green"
          />
          <ToolCard 
            title={t('tools.body_scan.title')} 
            description={t('tools.body_scan.desc')} 
            icon="accessibility_new" 
            onClick={() => navigate('/body-scan')} 
            time="8 min"
            tag="Conexión"
            theme="green"
          />
          <ToolCard 
            title={t('tools.stretches.title')} 
            description={t('tools.stretches.desc')} 
            icon="fitness_center" 
            onClick={() => navigate('/stretches')} 
            time="5 min"
            tag="Movimiento"
            theme="green"
          />
        </section>

        {/* ANÁLISIS E IA */}
        <section className="space-y-5">
          <ToolCategoryTitle title={t('tools.analysis')} icon="psychology" color="text-blue-500" />
          <ToolCard 
            title={t('dash.ai_guides')} 
            description="Identificando Detonantes"
            icon="lightbulb" 
            onClick={() => navigate('/reflection-guides')}
            time="10 min"
            tag="IA"
            theme="blue"
          />
          <ToolCard 
            title={t('dash.diary_title')} 
            description={t('dash.diary_desc')} 
            icon="menu_book" 
            onClick={() => navigate('/emotion-diary')}
            time="5 min"
            tag="Proceso"
            theme="blue"
          />
          <ToolCard 
            title={t('dash.gratitude_title')} 
            description="Agradece a tu cuerpo." 
            icon="auto_awesome" 
            onClick={() => navigate('/gratitude')} 
            time="3 min"
            tag="Autoestima"
            theme="blue"
          />
        </section>

        {/* SEGUIMIENTO */}
        <section className="space-y-5">
          <ToolCategoryTitle title={t('tools.goals')} icon="auto_graph" color="text-yellow-500" />
          <ToolCard 
            title={t('dash.checkin_title')} 
            description={t('dash.checkin_desc')} 
            icon="check_circle" 
            onClick={() => navigate('/check-in')}
            time="1 min"
            tag="Diario"
            theme="yellow"
          />
          <ToolCard 
            title={t('tools.achievements.title')} 
            description={t('tools.achievements.desc')} 
            icon="emoji_events" 
            onClick={() => navigate('/achievements')}
            time="3 min"
            tag="Motivación"
            theme="yellow"
          />
        </section>
      </main>
    </div>
  );
};

const ToolCategoryTitle = ({ title, icon, color }: { title: string, icon: string, color: string }) => (
  <div className="flex items-center gap-3 mb-4 px-1">
    <div className={`w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center ${color} transition-colors`}>
       <span className="material-symbols-outlined text-[18px] filled">{icon}</span>
    </div>
    <h3 className="text-[11px] font-black text-black/40 dark:text-white/40 uppercase tracking-[0.2em] transition-colors">{title}</h3>
  </div>
);

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
  tag: string;
  time: string;
  theme: 'red' | 'orange' | 'green' | 'blue' | 'yellow';
  highlight?: boolean;
}

const ToolCard = ({ title, description, icon, onClick, tag, time, theme, highlight }: ToolCardProps) => {
  const themes = {
    red: { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', iconBg: 'bg-red-500/20', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.2)]' },
    orange: { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', iconBg: 'bg-orange-500/20', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]' },
    green: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', iconBg: 'bg-primary/20', glow: 'shadow-[0_0_15px_rgba(25,230,107,0.2)]' },
    blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', iconBg: 'bg-blue-500/20', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' },
    yellow: { text: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', iconBg: 'bg-yellow-500/20', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.2)]' }
  };

  const currentTheme = themes[theme];

  return (
    <button 
      onClick={onClick}
      className={`w-full rounded-[28px] p-5 border flex items-center gap-5 text-left transition-all group active:scale-[0.98] ${
        highlight 
        ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10' 
        : 'bg-white dark:bg-[#112117] border-black/5 dark:border-white/[0.03] hover:bg-black/5 dark:hover:bg-[#15291d] shadow-sm dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)]'
      }`}
    >
      <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5 group-hover:scale-110 transition-all shadow-inner ${
        highlight ? 'bg-red-500/20 text-red-500 border-red-500/30' : `bg-background-light dark:bg-[#0d1611] ${currentTheme.text} ${currentTheme.glow}`
      }`}>
        <span className="material-symbols-outlined text-[28px] filled">{icon}</span>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-bold text-[17px] leading-tight ${currentTheme.text}`}>{title}</h4>
          <span className={`material-symbols-outlined ${currentTheme.text} text-[20px] opacity-20 group-hover:opacity-100 transition-all`}>chevron_right</span>
        </div>
        
        <p className="text-[#a0afaa] text-[13px] font-medium leading-relaxed mb-4 line-clamp-2 pr-2">{description}</p>
        
        <div className="flex items-center gap-4">
          {time && (
            <div className="flex items-center gap-1.5 text-[10px] text-[#5c6e64] bg-black/5 dark:bg-black/30 px-2.5 py-1 rounded-md font-bold border border-black/5 dark:border-white/5 transition-colors">
              <span className="material-symbols-outlined text-[14px] opacity-40">timer</span>
              {time}
            </div>
          )}
          {tag && (
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${highlight ? 'bg-red-500 animate-pulse' : currentTheme.bg.replace('10', '100').replace('bg-', 'bg-')} shadow-[0_0_5px_currentColor]`}></div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${currentTheme.text}`}>{tag}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ToolsPage;
