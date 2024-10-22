import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { useEffect } from 'react';

const Notification = styled.p`
  width: 100%;
  margin: 0 auto;
  padding: 1.2rem 2.6rem;
  box-sizing: border-box;
  border-radius: ${variables.borderRadius};
  background-color: ${variables.colors.secondarySoft};
  color: ${variables.colors.secondaryStrong};
  font-size: ${variables.size.medium};
  font-weight: 500;
  z-index: 9999;
`;

const Toast = ({ setToast, text }: { setToast: (bool: boolean) => void; text: string }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);
  return <Notification>{text}</Notification>;
};

export default Toast;
