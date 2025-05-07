import styled from '@emotion/styled';
import { keyframes } from '@emotion/react'; // keyframes 유틸리티 가져오기
import variables from '@styles/Variables';

const HomePageTitle = () => {
  const userName = localStorage.getItem('userName');

  const alternateTexts = [
    '오늘 하루는 어떠셨나요?',
    '기분 좋은 하루였나요?',
    '멋진 하루를 보내셨나요?',
    '행복한 하루를 만드셨나요?',
    '보람찬 하루였나요?',
  ];

  const randomText = alternateTexts[Math.floor(Math.random() * alternateTexts.length)];

  return (
    <PageTitle>
      {userName ? userName : 'Guest'}님, {randomText}
    </PageTitle>
  );
};

export default HomePageTitle;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageTitle = styled.h2`
  font-size: ${variables.size.max};
  margin: 2rem 0;
  font-weight: 600;

  animation: ${fadeIn} 1s ease-in-out;
`;
