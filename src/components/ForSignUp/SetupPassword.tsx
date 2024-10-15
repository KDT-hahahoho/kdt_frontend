import React, { useState } from 'react';

interface SetupPasswordProps {
  onNext: () => void;
}

const SetupPassword: React.FC<SetupPasswordProps> = ({ onNext }) => {
  const [password, setPassword] = useState('');

  const handleNext = () => {
    // 비밀번호 설정 로직
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
