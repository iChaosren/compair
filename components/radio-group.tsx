import React from 'react';
import { FormControl, FormLabel, RadioGroup, Stack, Radio } from '@chakra-ui/react';
import map from 'lodash/map';

interface CompairRadioGroupProps {
    id?: string;
    name?: string;
    label?: string;

    defaultValue?: string;

    data?: (string | { label?: string, value: string; })[] | { [name: string]: string };

    setValue?: (name: string, newValue: any) => void;
    // onChange?: (newValue: string) => void;
}

const CompairRadioGroup = React.forwardRef(({ id, name, label, defaultValue, data, setValue } : CompairRadioGroupProps, ref: any) => {
    const onChange = React.useCallback((newValue: any) => setValue(name, newValue), [name, setValue]);

    const radioEntries = React.useMemo(() => {
        if(Array.isArray(data)) {
            if(typeof data[0] === "string") {
                return data.map(entry => ({ label: entry, value: entry }));
            } else {
                return data.map((entry : any) => ({ label: entry.label || entry.value, value: entry.value }));
            }
        } else {
            return map(data, (value, label) => ({ label, value }));
        }
    }, [data]);
    
    return (
        <FormControl as='fieldset'>
            <FormLabel htmlFor={id} as='legend'>{label}</FormLabel>
            <RadioGroup ref={ref} id={id} name={name} defaultValue={defaultValue} onChange={onChange}>
                <Stack spacing={4} direction='row'>
                    {radioEntries.map((entry) => (<Radio key={entry.value} value={entry.value}>{entry.label}</Radio>))}
                </Stack>
            </RadioGroup>
        </FormControl>
    );
});

CompairRadioGroup.displayName = 'CompairRadioGroup';

export default CompairRadioGroup;
