
import { EmotionType, Symptom } from './types';

export const INITIAL_SYMPTOMS: Symptom[] = [
  { 
    id: 'cabeza', 
    name: 'Cabeza', 
    icon: 'psychology', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4S-dx31qSjWfbnpme8TTnP4dcjEEdPdV0w94ZXEZr9_3F7ZkfVUOOS4p1z3pqeUS8N70gqI-jl-bPLDGU1e5IoTVP9cWJbwQj2h8ENB7t4jaG08zFhKgTc5uERyzI6H1nvLJqYz8IO-O9PQ7GVNbBHUDgPomXdP4vfCn6Pfe-fGyAjYdSeHzKLXtAFhHU6tCezQQ2Mk696gBsXsu3Xx1vJZmcAwnM5HiZqK4Ty6Y1p8x6zX5ogvJExWXJ3x-2hTgvcBLcpwTPEM8', 
    intensity: 1, 
    selected: false 
  },
  { 
    id: 'corazon', 
    name: 'Corazón', 
    icon: 'cardiology', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlZLf4LkxAoQEFGZpmnIPXNY_fW3lbjGXIGvrSGnLQ7Sm9tyXKzp1nfdcnGAwzI17ilX0y7QVid2eV2D8U8ho8wAup9TL-uTrtn_hRl4pyiR7suqNVLpkpIk-VRdWkUTjU2foVGTdjzQTPZp8tnYM0lpNRINUpTGg5_o64NmxVA8tu61HnKd5BAYwRg52n4m8Y2QaRZVoBEUGhCIhlyBjrEY9bAWwHHqRIi4mdIcS-03RorYe0gqYbJpnWYO8scW0yRm999BiM-J8', 
    intensity: 1, 
    selected: false 
  },
  { 
    id: 'estomago', 
    name: 'Estómago', 
    icon: 'gastroenterology', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG5RsmJq2Lbx-uPY7IEnDIaECHjthIsGUMy0eRdB4uX5QZBgPCgNXloXcszZm6UeddGHz0UPXCQ-qg8cFiesVXqTJVDy4h20mbfqMVs1PG8uBe4HGqFhqbCoZV_Kt0QCefS1zNlkhLCx5AdZ_xxpt0ZjZ0wFfgUdkoRT-BadhveclIZeMzlH8oLNwdLWEcXKUmkwIwqnpgw2DTiz8rWRThN4Bxu2l466uBclenaCrpXABy8zreU9d0-jRIqcNxIRXRf-NaZicaQmM', 
    intensity: 1, 
    selected: false 
  },
  { 
    id: 'musculos', 
    name: 'Músculos', 
    icon: 'accessibility_new', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFnwR4Fx8XfDtY8_IDd7bszOnJEVU9iazJLNBx_ldenuAwafZQ7vNKdN8moK5Dwpma07UrJEd2i8MOXN0I-R5AlykVp-RONCHj_lUccIiaBMViQoCvdXgjUTB-KgqPTVl-WWYk5O8Xto0PsrJCDTXkYR2OEfMG_csHG7HLapTO3GCXG_vmzVZZ4nnPIMvQGWC5ikQDyQG81XGQWkTPb0W0WCufRVV355ySsBn8eNtOgaKFUK5xLNlkENHEzfQ4-rvyzOJpRnQVkwU', 
    intensity: 1, 
    selected: false 
  },
  { 
    id: 'cuerpo_completo', 
    name: 'Todo el cuerpo', 
    icon: 'accessibility_new', 
    image: '', 
    intensity: 1, 
    selected: false 
  },
];

export const EMOTIONS = [
  { type: EmotionType.HAPPY, emoji: '😊', label: 'Felicidad', color: '#FCD34D' },
  { type: EmotionType.SAD, emoji: '😢', label: 'Tristeza', color: '#93C5FD' },
  { type: EmotionType.FEAR, emoji: '😨', label: 'Miedo', color: '#D1D5DB' },
  { type: EmotionType.ANGER, emoji: '😠', label: 'Ira', color: '#FCA5A5' },
  { type: EmotionType.DISGUST, emoji: '🤢', label: 'Asco', color: '#86EFAC' },
  { type: EmotionType.SURPRISE, emoji: '😲', label: 'Sorpresa', color: '#FEF08A' },
];

export interface EmotionTaxonomy {
  l2: string[];
  l3: string[];
}

export const TAXONOMY: Record<EmotionType, EmotionTaxonomy> = {
  [EmotionType.HAPPY]: {
    l2: ['Optimista', 'Íntimo', 'Pacífico', 'Poderoso', 'Aceptado', 'Orgulloso', 'Interesado', 'Alegre'],
    l3: ['Inspirado', 'Abierto', 'Bromista', 'Sensible', 'Esperanzado', 'Cariñoso', 'Provocativo', 'Valiente', 'Respetado', 'Satisfecho', 'Importante', 'Seguro', 'Curioso', 'Entretenido', 'Liberado', 'Eufórico']
  },
  [EmotionType.SAD]: {
    l2: ['Culpable', 'Abandonado', 'Desesperado', 'Deprimido', 'Solo', 'Aburrido'],
    l3: ['Arrepentido', 'Avergonzado', 'Ignorado', 'Victimizado', 'Desvalido', 'Vulnerable', 'Melancólico', 'Vacío', 'Desamparado', 'Aislado', 'Apático', 'Indiferente']
  },
  [EmotionType.ANGER]: {
    l2: ['Herido', 'Amenazado', 'Lleno de odio', 'Loco', 'Agresivo', 'Frustrado', 'Distante', 'Crítico'],
    l3: ['Devastado', 'Apenado', 'Atacado', 'Celoso', 'Resentido', 'Ultrajado', 'Furioso', 'Rabioso', 'Provocador', 'Hostil', 'Enfurecido', 'Irritado', 'Introvertido', 'Desconfiado', 'Escéptico', 'Sarcástico']
  },
  [EmotionType.DISGUST]: {
    l2: ['Disconforme', 'Decepcionado', 'Horrible', 'Abstinencia'],
    l3: ['Moralista', 'Reacio', 'Repugnante', 'Revoltoso', 'Odioso', 'Aversión', 'Vacilante']
  },
  [EmotionType.FEAR]: {
    l2: ['Asustado', 'Ansioso', 'Inseguro', 'Sumiso', 'Rechazado', 'Humillado'],
    l3: ['Espantado', 'Aterrado', 'Agobiado', 'Preocupado', 'Insuficiente', 'Inferior', 'Inútil', 'Insignificante', 'Marginado', 'Alienado', 'Irrespetado', 'Ridiculizado']
  },
  [EmotionType.SURPRISE]: {
    l2: ['Confundido', 'Asombrado', 'Entusiasmado', 'Conmocionado'],
    l3: ['Desilusionado', 'Perplejo', 'Estupefacto', 'Impresionado', 'Entusiasta', 'Enérgico', 'Abatido']
  }
};
