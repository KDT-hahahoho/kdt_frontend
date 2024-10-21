/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';

// 디폴트 형식과 툴팁형식을 제공함

interface AuthErrorProps {
  message: string;
  type?: 'default' | 'tooltip';
}

const AuthErrorContainer = styled.div`
  color: #ffa997;
  font-size: ${variables.size.large};
  padding-left: 1.2rem;
  padding-top: 1.2rem;
`;

const AuthErrorTypeToolTip = styled.div`
  color: #ffa997;
  padding: 0.6rem;
  background-color: #ffefeb;
  font-size: ${variables.size.medium};
  padding-left: 1.2rem;
  padding-top: 1.2rem;
  position: absolute;
  z-index: 1000;
  width: 36.8rem;
  bottom: 20rem;
  box-sizing: border-box;
  border-radius: ${variables.borderRadius};
`;

const AuthError = ({ message, type = 'default' }: AuthErrorProps) => {
  if (type === 'tooltip') {
    return <AuthErrorTypeToolTip>X {message}</AuthErrorTypeToolTip>;
  }

  return <AuthErrorContainer>{message}</AuthErrorContainer>;
};

export default AuthError;
