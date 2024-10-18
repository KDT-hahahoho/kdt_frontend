import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@components/common/Button';
import variables from '@styles/Variables';
import checkArrow from '@assets/Images/checkArrow.svg';
import checkedArrow from '@assets/Images/checkedArrow.svg'; // 체크된 상태의 아이콘

// TODO - 모든 동의가 완료되면 가입이 진행되도록 수정해야함
interface CheckAgreementProps {
  submitSignup: () => void | undefined;
  onClose?: () => void;
}

const CheckAgreement = ({ submitSignup }: CheckAgreementProps) => {
  const [isChecked, setIsChecked] = useState(false); // 전체 동의 체크 상태
  const [checkboxStates, setCheckboxStates] = useState([false, false, false, false]); // 각 체크박스 상태

  const handleMainCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setCheckboxStates(checkboxStates.map(() => newChecked)); // 모든 체크박스 상태 변경
  };

  const handleCheckboxChange = (index: number) => {
    const updatedStates = [...checkboxStates];
    updatedStates[index] = !updatedStates[index]; // 특정 체크박스 상태 변경
    setIsChecked(updatedStates.every((state) => state)); // 전체 체크 상태 업데이트
    setCheckboxStates(updatedStates);
  };

  // 모든 체크박스가 체크되었는지 확인
  const allCheckboxesChecked = checkboxStates.every((state) => state);

  return (
    <BottomSheetContainer isVisible={true}>
      <CheckboxAgreeAllbox>
        <CheckAgreeAll>
          <AllAgreeButton onClick={handleMainCheckboxChange} />
          <AgreeTitle>약관에 모두 동의</AgreeTitle>
        </CheckAgreeAll>
      </CheckboxAgreeAllbox>

      {/* 개별 체크박스들 추가 */}
      <CheckboxContainer>
        {['이용약관 동의', '개인정보 처리방침 동의', '마케팅 정보 수신 동의', 'AI 개인정보 보안 항목 동의'].map(
          (label, index) => (
            <CheckboxItem key={index}>
              <Checkbox type="checkbox" checked={checkboxStates[index]} onChange={() => handleCheckboxChange(index)} />
              <CheckboxLabel>{label}</CheckboxLabel>
            </CheckboxItem>
          )
        )}
      </CheckboxContainer>

      {/* 모든 체크박스가 체크되면 버튼 활성화 */}
      <Button
        variant="primary"
        size="large"
        onClick={submitSignup}
        text="완료"
        fixed={true}
        disabled={!allCheckboxesChecked} // 버튼 활성화 여부
      />
    </BottomSheetContainer>
  );
};

// 바텀 시트 스타일
const BottomSheetContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  padding: ${variables.layoutPadding};
  bottom: 0;
  left: 0;
  height: 80vh;
  max-width: ${variables.maxLayout};
  right: 0;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: ${variables.BoxShadow};
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(100%)')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
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
const CheckboxAgreeAllbox = styled.div`
  margin-bottom: 15px;
  font-size: 16px;
  padding-top: ${variables.layoutPadding};
`;

const CheckAgreeAll = styled.div`
  border: 1px solid #ddd;
  width: 100%;
  height: 6rem;

  border-radius: ${variables.borderRadius};
  display: flex;
  align-items: center;
  padding: 1.2rem;
`;

const AllAgreeButton = styled.div`
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #ddd;
  background-image: url(${checkArrow});
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const AgreeTitle = styled.h2`
  margin-left: 1.7rem;
  font-size: ${variables.size.large};
  font-weight: 600;
`;

// 체크박스 컨테이너
const CheckboxContainer = styled.div`
  margin-top: 3rem;
  margin-left: 1.5rem;
`;

const CheckboxItem = styled.div`
  display: flex;
  width: 100%;
  font-size: ${variables.size.large};
  align-items: center;
  margin-bottom: 3rem;
`;

const Checkbox = styled.input`
  width: 3.3rem;
  height: 3.3rem;
  margin-right: 1rem;
  cursor: pointer;

  &:checked {
    background-image: url(${checkedArrow});
  }

  &:not(:checked) {
    background-image: url(${checkArrow});
  }
`;

const CheckboxLabel = styled.label`
  font-size: ${variables.size.medium};
`;

export default CheckAgreement;
