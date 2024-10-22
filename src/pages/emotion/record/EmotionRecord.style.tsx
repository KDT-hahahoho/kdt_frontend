import styled from '@emotion/styled';
import variables from '@styles/Variables';

export const EmotionLayout = styled.section`
  height: calc(100vh - 2 * ${variables.layoutPadding});
  padding-top: calc(7.2rem - ${variables.layoutPadding});
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ProgressBar = styled.div`
  flex-shrink: 0;
  height: 1.2rem;
  margin-left: calc(-1 * ${variables.layoutPadding});
  margin-right: calc(-1 * ${variables.layoutPadding});
  display: flex;
  align-items: center;
`;

export const DashedLine = styled.div`
  width: 100%;
  height: 0.2rem;
  background: repeating-linear-gradient(
    to right,
    ${variables.colors.primarySoft} 0,
    ${variables.colors.primarySoft} 0.5rem,
    transparent 0.5rem,
    transparent 1rem
  );
`;

export const ImageContainer = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  width: 12.8rem;
  height: 12.8rem;
  aspect-ratio: 1/1;
  background-color: ${variables.colors.secondarySoft};
  margin: 0 auto;
  margin-top: 4.5rem;
  position: relative;
`;

export const WishImage = styled.img`
  position: absolute;
  top: 1rem;
  left: -4.5rem;
`;

export const EmotionContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
`;

export const AIMessageContainer = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 3rem;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: ' ';
    width: 3.5rem;
    height: 2.4rem;
    background-image: url('/src/assets/Images/img-speech-bubble.svg');
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: -2rem;
    left: 35%;
    transform: translateX(-50%);
  }

  & > pre {
    background-color: ${variables.colors.primarySoft};
    inline-size: fit-content;
    margin: 0 auto;
    padding: 1rem 3rem;
    box-sizing: border-box;
    border-radius: 2.5rem;
    text-align: center;
    font-size: ${variables.size.medium};
    color: ${variables.colors.primaryStrong};
    font-weight: 600;
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;

export const ChattingArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const MessageContainer = styled.ul`
  margin-bottom: 2rem;
  min-height: 0;
  flex-basis: 0;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 1rem;
  scrollbar-width: thin;
  scrollbar-color: ${variables.colors.gray50} transparent;

  &::-webkit-scrollbar {
    width: 1px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${variables.colors.gray50};
  }

  & li {
    width: fit-content;
    max-width: 30rem;
    margin-left: auto;
    padding: 1.4rem 2.2rem;
    border-radius: 2rem 2rem 0 2rem;
    border: 0.1rem solid ${variables.colors.gray50};
    box-sizing: border-box;
    box-shadow: 0px 0px 6px rgba(217, 203, 245, 0.3);
    margin-bottom: 1.8rem;

    & > pre {
      font-weight: 500;
      font-size: ${variables.size.medium};

      overflow: hidden;
      white-space: pre-wrap;
      overflow-wrap: break-word;
    }

    &:last-child {
      margin-bottom: unset;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2.8rem;
  display: flex;
  gap: 1.2rem;

  & > button {
    &:first-child {
      margin-left: auto;
    }

    padding: 0.55rem 1.4rem;
    border: 0.1rem solid ${variables.colors.primaryStrong};
    border-radius: 1.55rem;
    font-size: ${variables.size.big};
    color: ${variables.colors.primaryStrong};
    font-weight: 500;
    transition: all ${variables.TransitionDuration};

    &:hover,
    &:focus {
      background-color: ${variables.colors.primaryStrong};
      color: ${variables.colors.white};
    }
  }
`;

export const InputArea = styled.div`
  flex-shrink: 0;
  margin: 0 calc(-1 * ${variables.layoutPadding});
  padding: 0 ${variables.layoutPadding};
  padding-top: 1.2rem;
  padding-bottom: 4.5rem;
  background-color: ${variables.colors.primaryLight};
  position: absolute;
  bottom: calc(-1 * ${variables.layoutPadding});
  left: 0;
  right: 0;

  & > form {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    & > div {
      flex-grow: 1;
      background-color: ${variables.colors.white};
      padding: 1rem 0;
      padding-left: 2.6rem;
      border: 0.1rem solid ${variables.colors.gray50};
      border-radius: 1.4rem;
      box-sizing: border-box;
      box-shadow: 0 0 10.4px rgba(217, 203, 245, 0.37);
      display: flex;
      align-items: center;

      &:focus-within {
        box-shadow: inset 0 0 0 0.1rem ${variables.colors.primary};
      }

      & > textarea {
        margin-right: 1rem;
        padding-right: 2.6rem;
        scrollbar-width: thin;
        scrollbar-color: ${variables.colors.gray50} transparent;

        &::-webkit-scrollbar {
          width: 1px;
        }

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background-color: ${variables.colors.gray50};
        }
      }
    }

    & > button {
      width: 5.6rem;
      height: 4rem;
      background-color: ${variables.colors.primaryStrong};
      border-radius: 1.4rem;
      display: flex;
      justify-content: center;
      align-items: center;

      &:focus {
        box-shadow: inset 0 0 0 2px ${variables.colors.gray10};
      }

      & > span {
        position: absolute !important;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
      }

      & > img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

export const ToastContainer = styled.div`
  width: calc(100% - 2 * ${variables.layoutPadding});
  position: absolute;
  top: -6.3rem;
  left: ${variables.layoutPadding};
`;
