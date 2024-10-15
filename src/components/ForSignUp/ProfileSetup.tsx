import SetupEmail from '@/components/ForSignUp/SetupEmail';
import SetupKoreanIDInput from '@/components/ForSignUp/SetupKoreanIDInput';
import SetupName from '@/components/ForSignUp/SetupName';
import SetupPassword from '@/components/ForSignUp/SetupPassword';
import { FunnelProps, StepProps } from '@/hooks/useFunnel';

export interface ProfileSetupInterface {
  steps: string[];
  nextClickHandler: (nextStep: string) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
}

const ProfileSetup = ({ steps, nextClickHandler, Funnel, Step }: ProfileSetupInterface) => {
  return (
    <Funnel>
      <Step name="이름 입력">
        <SetupName onNext={() => nextClickHandler(steps[1])} />
      </Step>

      <Step name="주민등록번호 입력">
        <SetupKoreanIDInput onNext={() => nextClickHandler(steps[2])} />
      </Step>

      <Step name="이메일 인증">
        <SetupEmail onNext={() => nextClickHandler(steps[3])} />
      </Step>

      <Step name="비밀번호 설정">
        <SetupPassword onNext={() => nextClickHandler(steps[4])} />
      </Step>
    </Funnel>
  );
};

export default ProfileSetup;
