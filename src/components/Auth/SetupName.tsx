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
  const [isTouched, setIsTouched] = useState(false); // 입력 필드가 수정되었는지 여부를 추적

  useEffect(() => {
    setName(value);
  }, [value]);

  // 유효성 검사 및 버튼 활성화 상태 업데이트
  useEffect(() => {
    if (isTouched) {
      const isValidName = validateName(deferredName);
      setIsValid(isValidName);
    }
  }, [deferredName, isTouched]);

  const validateName = (name: string) => {
    const regex = /^[가-힣]{2,}$/; // 한글만 허용하고 2글자 이상인 정규 표현식
    if (!regex.test(name)) {
      setError('올바른 형식이 아닙니다.'); // 에러 메시지 설정
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

  const handleValidation = (error: string | null, value: string) => {
    if (error) {
      return 'invalid'; // 에러가 있을 경우 'invalid'
    }
    if (value.length === 0) {
      return 'default'; // 입력값이 비어있을 경우 'default'
    }
    return 'valid'; // 그 외의 경우 'valid'
  };

  return (
    <div>
      <Input
        type="text"
        name="이름"
        value={name}
        status={handleValidation(error, name)} // error와 name을 인자로 넘김
        onChange={(e) => {
          setName(e.target.value); // 입력 중에는 상태 업데이트
          setIsTouched(true); // 필드가 수정되었음을 표시
        }}
        placeholder="이름 입력"
      />
      {isTouched &&
        error && ( // 필드가 수정된 후에만 에러 메시지 표시
          <div style={{ color: '#FFA997', fontSize: '14px', paddingLeft: '12px', paddingTop: '12px' }}>{error}</div>
        )}
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} />
    </div>
  );
};

export default SetupName;
