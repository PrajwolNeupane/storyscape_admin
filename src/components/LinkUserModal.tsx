import { Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, Text, useToast, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from "react-hook-form";
import { loginDataInterface, loginSchema } from '../Interface/formSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { setTokenCookie } from "../helper/cookiee.ts";
import { useLinkUserMutation } from '../Features/auth/linkUserSlice.ts';
import { setToken } from '../app/reducer/tokenReducer.ts';
import { useAppDispatch } from '../app/store.ts';

interface Props {
    isOpen: boolean,
    onClose: () => void
}

let LinkUserModal: FC<Props> = ({ isOpen, onClose }) => {

    const [linkUser, { isLoading }] = useLinkUserMutation();
    const toast = useToast();
    const dispatch = useAppDispatch();

    const { register, formState: { errors }, handleSubmit } = useForm<loginDataInterface>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        const res = await linkUser(data).unwrap();
        if (res.token) {
            toast({
                title: "Logged In",
                description: "Login successfully",
                duration: 5000,
                isClosable: true,
                status: 'success',
                position: 'bottom-right',

            });
            setTokenCookie(res.token);
            dispatch(setToken(res.token));
        } else if (res.message) {
            toast({
                title: "Log in failed",
                description: res.message,
                duration: 5000,
                isClosable: true,
                status: 'error',
                position: 'bottom-right',

            });
        } else {
            toast({
                title: "Log in failed",
                description: "Error",
                duration: 5000,
                isClosable: true,
                status: 'error',
                position: 'bottom-right',

            });
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent bgColor={"dark.900"} mt={"150px"} >
                <ModalHeader color={"text.300"} fontWeight={"semibold"} fontSize={"md"}>Link Storyscape User Account</ModalHeader>
                <ModalCloseButton color={"text.300"} />
                <ModalBody as={'form'} onSubmit={onSubmit}>
                    <VStack alignItems={"flex-start"} w={"100%"} m={"10px 0px"}>
                        <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Creater Email :</Heading>
                        <Input placeholder="creater@gmail.com" _placeholder={{ color: "text.300", fontWeight: "regular", fontSize: "xs" }} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} type="text" {...register('email', { required: true })} />
                        <Text fontSize={"xxs"} fontWeight={"regular"} color={"error.500"}>{errors.email == null ? "" : errors.email.message}</Text>
                    </VStack>
                    <VStack alignItems={"flex-start"} w={"100%"} m={"10px 0px"}>
                        <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Creater Password :</Heading>
                        <Input placeholder="*********" _placeholder={{ color: "text.300", fontWeight: "regular", fontSize: "xs" }} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} type="password" {...register('password', { required: true })} />
                        <Text fontSize={"xxs"} fontWeight={"regular"} color={"error.500"}>{errors.password == null ? "" : errors.password.message}</Text>
                    </VStack>
                    <Button p={"0px 0px"} fontSize={"xs"} w={"100%"} type='submit' mb={"10px"}>
                        Link User
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default LinkUserModal;