/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface Props {
  title: string;
  tooltipItem: string;
}

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

const TooltipContent = styled.div<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 0.4rem;
  padding: 0.5rem;
  position: absolute;
  z-index: 1000;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
`;

const ToolTip: React.FC<Props> = ({ title, tooltipItem }: Props) => {
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
      <TooltipContent visible={visible}>{tooltipItem}</TooltipContent>
    </TooltipContainer>
  );
};

export default ToolTip;
