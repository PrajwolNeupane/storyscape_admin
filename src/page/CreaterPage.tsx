import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Heading, VStack } from "@chakra-ui/layout";
import { FC, useState } from "react";


interface Props {

}

let Creater: FC<Props> = ({ }) => {

    const [isNew] = useState(false);

    return (
        <>
            {
                !isNew ? <VStack height={"100vh"} bgColor={"dark.600"} justifyContent={"center"}>
                    <VStack bgColor={"dark.800"} width={"450px"} padding={"30px 25px"} alignItems={'flex-start'}>
                        <Heading color={"text.300"} fontWeight={"semibold"} fontSize={"md"}>Log in</Heading>
                        <Heading color={"text.300"} fontWeight={"medium"} fontSize={"sm"}>As a creater</Heading>
                        <VStack alignItems={"flex-start"} w={"100%"}>
                            <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Creater Email :</Heading>
                            <Input placeholder="creater@gmail.com" _placeholder={{color:"text.300",fontWeight:"regular",fontSize:"xs"}} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} name="email" type="email"/>
                        </VStack>
                        <VStack alignItems={"flex-start"} w={"100%"}>
                            <Heading color={"text.200"} fontWeight={"regular"} fontSize={"xxs"}>Creater Password :</Heading>
                            <Input placeholder="*********" _placeholder={{color:"text.300",fontWeight:"regular",fontSize:"xs"}} fontWeight={"regular"} fontSize={"xs"} color={"text.300"} w={"100%"} name="password" type="password"/>
                        </VStack>
                        <Button>
                            Log In
                        </Button>
                    </VStack>
                </VStack> : <></>
            }
        </>
    )
}
export default Creater;