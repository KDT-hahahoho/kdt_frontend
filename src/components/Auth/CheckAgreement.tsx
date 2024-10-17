import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@components/common/Button';

interface CheckAgreementProps {
  submitSignup: () => void | undefined;
  onClose?: () => void;
}

// CheckAgreement 컴포넌트
const CheckAgreement = ({ submitSignup }: CheckAgreementProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([false, false, false]);

  const handleMainCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setCheckboxStates(checkboxStates.map(() => newChecked));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedStates = [...checkboxStates];
    updatedStates[index] = !updatedStates[index];
    setIsChecked(updatedStates.every((state) => state));
    setCheckboxStates(updatedStates);
  };

  return (
    <BottomSheetContainer isVisible={true}>
      <Title>약관 동의</Title>
      <CheckboxContainer>
        <CheckboxLabel>
          <CheckboxInput type="checkbox" checked={isChecked} onChange={handleMainCheckboxChange} />
          전체 동의
        </CheckboxLabel>
      </CheckboxContainer>
      {checkboxStates.map((state, index) => (
        <CheckboxContainer key={index}>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" checked={state} onChange={() => handleCheckboxChange(index)} />
            약관 {index + 1}: 사용자 동의 내용이 여기에 들어갑니다.
          </CheckboxLabel>
        </CheckboxContainer>
      ))}
      <Button variant="primary" size="large" onClick={submitSignup} text="완료" />
    </BottomSheetContainer>
  );
};

// 바텀 시트 스타일
const BottomSheetContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(100%)')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  padding: 20px;
  z-index: 1000;
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

// 내부 스타일
const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const CheckboxContainer = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

export default CheckAgreement;
