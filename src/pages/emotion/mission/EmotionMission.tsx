import React, { useState } from 'react';
import {
  MissionLayout,
  MissonTitle,
  ImageContainer,
  WishImage,
  MissionTitleBox,
  MissionTextBox,
  MissonTitleSub,
  ButtonContainer,
  MissionExplanation,
} from './EmotionMission.style';
import Button from '@components/common/Button';

const EmotionMission = () => {
  const [clickButton, setClickButton] = useState('/src/assets/Images/invaildGray.svg');

  const handleHover = () => {
    setClickButton('/src/assets/Images/valid.svg');
    console.log('클릭');
  };

  const handleMouseLeave = () => {
    setClickButton('/src/assets/Images/invaildGray.svg');
    console.log('클릭해제');
  };
  return (
    <>
      <MissionLayout>
        <MissionTitleBox>
          <ImageContainer>
            <WishImage src="/public/img-wish-mission.svg" alt="감정분석가 위시" />
          </ImageContainer>

          <MissionTextBox>
            <MissonTitle>오늘의 AI위시 추천 미션</MissonTitle>
            <MissonTitleSub>희선님의 일일 미션을 한가지 선택해주세요</MissonTitleSub>
          </MissionTextBox>
        </MissionTitleBox>

        <ButtonContainer>
          <button>
            남편과 함께 밤산책 하기
            <img src={clickButton} alt="선택" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} />
          </button>
        </ButtonContainer>

        <ButtonContainer>
          <button>
            남편과 함께 밤산책 하기
            <img src={clickButton} alt="선택" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} />
          </button>
        </ButtonContainer>
        <ButtonContainer>
          <button>
            남편과 함께 밤산책 하기
            <img src={clickButton} alt="선택" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} />
          </button>
        </ButtonContainer>

        <MissionExplanation>
          선택한 미션을 완수하면
          <br />
          배우자가 나에게 작성한 한마디를 확인 할 수 있어요
        </MissionExplanation>
        <Button variant="primary" size="medium" text="분석 결과 보기" fixed={true} />
      </MissionLayout>
    </>
  );
};

export default EmotionMission;
