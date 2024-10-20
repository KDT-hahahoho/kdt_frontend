/** @jsxImportSource @emotion/react */
import React from 'react';
import HomePageTitle from '@components/home/HomePageTitle';
import Footer from '@components/common/Footer';
import styled from '@emotion/styled';

const Home = () => {
  return (
    <HompageContainer>
      <HomePageTitle />
      <Footer />
    </HompageContainer>
  );
};

const HompageContainer = styled.div``;

export default Home;
