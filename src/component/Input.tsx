import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validateFailed?: boolean;
}

const Input: FC<InputProps> = props => {
  const { validateFailed, ...restProps } = props;

  return <input className={classNames({ 'has-error': validateFailed })} {...restProps} />;
};

export default Input;
