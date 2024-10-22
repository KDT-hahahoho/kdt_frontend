import styled from '@emotion/styled';
import variables from '@styles/Variables';

export const MissionLayout = styled.section`
  height: calc(100vh - (2 * ${variables.layoutPadding} + 6rem));
  padding-top: calc(7.2rem - ${variables.layoutPadding});
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;
export const MissionTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4rem;
`;

export const MissionTextBox = styled.div`
  margin-left: 2rem;
`;

export const MissonTitle = styled.div`
  margin-top: 3rem;
  font-size: ${variables.size.big};
  font-weight: 600;
`;

export const MissonTitleSub = styled.div`
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray100};
  margin-top: 0.5rem;
  font-weight: 400;
`;

export const ImageContainer = styled.div`
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  width: 4.8rem;
  height: 4.8rem;
  background-color: ${variables.colors.secondarySoft};
  margin-top: 3rem;
  position: relative;
`;

export const WishImage = styled.img`
  position: absolute;
  width: 5rem;
  height: 5rem;
`;

export const ButtonContainer = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;

  & > button {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    border: 0.1rem solid ${variables.colors.gray10};
    box-shadow: 0px 0px 6px rgba(217, 203, 245, 0.5);
    padding: 2rem 3rem;
    border-radius: 2rem;
    font-size: ${variables.size.big};
    color: ${variables.colors.gray100};
    font-weight: 500;
    transition: all ${variables.TransitionDuration};

    &:hover,
    &:focus {
      border: 0.1rem solid ${variables.colors.primaryStrong};
      color: ${variables.colors.black};
      box-shadow: 0px 0px 6px rgba(217, 203, 245, 1);
    }
  }
`;

export const MissionExplanation = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  height: calc(100vh - 5.6rem);
  margin-bottom: 3rem;
  color: ${variables.colors.gray100};
  font-weight: 400;
`;
