import styled from '@emotion/styled';
import variables from '@styles/Variables';
import React from 'react';
import profileImg from '@assets/Images/mainFemaleProfile.svg';
import mainlock from '@assets/Images/mainlock.svg';

const CoupleInfomation = () => {
  return (
    <CoupleInfomationContainer>
      <CoupleInfoTitle>원활한 사용을 위해 부부 연동이 필요해요!</CoupleInfoTitle>
      <CoupleCardsWrapper>
        <PersonalCard>
          <CardImage src={profileImg} alt="User Image" />
          <CardName>내 이름</CardName>
          <EmotionAnalysis>감정 분석 필요</EmotionAnalysis>
        </PersonalCard>
        <SpouseCard>
          <CardImage src={mainlock} alt="Spouse Image" />
          <CardName>배우자 이름</CardName>
          <EmotionAnalysis>연동필수</EmotionAnalysis>
        </SpouseCard>
      </CoupleCardsWrapper>
      <CoupleMission>배우자 연동을 하면 미션 등록이 가능해요</CoupleMission>
    </CoupleInfomationContainer>
  );
};

export default CoupleInfomation;

const CoupleInfomationContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CoupleInfoTitle = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${variables.colors.gray10};
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  padding: 1rem 0;
  color: ${variables.colors.gray100};
  margin-bottom: 1.4rem;
`;

const CoupleCardsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 3.6rem;
`;

const PersonalCard = styled.div`
  border-radius: ${variables.borderRadius}+0.8rem;
  width: 50%;
  height: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: ${variables.BoxShadow};
`;

const SpouseCard = styled.div`
  border-radius: ${variables.borderRadius}+0.8rem;
  width: 50%;
  width: 50%;
  height: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: ${variables.BoxShadow};
`;

const CardImage = styled.img`
  width: 11rem;
  height: 10rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  margin-bottom: 1.8rem;
`;

const CardName = styled.div`
  font-size: ${variables.size.medium};
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const EmotionAnalysis = styled.div`
  font-size: ${variables.size.small};
  text-align: center;
`;

const CoupleMission = styled.div`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${variables.BoxShadow};
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
`;
