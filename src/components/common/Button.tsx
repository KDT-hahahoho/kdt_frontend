//NOTE - 우중 작업물

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonProps {
  text: string; // 버튼 이름
  variant?: ButtonVariant; // 버튼의 색상이나 추가 스타일
  disabled?: boolean; // 비활성화 상태를 위한 옵션
  onClick?: () => void; // 클릭 핸들러
  type?: 'button' | 'submit' | 'reset'; // 버튼의 타입
  size: 'small' | 'medium' | 'large'; // 버튼 크기
}

const Button = ({
  text,
  variant = 'primary',
  disabled = true,
  type = 'button',
  onClick,
  size = 'large', // 기본 크기 설정
}: ButtonProps) => {
  // 각 버튼 크기에 따른 스타일 정의

  const sizeStyles = {
    small: css`
      padding: 8px 12px;
      font-size: 14px;
    `,
    medium: css`
      width: 368px;
      padding: 14px 20px;
      font-size: 16px;
      height: 46px;
    `,
    large: css`
      width: 368px;
      padding: 16px 24px;
      font-size: 18px;
      height: 56px;
    `,
  };

  const styles = css`
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;

    ${sizeStyles[size]} // 선택한 크기 스타일 적용

    ${variant === 'primary' &&
    `
      background-color: #CCB2FF;
    `}
    ${variant === 'secondary' &&
    `
      background-color: #6c757d;
    `}
    ${variant === 'danger' &&
    `
      background-color: #dc3545;
    `}
    ${variant === 'success' &&
    `
      background-color: #28a745;
    `}

    ${disabled &&
    `
      background-color: #c0c0c0;
      cursor: not-allowed;
    `}
  `;

  return (
    <button css={styles} disabled={disabled} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
