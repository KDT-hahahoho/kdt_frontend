import React from 'react';
import { FunnelProps, StepProps } from '@hooks/useFunnel';
import SetupName from './SetupName';
import SetupKoreanIDInput from './SetupKoreanIDInput';
import SetupEmail from './SetupEmail';
import SetupPassword from './SetupPassword';

export interface ProfileSetupInterface {
  steps: string[];
  nextClickHandler: (nextStep: string | null) => void;
  Funnel: React.ComponentType<FunnelProps>;
  Step: React.ComponentType<StepProps>;
  formData: {
    name: string;
    koreanId: string;
    email: string;
    password: string;
  };
  updateFormData: (field: string, value: string) => void;
}

const ProfileSetup = ({
  steps,
  nextClickHandler,
  Funnel,
  Step,
  formData,
  updateFormData,
}: ProfileSetupInterface) => {
  return (
    <Funnel>
      <Step name="이름 입력">
        <SetupName
          onNext={() => nextClickHandler(steps[1])}
          value={formData.name}
          onChange={(value) => updateFormData('name', value)}
        />
      </Step>

      <Step name="주민등록번호 입력">
        <SetupKoreanIDInput
          onNext={() => nextClickHandler(steps[2])}
          value={formData.koreanId}
          onChange={(value) => updateFormData('koreanId', value)}
        />
      </Step>

      <Step name="이메일 입력">
        <SetupEmail
          onNext={() => nextClickHandler(steps[3])}
          value={formData.email}
          onChange={(value) => updateFormData('email', value)}
        />
      </Step>

      <Step name="비밀번호 입력">
        <SetupPassword
          onNext={() => nextClickHandler(null)}
          value={formData.password}
          onChange={(value) => updateFormData('password', value)}
        />
      </Step>
    </Funnel>
  );
};

export default ProfileSetup;
