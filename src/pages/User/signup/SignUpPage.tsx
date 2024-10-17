// SignUpPage.tsx
import React, { useState, useCallback } from 'react';
import ProfileSetup from '@components/Auth/ProfileSetup';
import GenericForm from '@components/common/GenericForm';
import { useFunnel } from '@hooks/useFunnel';
import PageTitleHeader from '@components/Auth/PageTitleHeader';
import SignupProgressBar from '@components/Auth/SignupProgressBar';

const steps = ['이름 입력', '주민등록번호 입력', '이메일 입력', '비밀번호 입력'];

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    koreanId: '',
    email: '',
    password: '',
  });

  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  const totalSteps = steps.length;
  const currentStepIndex = steps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };
      console.log('Updated form data:', newData);
      return newData;
    });
  }, []);

  const submitSignup = useCallback(() => {
    console.log('Submitting signup data:', formData);
  }, [formData]);

  const nextClickHandler = useCallback(
    (nextStep: string | null) => {
      if (nextStep) {
        setStep(nextStep);
      } else {
        submitSignup();
      }
    },
    [setStep, submitSignup]
  );

  return (
    <>
      <GenericForm formOptions={{ mode: 'onChange' }} onSubmit={submitSignup}>
        <SignupProgressBar progress={progressPercentage} />
        <PageTitleHeader currentStep={currentStep} />
        <ProfileSetup
          steps={steps}
          nextClickHandler={nextClickHandler}
          Funnel={Funnel}
          Step={Step}
          formData={formData}
          updateFormData={updateFormData}
        />
      </GenericForm>
    </>
  );
};

export default SignUpPage;
