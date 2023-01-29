import React from 'react';
import { FormControl, FormLabel, HStack, Input, Button, FormErrorMessage, ComponentWithAs, InputProps } from '@chakra-ui/react';
import getNestedObject from '../helpers/get-nested-object';

interface CompairInputProps extends InputProps {
    errors?: any;
    label?: string;
}

const CompairInput = React.forwardRef(({ name, label, errors, ...inputProps }: CompairInputProps, ref: any) => {
    return (
        <FormControl isInvalid={!!getNestedObject(errors, name)}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input
                name={name}
                {...inputProps}
                ref={ref}
            />
            <FormErrorMessage>
                {getNestedObject(errors, name) && getNestedObject<{ message: string }>(errors, name).message}
            </FormErrorMessage>
        </FormControl>
    );
}
);

CompairInput.displayName = 'CompairInput';

export default CompairInput;