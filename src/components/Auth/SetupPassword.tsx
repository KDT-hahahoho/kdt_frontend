import React, { useEffect, useState } from 'react';

interface SetupPasswordProps {
  onNext: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SetupPassword: React.FC<SetupPasswordProps> = ({ onNext, value, onChange }) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    setPassword(value);
  }, [value]);

  const handleNext = () => {
    // 비밀번호 설정 로직
    onChange(password);
    onNext();
  };

  return (
    <div>
      <h2>비밀번호 설정</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
      />
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default SetupPassword;
