//NOTE - 우중 작업물

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
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일을 입력하세요" />
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default SetupEmail;
