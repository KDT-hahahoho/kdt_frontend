import React, { useState, useEffect } from 'react';

interface SetupKoreanIDInputProps {
  onNext: () => void;
  value: string; // 주민등록번호 전체를 받을 prop
  onChange: (value: string) => void; // 상위 컴포넌트에 전달할 콜백
}

const SetupKoreanIDInput: React.FC<SetupKoreanIDInputProps> = ({ onNext, value, onChange }) => {
  const [idNumber, setIdNumber] = useState({ firstPart: '', secondPart: '' });

  // value prop이 변경될 때 local state를 업데이트
  useEffect(() => {
    const parts = value.split('-');
    setIdNumber({
      firstPart: parts[0] || '',
      secondPart: parts[1] || '',
    });
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIdNumber((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (idNumber.firstPart.length === 6 && idNumber.secondPart.length === 1) {
      const newIdNumber = `${idNumber.firstPart}-${idNumber.secondPart}`;
      onChange(newIdNumber); // 상위 컴포넌트로 주민등록번호 전달
      onNext(); // 다음 단계로 진행
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
