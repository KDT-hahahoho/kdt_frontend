import React, { useState } from 'react';

interface SetupKoreanIDInputProps {
  onNext: () => void;
}

const SetupKoreanIDInput: React.FC<SetupKoreanIDInputProps> = ({ onNext }) => {
  const [idNumber, setIdNumber] = useState({ firstPart: '', secondPart: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIdNumber((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (idNumber.firstPart.length === 6 && idNumber.secondPart.length === 1) {
      onNext();
    } else {
      alert('주민등록번호를 정확하게 입력해주세요.');
    }
  };

  return (
    <div>
      <h2>주민등록번호 입력</h2>
      <p>주민등록번호의 앞 6자리와 뒷 1자리를 입력해주세요.</p>
      <div>
        <input
          type="text"
          name="firstPart"
          value={idNumber.firstPart}
          onChange={handleInputChange}
          maxLength={6}
          placeholder="앞 6자리"
        />
        -
        <input
          type="text"
          name="secondPart"
          value={idNumber.secondPart}
          onChange={handleInputChange}
          maxLength={1}
          placeholder="뒤 1자리"
        />
      </div>
      <button onClick={handleNext}>다음</button>
    </div>
  );
};

export default SetupKoreanIDInput;
