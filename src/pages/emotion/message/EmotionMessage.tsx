// 진욱

import useEmotionStore from '@store/useEmotionStore';

const EmotionMessage = () => {
  const emotionRecord = useEmotionStore((state) => state.record);
  console.log(emotionRecord);
  return <section>나와 상대방에게 한 마디</section>;
};

export default EmotionMessage;
