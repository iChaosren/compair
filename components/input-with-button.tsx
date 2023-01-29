import React from 'react';
import { FormControl, FormLabel, HStack, Input, Button, FormErrorMessage, InputProps } from '@chakra-ui/react';
import getNestedObject from '../helpers/get-nested-object';

interface InputWithButtonProps extends InputProps {
    onClick?: () => void;
    errors?: any;
    label?: string;
    buttonLabel?: string;
}

const InputWithButton = React.forwardRef(({ name, label, buttonLabel, errors, onClick, ...inputProps }: InputWithButtonProps, ref: any) => {
        return (
            <FormControl isInvalid={!!getNestedObject(errors, name)}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <HStack spacing={4}>
                    <Input
                        name={name}
                        {...inputProps}
                        ref={ref}
                    />
                    <Button onClick={onClick}>
                        {buttonLabel}
                    </Button>
                </HStack>
                <FormErrorMessage>
                    {getNestedObject(errors, name) && getNestedObject<{ message: string }>(errors, name).message}
                </FormErrorMessage>
            </FormControl>
        );
    }
);

InputWithButton.displayName = 'InputWithButton';
export default InputWithButton;