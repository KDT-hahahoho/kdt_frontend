import { useFunnel } from '@/hooks/useFunnel';
import ProfileSetup from '../../../components/ForSignUp/ProfileSetup';
import GenericForm from '@/components/GenericForm';

// 전체 스텝을 담은 배열
const steps = ['이름 입력', '주민등록번호 입력', '이메일 인증', '비밀번호 설정'];

const SignUpPage = () => {
  const submitSignup = () => {
    console.log('Signup');
  };

  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);

  const nextClickHandler = () => {
    const currentStepIndex = steps.indexOf(currentStep);

    if (currentStepIndex < steps.length - 1) {
      setStep(steps[currentStepIndex + 1]);
    } else {
      submitSignup();
    }
  };

  return (
    <>
      <GenericForm formOptions={{ mode: 'onChange' }} onSubmit={submitSignup}>
        <ProfileSetup
          steps={steps}
          nextClickHandler={nextClickHandler}
          Funnel={Funnel}
          Step={Step}
        />
      </GenericForm>
    </>
  );
};

export default SignUpPage;
