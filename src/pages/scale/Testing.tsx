import GenericProgressBar from '@components/common/GenericProgressBar';
import styled from '@emotion/styled';
import { useFunnel } from '@hooks/useFunnel';
import fetchGPT from '@hooks/useGPT';
import variables from '@styles/Variables';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Questions from './Questions';
import { Scale, ScaleData } from './ScaleList';

interface Data {
  [key: string]: string;
}

interface ScaleDataRes {
  data: {
    result: ScaleData;
    success: boolean;
  };
}

const Testing = () => {
  const member_id = Number(localStorage.getItem('MemberId'));
  const navigate = useNavigate();
  const steps = ['1', '2', '3', '4', '5'];
  const [result, setResult] = useState<Scale>({
    total: 0,
    social: 0,
    sexual: 0,
    relational: 0,
    refusing: 0,
    essential: 0,
  });

  const { Funnel, Step, setStep, currentStep } = useFunnel(steps[0]);
  const totalSteps = steps.length;
  const currentStepIndex = steps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / totalSteps) * 100;
  const prompt = `- 난임 스트레스 척도 응답 결과를 통해 핵심 신념을 최대 5개 평가해줘
  - 답은 높을수록 강한 긍정을 의미해.
  - 예시) 'essential-true-임신과 출산은 결혼생활에서 가장 중요한 두 가지이다' 키가 이렇게 주어진다면, 
    '-' 기호가 두 번째로 등장한 이후의 텍스트만 확인해. 앞부분('essential-true')은 무시해줘.
  - 핵심 신념: 스트레스 상황을 접하여 떠올린 자기, 미래, 세상에 대한 부정적인 자동적 사고를 활성화시키는 기저 신념
  - 응답 형식: "핵심신념1, 핵심신념2`;

  // const toNextPage = async (formData: TestingFormData) => {
  //   setAccData((prev) => {
  //     const newResult = { ...prev };
  //     for (const key in formData) {
  //       const [_, isReversed, title] = key.split('-');
  //       const value = JSON.parse(isReversed) ? 6 - Number(formData[key]) : Number(formData[key]);
  //       newResult[title] = `${value}`;
  //     }
  //     return newResult;
  //   });
  //   setStep(`${+currentStep + 1}`);
  // };

  const fetchTestResult = async (body: ScaleData): Promise<ScaleDataRes | null> => {
    try {
      const response = await axios.post('https://www.wishkr.site/infertility/tests/', body, {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
      });
      return response;
    } catch (err) {
      console.error('Failed to POST scaleList: ', err);
      return null;
    }
  };

  const ToScrollTop = () => document.body.scrollTo({ top: 0 });

  const isScaleKey = (subject: string): subject is keyof Scale => {
    return ['social', 'sexual', 'relational', 'refusing', 'essential'].includes(subject);
  };

  const onSubmit = useCallback(
    async (formData: Data) => {
      ToScrollTop();

      // setAccData({ ...accData, ...formData });
      setResult((prev) => {
        const newResult = { ...prev };
        for (const key in formData) {
          const [subject, isReversed] = key.split('-');
          // 역문항 반영 점수 추출
          const value = JSON.parse(isReversed) ? 6 - +formData[key] : +formData[key];
          // 해당 영역에 점수 추가
          if (isScaleKey(subject)) newResult[subject] += value;
          newResult.total += value;
        }
        return newResult;
      });

      if (currentStep !== '5') {
        setStep(`${+currentStep + 1}`);
      } else {
        const gptData = await fetchGPT(prompt, JSON.stringify(formData));
        const belifs = gptData.choices[0].message.content;
        const response = await fetchTestResult({ ...result, member_id, belifs });
        console.log(response);
        navigate(`/scale/1`);
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
