import { create } from 'zustand';

interface IRecord {
  good: string[];
  bad: string[];
  effort: string[];
}

interface IMessage {
  toMe: string;
  toSpouse: string;
}

interface IEmotionState {
  record: IRecord;
  message: IMessage;
}

const useEmotionState = create<IEmotionState>()((set) => ({
  record: {
    good: [''],
    bad: [''],
    effort: [''],
  },
  updateRecord: (record: IRecord) => set((prevState) => ({ ...prevState, record })),
  message: {
    toMe: '',
    toSpouse: '',
  },
  updateMessage: (message: IMessage) => set((prevState) => ({ ...prevState, message })),
}));

export default useEmotionState;
