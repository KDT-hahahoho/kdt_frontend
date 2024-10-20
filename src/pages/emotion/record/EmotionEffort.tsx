import { useNavigate } from 'react-router-dom';
import {
  AIMessageContainer,
  ButtonContainer,
  ChattingArea,
  EmotionContainer,
  InputArea,
  MessageContainer,
} from './EmotionRecord.style';
import { useState } from 'react';

const EmotionEffort = ({
  onPrev,
  value,
  onChange,
}: {
  onPrev: () => void;
  value: string[];
  onChange: (value: string[]) => void;
}) => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<string>('');
  const [efforts, setEfforts] = useState<string[]>(value);

  const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput.trim()) {
      setUserInput('');
      return null;
    }

    setEfforts((prev) => [...prev, userInput]);
    setUserInput('');
  };

  const handleFinish = () => {
    onChange(efforts);
    navigate('/emotion/message');
  };

  return (
    <EmotionContainer>
      <AIMessageContainer>
        <pre>
          {efforts.length
            ? `그럼 오늘은 임신을 위해\n평소보다 노력한 일이 있나요?`
            : `멋진데요?\n하나하나 매일 노력해봐요!`}
        </pre>
      </AIMessageContainer>

      <ChattingArea>
        <MessageContainer>
          {efforts.map((item, index) => (
            <pre key={index}>{item}</pre>
          ))}
        </MessageContainer>
        <ButtonContainer>
          <button onClick={() => onPrev()}>이전 대화</button>
          <button onClick={handleFinish}>{efforts.length ? '대화 마치기' : '없어요'}</button>
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

export default EmotionEffort;
