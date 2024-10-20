import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '@assets/Images/welcome.svg';
import styled from '@emotion/styled';
import variables from '@styles/Variables';

const userName = '윤우중';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // 메인 페이지로 이동
    }, 4000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);

  return (
    <WelcomePageContainer>
      <ImageContainer>
        <BackgroundCircle />
        <FloatingText>
          {userName}님 만나서
          <br />
          반가워요
        </FloatingText>
        <StyledImage src={Welcome} alt="환영합니다" />
      </ImageContainer>
      <DescriptionText>위시에 처음 가입하셨네요!</DescriptionText>
      <DescriptionText>두가지 설정을 통해 서비스를 원활하게 이용할 수 있어요!</DescriptionText>
    </WelcomePageContainer>
  );
};

const WelcomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  opacity: 0;
  animation: fadeIn 1s forwards;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  text-align: center;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  width: 28rem;
  height: 28rem;
  background-color: #eee5ff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
  width: 28rem;
  margin: 0 auto;
  display: block;
  position: relative;
  z-index: 1;
  animation: slideIn 1s forwards;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const FloatingText = styled.div`
  position: absolute;
  bottom: 100%;
  left: 20%;
  transform: translate(-50%, -50%);
  font-size: ${variables.size.large};
  font-weight: 600;
  color: ${variables.colors.black};
  z-index: 1;
  animation: fadeIn 1s forwards;
`;

const DescriptionText = styled.p`
  margin-top: 2rem;
  font-size: ${variables.size.big};
  color: ${variables.colors.primaryStrong};
  animation: fadeIn 1s forwards;
  opacity: 0;
  animation-delay: 1s;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

export default WelcomePage;
