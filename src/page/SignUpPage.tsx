import { Button, Input, Heading, VStack, Text, useToast ,useDisclosure} from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupDataInterface, signupSchema } from '../Interface/formSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignupMutation } from "../Features/auth/signUpSlice.ts";
import { setTokenCookie } from "../helper/cookiee.ts";
import LinkUserModal from "../components/LinkUserModal.tsx";
import { useAppDispatch } from "../app/store.ts";
import { setToken } from "../app/reducer/tokenReducer.ts";


interface Props {

}

let SignUpPage: FC<Props> = ({ }) => {

    const [signUp, { isLoading }] = useSignupMutation();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    const dispatch = useAppDispatch();

    const { register, formState: { errors }, handleSubmit } = useForm<signupDataInterface>({
        resolver: yupResolver(signupSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        const res = await signUp(data).unwrap();
        if (res.token) {
            toast({
                title: "Sign Up",
                description: "Sign Up successfully",
                duration: 5000,
                isClosable: true,
                status: 'success',
                position: 'bottom-right',

            });
            setTokenCookie(res.token);
            dispatch(setToken(res.token));
        } else if (res.message) {
            toast({
                title: "Sign Up failed",
                description: res.message,
                duration: 5000,
                isClosable: true,
                status: 'error',
                position: 'bottom-right',

            });
        } else {
            toast({
                title: "Sign Up failed",
                description: "Error",
                duration: 5000,
                isClosable: true,
                status: 'error',
                position: 'bottom-right',

            });
        }
    })


    return (
        <> <VStack height={"100vh"} bgColor={"dark.600"} justifyContent={"center"}>
            <VStack bgColor={"dark.800"} width={"450px"} padding={"30px 25px"} alignItems={'flex-start'} rounded={"md"} as={'form'} onSubmit={onSubmit}>
                <Heading color={"text.300"} fontWeight={"semibold"} fontSize={"xxl"}>Sign Up</Heading>
                <Heading color={"text.300"} fontWeight={"medium"} fontSize={"sm"}>Be a Creater</Heading>
                <VStack alignItems={"flex-start"} w={"100%"}>
                    <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Creater Name :</Heading>
                    <Input placeholder="Creater" _placeholder={{ color: "text.300", fontWeight: "regular", fontSize: "xs" }} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} type="text" {...register('name', { required: true })} />
                    <Text fontSize={"xxs"} fontWeight={"regular"} color={"error.500"}>{errors.name == null ? "" : errors.name.message}</Text>
                </VStack>
                <VStack alignItems={"flex-start"} w={"100%"}>
                    <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Creater Email :</Heading>
                    <Input placeholder="creater@gmail.com" _placeholder={{ color: "text.300", fontWeight: "regular", fontSize: "xs" }} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} type="text" {...register('email', { required: true })} />
                    <Text fontSize={"xxs"} fontWeight={"regular"} color={"error.500"}>{errors.email == null ? "" : errors.email.message}</Text>
                </VStack>
                <VStack alignItems={"flex-start"} w={"100%"}>
                    <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Creater Password :</Heading>
                    <Input placeholder="*********" _placeholder={{ color: "text.300", fontWeight: "regular", fontSize: "xs" }} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} type="password" {...register('password', { required: true })} />
                    <Text fontSize={"xxs"} fontWeight={"regular"} color={"error.500"}>{errors.password == null ? "" : errors.password.message}</Text>
                </VStack>
                <VStack alignItems={"flex-start"} w={"100%"}>
                    <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Repeat Password :</Heading>
                    <Input placeholder="*********" _placeholder={{ color: "text.300", fontWeight: "regular", fontSize: "xs" }} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} type="password" {...register('repeatPassword', { required: true })} />
                    <Text fontSize={"xxs"} fontWeight={"regular"} color={"error.500"}>{errors.repeatPassword == null ? "" : errors.repeatPassword.message}</Text>
                </VStack>
                {
                    !isLoading ? <Button p={"0px 0px"} fontSize={"xs"} w={"100%"} type='submit'>
                        Log In
                    </Button> : <Text>Loading</Text>
                }
                <Button p={"0px 0px"} fontSize={"xs"} w={"100%"} bgColor={"brand.500"} _hover={{bgColor:"brand.700"}} onClick={onOpen}>
                    Link Storyscape Account
                </Button>
                <Text m={'0px auto'} color={"text.400"} fontSize={"xxs"}>
                    Have an account ?
                    <Link to={"/log-in"}>
                        <Text as={"span"} color={"brand.600"} fontWeight={"md"} ml={"10px"} fontSize={"xxs"} >Click Here</Text></Link>
                </Text>
            </VStack>
        </VStack>
        <LinkUserModal isOpen={isOpen} onClose={onClose}/>
        </>
    )
}
export default SignUpPage;