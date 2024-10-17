import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { handleValidation } from '@utils/validation/handleValidation';
import React, { useEffect, useState } from 'react';
import AuthError from './AuthError';

interface SetupEmailProps {
  onNext: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SetupEmail: React.FC<SetupEmailProps> = ({ onNext, value, onChange }) => {
  const [email, setEmail] = useState(value); // 초기값을 props에서 받음
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false); // 이메일 유효성 상태 추가
  const [isTouched, setIsTouched] = useState(false); // 입력 필드가 수정되었는지 여부

  useEffect(() => {
    setEmail(value); // props가 변경될 때 state도 업데이트
  }, [value]);

  useEffect(() => {
    // 이메일 유효성 검사
    if (isTouched) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setIsValid(isValidEmail);
      setError(isValidEmail ? null : '유효한 이메일을 입력해주세요.');
    }
  }, [email, isTouched]);

  const handleNext = () => {
    if (isValid) {
      onChange(email);
      onNext();
    } else {
      setError('유효한 이메일을 입력해주세요.');
    }
  };

  return (
    <div>
      <Input
        type="email"
        name="이메일"
        value={email}
        status={handleValidation(error, email)} // email을 인자로 넘김
        onChange={(e) => {
          setEmail(e.target.value); // 입력 중에 상태 업데이트
          setIsTouched(true); // 필드가 수정되었음을 표시
        }}
        placeholder="이메일 입력"
      />
      {error && <AuthError message={error} />} {/* 에러 메시지 표시 */}
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} />
    </div>
  );
};

export default SetupEmail;
