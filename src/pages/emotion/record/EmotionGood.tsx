import { useState } from 'react';
import {
  AIMessageContainer,
  ButtonContainer,
  ChattingArea,
  EmotionContainer,
  InputArea,
  MessageContainer,
} from './EmotionRecord.style';

const EmotionGood = ({
  onNext,
  value,
  onChange,
}: {
  onNext: () => void;
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const [userInput, setUserInput] = useState<string>('');
  const [goodRecords, setGoodRecords] = useState<string[]>(value);

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.trim()) {
      setUserInput('');
      return null;
    }

    setGoodRecords((prev) => [...prev, userInput]);
    setUserInput('');
  };

  const handleNext = () => {
    onChange(goodRecords);
    onNext();
  };

  return (
    <EmotionContainer>
      <AIMessageContainer>
        <pre>
          {goodRecords.length
            ? `정말 행복하셨겠어요!\n사용자님의 예쁜 미소를 보니 저까지 행복해지는데요?`
            : `오늘 하루 중, 사용자님의 기분을\n행복하게 만들어준 요소가 있었나요?`}
        </pre>
      </AIMessageContainer>

      <ChattingArea>
        <MessageContainer>
          {goodRecords.map((item, index) => (
            <pre key={index}>{item}</pre>
          ))}
        </MessageContainer>
        <ButtonContainer>
          <button onClick={handleNext}>{goodRecords.length ? '다음 대화' : '없어요'}</button>
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
      </InputArea>
    </EmotionContainer>
  );
};

export default EmotionGood;
