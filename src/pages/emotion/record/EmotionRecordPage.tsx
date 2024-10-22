// 진욱
import { useFunnel } from '@hooks/useFunnel';
import useEmotionStore from '@store/useEmotionStore';
import { useCallback } from 'react';
import EmotionRecord from './EmotionRecord';
import { DashedLine, EmotionLayout, ImageContainer, ProgressBar, WishImage } from './EmotionRecord.style';

export interface IEmotionRecord {
  good: string[];
  bad: string[];
  effort: string[];
}

const steps = ['good', 'bad', 'effort'];

const EmotionRecordPage = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);
  const emotionRecord = useEmotionStore((state) => state.record);
  const updateEmotionRecord = useEmotionStore((state) => state.updateRecord);

  console.log(currentStep);
  // const currentStepIndex = steps.indexOf(currentStep);

  const updateRecord = useCallback((field: string, value: string[]) => {
    updateEmotionRecord(field, value);
  }, []);

  const prevClickHandler = useCallback(
    (prevStep: string) => {
      if (prevStep) {
        setStep(prevStep);
      }
    },
    [setStep]
  );

  const nextClickHandler = useCallback(
    (nextStep: string) => {
      if (nextStep) {
        setStep(nextStep);
      }
    },
    [setStep]
  );

  return (
    <EmotionLayout>
      <ProgressBar>
        <DashedLine />
      </ProgressBar>
      <ImageContainer>
        <WishImage src="/src/assets/Images/img-wish-emotion.svg" alt="감정분석가 위시" />
      </ImageContainer>
      <EmotionRecord
        steps={steps}
        prevClickHandler={prevClickHandler}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
        emotionRecord={emotionRecord}
        updateRecord={updateRecord}
      />
    </EmotionLayout>
  );
};

export default EmotionRecordPage;
