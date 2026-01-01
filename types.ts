
export interface Symptom {
  id: string;
  name: string;
  icon: string;
  image: string;
  intensity: number;
  selected: boolean;
  description?: string;
}

export interface CheckInData {
  mood: number;
  physicalSensations: string[];
  mainEmotion: string;
  subEmotion: string;
  matices: string[];
  symptoms: Symptom[];
  reflection: {
    thoughts: string;
    emotionLatent: string;
    processing: string;
  };
}

export enum EmotionType {
  HAPPY = 'felicidad',
  SAD = 'tristeza',
  FEAR = 'miedo',
  ANGER = 'ira',
  DISGUST = 'asco',
  SURPRISE = 'sorpresa'
}
