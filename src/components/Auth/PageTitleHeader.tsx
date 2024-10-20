/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import variables from '@styles/Variables';

interface PageTitleHeaderProps {
  currentStep: string;
}

const PageTitleHeader = ({ currentStep }: PageTitleHeaderProps) => {
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const generatedContent = (step: string) => {
      switch (step) {
        case '이름 입력':
          setPageName('이름을 입력해주세요');
          break;
        case '주민등록번호 입력':
          setPageName('주민등록번호를 입력해주세요');
          break;
        case '이메일 입력':
          setPageName('이메일을 입력해주세요');
          break;
        case '비밀번호 입력':
          setPageName('비밀번호를 입력해주세요');
          break;
        case '난임여부':
          setPageName('최근 1년간 난임 진단을 받은 경험이 있나요?');
          break;
        default:
          setPageName('');
      }
    };

    generatedContent(currentStep);
  }, [currentStep]);

  return <PageTitle>{pageName}</PageTitle>;
};

export default PageTitleHeader;

const PageTitle = styled.h2`
  font-size: ${variables.size.max};
  margin-bottom: 3.8rem;
  font-weight: 400;
`;
