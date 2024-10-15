import React, { useState } from 'react';

interface SetupEmailProps {
  onNext: () => void;
}

const SetupEmail: React.FC<SetupEmailProps> = ({ onNext }) => {
  const [email, setEmail] = useState('');

  const handleNext = () => {
    // 이메일 인증 로직
    onNext();
  };

  return (
    <div>
      <h2>이메일 인증</h2>
      <p>이메일을 입력하고 인증을 완료해주세요.</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력하세요"
      />
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default SetupEmail;
