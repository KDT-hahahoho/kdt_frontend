/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import variables from '@styles/Variables';
import arrow from '/img/icon-guide-arrow.svg';
import { useState } from 'react';

const CounselingGuide = ({
  step,
  setStep,
  guideVisible,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  guideVisible: boolean;
}) => {
  const [throttle, setThrottle] = useState(false);

  const handleStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!throttle) {
      setThrottle(true);
      setTimeout(() => {
        if ((e.target as HTMLButtonElement).classList.contains('skip')) {
          setStep(4);
        } else {
          setStep(step + 1);
        }
        setThrottle(false);
      }, 500);
    }
  };

  //가이드 설명 위치 변경 함수
  const guideDesc = (step: number, targetStep: number) => {
    return step === targetStep
      ? css`
          display: block;
          text-align: center;
          line-height: 2.2rem;
          width: 100%;
          font-size: ${variables.size.big};
          position: absolute;
          ${targetStep === 1 && 'left: 50%; bottom: 20rem ;transform: translateX(-50%);'}
          ${targetStep === 2 && 'left: 50%; top:40rem ;transform: translateX(-50%);'}
          ${targetStep === 3 &&
          'text-align: right; right: 3.8rem; top: 15rem; & span {font-size: 1.4rem; font-weight: 300; line-height: 3rem;}'}
        `
      : css`
          display: none;
        `;
  };

  //가이드 화살표 위치 변경 함수
  const guideArrowStyles = (step: number) => css`
    position: absolute;
    transform: translateX(-50%);
    ${step === 1 &&
    css`
      left: 50%;
      bottom: 14rem;
    `}
    ${step === 2 &&
    css`
      transform: scaleY(-1);
      left: 50%;
      top: 34rem;
    `}
      ${step === 3 &&
    css`
      transform: scaleY(-1);
      right: 3.8rem;
      top: 8rem;
    `}
      ${step !== 1 &&
    step !== 2 &&
    step !== 3 &&
    css`
      display: none;
    `};
  `;

  const Priority = css`
    display: block;
    position: absolute;
    right: 1.8rem;
    top: 0.52em;
    z-index: 60;
  `;

  return (
    <>
      <button css={StepLayer} onClick={handleStep} type="button">
        <span className="skip">건너뛰기</span>
      </button>
      <div css={[GuideDim, guideVisible ? FadeInAni : FadeOutAni]}>
        <div css={[end, [step === 3 && Priority]]}>종료</div>
        <div className="paginationBox">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`pagination ${step > i ? 'active' : ''}`} />
          ))}
        </div>
        <div className="guideDescBox">
          <div css={guideArrowStyles(step)} className="guideArrow">
            <img src={arrow} alt="화살표아이콘" />
          </div>
          <p css={guideDesc(step, 1)}>
            배우자나 직장, 가족 관계 등 <br />
            난임에 대한 모든 고민을 위시와 상담해보세요!
          </p>
          <p css={guideDesc(step, 2)}>실시간으로 위시와 대화를 나눌 수 있습니다!</p>

          <p css={guideDesc(step, 3)}>
            상담 종료 버튼을 눌러야만
            <br />
            다음에도 상담을 이어갈 수 있어요!
            <br />
            <span>상담 내용은 상담을 이어가기 위한 용도로만 사용됩니다.</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CounselingGuide;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const FadeInAni = css`
  animation: ${FadeIn} 0.5s forwards;
`;

const FadeOutAni = css`
  animation: ${FadeOut} 0.5s forwards;
`;

const GuideDim = css`
  position: absolute;
  max-width: 50rem;
  width: 100%;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 60;
  backdrop-filter: blur(0.3rem);
  color: ${variables.colors.white};

  .paginationBox {
    display: flex;
    width: 100%;
    height: 2rem;
    margin-top: 7.2rem;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .pagination {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: ${variables.colors.gray50};
      transition: all ${variables.TransitionDuration};
    }
    .pagination.active {
      background-color: ${variables.colors.white};
    }
  }
`;

const end = css`
  display: none;
  font-size: ${variables.size.big};
  background-color: ${variables.colors.secondarySoft};
  color: ${variables.colors.secondaryStrong};
  width: 4.8rem;
  height: 3.5rem;
  text-align: center;
  line-height: 3.5rem;
  border-radius: 0.6rem;
`;

const StepLayer = css`
  position: absolute;
  max-width: 50rem;
  width: 100%;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 70;
  color: ${variables.colors.white};

  .skip {
    position: absolute;
    left: 1.8rem;
    top: 7.2rem;
    z-index: 5;
    font-size: ${variables.size.big};
  }
`;
