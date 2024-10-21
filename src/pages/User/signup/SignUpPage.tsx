import React, { useState, useCallback } from 'react';
import ProfileSetup from '@components/Auth/ProfileSetup';
import GenericForm from '@components/common/GenericForm';
import { useFunnel } from '@hooks/useFunnel';
import PageTitleHeader from '@components/Auth/PageTitleHeader';
import SignupProgressBar from '@components/common/GenericProgressBar';
import { useNavigate } from 'react-router-dom';
import { determineGenderFromKoreanId } from '@utils/validation/handleValidation';

const steps = ['이름 입력', '주민등록번호 입력', '이메일 입력', '비밀번호 입력', '난임여부', '약관동의'];

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    koreanId: '',
    email: '',
    password: '',
    gender: '',
    subfertility: '',
    keywords: '',
  });

  const navigate = useNavigate();
  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  // 프로그레스바에 필요한 로직
  const totalSteps = steps.length;
  const currentStepIndex = steps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };

      if (field === 'koreanId') {
        const gender = determineGenderFromKoreanId(value); // Gender 결정 함수 호출

        if (gender) {
          newData['gender'] = gender; // 유효한 성별이면 추가
        } else {
          return prevData; // 오류일 때는 기존 데이터를 반환하여 반려
        }
      }

      console.log('Updated form data:', newData);
      return newData;
    });
  }, []);

  const submitSignup = useCallback(() => {
    console.log('Submitting signup data:', formData);

    navigate('/users/welcome');
  }, [formData]);

  const nextClickHandler = useCallback(
    (nextStep: string | null) => {
      if (nextStep) {
        setStep(nextStep);
      }
    },
    [setStep]
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
          submitSignup={submitSignup}
        />
      </GenericForm>
    </>
  );
};

export default SignUpPage;
