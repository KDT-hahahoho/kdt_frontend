import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useEffect, useState } from 'react';
import notInftest from '@assets/Images/notInftest.svg';

interface EmotionData {
  interest_keyword: string;
}

interface CoupleData {
  result?: {
    my_emotion?: EmotionData;
    spouse_emotion?: EmotionData;
  };
}

interface OurKeywordProps {
  coupleData?: CoupleData | undefined;
}
const OurKeyword = ({ coupleData }: OurKeywordProps) => {
  const myKeyword = coupleData?.result?.my_emotion?.interest_keyword ?? '';
  const spouseKeyword = coupleData?.result?.spouse_emotion?.interest_keyword ?? '';
  const [testDone, setTestDone] = useState(false);

  useEffect(() => {
    setTestDone(!!myKeyword);
  }, [myKeyword]);

  const myKeywordArray = myKeyword.split('#').filter((keyword) => keyword.trim() !== '');
  const spouseKeywordArray = spouseKeyword.split('#').filter((keyword) => keyword.trim() !== '');

  return (
    <OurKeywordContainer>
      <OurKeywordTitle>우리의 관심사</OurKeywordTitle>
      <OurKeywordTitleDes>나의 통계와 배우자의 통계를 한눈에 확인할 수 있어요</OurKeywordTitleDes>
      {testDone ? (
        <OurKeywordLineChartContainer>
          <OurKeywordDescription>우리의 관심사</OurKeywordDescription>
          <KeywordContainer>
            {[...myKeywordArray, ...spouseKeywordArray].map((keyword, index) => (
              <KeywordBox key={index} colorIndex={index}>
                #{keyword.trim()}
              </KeywordBox>
            ))}
          </KeywordContainer>
        </OurKeywordLineChartContainer>
      ) : (
        <>
          <NoResult src={notInftest} alt="No test result" />
          <Notification>난임 스트레스 척도 검사를 완료해주세요</Notification>
        </>
      )}
    </OurKeywordContainer>
  );
};
export default OurKeyword;

const NoResult = styled.img`
  width: 100%;
  margin-top: 6rem;
  height: 26rem;
  margin-bottom: 1.8rem;
`;

const Notification = styled.div`
  width: 100%;
  height: 4rem;
  border-radius: ${variables.borderRadius};
  background-color: ${variables.colors.gray10};
  display: flex;
  justify-content: center;
  color: ${variables.colors.gray100};
  font-size: ${variables.size.medium};
  align-items: center;
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 3.5rem;
`;

const KeywordBox = styled.div<{ colorIndex: number }>`
  padding: 0.8rem 1.6rem;
  background-color: ${({ colorIndex }) => {
    switch (colorIndex % 3) {
      case 0:
        return variables.colors.primaryStrong;
      case 1:
        return variables.colors.primaryStrong;
      case 2:
        return variables.colors.secondaryStrong;
      default:
        return variables.colors.secondaryStrong;
    }
  }};
  border-radius: 0.5rem;
  font-size: ${variables.size.medium};
  color: ${variables.colors.white};
`;

const OurKeywordContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 7.6rem;
`;

const OurKeywordTitle = styled.h1`
  font-size: ${variables.size.large};
  font-weight: 600;
`;

const OurKeywordTitleDes = styled.p`
  margin-top: 1rem;
  color: ${variables.colors.gray70};
  font-size: ${variables.size.medium};
`;

const OurKeywordLineChartContainer = styled.div`
  width: 100%;
  height: 20rem;
  border: 1px solid ${variables.colors.gray50};
  border-radius: ${variables.borderRadius};
  margin-top: 3rem;
  padding: 0 1.3rem;
`;

const OurKeywordDescription = styled.p`
  margin-top: 1.8rem;
  font-weight: 600;
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray70};
`;
