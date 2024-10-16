//NOTE - 우중 작업물

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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

const Input = ({
  type = 'text',
  status = 'default',
  placeholder,
  value,
  onChange,
  errorMessage,
  ...rest
}: InputProps) => {
  const renderStatusImage = () => {
    if (status === 'valid') {
      return <img src="/icons/valid-icon.png" css={imageStyles} alt="Valid" />;
    }
    if (status === 'invalid') {
      return <img src="/icons/invalid-icon.png" css={imageStyles} alt="Invalid" />;
    }
    return null;
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        css={inputStyles(status)}
        {...rest}
      />
      {renderStatusImage()}

      {errorMessage && (
        <span
          css={css`
            color: red;
            font-size: 12px;
            margin-top: 4px;
            display: block;
          `}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Input;

const inputStyles = (status: InputStatus) => css`
  all: unset;
  font-size: 18px;
  border: 1px solid #ddd;
  width: 368px;
  height: 60px;
  border-radius: 8px;
  padding-left: 20px;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: ${status === 'default' ? '#007bff' : ''};
  }
`;

const imageStyles = css`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;
