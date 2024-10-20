import styled from '@emotion/styled';
import variables from '@styles/Variables';

interface GenericProgressBarInterface {
  progress: number;
}

const GenericProgressBar = ({ progress }: GenericProgressBarInterface) => {
  return (
    <ProgressBarContainer>
      <StyledProgressBar progress={progress} />
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.div`
  margin-top: 2rem;
  position: relative;
  width: 100%;
  height: 0.5rem;
  margin-bottom: 3rem;
`;

const StyledProgressBar = styled.div<GenericProgressBarInterface>`
  width: 100%;
  height: 100%;
  background-color: ${variables.colors.primarySoft};
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;

  &::after {
    content: '';
    display: block;
    border-radius: 10px;
    width: ${({ progress }) => `${progress}%`};
    transition: width 1s ease-out;
    height: 100%;
    background: linear-gradient(90deg, #ccb2ff 0%, #ccb2ff 100%);
    animation: ProgressBarFillAnimation 1s ease-out;
  }

  @keyframes ProgressBarFillAnimation {
    from {
      width: 0;
    }
    to {
      width: ${({ progress }) => `${progress}%`};
    }
  }
`;

export default GenericProgressBar;
