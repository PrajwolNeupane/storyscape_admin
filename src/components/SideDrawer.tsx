import { FC } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Avatar,
    Heading,
    HStack,
    VStack,
    Divider,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";


interface Props {

}

let SideDrawer: FC<Props> = ({ }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()



    return (
        <>
            <HStack bgColor={"dark.700"} padding={"20px 2%"} gap={"5%"} alignItems={'center'}>
                <HamburgerIcon onClick={onOpen} color={"text.100"} fontSize={"xl"} cursor={"pointer"} />
                <Heading fontWeight={"semibold"} fontSize={"md"} color={"text.200"}>Creater Panel</Heading>
            </HStack>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose} >
                <DrawerOverlay />
                <DrawerContent bgColor={'dark.800'} pt={"20px"}>
                    <DrawerHeader as={HStack} justifyContent={"center"}>
                        <Avatar src="https://robohash.org/Prajwol%20Neupane1687239772678" />
                        <VStack alignItems={'flex-start'} color={"text.200"}>
                            <Heading fontSize={"sm"} fontWeight={"semibold"}>Prajwol Neupane</Heading>
                            <Heading fontSize={"xxs"} fontWeight={"regular"}>prajwolneupane68@gmail.com</Heading>
                        </VStack>
                    </DrawerHeader>
                    <DrawerBody as={VStack} gap={"15px"} mt="50px" alignItems={'flex-start'}>
                        <Link to={"/"}>
                            <Heading fontSize={"sm"} fontWeight={"semibold"} color={"text.300"}>Dashboard</Heading>
                        </Link>
                        <Divider borderColor={"text.500"} />
                        <Heading fontSize={"sm"} fontWeight={"semibold"} color={"text.300"}>Add Blog</Heading>
                        <Divider borderColor={"text.500"} />
                        <Heading fontSize={"sm"} fontWeight={"semibold"} color={"text.300"}>Log Out</Heading>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
export default SideDrawer;