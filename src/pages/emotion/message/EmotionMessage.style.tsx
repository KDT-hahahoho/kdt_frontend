import styled from '@emotion/styled';
import variables from '@styles/Variables';

export const MessageSection = styled.section`
  height: 100vh;
  margin: calc(-1 * ${variables.layoutPadding});
  padding: ${variables.layoutPadding};
  margin-bottom: -4rem;
  padding-bottom: 4rem;
  background-color: ${variables.colors.gray5};
  display: flex;
  flex-direction: column;
`;

export const ProgressBar = styled.div`
  margin-top: calc(6.4rem - ${variables.layoutPadding});
  margin-bottom: 4.3rem;
  margin-left: calc(-1 * ${variables.layoutPadding});
  width: 13rem;
  height: 3rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const DashedLine = styled.div`
  width: 100%;
  height: 0.2rem;
  background: repeating-linear-gradient(
    to right,
    ${variables.colors.primaryStrong} 0,
    ${variables.colors.primaryStrong} 0.5rem,
    transparent 0.5rem,
    transparent 1rem
  );
`;

export const MessageContainer = styled.form`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  & > pre {
    flex-shrink: 0;
    margin-top: auto;
    margin-bottom: 3.7rem;
    text-align: center;
    color: ${variables.colors.gray70};
  }

  & > button {
    flex-shrink: 0;
  }
`;

export const MessageItem = styled.div`
  margin-bottom: 5rem;
  width: 100%;

  &:last-child {
    margin-bottom: unset;
  }
`;

export const MessageTitle = styled.div<{ second?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.second ? 'row-reverse' : 'row')};
  text-align: ${(props) => (props.second ? 'right' : '')};
  gap: 1.6rem;
  align-items: center;
  margin-bottom: 2.6rem;
`;

export const ProfileImage = styled.div<{ gender: 'male' | 'female' }>`
  width: 4.8rem;
  height: 4.8rem;
  background-color: ${(props) =>
    props.gender === 'male' ? variables.colors.secondarySoft : variables.colors.primarySoft};
  border: 0.05rem solid
    ${(props) => (props.gender === 'male' ? variables.colors.secondaryStrong : variables.colors.primaryStrong)};
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;

  background-image: url(${(props) => `/img/img-wish-${props.gender}.svg`});
  background-position: ${(props) => (props.gender === 'male' ? 'top 0.4rem left -3.2rem' : 'top 0.4rem left -1.4rem')};
  background-repeat: no-repeat;
`;

export const TitleText = styled.div`
  & > p {
    &:first-child {
      font-weight: 700;
      font-size: ${variables.size.big};
      margin-bottom: 0.4rem;
    }

    &:last-child {
      font-weight: 500;
      font-size: ${variables.size.medium};
      color: ${variables.colors.gray70};
    }
  }
`;

export const MessageArea = styled.div<{ second?: boolean }>`
  & > textarea {
    background-color: ${variables.colors.white};
    padding: 1.8rem 2.2rem;
    box-sizing: border-box;
    border-radius: ${(props) => (props.second ? '2rem 0 2rem 2rem' : '0 2rem 2rem 2rem')};
    box-shadow: 0 0 0.6rem rgba(217, 203, 245, 0.3);
    overflow: hidden;
  }
`;
