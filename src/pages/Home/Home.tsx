/** @jsxImportSource @emotion/react */
import React from 'react';
import HomePageTitle from '@components/home/HomePageTitle';
import Footer from '@components/common/Footer';
import styled from '@emotion/styled';
import CoupleInfomation from '@components/home/CoupleInfomation';

//  홈에서 쓰는 컴포넌트
// <HomePageTitle /> = 제목 컴포넌트   |  <CoupleInfomation /> = 부부연동 ,미션  | <Footer> =푸터는 메인에서만 필요해서 호출

const Home = () => {
  return (
    <HompageContainer>
      <ContentWrapper>
        <HomePageTitle />
        <CoupleInfomation />
      </ContentWrapper>
      <Footer />
    </HompageContainer>
  );
};

const HompageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 1rem;
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default Home;
