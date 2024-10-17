/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import variables from '@styles/Variables';

interface AuthErrorProps {
  message: string;
}

const AuthErrorContainer = styled.div`
  color: #ffa997;
  font-size: ${variables.size.large};
  padding-left: 1.2rem;
  padding-top: 1.2rem;
`;

const AuthError = ({ message }: AuthErrorProps) => {
  return <AuthErrorContainer>{message}</AuthErrorContainer>;
};

export default AuthError;
