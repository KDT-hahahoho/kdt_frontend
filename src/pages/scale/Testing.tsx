import GenericProgressBar from '@components/common/GenericProgressBar';
import styled from '@emotion/styled';
import { useFunnel } from '@hooks/useFunnel';
import variables from '@styles/Variables';
import { useCallback, useState } from 'react';
import Questions from './Questions';

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
  const [accData, setAccData] = useState({});
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
      setAccData({ ...accData, ...formData });
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

  const toPrevPage = () => setStep(`${Number(currentStep) - 1}`);

  const ProgressBox = styled.div`
    display: flex;
    margin-top: -1.6rem;
    margin-bottom: 2rem;
    color: ${variables.colors.gray100};
    font-size: ${variables.size.big};
    display: none;

    .left {
      visibility: ${(props) => (props.theme === '1' ? 'hidden' : 'visible')};
      button {
        background: url(/img/icon-page-prev.svg) no-repeat center left / 0.8rem;
        padding-left: 2rem;
      }
    }
    .right {
      margin-left: auto;
      p {
        font-size: ${variables.size.medium};
      }
    }
  `;
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
        height: 18rem;
        aspect-ratio: 295/179;
      }
    }
    & + div {
      padding-bottom: calc(5.6rem + 3rem);
    }
  `;

  return (
    <>
      <GenericProgressBar progress={progressPercentage} />
      <ProgressBox theme={currentStep}>
        <div className="left" style={{}}>
          <button onClick={() => toPrevPage()}>이전 문항</button>
        </div>
        <div className="right">
          <p>
            {Number(currentStep) - 1}
            {currentStep === '1' ? '' : '0'} / 46
          </p>
        </div>
      </ProgressBox>
      <TopBox className="top-box">
        <p className="info">숫자가 높을수록 강한 긍정을 의미해요</p>
        <div className="img-box">
          <img src={`/img/testing-0${currentStep}.svg`} alt={`난임 스트레스 척도 검사 ${currentStep}단계`} />
        </div>
      </TopBox>

      <div>
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
      </div>
    </>
  );
};

export default Testing;
