import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { handleValidation } from '@utils/validation/handleValidation';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AuthError from './AuthError';

interface SetupPasswordProps {
  onNext: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SetupPassword = ({ onNext, value, onChange }: SetupPasswordProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 입력
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false); // 비밀번호 유효성 상태

  useEffect(() => {
    setPassword(value);
  }, [value]);

  useEffect(() => {
    // 비밀번호 유효성 검사
    if (password.length >= 6) {
      if (password === confirmPassword) {
        setIsValid(true);
        setError(null);
      } else {
        setIsValid(false);
        setError('비밀번호가 일치하지 않습니다.');
      }
    } else {
      setIsValid(false);
      setError('비밀번호는 최소 6자리 이상이어야 합니다.');
    }
  }, [password, confirmPassword]);

  const handleNext = () => {
    if (isValid) {
      onChange(password);
      onNext();
    }
  };

  return (
    <div>
      <Input
        type="password"
        name="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요 최소 6자리 이상"
        status={handleValidation('password', password)} // type 추가
      />
      <InputDivider />
      <Input
        type="password"
        name="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호를 한번 더 입력해주세요"
        status={handleValidation('password', confirmPassword)}
      />
      {error && <AuthError message={error} type="tooltip" />}
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} fixed={true} />
    </div>
  );
};

const InputDivider = styled.div`
  width: 100%;
  height: 4.5rem;
`;

export default SetupPassword;
