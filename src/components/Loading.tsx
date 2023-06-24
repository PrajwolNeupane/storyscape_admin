import { VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
    open: boolean
}

let Loading: FC<Props> = ({ open }) => {
    return (
        <VStack h={"100vh"} justifyContent={'center'} bgColor={'dark.600'}>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color='white'
                ariaLabel="three-dots-loading"
                visible={open}
            />
        </VStack>
    )
}
export default Loading;