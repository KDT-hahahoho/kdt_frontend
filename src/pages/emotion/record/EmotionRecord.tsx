import { FunnelProps, StepProps } from '@hooks/useFunnel';
import EmotionBad from './EmotionBad';
import EmotionEffort from './EmotionEffort';
import EmotionGood from './EmotionGood';
import { IEmotionRecord } from './EmotionRecordPage';

interface IEmotionRecordProps {
  steps: string[];
  prevClickHandler: (prevStep: string) => void;
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
  emotionRecord: IEmotionRecord;
  updateRecord: (field: string, value: string[]) => void;
}

const EmotionRecord = ({
  steps,
  prevClickHandler,
  nextClickHandler,
  Funnel,
  Step,
  emotionRecord,
  updateRecord,
}: IEmotionRecordProps) => {
  return (
    <Funnel>
      <Step name="good">
        <EmotionGood
          onNext={() => nextClickHandler(steps[1])}
          value={emotionRecord.good}
          onChange={(value) => updateRecord('good', value)}
        />
      </Step>

      <Step name="bad">
        <EmotionBad
          onPrev={() => prevClickHandler(steps[0])}
          onNext={() => nextClickHandler(steps[2])}
          value={emotionRecord.bad}
          onChange={(value) => updateRecord('bad', value)}
        />
      </Step>

      <Step name="effort">
        <EmotionEffort
          onPrev={() => prevClickHandler(steps[1])}
          value={emotionRecord.effort}
          onChange={(value) => updateRecord('effort', value)}
        />
      </Step>
    </Funnel>
  );
};

export default EmotionRecord;
