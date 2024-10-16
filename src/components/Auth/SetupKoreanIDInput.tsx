/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@components/common/Button';
import React, { useState, useEffect } from 'react';

interface SetupKoreanIDInputProps {
  onNext: () => void;
  value: string; // 주민등록번호 전체를 받을 prop
  onChange: (value: string) => void; // 상위 컴포넌트에 전달할 콜백
}

interface IdNumber {
  firstPart: string;
  secondPart: string;
}

const SetupKoreanIDInput: React.FC<SetupKoreanIDInputProps> = ({ onNext, value, onChange }) => {
  const [idNumber, setIdNumber] = useState<IdNumber>({ firstPart: '', secondPart: '' });
  const [isValid, setIsValid] = useState(false);

  // value prop이 변경될 때 local state를 업데이트
  useEffect(() => {
    const parts = value.split('-');
    setIdNumber({
      firstPart: parts[0] || '',
      secondPart: parts[1] || '',
    });
  }, [value]);

  useEffect(() => {
    validateIdNumber();
  }, [idNumber]);

  const validateIdNumber = () => {
    const isFirstPartValid = idNumber.firstPart.length === 6 && /^\d+$/.test(idNumber.firstPart); // 6자리 숫자
    const isSecondPartValid = idNumber.secondPart.length === 1 && /^\d$/.test(idNumber.secondPart); // 1자리 숫자
    setIsValid(isFirstPartValid && isSecondPartValid);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIdNumber((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (isValid) {
      const newIdNumber = `${idNumber.firstPart}-${idNumber.secondPart}`;
      onChange(newIdNumber); // 상위 컴포넌트로 주민등록번호 전달
      onNext(); // 다음 단계로 진행
    } else {
      alert('주민등록번호를 정확하게 입력해주세요.');
    }
  };

  return (
    <div css={containerStyle}>
      <div>
        <input
          css={inputStyle}
          type="text"
          name="firstPart"
          value={idNumber.firstPart}
          onChange={handleInputChange}
          maxLength={6}
          placeholder="앞 6자리"
        />
        -
        <input
          css={inputStyle}
          type="text"
          name="secondPart"
          value={idNumber.secondPart}
          onChange={handleInputChange}
          maxLength={1}
          placeholder="뒤 1자리"
        />
      </div>
      <Button onClick={handleNext} text="다음" type="submit" size="large" disabled={!isValid} />
    </div>
  );
};

const containerStyle = css``;

const inputStyle = css`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
  width: 100px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export default SetupKoreanIDInput;
