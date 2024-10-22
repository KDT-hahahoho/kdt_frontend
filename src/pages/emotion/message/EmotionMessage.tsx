// 진욱

import styled from '@emotion/styled';
import useEmotionStore from '@store/useEmotionStore';
import variables from '@styles/Variables';

const MessageSection = styled.section`
  box-shadow: inset 0 0 5px black;
  background-color: ${variables.colors.gray5};
  margin: calc(-1 * ${variables.layoutPadding});
  height: 100vh;
  padding: ${variables.layoutPadding};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ProgressBar = styled.div`
  margin-top: calc(6.4rem - ${variables.layoutPadding});
  margin-left: calc(-1 * ${variables.layoutPadding});
  width: 13rem;
  height: 3rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const DashedLine = styled.div`
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

const MessageContainer = styled.div`
  box-shadow: inset 0 0 2px green;
  flex-grow: 1;
`;

const MessageItem = styled.div`
  box-shadow: inset 0 0 2px blue;
  width: 100%;
`;

const MessageTitle = styled.div<{ even?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.even ? 'row-reverse' : 'row')};
`;

const EmotionMessage = () => {
  const emotionRecord = useEmotionStore((state) => state.record);
  console.log(emotionRecord);
  return (
    <MessageSection>
      <ProgressBar>
        <DashedLine></DashedLine>
      </ProgressBar>
      <MessageContainer>
        <MessageItem>
          <MessageTitle>
            <div>
              <img src="/src/assets/Images/img-wish-wife.svg" alt="나" />
            </div>

            <div>
              <p>오늘의 나에게 한 마디</p>
              <p>사용자님에게 하루동안 보여지는 메시지예요</p>
            </div>
          </MessageTitle>
        </MessageItem>
        <MessageItem>
          <MessageTitle even>
            <div>
              <img src="/src/assets/Images/img-wish-husband.svg" alt="남편" />
            </div>
            <div>
              <p>오늘의 남편에게 한 마디</p>
              <p>남편이 미션을 완료하면 볼 수 있는 메시지예요</p>
            </div>
          </MessageTitle>
        </MessageItem>
      </MessageContainer>
    </MessageSection>
  );
};

export default EmotionMessage;
