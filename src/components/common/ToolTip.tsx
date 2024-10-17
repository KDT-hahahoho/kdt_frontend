/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface Props {
  title: string;
  tooltipItem: string;
  position?: 'top' | 'bottom' | 'left' | 'right'; // 위치 지정 가능성 추가
}

// 스타일 정의
const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipTrigger = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
`;

const TooltipContent = styled.div<{ position: string; visible: boolean }>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 0.4rem;
  padding: 0.5rem;
  position: absolute;
  z-index: 1;

  /* Tooltip 위치 지정 */
  ${({ position }) => {
    switch (position) {
      case 'top':
        return `
          bottom: 100%; 
          left: 50%; 
          transform: translateX(-50%);
          margin-bottom: 0.5rem; 
        `;
      case 'bottom':
        return `
          top: 100%; 
          left: 50%; 
          transform: translateX(-50%);
          margin-top: 0.5rem; 
        `;
      case 'left':
        return `
          top: 50%; 
          right: 100%; 
          transform: translateY(-50%);
          margin-right: 0.5rem; 
        `;
      case 'right':
        return `
          top: 50%; 
          left: 100%; 
          transform: translateY(-50%);
          margin-left: 0.5rem; 
        `;
      default:
        return '';
    }
  }}
`;

const ToolTip: React.FC<Props> = ({ title, tooltipItem, position = 'top' }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <TooltipContainer>
      <TooltipTrigger onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {title}
      </TooltipTrigger>
      <TooltipContent position={position} visible={visible}>
        {tooltipItem}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default ToolTip;
