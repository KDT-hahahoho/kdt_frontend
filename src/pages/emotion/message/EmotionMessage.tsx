// 진욱

import Button from '@components/common/Button';
import useEmotionStore from '@store/useEmotionStore';
import { useEffect, useState } from 'react';
import {
  DashedLine,
  MessageArea,
  MessageContainer,
  MessageItem,
  MessageSection,
  MessageTitle,
  ProfileImage,
  ProgressBar,
  TitleText,
} from './EmotionMessage.style';

const EmotionMessage = () => {
  const emotionRecord = useEmotionStore((state) => state.record);
  const emotionMessage = useEmotionStore((state) => state.message);
  const updateMessage = useEmotionStore((state) => state.updateMessage);
  const [messageToMe, setMessageToMe] = useState<string>('');
  const [messageToSpouse, setMessageToSpouse] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  // 보내기 버튼 비활성화
  useEffect(() => {
    if (messageToMe.trim() && messageToSpouse.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [messageToMe, messageToSpouse]);

  // 테스트
  useEffect(() => {
    console.log('Updated emotionMessage:', emotionMessage);
    console.log('Updated emotionRecord:', emotionRecord);
  }, [emotionMessage, emotionRecord]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, to: string) => {
    const value = e.target.value;
    const lines = value.split('\n');

    // 2줄 이상 입력 방지
    if (lines.length > 2) {
      return;
    }

    // 50자 이상 입력 방지
    if (value.length > 50) return;

    if (to === 'me') {
      setMessageToMe(value);
    } else {
      setMessageToSpouse(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateMessage(messageToMe, messageToSpouse);

    // GPT 호출
  };

  return (
    <MessageSection>
      <ProgressBar>
        <DashedLine />
      </ProgressBar>
      <MessageContainer onSubmit={handleSubmit}>
        <MessageItem>
          <MessageTitle>
            <ProfileImage gender="female" />
            <TitleText>
              <p>오늘의 나에게 한마디</p>
              <p>사용자님에게 하루동안 보여지는 메시지예요</p>
            </TitleText>
          </MessageTitle>
          <MessageArea>
            <textarea
              rows={2}
              maxLength={50}
              placeholder="50자 이내로 입력해주세요."
              value={messageToMe}
              onChange={(e) => handleInputChange(e, 'me')}
            />
          </MessageArea>
        </MessageItem>
        <MessageItem>
          <MessageTitle second>
            <ProfileImage gender="male" />
            <TitleText>
              <p>오늘의 남편에게 한마디</p>
              <p>남편이 미션을 완료하면 볼 수 있는 메시지예요</p>
            </TitleText>
          </MessageTitle>
          <MessageArea second>
            <textarea
              rows={2}
              placeholder="50자 이내로 입력해주세요."
              maxLength={50}
              value={messageToSpouse}
              onChange={(e) => handleInputChange(e, 'spouse')}
            />
          </MessageArea>
        </MessageItem>
        <pre>{`응원이 될 수 있는 한마디가 중요해요!\n가끔은 위시 한마디를 통해 농담을 보내봐도 좋아요`}</pre>
        <Button text="보내기" disabled={isDisabled} type="submit" size="medium" />
      </MessageContainer>
    </MessageSection>
  );
};

export default EmotionMessage;
