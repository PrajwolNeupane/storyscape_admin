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
import { useAppSelector } from "../app/store";


interface Props {

}

let SideDrawer: FC<Props> = ({ }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {auth} = useAppSelector((state)=>state.Auth);


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
                        <Avatar src={auth?.photoURL}/>
                        <VStack alignItems={'flex-start'} color={"text.200"}>
                            <Heading fontSize={"sm"} fontWeight={"semibold"}>{auth?.name}</Heading>
                            <Heading fontSize={"xxs"} fontWeight={"regular"}>{auth?.email}</Heading>
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