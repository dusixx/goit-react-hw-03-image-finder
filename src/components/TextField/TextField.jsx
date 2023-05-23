import { func, string } from 'prop-types';
import { ClearBtn, InputWrapper, Input, Field } from './TextField.styled';
import { IconClose } from 'styles/icons';

export const TextField = ({ value, type, onChange, ...restProps }) => {
  return (
    <Field>
      <InputWrapper>
        <Input
          type={type || 'text'}
          onChange={onChange}
          value={value}
          {...restProps}
        />
        {value && (
          <ClearBtn onClick={() => onChange(null)}>
            <IconClose size="100%" />
          </ClearBtn>
        )}
      </InputWrapper>
    </Field>
  );
};

TextField.propTypes = {
  value: string,
  type: string,
  onChange: func,
};
