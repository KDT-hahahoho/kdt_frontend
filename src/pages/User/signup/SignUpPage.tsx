import React, { useState, useCallback } from 'react';
import ProfileSetup from '@components/Auth/ProfileSetup';
import GenericForm from '@components/GenericForm';
import { useFunnel } from '@hooks/useFunnel';

//ANCHOR - Funnel & Step setup
const steps = ['이름 입력', '주민등록번호 입력', '이메일 입력', '비밀번호 입력'];

//ANCHOR - FORM 데이터 유저 정보

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    koreanId: '',
    email: '',
    password: '',
  });

  const { Funnel, Step, setStep } = useFunnel(steps[0]);

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [field]: value };
      console.log('Updated form data:', newData); // 디버깅을 위한 로그 '<>'
      return newData;
    });
  }, []);

  //TODO - 로그인 로직 추가
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
    <GenericForm formOptions={{ mode: 'onChange' }} onSubmit={submitSignup}>
      <ProfileSetup
        steps={steps}
        nextClickHandler={nextClickHandler}
        Funnel={Funnel}
        Step={Step}
        formData={formData}
        updateFormData={updateFormData}
      />
    </GenericForm>
  );
};

export default SignUpPage;
