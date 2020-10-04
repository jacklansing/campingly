/** @jsx jsx */
import { Label, Input, Box, jsx, Text, Select } from 'theme-ui';
import { useField } from 'formik';
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

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
      <Input
        {...field}
        {...props}
        id={field.name}
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
