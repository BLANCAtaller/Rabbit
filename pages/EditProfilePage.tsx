
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  photo: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Ana García',
  email: 'ana.garcia@email.com',
  bio: 'Enfocada en mi bienestar somático y mental.',
  photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLU9A1AwQYEZocBCUIR-G9TrCBE16RSJsFNoKY2Tcz78YpA2pUJgUZnXKieJO28pl8CDtZCFmi47gRQqAeM5a0yCJ3mUtM4yCvtidO7Zpnp8q4fWFMKuqAKj4pr5ViCCkaTwb8oV7VPl_EsNHopKtW9-RY8nF4GCYB67ywppXGhnLakm_rcC4GovdVFwJEwezrZNytOPm8OgRIDlM1fxV-rKd1lEN69R2Fwwq0CHvOH3FDslh_eg7uwIO-i6kFWgVdQSD2CJThOI'
};

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isSaving, setIsSaving] = useState(false);

  // Cargar perfil guardado al montar
  useEffect(() => {
    const saved = localStorage.getItem('chase_the_rabbit_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing profile", e);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simular latencia de red/guardado para feedback visual
    setTimeout(() => {
      localStorage.setItem('chase_the_rabbit_profile', JSON.stringify(profile));
      setIsSaving(false);
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0d1611] font-display overflow-y-auto no-scrollbar pb-32">
      {/* Header idéntico a la imagen */}
      <header className="sticky top-0 z-30 bg-[#0d1611] flex items-center justify-between p-4 px-6 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-white/40 hover:text-white transition-opacity">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-[13px] font-black uppercase tracking-[0.25em] text-white italic">Editar Perfil</h1>
        <div className="w-6"></div>
      </header>

      <main className="px-8 pt-10 space-y-12">
        {/* Avatar Editor idéntico a la imagen */}
        <div className="flex flex-col items-center">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div 
              className="w-[140px] h-[140px] rounded-[48px] bg-cover bg-center border-[3px] border-[#1a2e23] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden relative"
              style={{ backgroundImage: `url('${profile.photo}')` }}
            >
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[1px] opacity-100 group-hover:bg-black/50 transition-all">
                 <span className="material-symbols-outlined text-white text-4xl">photo_camera</span>
              </div>
            </div>
            {/* El icono verde de la imagen */}
            <div className="absolute bottom-1 right-1 w-11 h-11 rounded-[16px] bg-primary text-[#0d1611] flex items-center justify-center shadow-lg border-[4px] border-[#0d1611] transition-transform group-active:scale-90">
              <span className="material-symbols-outlined text-[22px] filled">edit</span>
            </div>
            
            {/* Input oculto */}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.2em] hover:text-primary transition-colors"
          >
            Cambiar foto de perfil
          </button>
        </div>

        {/* Form Fields Estilizados */}
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.25em] ml-1">Nombre Completo</label>
            <div className="relative">
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full h-14 bg-[#112117] rounded-[20px] border border-white/5 px-6 pr-14 text-white font-bold text-base focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#3c4a41] text-[22px]">person</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.25em] ml-1">Correo Electrónico</label>
            <div className="relative">
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full h-14 bg-[#112117] rounded-[20px] border border-white/5 px-6 pr-14 text-white font-bold text-base focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#3c4a41] text-[22px]">mail</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[#5c6e64] text-[10px] font-black uppercase tracking-[0.25em] ml-1">Biografía</label>
            <textarea 
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full h-36 bg-[#112117] rounded-[32px] border border-white/5 p-6 text-white font-medium text-sm resize-none focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all leading-relaxed"
            ></textarea>
          </div>
        </div>
      </main>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0d1611] via-[#0d1611]/80 to-transparent z-40 max-w-md mx-auto">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full h-16 rounded-[24px] bg-primary text-[#0d1611] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(25,230,107,0.3)] active:scale-95 transition-all ${isSaving ? 'opacity-70 grayscale-[0.2]' : 'hover:scale-[1.02]'}`}
        >
          {isSaving ? (
            <>
              <div className="w-5 h-5 border-2 border-[#0d1611]/30 border-t-[#0d1611] rounded-full animate-spin"></div>
              <span className="italic uppercase">Guardando...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined font-black">check_circle</span>
              <span className="italic uppercase tracking-tight">Guardar Perfil</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
