import { Button, Input, Heading, VStack, Text, useToast } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginDataInterface, loginSchema } from '../Interface/formSchema.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from "../Features/auth/logInSlice.ts";
import { setTokenCookie } from "../helper/cookiee.ts";
import { useAppDispatch } from "../app/store.ts";
import { setToken } from "../app/reducer/tokenReducer.ts";


interface Props {

}

let LogInPage: FC<Props> = ({ }) => {

    const [login, { isLoading }] = useLoginMutation();
    const toast = useToast();
    const dispatch = useAppDispatch();

    const { register, formState: { errors }, handleSubmit } = useForm<loginDataInterface>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        const res = await login(data).unwrap();
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
        <> <VStack height={"100vh"} bgColor={"dark.600"} justifyContent={"center"}>
            <VStack bgColor={"dark.800"} width={"450px"} padding={"30px 25px"} alignItems={'flex-start'} rounded={"md"} as={'form'} onSubmit={onSubmit}>
                <Heading color={"text.300"} fontWeight={"semibold"} fontSize={"xxl"}>Log in</Heading>
                <Heading color={"text.300"} fontWeight={"medium"} fontSize={"sm"}>As a creater</Heading>
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
                {
                    !isLoading ? <Button p={"0px 0px"} fontSize={"xs"} w={"100%"} type='submit'>
                        Log In
                    </Button> : <Text>Loading</Text>
                }
                <Text m={'0px auto'} color={"text.400"} fontSize={"xxs"}>
                    Don't have an account ?
                    <Link to={"/sign-up"}>
                        <Text as={"span"} color={"brand.600"} fontWeight={"md"} ml={"10px"} fontSize={"xxs"} >Click Here</Text></Link>
                </Text>
            </VStack>
        </VStack>
        </>
    )
}
export default LogInPage;