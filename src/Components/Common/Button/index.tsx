import { FC } from 'react';

import './button.css';

interface Props {
  label: string;
  onHandleClick: () => void;
  isDisabled?: boolean;
}

const Button: FC<Props> = ({ label, onHandleClick, isDisabled }) => (
  <button
    type="button"
    onClick={onHandleClick}
    disabled={isDisabled}
    className={`button ${isDisabled ? 'button-disabled' : ''}`}
  >
    {label}
  </button>
);

Button.defaultProps = {
  isDisabled: false
};
export default Button;
