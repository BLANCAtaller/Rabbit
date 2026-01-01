
export interface ActivityDetails {
  [key: string]: any;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  value: string;
  icon: string;
  color: string;
  date: string; // Formato YYYY-M-D
  timestamp: number;
  details: ActivityDetails;
}

const STORAGE_KEY = 'chase_the_rabbit_activities';

export const saveActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
  const activities = getActivities();
  const newActivity: Activity = {
    ...activity,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: Date.now()
  };
  
  activities.push(newActivity);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  return newActivity;
};

export const getActivities = (): Activity[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearActivities = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * Exporta el historial actual a un archivo JSON descargable
 */
export const exportHistory = () => {
  const activities = getActivities();
  const profile = localStorage.getItem('chase_the_rabbit_profile');
  const data = {
    activities,
    profile: profile ? JSON.parse(profile) : null,
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chase_the_rabbit_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/**
 * Importa datos desde un string JSON (archivo subido)
 */
export const importHistory = (jsonData: string): boolean => {
  try {
    const parsed = JSON.parse(jsonData);
    if (parsed.activities && Array.isArray(parsed.activities)) {
      // Fusionar actividades evitando duplicados por ID
      const current = getActivities();
      const currentIds = new Set(current.map(a => a.id));
      const newOnes = parsed.activities.filter((a: Activity) => !currentIds.has(a.id));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, ...newOnes]));
      
      // Si el backup trae perfil y no tenemos uno, o queremos sobreescribirlo (aquí lo sobreescribimos por simplicidad)
      if (parsed.profile) {
        localStorage.setItem('chase_the_rabbit_profile', JSON.stringify(parsed.profile));
      }
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error al importar datos", e);
    return false;
  }
};

export const seedHistoryData = () => {
  const currentActivities = getActivities();
  
  // Si ya tenemos una cantidad considerable de datos, no sobreescribimos.
  // Pero si el usuario pide ver más meses y solo tiene los 3 antiguos, forzamos el re-seed.
  if (currentActivities.length > 100) return;

  const seeded: Activity[] = [];
  
  const sensationsPool = [
    'Feliz', 'Tranquilo', 'Normal', 'Energía', 'Calma', 'Ansiedad leve', 'Antojos', 'Fatiga', 'Tensión', 'Cansancio'
  ];

  const toolsPool = [
    { type: 'stop', title: 'Técnica STOP', icon: 'pan_tool', color: 'text-red-400', value: 'Completada' },
    { type: 'urge', title: 'Urge Surfing', icon: 'surfing', color: 'text-orange-400', value: 'Ola Surfeada' },
    { type: 'breathing', title: 'Respiración', icon: 'air', color: 'text-primary', value: '3 min' },
    { type: 'hunger', title: 'Mapeo de Hambre', icon: 'restaurant', color: 'text-orange-400', value: 'Identificado' },
    { type: 'gratitude', title: 'Gratitud Somática', icon: 'auto_awesome', color: 'text-blue-400', value: 'Finalizado' },
    { type: 'achievement', title: 'Logro Registrado', icon: 'emoji_events', color: 'text-yellow-400', value: 'Personal' }
  ];

  // Rango ampliado para demostración: del 1 de JUNIO al 31 de Diciembre de 2025
  const startDate = new Date(2025, 5, 1); // Junio es mes 5 (0-indexed)
  const endDate = new Date(2025, 11, 31); // Diciembre es mes 11

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const dateKey = `${year}-${month}-${day}`;
    const timestamp = currentDate.getTime();

    // Probabilidad de Check-in (85%)
    if (Math.random() < 0.85) {
      const dailySensations: string[] = [];
      const numSens = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numSens; j++) {
        const s = sensationsPool[Math.floor(Math.random() * sensationsPool.length)];
        if (!dailySensations.includes(s)) dailySensations.push(s);
      }

      // El ánimo fluctúa un poco más según el mes para realismo
      const seasonalityFactor = month < 8 ? 5 : 0; // Un poco más de ánimo en meses de verano

      seeded.push({
        id: `checkin-${dateKey}-${Math.random().toString(36).substr(2, 4)}`,
        type: 'checkin',
        title: 'Check-in Diario',
        value: 'Completado',
        icon: 'check_circle',
        color: 'text-primary',
        date: dateKey,
        timestamp: timestamp,
        details: {
          sensations: dailySensations,
          mood: 55 + seasonalityFactor + (Math.random() * 30),
          reflection: "Sesión de monitoreo somático realizada."
        }
      });
    }

    // Probabilidad de usar una herramienta (40%)
    if (Math.random() < 0.4) {
      const tool = toolsPool[Math.floor(Math.random() * toolsPool.length)];
      seeded.push({
        id: `tool-${dateKey}-${Math.random().toString(36).substr(2, 4)}`,
        type: tool.type,
        title: tool.title,
        value: tool.value,
        icon: tool.icon,
        color: tool.color,
        date: dateKey,
        timestamp: timestamp + 3600000,
        details: { result: 'Práctica de regulación completada.' }
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
};
