/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
//TODO - 버튼 width에 대한 생각 해봐야함 + 위치를 어떻게 고정할지
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
      width: 100%;
      padding: 0.8rem 1.2rem;
      font-size: 1.4rem;
      text-align: center;
      box-sizing: border-box;
    `,
    medium: css`
      width: 100%;
      padding: 1.4rem 2rem; /* 14px 20px */
      font-size: 1.6rem; /* 16px */
      height: 4.6rem; /* 46px */
      text-align: center;
      box-sizing: border-box;
    `,
    large: css`
      width: 100%;
      padding: 1.6rem 2.4rem; /* 16px 24px */
      font-size: 1.8rem; /* 18px */
      height: 5.6rem; /* 56px */
      text-align: center;
      box-sizing: border-box;
    `,
  };

  const styles = css`
    border: none;
    border-radius: 0.8rem; /* 8px */
    color: white;
    cursor: pointer;
    margin-top: 50rem;

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
      background-color: #D9D9D9;
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
