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

interface IEmotionStore {
  record: IRecord;
  updateRecord: (field: string, value: string[]) => void;
  message: IMessage;
  updateMessage: (toMe: string, toSpouse: string) => void;
}

const useEmotionStore = create<IEmotionStore>()((set) => ({
  record: {
    good: [],
    bad: [],
    effort: [],
  },
  updateRecord: (field, value) =>
    set((prevState) => ({ ...prevState, record: { ...prevState.record, [field]: value } })),
  message: {
    toMe: '',
    toSpouse: '',
  },
  updateMessage: (toMe, toSpouse) =>
    set((prevState) => ({ ...prevState, message: { ...prevState.message, toMe, toSpouse } })),
}));

export default useEmotionStore;
