import React, { useState } from 'react';

interface SetupNameProps {
  onNext: () => void;
}

const SetupName: React.FC<SetupNameProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const handleNext = () => {
    onNext();
  };

  return (
    <div>
      <h2>이름 입력</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름 입력"
      />
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default SetupName;
