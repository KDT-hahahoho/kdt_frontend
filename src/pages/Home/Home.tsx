/** @jsxImportSource @emotion/react */
import React from 'react';
import HomePageTitle from '@components/home/HomePageTitle';
import Footer from '@components/common/Footer';
import styled from '@emotion/styled';
import CoupleInfomation from '@components/home/CoupleInfomation';

//  홈에서 쓰는 컴포넌트 명세
// <HomePageTitle /> = 제목 컴포넌트   |  <CoupleInfomation /> = 부부연동 ,미션  | <Footer> =푸터는 메인에서만 필요해서 호출

const Home = () => {
  return (
    <HompageContainer>
      <HomePageTitle />
      <CoupleInfomation />
      <Footer />
    </HompageContainer>
  );
};

const HompageContainer = styled.div``;

export default Home;
