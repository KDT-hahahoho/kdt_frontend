import { useState } from 'react';
import {
  AIMessageContainer,
  ButtonContainer,
  ChattingArea,
  EmotionContainer,
  InputArea,
  MessageContainer,
} from './EmotionRecord.style';

const EmotionBad = ({
  onPrev,
  onNext,
  value,
  onChange,
}: {
  onPrev: () => void;
  onNext: () => void;
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const [userInput, setUserInput] = useState<string>('');
  const [badRecords, setBadRecords] = useState<string[]>(value);
  // const [isWritten, setIsWritten] = useState<boolean>(true);

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.trim()) {
      // setIsWritten(false);
      setUserInput('');
      return null;
    }

    // setIsWritten(true);
    setBadRecords((prev) => [...prev, userInput]);
    setUserInput('');
  };

  const handleNext = () => {
    onChange(badRecords);
    onNext();
  };

  return (
    <EmotionContainer>
      <AIMessageContainer>
        <pre>
          {badRecords.length
            ? `그런일이 있었군요...\n저에게 들려주셔서 감사해요\n저와 함께라면 뭐든 이겨낼 수 있어요.`
            : `그럼 오늘 혹시 기분 안좋았던 일은 없었나요?\n하루를 보내다보면 좋은일도 있고 나쁜일도 있죠..`}
        </pre>
      </AIMessageContainer>

      <ChattingArea>
        <MessageContainer>
          {badRecords.map((item, index) => (
            <pre key={index}>{item}</pre>
          ))}
        </MessageContainer>
        <ButtonContainer>
          <button onClick={() => onPrev()}>이전 대화</button>
          {badRecords.length ? <button onClick={handleNext}>다음 대화</button> : ''}
        </ButtonContainer>
      </ChattingArea>

      <InputArea>
        <form onSubmit={handleInput}>
          <div>
            <textarea
              rows={1}
              placeholder="위시에게만 알려주세요!"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <button type="submit">
            <span>전송</span>
            <img src="/src/assets/Images/icon-send.svg" alt="전송" />
          </button>
        </form>
        {/* {!isWritten && <p>내용을 입력해주세요!</p>} */}
      </InputArea>
    </EmotionContainer>
  );
};

export default EmotionBad;
