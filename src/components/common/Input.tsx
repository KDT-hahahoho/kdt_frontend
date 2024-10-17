/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import invalidIcon from '@assets/Images/invalid.svg';
import validIcon from '@assets/Images/valid.svg';
import variables from '@styles/Variables';

//TODO - 인풋 벨리데이션 수정 및 검토

type InputStatus = 'default' | 'valid' | 'invalid';

interface InputProps {
  type?: 'text' | 'email' | 'password';
  status?: InputStatus;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const Input = ({ type = 'text', status = 'default', placeholder, value, onChange, ...rest }: InputProps) => {
  /** 상태의 따른 이미지 랜더 함수 */
  const renderStatusImage = () => {
    if (status === 'default') {
      return;
    }
    if (status === 'valid') {
      return <img src={validIcon} css={imageStyles} alt="Valid" />;
    }
    if (status === 'invalid') {
      return <img src={invalidIcon} css={imageStyles} alt="Invalid" />;
    }
    return null;
  };

  return (
    <div css={inputContainer}>
      <div css={inputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          css={inputStyles(status)}
          {...rest}
        />
        <div onClick={() => {}}>{renderStatusImage()}</div>
      </div>
    </div>
  );
};

export default Input;

const inputContainer = css`
  display: flex;
  flex-direction: column;
`;

const inputWrapper = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const inputStyles = (status: InputStatus) => css`
  font-size: 1.8rem;
  border: 1px solid #ddd;
  width: 100%;

  border-radius: 0.8rem;
  padding-left: 1rem;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    background-color: ${status === 'invalid' ? '#FFEFEB' : ''};
    border-color: ${status === 'invalid' ? `${variables.colors.secondary}` : ''};
  }
`;

const imageStyles = css`
  position: absolute;
  right: 1.6rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.4rem;
  height: 2.4rem;
`;
