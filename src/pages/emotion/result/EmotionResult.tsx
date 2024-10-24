import styled from '@emotion/styled';
import useAnalysisStore from '@store/useAnalysisStore';
import variables from '@styles/Variables';
import EmotionGraph from './EmotionGraph';
import EmotionStress from './EmotionStress';

export const ResultSection = styled.section`
  height: 100%;
  margin: calc(-1 * ${variables.layoutPadding});
  padding: ${variables.layoutPadding};
  margin-bottom: -4rem;
  padding-bottom: 4rem;
  background-color: ${variables.colors.gray5};
  display: flex;
  flex-direction: column;
`;

export const ResultTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ResultTextBox = styled.div`
  align-items: center;
  margin-bottom: 3rem;
  margin-top: 10rem;

  & > h2 {
    font-size: ${variables.size.large};
    font-weight: 500;
  }

  & > pre {
    font-size: ${variables.size.big};
    color: ${variables.colors.gray100};
    margin-top: 1rem;
  }
`;

export const WishImage = styled.img`
  width: 11rem;
  margin-bottom: 0;
`;

export const EmotionGraphContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > div {
    padding: 5rem;
    border-radius: 1rem;
    border: 1px solid ${variables.colors.gray10};
    background-color: white;
    box-shadow: 0px 0px 4px rgba(217, 203, 245, 0.3);
  }
`;

const EmotionResult = () => {
  const analysisResult = useAnalysisStore((state) => state.analysis);

  console.log(analysisResult.keywords);

  return (
    <>
      <ResultSection>
        <ResultTitleBox>
          <ResultTextBox>
            <h2>오늘 희선님의 예상감정</h2>
            <pre>위시와 대화한 내용으로 분석되었어요</pre>
          </ResultTextBox>
          <WishImage src="/src/assets/Images/emotionResultSad.svg" alt="감정분석가 위시" />
        </ResultTitleBox>

        <EmotionGraphContainer>
          <EmotionGraph />
          <div>{analysisResult.keywords.map((v) => v)}</div>
        </EmotionGraphContainer>
        <ResultTextBox>
          <pre>난임 스트레스 예상점수</pre>
        </ResultTextBox>
        <EmotionGraphContainer>
          <EmotionStress />
          <div>예상 분포도 자리</div>
        </EmotionGraphContainer>
      </ResultSection>
    </>
  );
};

export default EmotionResult;
