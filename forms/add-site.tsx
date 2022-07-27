import { FormControl, FormLabel, RadioGroup, Stack, Radio, Input, FormErrorMessage, Button, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack, HStack, NumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInputField, NumberInputStepper, Box } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ComparisonType } from '../types/comparison';
import Frequency from '../types/frequency';
import { RecipientType } from '../types/recipient';
import Site from '../types/site';
import { AreaSelector, IArea } from '@bmunozg/react-image-area';

const AddSite = () => {

    const {
        handleSubmit,
        register,
        watch,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<Site>()

    const watchNotificationType = watch("recipient.type", "email-notification") ?? "email-notification";
    const watchComparisonType = watch("comparison.type", "html") ?? "html";
    const watchComparisonDifference = watch("comparison.difference", 1) ?? 1;

    const [currentUrl, setCurrentUrl] = React.useState<string>("");
    const [areas, setAreas] = React.useState<IArea[]>([]);

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

    async function onSubmit(values: Site) {
        console.log(values);
        values.created = dayjs().toISOString();
        values.frequency = Frequency.every(1, "minutes");
        values.enabled = true;
        values.recipient = {
            type: "email-notification",
            notify: null,
            ...values.recipient
        }

        if(areas.length > 0)
            values.comparison.region = areas[0];
        
        const response = await axios.post("http://localhost:3000/api/sites", values);
        console.log(response);
    }

    function previewUrl() {
        setCurrentUrl(getValues('url'));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
            <Stack direction={"row"}>
                <Stack flex={1} spacing={6} minW={256} maxW={768}>
                    <FormControl isInvalid={!!errors.url}>
                        <FormLabel htmlFor="url">URL</FormLabel>
                        <HStack spacing={4}>
                            <Input
                                id='url'
                                placeholder='https://example.com'
                                {...register('url', {
                                    required: 'This is required'
                                })}
                            />
                            <Button onClick={previewUrl}>
                                Preview
                            </Button>
                        </HStack>
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
                <Box flex={1}>
                    {currentUrl ? (
                        <AreaSelector
                            maxAreas={1}
                            areas={areas}
                            onChange={setAreas}
                            //debug
                        >
                            <img src={`/api/preview?url=${encodeURIComponent(currentUrl)}`} />
                        </AreaSelector>
                    ) : null}
                </Box>
            </Stack>
        </form>
    );
}

export default AddSite;