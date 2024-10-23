import { create } from 'zustand';

interface IAnalysis {
  prediction: {
    totalScore: number;
    social: number;
    sexual: number;
    relational: number;
    refusing: number;
    essential: number;
  };
  emotions: { joy: number; sadness: number; anger: number; fear: number; surprise: number; disgust: number };
  missions: string[];
  keywords: string[];
}

interface IState {
  step: number;
  analysis: IAnalysis;
}

const initialState: IState = {
  step: 1,
  analysis: {
    prediction: {
      totalScore: 0,
      social: 0,
      sexual: 0,
      relational: 0,
      refusing: 0,
      essential: 0,
    },
    emotions: { joy: 0, sadness: 0, anger: 0, fear: 0, surprise: 0, disgust: 0 },
    missions: [],
    keywords: [],
  },
};

interface IAnalysisAction {
  updateAnalysis: (data: IAnalysis) => void;
  updateStep: (step: number) => void;
}

const useAnalysisStore = create<IState & IAnalysisAction>()((set) => ({
  ...initialState,
  updateStep: (step) => set(() => ({ step })),
  updateAnalysis: (data) => set(() => ({ analysis: data })),
  reset: () => {
    set(initialState);
  },
}));

export default useAnalysisStore;
