//NOTE - 우중 작업물

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import React, { useState, useEffect } from 'react';

interface SetupNameProps {
  onNext: () => void;
  value: string; // prop으로 value를 받아옴
  onChange: (value: string) => void; // prop으로 onChange를 받아옴
}

const SetupName: React.FC<SetupNameProps> = ({ onNext, value, onChange }) => {
  const [name, setName] = useState(value);

  useEffect(() => {
    setName(value);
  }, [value]);

  const handleNext = () => {
    onChange(name); // "다음" 버튼 클릭 시 상위 컴포넌트의 formData를 업데이트
    onNext(); // 다음 단계로 진행
  };

  return (
    <div>
      <h2>이름을 작성해주세요</h2>
      <Input
        type="text"
        name="이름"
        value={name}
        onChange={(e) => setName(e.target.value)} // 입력 중에는 상태 업데이트
        placeholder="이름 입력"
      />
      <Button onClick={handleNext} text="다음" type="submit" size="large"></Button>
    </div>
  );
};

export default SetupName;
