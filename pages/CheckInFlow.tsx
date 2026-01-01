
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { EMOTIONS, INITIAL_SYMPTOMS, TAXONOMY } from '../constants';
import { EmotionType, CheckInData, Symptom } from '../types';
import { saveActivity } from '../historyService';

const CheckInFlow: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CheckInData>({
    mood: 65,
    physicalSensations: [],
    mainEmotion: EmotionType.HAPPY,
    subEmotion: 'Optimista',
    matices: [],
    symptoms: INITIAL_SYMPTOMS,
    reflection: {
      thoughts: '',
      emotionLatent: '',
      processing: '',
    }
  });

  const nextStep = () => {
    if (step === 4) {
      // GUARDAR EN EL HISTORIAL AL TERMINAR LA REFLEXIÓN
      const now = new Date();
      const selectedSymptoms = data.symptoms
        .filter(s => s.selected)
        .map(s => s.name);

      saveActivity({
        type: 'checkin',
        title: 'Check-in Diario',
        value: 'Completado',
        icon: 'check_circle',
        color: 'text-primary',
        date: `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`,
        details: {
          symptoms: selectedSymptoms,
          sensations: data.physicalSensations, // GUARDAMOS LAS SENSACIONES ELEGIDAS
          mood: data.mood,
          mainEmotion: data.mainEmotion,
          reflection: data.reflection.thoughts || 'Check-in realizado'
        }
      });
      setStep(5);
    } else if (step < 5) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <StepMood data={data} setData={setData} />;
      case 2: return <StepEmotion data={data} setData={setData} />;
      case 3: return <StepSomatic data={data} setData={setData} />;
      case 4: return <StepReflection data={data} setData={setData} />;
      case 5: return <StepSummary data={data} />;
      default: return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-dark min-h-screen">
      <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-30 bg-background-dark/95 backdrop-blur-md">
        <button onClick={prevStep} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 italic uppercase">{t('dash.checkin_title')}</h2>
      </header>

      <div className="px-6 py-2 sticky top-[60px] z-30 bg-background-dark/95 backdrop-blur-md">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-400 text-[10px] font-extrabold uppercase tracking-[0.15em]">PASO {step} DE 5</p>
          <p className="text-gray-500 text-[10px] font-bold">Progreso</p>
        </div>
        <div className="h-1.5 w-full bg-[#112117] rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-primary transition-all duration-700 ease-out shadow-[0_0_15px_rgba(25,230,107,0.4)]"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <main className="flex-1 flex flex-col px-6 py-4 overflow-y-auto pb-40 no-scrollbar">
        {renderStep()}
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent z-40 pointer-events-none">
        <button 
          onClick={nextStep}
          className="pointer-events-auto w-full h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-3 shadow-[0_8px_30px_rgba(25,230,107,0.3)] text-background-dark font-black text-lg italic uppercase"
        >
          {step === 4 ? (
            <>
              <span className="material-symbols-outlined filled font-bold">check_circle</span>
              <span>Finalizar Check-in</span>
            </>
          ) : (
            <>
              <span>{step === 5 ? 'Volver al Inicio' : 'Continuar'}</span>
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- STEP COMPONENTS ---

const StepMood: React.FC<{ data: CheckInData, setData: any }> = ({ data, setData }) => {
  const { t } = useTranslation();
  const sensations = [
    'Ansiedad leve', 'Antojos', 'Fatiga', 'Hambre emocional', 'Tranquilo', 'Feliz', 'Normal', 'Tensión', 'Cansancio', 'Energía'
  ];
  
  const getMoodInfo = (val: number) => {
    if (val <= 20) return { label: 'Muy mal', color: 'text-red-400', icon: 'sentiment_extremely_dissatisfied', bg: 'bg-red-400/10' };
    if (val <= 40) return { label: 'Mal', color: 'text-orange-400', icon: 'sentiment_dissatisfied', bg: 'bg-orange-400/10' };
    if (val <= 60) return { label: 'Regular', color: 'text-yellow-400', icon: 'sentiment_neutral', bg: 'bg-yellow-400/10' };
    if (val <= 85) return { label: 'Bien', color: 'text-primary', icon: 'sentiment_satisfied', bg: 'bg-primary/10' };
    return { label: 'Excelente', color: 'text-primary', icon: 'sentiment_very_satisfied', bg: 'bg-primary/20' };
  };

  const moodInfo = getMoodInfo(data.mood);

  return (
    <>
      <div className="flex flex-col items-center mt-4 mb-8">
        <div className={`size-20 rounded-full ${moodInfo.bg} flex items-center justify-center mb-6 ${moodInfo.color} ring-1 ring-white/5 transition-all duration-500 shadow-lg`}>
          <span className="material-symbols-outlined filled transition-all duration-500 scale-125" style={{ fontSize: '40px' }}>
            {moodInfo.icon}
          </span>
        </div>
        <h1 className="text-[32px] font-extrabold text-center text-white mb-3 leading-tight tracking-tight italic uppercase">¿Cómo estás hoy?</h1>
      </div>

      <div className="bg-[#1a2e23]/60 rounded-[28px] p-7 border border-white/5 mb-8 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <span className="text-[17px] font-bold text-white uppercase italic">Ánimo</span>
          <div className="bg-[#112117] px-4 py-1.5 rounded-xl border border-white/5">
            <span className={`text-[15px] font-black ${moodInfo.color}`}>{moodInfo.label}</span>
          </div>
        </div>
        <div className="relative w-full h-10 flex items-center justify-center px-2">
          <input 
            type="range" min="0" max="100" value={data.mood}
            onChange={(e) => setData({ ...data, mood: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-[#2d3a33] rounded-full appearance-none cursor-pointer accent-primary"
            style={{
              background: `linear-gradient(to right, #19e66b ${data.mood}%, #2d3a33 ${data.mood}%)`
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-1">
        <h3 className="text-white font-bold text-lg flex items-center gap-2 italic uppercase">
          <span className="material-symbols-outlined text-primary text-xl">accessibility_new</span>
          Sensaciones
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {sensations.map(s => (
            <button
              key={s}
              onClick={() => {
                const newSens = data.physicalSensations.includes(s) 
                  ? data.physicalSensations.filter(i => i !== s)
                  : [...data.physicalSensations, s];
                setData({ ...data, physicalSensations: newSens });
              }}
              className={`px-5 py-2.5 rounded-2xl border text-[14px] font-bold transition-all duration-300 ${
                data.physicalSensations.includes(s)
                ? 'bg-primary text-background-dark border-primary shadow-[0_0_15px_rgba(25,230,107,0.3)]'
                : 'bg-[#1a2e23]/40 border-white/5 text-[#5c6e64] hover:bg-[#1a2e23] hover:text-white'
              }`}
            >
              {t('emotion.' + s)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

const StepEmotion: React.FC<{ data: CheckInData, setData: any }> = ({ data, setData }) => {
  const currentTaxonomy = TAXONOMY[data.mainEmotion as EmotionType];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {EMOTIONS.map(e => (
          <button
            key={e.type}
            onClick={() => {
              const newTax = TAXONOMY[e.type];
              setData({ 
                ...data, 
                mainEmotion: e.type, 
                subEmotion: newTax.l2[0],
                matices: [] 
              });
            }}
            className={`h-24 rounded-[20px] transition-all duration-300 flex flex-col items-center justify-center gap-1 border-2 relative overflow-hidden ${
              data.mainEmotion === e.type 
              ? 'border-primary bg-[#1a2e23] shadow-[0_0_20px_rgba(25,230,107,0.3)] scale-[1.02] z-10' 
              : 'border-white/5 bg-[#112117]/60 hover:border-white/10'
            }`}
          >
            <span className="text-2xl mb-1">{e.emoji}</span>
            <span className="font-bold text-[15px] uppercase italic" style={{ color: e.color }}>{e.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#112117]/80 rounded-[24px] p-6 border border-white/5 space-y-5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-500 text-[20px]">subdirectory_arrow_right</span>
          <h3 className="text-[15px] font-bold text-white uppercase italic">Detalle de la emoción</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {currentTaxonomy.l2.map(se => (
            <button
              key={se}
              onClick={() => setData({ ...data, subEmotion: se, matices: [] })}
              className={`px-4 py-2 rounded-xl text-sm border transition-all duration-200 ${
                data.subEmotion === se
                ? 'bg-primary/10 border-primary text-primary font-bold shadow-[0_0_10px_rgba(25,230,107,0.15)]'
                : 'bg-[#1a2e23]/50 border-transparent text-[#5c6e64] hover:bg-[#1a2e23] hover:text-white'
              }`}
            >
              {se}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const StepSomatic: React.FC<{ data: CheckInData, setData: any }> = ({ data, setData }) => {
  const toggleSymptom = (id: string) => {
    const newSyms = data.symptoms.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    );
    setData({ ...data, symptoms: newSyms });
  };

  const updateIntensity = (id: string, val: number) => {
    const newSyms = data.symptoms.map(s => 
      s.id === id ? { ...s, intensity: val } : s
    );
    setData({ ...data, symptoms: newSyms });
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-3xl font-black tracking-tight leading-tight text-white mb-2 italic uppercase">Zonas de Tensión</h1>
        <p className="text-[#a0afaa] text-[15px] font-medium leading-relaxed">
          Selecciona donde sientes carga hoy.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.symptoms.filter(s => s.id !== 'cuerpo_completo').map(sym => (
          <button 
            key={sym.id}
            onClick={() => toggleSymptom(sym.id)} 
            className={`group flex flex-col p-4 rounded-[28px] transition-all duration-300 text-left border-2 aspect-square justify-between ${
              sym.selected 
              ? 'border-primary bg-[#1a2e23] shadow-[0_0_25px_rgba(25,230,107,0.15)]' 
              : 'border-white/5 bg-[#112117]/60'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${sym.selected ? 'bg-primary text-[#0d1611]' : 'bg-white/5 text-[#5c6e64]'}`}>
              <span className="material-symbols-outlined text-[32px] filled">{sym.icon}</span>
            </div>
            <span className={`text-[15px] font-black tracking-tight transition-colors ${sym.selected ? 'text-white' : 'text-[#5c6e64]'}`}>
              {sym.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const StepReflection: React.FC<{ data: CheckInData, setData: any }> = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-[32px] font-black tracking-tight leading-tight text-white italic uppercase">Reflexión</h1>
      <div className="space-y-4">
        <p className="text-[#a0afaa] text-[15px] font-medium leading-relaxed px-1">¿Hay algún pensamiento o situación detonante que quieras registrar?</p>
        <textarea 
          value={data.reflection.thoughts}
          onChange={(e) => setData({ ...data, reflection: { ...data.reflection, thoughts: e.target.value }})}
          placeholder="Escribe aquí libremente..."
          className="w-full h-48 bg-[#112117] rounded-[28px] border border-white/5 p-6 text-white placeholder-[#2d3a33] focus:outline-none focus:border-primary/20 transition-all resize-none font-medium"
        ></textarea>
      </div>
    </div>
  );
};

const StepSummary: React.FC<{ data: CheckInData }> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center py-10 animate-in fade-in zoom-in-95">
      <div className="size-[100px] rounded-full bg-[#1a2e23] border-2 border-primary/40 flex items-center justify-center text-primary mb-12 shadow-[0_0_40px_rgba(25,230,107,0.2)]">
        <span className="material-symbols-outlined text-[52px] filled">check_circle</span>
      </div>
      <h1 className="text-[36px] font-black text-white mb-3 tracking-tight leading-tight italic uppercase">¡Completado!</h1>
      <p className="text-[#a0afaa] text-[16px] mb-12 max-w-[280px] font-bold opacity-80 uppercase tracking-widest leading-relaxed">
        Tu registro somático ha sido guardado.
      </p>
    </div>
  );
};

export default CheckInFlow;
