import React, { useEffect, useState } from 'react';

interface SetupEmailProps {
  onNext: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SetupEmail: React.FC<SetupEmailProps> = ({ onNext, value, onChange }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(value);
  }, [value]);

  const handleNext = () => {
    onChange(email);
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
