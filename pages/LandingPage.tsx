
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const RABBIT_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAUBztn344FpYpEtCmeJD8VaplhFn6XWIN9R5iMsyVhyF3ZteUsoAAy8C9gH0bZcxbowsd7dNE17lFcLiw4bYCREquGr2nGVGh2yPStm63FKf7PRSV45StVnlVPR3x591V0o5UDRPawDQeiGsaik0fmci8ODbAYhFRlPRPKDav5Z8dGWrM1Dz3wr5muW9tLnCEF6JdtSXJ3yV0Dfm0ArtEr33DRFbHoA0VIwIDVtpot1Gja7dGok4FauqbHfcCj671_qaN865HVQ0k";

  return (
    <div className="relative flex-1 flex flex-col overflow-hidden bg-mesh group/design-root">
      <div className="h-12 w-full"></div>
      
      <div className="flex-1 flex flex-col justify-between px-6 pb-8 pt-4">
        <div className="flex flex-col items-center justify-center flex-1 space-y-8">
          <div className="relative w-full aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 animate-pulse"></div>
            <div 
              className="relative w-full h-full bg-center bg-contain bg-no-repeat z-10 transition-all duration-700"
              style={{
                backgroundImage: `url("${RABBIT_IMG}")`,
                borderRadius: '1.5rem',
                backgroundColor: 'rgba(17, 33, 23, 0.6)',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            ></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-surface-dark border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg backdrop-blur-sm z-20">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              Enfoque y Control
            </div>
          </div>

          <div className="text-center space-y-4 max-w-md mx-auto z-10">
            <h1 className="text-white tracking-tight text-4xl font-extrabold leading-tight">
              CHASE THE <br/>
              <span className="text-primary">RABBIT</span>
            </h1>
            <div className="w-16 h-1 bg-primary/50 mx-auto rounded-full"></div>
            <p className="text-gray-300 text-lg font-medium leading-relaxed px-2">
              Domina tu cuerpo. Controla tu mente. <br/>
              <span className="text-white/60 text-base font-normal">Regulación somato-emocional para tu dieta.</span>
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 mt-8 pb-6 safe-area-pb">
          <button 
            onClick={() => navigate('/dashboard')}
            className="relative w-full group overflow-hidden rounded-xl bg-primary h-14 flex items-center justify-center shadow-[0_0_20px_rgba(25,230,107,0.2)] transition-transform active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative text-background-dark text-lg font-bold tracking-wide uppercase flex items-center gap-2">
              Comenzar la búsqueda
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </span>
          </button>
          
          <button className="w-full h-12 flex items-center justify-center rounded-xl bg-transparent hover:bg-white/5 text-white/80 text-sm font-semibold tracking-wide transition-colors">
            Ya estoy registrado <span className="text-primary ml-1">(Acceder)</span>
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-2">
            Al continuar, aceptas nuestros Términos y Política de Privacidad
          </p>
        </div>
      </div>
      <div className="h-6 w-full"></div>
    </div>
  );
};

export default LandingPage;
