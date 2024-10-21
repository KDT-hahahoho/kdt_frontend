import SignupProgressBar from '@components/Auth/SignupProgressBar';
import { useFunnel } from '@hooks/useFunnel';
import { useCallback, useState } from 'react';
import Questions from './Questions';
import styled from '@emotion/styled';
import variables from '@styles/Variables';

export interface TestingFormData {
  [key: string]: string;
  total: string;
  social: string;
  sexual: string;
  relational: string;
  refusing: string;
  essential: string;
}

const Testing = () => {
  const steps = ['1', '2', '3', '4', '5'];
  const [result, setResult] = useState<TestingFormData>({
    total: '0',
    social: '0',
    sexual: '0',
    relational: '0',
    refusing: '0',
    essential: '0',
  });

  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);
  const totalSteps = steps.length;
  const currentStepIndex = steps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;

  const onSubmit = useCallback(
    async (formData: TestingFormData) => {
      setResult((prev) => {
        const newResult = { ...prev };
        for (const key in formData) {
          const [subject, isReversed] = key.split('-');
          const value = JSON.parse(isReversed) ? 6 - Number(formData[key]) : Number(formData[key]);
          newResult[subject] = `${Number(newResult[subject]) + value}`;
          newResult.total = `${Number(newResult.total) + value}`;
        }
        return newResult;
      });

      if (currentStep !== '5') setStep(`${+currentStep + 1}`);
      else {
        // 폼 제출
        console.log(result);
      }
    },
    [currentStep]
  );

  const TopBox = styled.div`
    .info {
      text-align: center;
      padding: 1rem;
      border-radius: 1rem;
      background: ${variables.colors.secondarySoft};
      font-size: ${variables.size.medium};
      color: ${variables.colors.secondaryStrong};
    }
    .img-box {
      margin: 4rem auto 7rem;
      max-width: 29.6rem;
      img {
        max-width: 100%;
        height: 18rem;
        aspect-ratio: 295/179;
      }
    }
  `;
  const BottomBox = styled.div`
    padding-bottom: 5.6rem;
  `;

  return (
    <>
      <SignupProgressBar progress={progressPercentage} />
      <TopBox className="top-box">
        <p className="info">숫자가 높을수록 강한 긍정을 의미해요</p>
        <div className="img-box">
          <img src={`/img/testing-0${currentStep}.svg`} alt={`난임 스트레스 척도 검사 ${currentStep}단계`} />
        </div>
      </TopBox>

      <BottomBox>
        <Funnel>
          <Step name="1">
            <Questions onSubmit={onSubmit} page={1} />
          </Step>
          <Step name="2">
            <Questions onSubmit={onSubmit} page={2} />
          </Step>
          <Step name="3">
            <Questions onSubmit={onSubmit} page={3} />
          </Step>
          <Step name="4">
            <Questions onSubmit={onSubmit} page={4} />
          </Step>
          <Step name="5">
            <Questions onSubmit={onSubmit} page={5} />
          </Step>
        </Funnel>
      </BottomBox>
    </>
  );
};

export default Testing;
