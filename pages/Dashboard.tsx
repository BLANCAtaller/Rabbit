
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-[#0d1611] transition-colors duration-500">
      <div className="h-10 w-full shrink-0"></div>
      
      <header className="px-6 pb-6 pt-2 flex justify-between items-center z-10">
        <div>
          <h2 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">{t('dash.safe_space')}</h2>
          <h1 className="text-[28px] font-extrabold text-black dark:text-white leading-tight">{t('dash.control_panel')}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/history')}
            className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1a2e23] border border-black/5 dark:border-white/5 flex items-center justify-center text-primary hover:bg-black/5 dark:hover:bg-[#22382b] transition-all shadow-sm dark:shadow-lg neon-glow"
          >
            <span className="material-symbols-outlined text-2xl filled">calendar_today</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="w-12 h-12 rounded-full bg-white dark:bg-[#1a2e23] border border-black/10 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/80 hover:text-black dark:hover:text-white transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-2xl">person</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-44 space-y-10">
        {/* Somatic Status Card */}
        <div 
          onClick={() => navigate('/sos')}
          className="relative rounded-[32px] overflow-hidden bg-white dark:bg-[#112117] p-6 border border-orange-400/20 cursor-pointer hover:border-orange-400/40 transition-all shadow-sm dark:shadow-xl group"
        >
          <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[80px] text-orange-400">psychology</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 text-orange-400">
              <span className="material-symbols-outlined text-xl filled">warning</span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest">{t('dash.somatic_status')}</span>
            </div>
            <h3 className="text-black dark:text-white text-xl font-black mb-2 tracking-tight">{t('dash.alert_zone')}</h3>
            <p className="text-[#a0afaa] text-sm font-medium leading-relaxed max-w-[260px]">
              {t('dash.body_pause')}
            </p>
          </div>
        </div>

        {/* Práctica Diaria */}
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-base font-black text-black dark:text-white flex items-center gap-2 italic uppercase tracking-tight">
              <span className="material-symbols-outlined text-primary text-xl filled">self_improvement</span>
              {t('dash.daily_practice')}
            </h3>
            <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">Regulación</span>
          </div>
          
          <div className="space-y-4">
            <DashboardCard 
              title={t('dash.checkin_title')}
              description={t('dash.checkin_desc')}
              time="1 min"
              tag="Inicio"
              icon="check_circle"
              theme="yellow"
              onClick={() => navigate('/check-in')}
            />
            <DashboardCard 
              title={t('dash.diary_title')}
              description={t('dash.diary_desc')}
              time="5 min"
              tag="Sugerido"
              icon="menu_book"
              theme="blue"
              onClick={() => navigate('/emotion-diary')}
            />
            <DashboardCard 
              title={t('dash.breathing_title')}
              description={t('dash.breathing_desc')}
              time="3 min"
              tag="Pausa"
              icon="air"
              theme="green"
              onClick={() => navigate('/breathing')}
            />
          </div>
        </section>

        {/* Análisis y Reflexión */}
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-base font-black text-black dark:text-white flex items-center gap-2 italic uppercase tracking-tight">
              <span className="material-symbols-outlined text-blue-400 text-xl filled">chat_bubble</span>
              {t('dash.analysis_section')}
            </h3>
            <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-400/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">Profundo</span>
          </div>
          <div className="space-y-4">
            <DashboardCard 
              title={t('dash.ai_guides')}
              description="Identificando Detonantes"
              icon="lightbulb"
              time="10 min"
              tag="IA"
              theme="blue"
              progress={40}
              onClick={() => navigate('/reflection-guides')}
            />
            <DashboardCard 
              title={t('dash.gratitude_title')}
              description="Agradece a tu cuerpo."
              icon="auto_awesome"
              time="3 min"
              tag="Bienestar"
              theme="blue"
              onClick={() => navigate('/gratitude')}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  time?: string;
  tag?: string;
  icon: string;
  theme: 'red' | 'orange' | 'green' | 'blue' | 'yellow';
  onClick?: () => void;
  progress?: number;
  progressText?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, description, time, tag, icon, theme, onClick, progress, progressText 
}) => {
  const themes = {
    red: { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', iconBg: 'bg-red-400/20', glow: 'shadow-[0_0_20px_rgba(248,113,113,0.2)]' },
    orange: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', iconBg: 'bg-orange-400/20', glow: 'shadow-[0_0_20px_rgba(251,146,60,0.2)]' },
    green: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', iconBg: 'bg-primary/20', glow: 'shadow-[0_0_20px_rgba(25,230,107,0.2)]' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', iconBg: 'bg-blue-400/20', glow: 'shadow-[0_0_20px_rgba(96,165,250,0.2)]' },
    yellow: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', iconBg: 'bg-yellow-400/20', glow: 'shadow-[0_0_20px_rgba(250,204,21,0.2)]' }
  };

  const currentTheme = themes[theme];

  return (
    <button onClick={onClick} className="w-full text-left group active:scale-[0.98] transition-transform">
      <div className={`bg-white dark:bg-[#112117] rounded-[30px] p-5 border border-black/5 dark:border-white/[0.04] transition-all duration-300 shadow-sm dark:shadow-[0_15px_35px_rgba(0,0,0,0.3)] relative overflow-hidden hover:bg-black/5 dark:hover:bg-[#162a1d] hover:border-black/10 dark:hover:border-white/10`}>
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-[22px] bg-background-light dark:bg-[#0d1611] flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5 transition-transform group-hover:scale-105 shadow-inner ${currentTheme.text} ${currentTheme.glow}`}>
            <span className={`material-symbols-outlined text-[28px] filled`}>{icon}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className={`font-black text-[17px] leading-tight mb-1 transition-colors ${currentTheme.text}`}>{title}</h4>
              <span className="material-symbols-outlined text-[#3c4a41] text-[20px] opacity-20 group-hover:opacity-100 transition-opacity">chevron_right</span>
            </div>
            
            <p className="text-[#a0afaa] text-[13px] font-medium leading-relaxed mb-4 pr-6 line-clamp-2">{description}</p>
            
            {progress !== undefined && (
              <div className="mt-1 mb-4">
                <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full rounded-full ${currentTheme.bg.replace('10', '100')} ${currentTheme.glow}`} style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              {time && (
                <div className="flex items-center gap-1.5 text-[10px] text-[#5c6e64] bg-black/5 dark:bg-black/40 px-2.5 py-1 rounded-lg font-bold border border-black/5 dark:border-white/5">
                  <span className="material-symbols-outlined text-[14px] opacity-40">timer</span>
                  {time}
                </div>
              )}
              {tag && (
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.bg.replace('10', '100')} ${currentTheme.glow}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${currentTheme.text}`}>{tag}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Dashboard;
