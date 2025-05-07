import React, { useState } from 'react';
import styled from '@emotion/styled';

const ToggleButton = () => {
  const [selected, setSelected] = useState<'self' | 'partner'>('self');

  return (
    <ToggleContainer>
      <ToggleOption isSelected={selected === 'self'} onClick={() => setSelected('self')}>
        본인
      </ToggleOption>
      <ToggleOption isSelected={selected === 'partner'} onClick={() => setSelected('partner')}>
        남편
      </ToggleOption>
    </ToggleContainer>
  );
};

export default ToggleButton;

interface ToggleOptionProps {
  isSelected: boolean;
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d3d3d3;
  width: 9rem;
  height: 3rem;
  border-radius: 2rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 1.4rem;
`;

const ToggleOption = styled.div<ToggleOptionProps>`
  flex: 1;
  display: flex;

  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2rem;
  color: ${({ isSelected }) => (isSelected ? '#B691FF' : '#6e6e6e')};
  background-color: ${({ isSelected }) => (isSelected ? '#efe6fa' : 'transparent')};
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;
`;
