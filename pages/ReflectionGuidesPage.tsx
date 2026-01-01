
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface SomaticInsight {
  question: string;
  exercise_title: string;
  exercise_desc: string;
  biology: string;
  mantra: string;
  tension_focus: string;
}

const ReflectionGuidesPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState<SomaticInsight | null>(null);

  useEffect(() => {
    const fetchAIGuide = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        // Fix: Simplified generateContent contents parameter to match library examples
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Eres un experto en neurociencia aplicada y regulación somática. 
              El usuario ha reportado fatiga aguda y tensión en el pecho/hombros durante su proceso de dieta.
              Genera un análisis somático profundo en formato JSON con los siguientes campos estrictos:
              "question": Una pregunta profunda que invite a la introspección corporal.
              "exercise_title": Nombre corto de un ejercicio de anclaje (ej: Anclaje Somático, Coherencia Cardíaca).
              "exercise_desc": Instrucción paso a paso muy clara y breve.
              "biology": Explicación breve (15 palabras max) de qué está pasando en su sistema nervioso (ej: Activación del nervio vago).
              "mantra": Una frase de poder corta.
              "tension_focus": La zona del cuerpo donde se concentra el mensaje hoy.
              Responde SOLO el JSON.`,
          config: {
            responseMimeType: "application/json",
          }
        });
        
        const data = JSON.parse(response.text || '{}');
        setInsight({
          question: data.question || "¿Qué parte de mi cuerpo está intentando llamar mi atención en este momento y qué necesita decirme?",
          exercise_title: data.exercise_title || "ANCLAJE SOMÁTICO",
          exercise_desc: data.exercise_desc || "Inhala profundo subiendo los hombros a las orejas, mantén 3 segundos y suéltalos de golpe con un suspiro fuerte.",
          biology: data.biology || "Tu sistema simpático está hiperactivado buscando seguridad a través del control.",
          mantra: data.mantra || "Estoy a salvo en este cuerpo y en este momento.",
          tension_focus: data.tension_focus || "Pecho y Hombros"
        });
      } catch (error) {
        console.error("Error fetching AI guide:", error);
        setInsight({
          question: "¿Qué parte de mi cuerpo está intentando llamar mi atención en este momento y qué necesita decirme?",
          exercise_title: "ANCLAJE SOMÁTICO",
          exercise_desc: "Inhala profundo subiendo los hombros a las orejas, mantén 3 segundos y suéltalos de golpe con un suspiro fuerte.",
          biology: "Respuesta de lucha o huida detectada en tu musculatura dorsal.",
          mantra: "Estoy a salvo en este cuerpo y en este momento.",
          tension_focus: "Hombros y Cuello"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAIGuide();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#0d1611] min-h-screen font-display selection:bg-primary/20">
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#0d1611]/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-white opacity-40 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-2xl font-light">close</span>
        </button>
        <div className="text-center">
          <h1 className="text-white text-[10px] font-black tracking-[0.4em] uppercase opacity-40">ANÁLISIS SOMÁTICO</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-8 pt-6 pb-32 flex flex-col items-center">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-primary/10 rounded-full animate-ping"></div>
              <div className="absolute inset-0 w-20 h-20 border-t-2 border-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-3xl filled animate-pulse">psychology</span>
              </div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-primary font-black uppercase tracking-[0.2em] text-[11px]">Sintonizando con tu sistema...</p>
              <p className="text-[#5c6e64] text-[10px] font-medium italic">Escuchando señales nerviosas</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <section className="flex flex-col items-center text-center space-y-6 pt-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-[0_0_30px_rgba(25,230,107,0.1)]">
                <span className="material-symbols-outlined text-3xl filled">lightbulb</span>
              </div>
              <h2 className="text-white text-[26px] font-extrabold leading-[1.25] tracking-tight px-2 italic">
                "{insight?.question}"
              </h2>
            </section>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-transparent rounded-[32px] blur-xl opacity-50"></div>
              <div className="relative bg-[#112117] rounded-[32px] p-10 border border-white/5 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-center">
                  {insight?.exercise_title}
                </h3>
                <p className="text-gray-200 text-[19px] font-semibold leading-[1.6] text-center mb-2">
                  {insight?.exercise_desc}
                </p>
                <div className="flex justify-center mt-6">
                   <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-[9px] font-black text-primary/60 uppercase tracking-widest">Enfoque: {insight?.tension_focus}</span>
                   </div>
                </div>
              </div>
            </div>

            <section className="px-4 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                  <span className="text-[9px] font-black text-[#5c6e64] uppercase tracking-[0.3em]">Explicación Biológica</span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
               </div>
               <p className="text-[#a0afaa] text-center text-sm font-medium leading-relaxed italic">
                 {insight?.biology}
               </p>
            </section>

            <div className="pt-6 flex flex-col items-center">
              <p className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Tu Mantra de hoy</p>
              <div className="px-8 py-5 bg-[#112117]/50 rounded-[24px] border border-white/10 shadow-lg text-center backdrop-blur-sm max-w-[280px]">
                <span className="text-white font-extrabold tracking-tight text-[17px] italic leading-tight block">
                  {insight?.mantra}
                </span>
              </div>
            </div>
            <div className="h-10"></div>
          </div>
        )}
      </main>

      {!loading && (
        <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0d1611] via-[#0d1611]/90 to-transparent text-center z-40">
           <button 
             onClick={() => navigate('/dashboard')}
             className="relative group inline-flex items-center gap-3 px-8 py-3 rounded-full overflow-hidden transition-all active:scale-95"
           >
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="text-[#5c6e64] group-hover:text-white font-black text-[11px] uppercase tracking-[0.4em] transition-colors">
               He completado mi reflexión
             </span>
             <span className="material-symbols-outlined text-[18px] text-[#5c6e64] group-hover:text-primary transition-colors">done_all</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default ReflectionGuidesPage;
