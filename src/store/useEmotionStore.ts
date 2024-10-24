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

interface IState {
  record: IRecord;
  message: IMessage;
}

interface IAction {
  updateRecord: (field: string, value: string[]) => void;
  updateMessage: (toMe: string, toSpouse: string) => void;
  reset: () => void;
}

const initialState: IState = {
  record: {
    good: [],
    bad: [],
    effort: [],
  },
  message: {
    toMe: '',
    toSpouse: '',
  },
};

const useEmotionStore = create<IState & IAction>()((set) => ({
  ...initialState,
  updateRecord: (field, value) =>
    set((prevState) => ({ ...prevState, record: { ...prevState.record, [field]: value } })),
  updateMessage: (toMe, toSpouse) =>
    set((prevState) => ({ ...prevState, message: { ...prevState.message, toMe, toSpouse } })),
  reset: () => {
    set(initialState);
  },
}));

export default useEmotionStore;
