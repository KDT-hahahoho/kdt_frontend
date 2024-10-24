import React, { useState } from 'react';
import {
  MissonTitle,
  ImageContainer,
  WishImage,
  MissionTitleBox,
  MissionTextBox,
  MissonTitleSub,
  ButtonContainer,
  MissionExplanation,
  MissionSection,
} from './EmotionMission.style';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import useAnalysisStore from '@store/useAnalysisStore';

const EmotionMission = () => {
  const [clickButton, setClickButton] = useState('/src/assets/Images/invaildGray.svg');
  const [, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const analysisResult = useAnalysisStore((state) => state.analysis);
  const currentStep = useAnalysisStore((state) => state.step);

  const handleHover = () => {
    setClickButton('/src/assets/Images/valid.svg');
    console.log('클릭');
    console.log(currentStep);
    console.log(analysisResult);
  };

  const handleMouseLeave = () => {
    setClickButton('/src/assets/Images/invaildGray.svg');
    console.log('클릭해제');
  };

  const handleClick = () => {
    setIsClicked(true);
    navigate('/emotion/result');
    console.log('다음으로');
  };

  return (
    <>
      <MissionSection>
        <MissionTitleBox>
          <ImageContainer>
            <WishImage src="/img-wish-mission.svg" alt="감정분석가 위시" />
          </ImageContainer>

          <MissionTextBox>
            <MissonTitle>오늘의 AI위시 추천 미션</MissonTitle>
            <MissonTitleSub>희선님의 일일 미션을 한가지 선택해주세요</MissonTitleSub>
          </MissionTextBox>
        </MissionTitleBox>

        <ButtonContainer>
          <button onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            남편과 함께 밤산책 하기
            <img src={clickButton} alt="선택" />
          </button>
        </ButtonContainer>

        <ButtonContainer>
          <button onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            카페에서 따뜻한 차 마시며 대화하기
            <img src={clickButton} alt="선택" />
          </button>
        </ButtonContainer>

        <MissionExplanation>
          선택한 미션을 완수하면
          <br />
          배우자가 나에게 작성한 한마디를 확인 할 수 있어요
        </MissionExplanation>
        <Button onClick={handleClick} type="submit" size="medium" text="분석 결과 보기" disabled={false} />
      </MissionSection>
    </>
  );
};

export default EmotionMission;
