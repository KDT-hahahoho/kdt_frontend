//NOTE - 우중 작업물

import React from 'react';

import { FunnelProps, StepProps } from '@hooks/useFunnel';
import SetupName from './SetupName';
import SetupKoreanIDInput from './SetupKoreanIDInput';
import SetupEmail from './SetupEmail';
import SetupPassword from './SetupPassword';
import CheckAgreement from './CheckAgreement';

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
  submitSignup?: () => void;
  updateFormData: (field: string, value: string) => void;
}

const ProfileSetup = ({
  submitSignup,
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
          onNext={() => nextClickHandler(steps[4])}
          value={formData.password}
          onChange={(value) => updateFormData('password', value)}
        />
      </Step>

      <Step name="약관동의">
        <CheckAgreement submitSignup={submitSignup} />
      </Step>
    </Funnel>
  );
};

export default ProfileSetup;
