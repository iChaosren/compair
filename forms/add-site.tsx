import { FormControl, FormLabel, RadioGroup, Stack, Radio, Input, FormErrorMessage, Button, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack, HStack, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ComparisonType } from '../types/comparison';
import { RecipientType } from '../types/recipient';
import Site from '../types/site';

const AddSite = () => {

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<Site>()

    const watchNotificationType = watch("recipient.type", "email-notification") ?? "email-notification";
    const watchComparisonType = watch("comparison.type", "html") ?? "html";
    const watchComparisonDifference = watch("comparison.difference", 1) ?? 1;

    // id: string = uuid();
    // url: string;
    // name: string;
    // recipient: Recipient;
    //-- type: "local-notification" | "email-notification";
    //-- email?: string;
    // comparison: Comparison;
    //-- type: ComparisonType = "html";
    //-- difference?: number = 0.05;
    //-- delay: number = 2000;
    //-- region?: Region;
    //-- selector?: string;
    //-- excepted?: string;
    //-- current?: ComparisonValue;
    // created: string | Dayjs;
    // lastChecked?: string | Dayjs;
    // start?: string | Dayjs;
    // frequency: Frequency;
    // scripts: string[] = [];
    // timeout: number = 30 * 1000;
    // enabled: boolean = true;

    function onComparisonTypeChange(newValue: ComparisonType) {
        setValue("comparison.type", newValue);
    }

    function onRecipientTypeChange(newValue: RecipientType) {
        setValue("recipient.type", newValue);
    }

    function onComparisonDifferenceChangeNumberInput(newValueAsString: string, newValueAsNumber: number) {
        setValue("comparison.difference", newValueAsNumber);
    }

    function onComparisonDifferenceChange(newValue: number) {
        setValue("comparison.difference", newValue);
    }

    function onSubmit(values: Site) {
        console.log(values);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
            <Stack spacing={6} minW={256} maxW={768}>
                <FormControl isInvalid={!!errors.url}>
                    <FormLabel htmlFor="url">URL</FormLabel>
                    <Input
                        id='url'
                        placeholder='https://example.com'
                        {...register('url', {
                            required: 'This is required'
                        })}
                    />
                    <FormErrorMessage>
                        {errors.url && errors.url.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        id='name'
                        placeholder='Example Stock Checker'
                        {...register('name', {
                            required: 'This is required'
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <Heading size="sm">Recipient</Heading>

                <FormControl as='fieldset'>
                    <FormLabel htmlFor='recipientType' as='legend'>Notification Type</FormLabel>
                    <RadioGroup id='recipientType' name='recipient.type' defaultValue='email-notification' onChange={onRecipientTypeChange}>
                        <Stack spacing={4} direction='row'>
                            <Radio value='email-notification'>Email</Radio>
                            <Radio value='local-notification'>Local</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                {watchNotificationType === "email-notification" ? (
                    <FormControl isInvalid={!!errors.recipient?.email}>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id='email'
                            placeholder='Example Stock Checker'
                            type='email'
                            {...register('recipient.email', {
                                required: 'This is required'
                            })}
                        />
                        <FormErrorMessage>
                            {errors.recipient?.email && errors.recipient?.email.message}
                        </FormErrorMessage>
                    </FormControl>
                ) : null}

                <FormControl as='fieldset'>
                    <FormLabel htmlFor='comparisonType' as='legend'>Comparison Type</FormLabel>
                    <RadioGroup id='comparisonType' name='comparison.type' defaultValue='html' onChange={onComparisonTypeChange}>
                        <Stack spacing={4} direction='row'>
                            <Radio value='html'>HTML</Radio>
                            <Radio value='visual'>Visual</Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <FormControl isInvalid={!!errors.comparison?.delay}>
                    <FormLabel htmlFor="delay">Delay</FormLabel>
                    <Input
                        id='delay'
                        placeholder='2 seconds'
                        {...register('comparison.delay', {
                            required: 'This is required',
                            value: 2
                        })}
                    />
                    <FormErrorMessage>
                        {errors.comparison?.delay && errors.comparison?.delay.message}
                    </FormErrorMessage>
                </FormControl>

                {watchComparisonType === "html" ? (
                    <>
                        <FormControl isInvalid={!!errors.comparison?.selector}>
                            <FormLabel htmlFor="comparisonSelector">Selector</FormLabel>
                            <Input
                                id='comparisonSelector'
                                placeholder='body>.root #stock-count'
                                {...register('comparison.selector', {
                                    required: 'This is required'
                                })}
                            />
                            <FormErrorMessage>
                                {errors.comparison?.selector && errors.comparison?.selector.message}
                            </FormErrorMessage>
                        </FormControl>
                    </>
                ) : (
                    <>
                        <FormControl isInvalid={!!errors.comparison?.difference}>
                            <FormLabel htmlFor="difference">Difference</FormLabel>
                            <HStack>
                                <Slider aria-label='visual difference slider' value={watchComparisonDifference} onChange={onComparisonDifferenceChange} min={1} max={25} step={1}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                                <NumberInput value={watchComparisonDifference} onChange={onComparisonDifferenceChangeNumberInput} min={1} max={25} step={1}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </HStack>
                            <FormErrorMessage>
                                {errors.comparison?.difference && errors.comparison?.difference.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Button mt={4}>
                            Region Selection
                        </Button>

                    </>
                )}

                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </Stack>
        </form>
    );
}

export default AddSite;