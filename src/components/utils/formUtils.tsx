/** @jsx jsx */
import { useField } from 'formik';
import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useRef,
} from 'react';
import { Box, Input, jsx, Label, Select, Text } from 'theme-ui';

type TextInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const inputRef = useRef(null);
  const fieldError = error && touched;
  useEffect(() => {
    if (fieldError) {
      inputRef.current.focus();
    }
  }, [fieldError]);
  return (
    <Box mt={4}>
      <Label
        htmlFor={field.name}
        sx={{
          fontWeight: 400,
          fontSize: 3,
          position: 'relative',
          left: 1,
        }}
      >
        {label}
      </Label>
      <Input
        {...field}
        {...props}
        id={field.name}
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        variant={fieldError ? 'fieldError' : 'input'}
      />
      {fieldError && (
        <Text variant="fieldError" mt={1}>
          <span style={{ fontWeight: 700 }}>!</span> {error}
        </Text>
      )}
    </Box>
  );
};

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  options: object[];
  formatOptionFn: (arg0: { id: number; category: string }) => JSX.Element;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  formatOptionFn,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  const fieldError = error && touched;
  return (
    <Box mt={4}>
      <Label
        htmlFor={field.name}
        sx={{
          fontWeight: 400,
          fontSize: 3,
          position: 'relative',
          left: 1,
        }}
      >
        {label}
      </Label>
      <Select
        {...field}
        {...props}
        id={field.name}
        variant={fieldError ? 'fieldError' : 'input'}
      >
        {options.map((option) => formatOptionFn(option as any))}
      </Select>
      {fieldError && (
        <Text variant="fieldError" mt={1}>
          <span style={{ fontWeight: 700 }}>!</span> {error}
        </Text>
      )}
    </Box>
  );
};
