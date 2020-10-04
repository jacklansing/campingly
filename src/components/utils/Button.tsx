import React from 'react';
import { Button as ThemeButton, ButtonProps, Spinner } from 'theme-ui';

interface ButtonOptions extends ButtonProps {
  props?: ButtonProps;
  variant: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

const Button: React.FC<ButtonOptions> = ({
  children,
  isLoading = false,
  isDisabled = false,
  variant = 'contained',
  ...props
}) => {
  return (
    <ThemeButton
      variant={variant}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {isLoading ? (
        <Spinner
          sx={{ color: 'accent', height: '1.3em', verticalAlign: 'middle' }}
        />
      ) : (
        children
      )}
    </ThemeButton>
  );
};

export default Button;
