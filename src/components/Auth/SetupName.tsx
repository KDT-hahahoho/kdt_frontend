//NOTE - 우중 작업물

import Button from '@components/common/Button';
import Input from '@components/common/Input';
import React, { useState, useEffect, useDeferredValue } from 'react';

interface SetupNameProps {
  onNext: () => void;
  value: string; // prop으로 value를 받아옴
  onChange: (value: string) => void; // prop으로 onChange를 받아옴
}

const SetupName: React.FC<SetupNameProps> = ({ onNext, value, onChange }) => {
  const [name, setName] = useState(value);
  const deferredName = useDeferredValue(name);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setName(value);
  }, [value]);

  // 유효성 검사 및 버튼 활성화 상태 업데이트
  useEffect(() => {
    const isValidName = validateName(deferredName);
    setIsValid(isValidName);
  }, [deferredName]);

  const validateName = (name: string) => {
    const regex = /^[가-힣]{3,}$/; // 한글만 허용하고 3글자 이상인 정규 표현식
    if (!regex.test(name)) {
      setError('이름은 한글로 3글자 이상 입력해야 합니다.'); // 에러 메시지 설정
      return false;
    }
    setError(null); // 유효성 검사 통과
    return true; // 유효성 검사 통과
  };

  const handleNext = () => {
    if (isValid) {
      onChange(name); // "다음" 버튼 클릭 시 상위 컴포넌트의 formData를 업데이트
      onNext(); // 다음 단계로 진행
    }
  };

  return (
    <div>
      <h2>이름을 기입해주세요.</h2>
      <Input
        type="text"
        name="이름"
        value={name}
        onChange={(e) => setName(e.target.value)} // 입력 중에는 상태 업데이트
        placeholder="이름 입력"
      />
      {error && (
        <span style={{ color: 'red', fontSize: '12px' }}>{error}</span> // 에러 메시지 표시
      )}
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} />
    </div>
  );
};

export default SetupName;
