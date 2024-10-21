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

  // 이메일 유효성 검사 상태 계산
  const emailStatus = handleValidation('email', email);
  const isValid = emailStatus === 'valid';

  useEffect(() => {
    setEmail(value); // props가 변경될 때 state도 업데이트
  }, [value]);

  // email 상태가 변경될 때마다 유효성 검사와 에러 업데이트
  useEffect(() => {
    if (emailStatus === 'invalid') {
      setError('유효한 이메일을 입력해주세요.');
    } else {
      setError(null); // 유효하면 에러 메시지 초기화
    }
  }, [emailStatus]);

  const handleNext = () => {
    if (isValid) {
      onChange(email);
      onNext();
    }
  };

  return (
    <div>
      <Input
        type="email"
        name="이메일"
        value={email}
        status={emailStatus} // handleValidation 결과를 상태로 전달
        onChange={(e) => {
          setEmail(e.target.value); // 입력 중에 상태 업데이트
        }}
        placeholder="이메일을 입력해주세요 ex) wish.google.com"
      />
      {error && <AuthError message={error} />} {/* 에러 메시지 표시 */}
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} fixed={true} />
    </div>
  );
};

export default SetupEmail;
