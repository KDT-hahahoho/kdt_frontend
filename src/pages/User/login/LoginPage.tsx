import styled from '@emotion/styled';
import React, { useState } from 'react';
import logo from '@assets/Images/logo.svg';
import welcome from '@assets/Images/welcome.svg';
import Input from '@components/common/Input';
import { handleValidation } from '@utils/validation/handleValidation';
import Button from '@components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import variables from '@styles/Variables';
// import axios from 'axios';
import useAuthStore from '@store/useAuthStore';
import { userRes } from '@data/user';

const LoginPage = () => {
  const [email, setEmail] = useState('test2@test.com');
  const [password, setPassword] = useState('test1234');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailStatus = handleValidation('email', email);
  const passwordStatus = handleValidation('password', password);
  const isValid = emailStatus === 'valid' && passwordStatus === 'valid';

  const navigate = useNavigate();

  // Zustand store에서 setAuthState 가져오기
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const handleLogin = async () => {
    if (!isValid) {
      setErrorMessage('이메일 또는 비밀번호가 유효하지 않습니다.');
      return;
    }

    // 로그인 API 호출
    try {
      // const response = await axios.post('https://www.wishkr.site/accounts/login/', { email, password });

      const response = userRes;

      console.log('Login successful:', response.data);
      const token = response.data.result.token;
      const Email = response.data.result.email;
      const MemberId = response.data.result.memberId;
      const userName = response.data.result.username;
      const Gender = response.data.result.gender;
      const is_infertility = response.data.result.is_infertility;

      const connect = 'false';
      console.log(token);

      // zustand 상태에 로그인 정보 저장
      // 로컬 스토리지에도 로그인 정보 저장
      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', Email);
      localStorage.setItem('MemberId', MemberId + '');
      localStorage.setItem('userName', userName);
      localStorage.setItem('Gender', Gender);
      localStorage.setItem('connect', connect);
      localStorage.setItem('is_infertility', is_infertility + '');

      setAuthState(token, Email, MemberId + '', userName);

      // 홈 페이지로 이동
      navigate('/home');
      // if (response.status === 200) console.log('테스트 로그인을 위해 로직 분리');
    } catch (error) {
      setErrorMessage('이메일 또는 비밀번호가 유효하지 않습니다.');
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginPageContainer>
      <StyledImageWrapper>
        <StyledImageLogo src={logo} alt="logo" />
        <StyledImageChar src={welcome} alt="Login Page" />
      </StyledImageWrapper>

      <InputWrapper>
        <Input
          type="email"
          name="이메일"
          value={email}
          status={emailStatus}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
        />
        <Input
          type="password"
          name="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요 최소 6자리 이상"
          status={passwordStatus}
        />
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>} {/* 에러 메시지 표시 */}
      </InputWrapper>

      <ButtonWrapper>
        <Button
          onClick={handleLogin}
          text="로그인"
          type="submit"
          size="large"
          disabled={!isValid} // isValid 상태에 따라 버튼 활성화
        />
        <StyledLink to="/users/signup">회원가입</StyledLink>
      </ButtonWrapper>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledImageLogo = styled.img`
  background-position: center;
  width: 13.2rem;
  height: 4.6rem;
`;

const StyledImageChar = styled.img`
  width: 28.2rem;
  height: 24rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: fixed;
  bottom: 3rem;
  left: ${variables.layoutPadding};
  right: ${variables.layoutPadding};
  width: auto;
  max-width: calc(100% - 2 * ${variables.layoutPadding});
  z-index: 1000;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: ${variables.colors.gray50};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default LoginPage;
