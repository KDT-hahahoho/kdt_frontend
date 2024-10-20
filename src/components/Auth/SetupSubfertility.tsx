import Button from '@components/common/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import React, { useState, useEffect } from 'react';
import subImage from '@assets/Images/subfertility.svg';

interface SetupSubfertilityProps {
  onNext: () => void;
  value: string;
  onChange: (value: string) => void;
}

const SetupSubfertility: React.FC<SetupSubfertilityProps> = ({ onNext, value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(value || null);

  useEffect(() => {
    if (value !== selectedOption) {
      setSelectedOption(value || null);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    onChange(newValue);
  };

  const isButtonEnabled = selectedOption !== null;

  return (
    <SubfertilityContainer>
      <SubfertilityDescription>진단 여부에 따른 맞춤형 관리를 도와드려요</SubfertilityDescription>
      <ImageSubfertility src={subImage} alt="난임 진단여부 장식 이미지" />

      <SubfertilityCheckboxContainer>
        <Label>
          <SubfertilityCheckbox
            type="radio"
            name="subfertility"
            value="true"
            checked={selectedOption === 'true'}
            onChange={handleChange}
          />
          <CustomRadioButton selected={selectedOption === 'true'} />
          네, 진단을 받았어요.
        </Label>
        <Label>
          <SubfertilityCheckbox
            type="radio"
            name="subfertility"
            value="false"
            checked={selectedOption === 'false'}
            onChange={handleChange}
          />
          <CustomRadioButton selected={selectedOption === 'false'} />
          아니요, 진단은 받지 않았어요.
        </Label>
      </SubfertilityCheckboxContainer>

      <Button text="다음" type="submit" size="large" fixed={true} onClick={onNext} disabled={!isButtonEnabled} />
    </SubfertilityContainer>
  );
};

const SubfertilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5rem;
`;

const SubfertilityDescription = styled.p`
  font-size: ${variables.size.big};
`;

const ImageSubfertility = styled.img`
  width: 100%;
  height: 27rem;
`;

const SubfertilityCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubfertilityCheckbox = styled.input`
  display: none !important;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CustomRadioButton = styled.div<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? variables.colors.primary : 'gray')};
  background-color: ${({ selected }) => (selected ? variables.colors.primary : 'transparent')};
  margin-right: 0.5rem;
  transition:
    background-color 0.2s,
    border-color 0.2s;
`;

export default SetupSubfertility;
