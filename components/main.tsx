import { Box, BoxProps, ChakraComponent } from "@chakra-ui/react";

type MainComponent = ChakraComponent<'main', BoxProps>

const Main = ((props: BoxProps) => {
    return (
        <Box
            as="main"
            background='gray.50'
            {...props}
            _dark={{ background: 'gray.700', ...props._dark }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minWidth: 'full',
                width: 'full',
                p: 8,
                ...props.sx
            }}
        />
    );
}) as MainComponent;

export default Main;