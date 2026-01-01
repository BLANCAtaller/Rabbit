
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ESPAÑOL' | 'ENGLISH';

interface Translations {
  [key: string]: {
    [K in Language]: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.home': { ESPAÑOL: 'Inicio', ENGLISH: 'Home' },
  'nav.tools': { ESPAÑOL: 'Herramientas', ENGLISH: 'Tools' },
  'nav.progress': { ESPAÑOL: 'Progreso', ENGLISH: 'Progress' },
  'nav.profile': { ESPAÑOL: 'Perfil', ENGLISH: 'Profile' },

  // Dashboard
  'dash.safe_space': { ESPAÑOL: 'Tu Espacio Seguro', ENGLISH: 'Your Safe Space' },
  'dash.control_panel': { ESPAÑOL: 'Panel de Control', ENGLISH: 'Control Panel' },
  'dash.somatic_status': { ESPAÑOL: 'Estado Somático', ENGLISH: 'Somatic Status' },
  'dash.alert_zone': { ESPAÑOL: 'Zona de Alerta Amarilla', ENGLISH: 'Yellow Alert Zone' },
  'dash.body_pause': { ESPAÑOL: 'Tu cuerpo pide pausa. Usa estas herramientas para regular tus emociones.', ENGLISH: 'Your body needs a pause. Use these tools to regulate your emotions.' },
  'dash.daily_practice': { ESPAÑOL: 'Práctica Diaria', ENGLISH: 'Daily Practice' },
  'dash.checkin_title': { ESPAÑOL: 'Check-in Diario', ENGLISH: 'Daily Check-in' },
  'dash.checkin_desc': { ESPAÑOL: 'Comienza aquí. Evalúa tu estado general antes de profundizar.', ENGLISH: 'Start here. Assess your general state before going deeper.' },
  'dash.diary_title': { ESPAÑOL: 'Diario de Emociones', ENGLISH: 'Emotion Diary' },
  'dash.diary_desc': { ESPAÑOL: 'Registra y comprende tus sentimientos para identificar patrones.', ENGLISH: 'Record and understand your feelings to identify patterns.' },
  'dash.breathing_title': { ESPAÑOL: 'Respiración', ENGLISH: 'Breathing' },
  'dash.breathing_desc': { ESPAÑOL: 'Ejercicios guiados para gestionar el estrés.', ENGLISH: 'Guided exercises to manage stress.' },
  'dash.analysis_section': { ESPAÑOL: 'Análisis y Reflexión', ENGLISH: 'Analysis & Reflection' },
  'dash.ai_guides': { ESPAÑOL: 'Guías de Reflexión IA', ENGLISH: 'AI Reflection Guides' },
  'dash.gratitude_title': { ESPAÑOL: 'Gratitud Somática', ENGLISH: 'Somatic Gratitude' },

  // Profile
  'prof.title': { ESPAÑOL: 'Mi Perfil', ENGLISH: 'My Profile' },
  'prof.member_since': { ESPAÑOL: 'Miembro desde 2023', ENGLISH: 'Member since 2023' },
  'prof.my_account': { ESPAÑOL: 'Mi Cuenta', ENGLISH: 'My Account' },
  'prof.edit': { ESPAÑOL: 'Editar Perfil', ENGLISH: 'Edit Profile' },
  'prof.password': { ESPAÑOL: 'Cambiar Contraseña', ENGLISH: 'Change Password' },
  'prof.settings': { ESPAÑOL: 'Configuración', ENGLISH: 'Settings' },
  'prof.language': { ESPAÑOL: 'Idioma', ENGLISH: 'Language' },
  'prof.dark_mode': { ESPAÑOL: 'Modo Oscuro', ENGLISH: 'Dark Mode' },
  'prof.data': { ESPAÑOL: 'Manejo de Datos', ENGLISH: 'Data Management' },
  'prof.export': { ESPAÑOL: 'Exportar Historial', ENGLISH: 'Export History' },
  'prof.delete': { ESPAÑOL: 'Eliminar Cuenta', ENGLISH: 'Delete Account' },
  'prof.logout': { ESPAÑOL: 'Cerrar Sesión', ENGLISH: 'Logout' },
  'prof.select_lang': { ESPAÑOL: 'Seleccionar Idioma', ENGLISH: 'Select Language' },

  // Tools Page
  'tools.arsenal': { ESPAÑOL: 'Tu Arsenal', ENGLISH: 'Your Arsenal' },
  'tools.title': { ESPAÑOL: 'Biblioteca de Herramientas', ENGLISH: 'Tools Library' },
  'tools.immediate': { ESPAÑOL: 'Rescate Inmediato', ENGLISH: 'Immediate Rescue' },
  'tools.impulses': { ESPAÑOL: 'Gestión de Impulsos', ENGLISH: 'Impulse Management' },
  'tools.body_mind': { ESPAÑOL: 'Mente y Cuerpo', ENGLISH: 'Body & Mind' },
  'tools.analysis': { ESPAÑOL: 'Análisis y Reflexión', ENGLISH: 'Analysis & Reflection' },
  'tools.goals': { ESPAÑOL: 'Seguimiento de Metas', ENGLISH: 'Goal Tracking' },
  
  // Specific Tools
  'tools.emergency.title': { ESPAÑOL: 'Sesión de Emergencia', ENGLISH: 'Emergency Session' },
  'tools.emergency.desc': { ESPAÑOL: 'Contactar a la Psic. Giovanna Bardales inmediatamente vía WhatsApp.', ENGLISH: 'Contact Psych. Giovanna Bardales immediately via WhatsApp.' },
  'tools.sos.title': { ESPAÑOL: 'Protocolo SOS', ENGLISH: 'SOS Protocol' },
  'tools.sos.desc': { ESPAÑOL: 'Pasos críticos para desescalar una crisis emocional o física.', ENGLISH: 'Critical steps to de-escalate an emotional or physical crisis.' },
  'tools.stop.title': { ESPAÑOL: 'Técnica STOP', ENGLISH: 'STOP Technique' },
  'tools.stop.desc': { ESPAÑOL: 'Para, Respira, Observa y Procede. Detén el impulso antes de actuar.', ENGLISH: 'Stop, Breathe, Observe, and Proceed. Halt the impulse before acting.' },
  'tools.surfing.title': { ESPAÑOL: 'Urge Surfing', ENGLISH: 'Urge Surfing' },
  'tools.surfing.desc': { ESPAÑOL: 'Aprende a surfear la ola del antojo sin luchar contra ella.', ENGLISH: 'Learn to surf the craving wave without fighting against it.' },
  'tools.grounding.title': { ESPAÑOL: 'Grounding 5-4-3-2-1', ENGLISH: 'Grounding 5-4-3-2-1' },
  'tools.grounding.desc': { ESPAÑOL: 'Desactiva la ansiedad usando tus 5 sentidos en el presente.', ENGLISH: 'Defuse anxiety using your 5 senses in the present moment.' },
  'tools.hunger.title': { ESPAÑOL: 'Mapeo de Hambre', ENGLISH: 'Hunger Mapping' },
  'tools.hunger.desc': { ESPAÑOL: 'Identifica si es hambre física, emocional o simplemente sed.', ENGLISH: 'Identify if it is physical hunger, emotional hunger, or just thirst.' },
  'tools.mindful_eat.title': { ESPAÑOL: 'Alimentación Consciente', ENGLISH: 'Mindful Eating' },
  'tools.mindful_eat.desc': { ESPAÑOL: 'Guía paso a paso para disfrutar tu comida sin culpa ni prisa.', ENGLISH: 'Step-by-step guide to enjoy your food without guilt or haste.' },
  'tools.body_scan.title': { ESPAÑOL: 'Escaneo Corporal', ENGLISH: 'Body Scan' },
  'tools.body_scan.desc': { ESPAÑOL: 'Localiza y libera la tensión acumulada en tus órganos.', ENGLISH: 'Locate and release accumulated tension in your organs.' },
  'tools.stretches.title': { ESPAÑOL: 'Estiramientos Suaves', ENGLISH: 'Gentle Stretches' },
  'tools.stretches.desc': { ESPAÑOL: 'Movimientos para liberar cortisol y relajar la fascia.', ENGLISH: 'Movements to release cortisol and relax the fascia.' },
  'tools.achievements.title': { ESPAÑOL: 'Registro de Logros', ENGLISH: 'Achievements Log' },
  'tools.achievements.desc': { ESPAÑOL: 'Celebra tus victorias para mantener alta la dopamina saludable.', ENGLISH: 'Celebrate your victories to keep healthy dopamine levels high.' },

  // Sensations / Emotions
  'emotion.Ansiedad leve': { ESPAÑOL: 'Ansiedad leve', ENGLISH: 'Mild Anxiety' },
  'emotion.Antojos': { ESPAÑOL: 'Antojos', ENGLISH: 'Cravings' },
  'emotion.Fatiga': { ESPAÑOL: 'Fatiga', ENGLISH: 'Fatigue' },
  'emotion.Hambre emocional': { ESPAÑOL: 'Hambre emocional', ENGLISH: 'Emotional Hunger' },
  'emotion.Tranquilo': { ESPAÑOL: 'Tranquilo', ENGLISH: 'Calm' },
  'emotion.Feliz': { ESPAÑOL: 'Feliz', ENGLISH: 'Happy' },
  'emotion.Normal': { ESPAÑOL: 'Normal', ENGLISH: 'Normal' },
  'emotion.Tensión': { ESPAÑOL: 'Tensión', ENGLISH: 'Tension' },
  'emotion.Cansancio': { ESPAÑOL: 'Cansancio', ENGLISH: 'Tiredness' },
  'emotion.Energía': { ESPAÑOL: 'Energía', ENGLISH: 'Energy' },
  'emotion.Tristeza': { ESPAÑOL: 'Tristeza', ENGLISH: 'Sadness' },
  'emotion.Calma': { ESPAÑOL: 'Calma', ENGLISH: 'Peace' },

  // Progress Page
  'prog.title': { ESPAÑOL: 'Tu Progreso', ENGLISH: 'Your Progress' },
  'prog.analysis': { ESPAÑOL: 'ANÁLISIS DE ACTIVIDAD', ENGLISH: 'ACTIVITY ANALYSIS' },
  'prog.week': { ESPAÑOL: 'Semana', ENGLISH: 'Week' },
  'prog.month': { ESPAÑOL: 'Mes', ENGLISH: 'Month' },
  'prog.total': { ESPAÑOL: 'Total', ENGLISH: 'Total' },
  'prog.streak': { ESPAÑOL: 'RACHA', ENGLISH: 'STREAK' },
  'prog.days': { ESPAÑOL: 'DÍAS', ENGLISH: 'DAYS' },
  'prog.best': { ESPAÑOL: 'MEJOR', ENGLISH: 'BEST' },
  'prog.checkins': { ESPAÑOL: 'CHECK-INS', ENGLISH: 'CHECK-INS' },
  'prog.latent_emotions': { ESPAÑOL: 'Emociones más Latentes', ENGLISH: 'Latent Emotions' },
  'prog.high': { ESPAÑOL: 'ALTA', ENGLISH: 'HIGH' },
  'prog.mid': { ESPAÑOL: 'MEDIA', ENGLISH: 'MEDIUM' },
  'prog.low': { ESPAÑOL: 'BAJA', ENGLISH: 'LOW' },
  'prog.other_emotions': { ESPAÑOL: 'Otras Emociones', ENGLISH: 'Other Emotions' },
  'prog.remaining': { ESPAÑOL: 'restante', ENGLISH: 'remaining' },
  'prog.recommended': { ESPAÑOL: 'Enfoque Recomendado', ENGLISH: 'Recommended Focus' },
  'prog.tip': { ESPAÑOL: 'Excelente equilibrio. Mantén tu racha con un check-in nocturno.', ENGLISH: 'Excellent balance. Keep your streak going with a nightly check-in.' },
  'prog.patterns': { ESPAÑOL: 'PATRONES DE SÍNTOMAS', ENGLISH: 'SYMPTOM PATTERNS' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ESPAÑOL');

  useEffect(() => {
    const saved = localStorage.getItem('chase_the_rabbit_lang') as Language;
    if (saved && (saved === 'ESPAÑOL' || saved === 'ENGLISH')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('chase_the_rabbit_lang', lang);
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within a LanguageProvider');
  return context;
};
