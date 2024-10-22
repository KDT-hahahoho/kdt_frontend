import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { handleValidation } from '@utils/validation/handleValidation';
import React, { useState, useEffect, useDeferredValue } from 'react';
import AuthError from './AuthError';

interface SetupNameProps {
  onNext: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SetupName: React.FC<SetupNameProps> = ({ onNext, value, onChange }) => {
  const [name, setName] = useState(value);
  const deferredName = useDeferredValue(name);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  // 이름 유효성 검사 상태 계산
  const nameStatus = handleValidation('name', deferredName);
  const isValid = nameStatus === 'valid';

  useEffect(() => {
    setName(value);
  }, [value]);

  const handleNext = () => {
    if (isValid) {
      onChange(name);
      onNext();
    } else {
      setError('올바른 형식이 아닙니다.'); // 유효성 검사 실패 시 에러 메시지 설정
    }
  };

  return (
    <div>
      <Input
        type="text"
        name="이름"
        value={name}
        status={nameStatus} // handleValidation 결과를 상태로 전달
        onChange={(e) => {
          setName(e.target.value); // 입력 중 상태 업데이트
          setError(null); // 에러 메시지 초기화
        }}
        placeholder="이름 입력"
      />
      {nameStatus === 'invalid' && <AuthError message="올바른 형식이 아닙니다." />}
      {/* 유효성 검사 실패 시 에러 메시지 */}
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} fixed={true} />
    </div>
  );
};

export default SetupName;
