// 진욱
import styled from '@emotion/styled';
import { useFunnel } from '@hooks/useFunnel';
import { useCallback } from 'react';
import EmotionRecord from './EmotionRecord';
import variables from '@styles/Variables';

// interface IEmotionRecord {
//   goods: string[];
//   bads: string[];
//   efforts: string[];
// }

const steps = ['goods', 'bads', 'efforts'];

const EmotionLayout = styled.section`
  box-shadow: inset 0 0 5px black;
  height: calc(100vh - 2 * ${variables.layoutPadding});
  padding-top: calc(7.2rem - ${variables.layoutPadding});
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  box-shadow: inset 0 0 1px black;
  height: 1.2rem;
  margin-left: calc(-1 * ${variables.layoutPadding});
  margin-right: calc(-1 * ${variables.layoutPadding});
  display: flex;
  align-items: center;
`;

const DashedLine = styled.div`
  width: 100%;
  height: 0.2rem;
  background: repeating-linear-gradient(
    to right,
    ${variables.colors.primarySoft} 0,
    ${variables.colors.primarySoft} 0.5rem,
    transparent 0.5rem,
    transparent 1rem
  );
`;

const ImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 12.8rem;
  height: 12.8rem;
  aspect-ratio: 1/1;
  background-color: ${variables.colors.secondarySoft};
  margin: 0 auto;
  margin-top: 4.5rem;
  position: relative;
`;

const WishImage = styled.img`
  position: absolute;
  top: 1rem;
  left: -4.5rem;
`;

const EmotionRecordPage = () => {
  // const [emotionRecord, setEmotionRecord] = useState<IEmotionRecord>();
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  console.log(currentStep);
  // const currentStepIndex = steps.indexOf(currentStep);

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
      />
    </EmotionLayout>
  );
};

export default EmotionRecordPage;
