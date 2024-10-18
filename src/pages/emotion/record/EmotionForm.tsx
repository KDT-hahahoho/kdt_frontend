import styled from '@emotion/styled';

const EmotionFormContainer = styled.div`
  box-shadow: inset 0 0 2px green;
  flex-grow: 1;
  flex-shrink: 0;
`;

const EmotionForm = ({ children }: { children: React.ReactNode }) => {
  return <EmotionFormContainer>{children}</EmotionFormContainer>;
};

export default EmotionForm;
