import { FunnelProps, StepProps } from '@hooks/useFunnel';
import EmotionForm from './EmotionForm';

interface IEmotionRecordProps {
  steps: string[];
  prevClickHandler: (prevStep: string) => void;
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const EmotionRecord = ({ steps, prevClickHandler, nextClickHandler, Funnel, Step }: IEmotionRecordProps) => {
  return (
    <Funnel>
      <Step name="goods">
        <EmotionForm>
          "좋았던 일 기록"
          <button onClick={() => nextClickHandler(steps[1])}>다음</button>
        </EmotionForm>
      </Step>

      <Step name="bads">
        "안 좋았던 일 기록"
        <button onClick={() => prevClickHandler(steps[0])}>이전</button>
        <button onClick={() => nextClickHandler(steps[2])}>다음</button>
      </Step>

      <Step name="efforts">
        "노력한 일 기록"
        <button onClick={() => prevClickHandler(steps[1])}>이전</button>
        <button onClick={() => console.log('한 마디 입력으로 이동!')}>종료</button>
      </Step>
    </Funnel>
  );
};

export default EmotionRecord;
