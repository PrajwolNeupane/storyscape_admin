import { Avatar, Button, HStack, Heading, VStack, Text, Box } from "@chakra-ui/react";
import { FC } from "react";

interface Props {

}

let Dashboard: FC<Props> = ({ }) => {
    return (
        <VStack bgColor={'dark.600'} p={"40px 5%"} alignItems={"flex-start"} gap={"40px"}>
            <HStack gap={"20px"} justifyContent={"flex-start"}>
                <Avatar src="https://robohash.org/Prajwol%20Neupane0" bgColor={"text.200"} width={"180px"} height={"180px"} />
                <VStack alignItems={"start"}>
                    <Heading fontWeight={"semibold"} fontSize={"sm"} color={"text.300"}>Prajwol Neupane</Heading>
                    <Heading fontWeight={"medium"} fontSize={"xs"} color={"text.300"}>prajwolneupane68@gmail.com</Heading>
                    <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }}>Log Out</Button>
                </VStack>
            </HStack>
            <HStack justifyContent={"space-between"} w={"80%"} margin={"0px auto"}>
                <VStack>
                    <Text fontWeight={"medium"} fontSize={"xs"} color={"text.300"}>Total Blogs Written</Text>
                    <Heading fontWeight={"bold"} fontSize={"xxxxl"} color={"text.300"}>20</Heading>
                </VStack>
                <Box bgColor={"dark.900"} w={"2px"} height={"80px"}></Box>
                <VStack>
                    <Text fontWeight={"medium"} fontSize={"xs"} color={"text.300"}>Total Likes</Text>
                    <Heading fontWeight={"bold"} fontSize={"xxxxl"} color={"text.300"}>20</Heading>
                </VStack>
                <Box bgColor={"dark.900"} w={"2px"} height={"80px"}></Box>
                <VStack>
                    <Text fontWeight={"medium"} fontSize={"xs"} color={"text.300"}>Total Dislikes</Text>
                    <Heading fontWeight={"bold"} fontSize={"xxxxl"} color={"text.300"}>20</Heading>
                </VStack>
            </HStack>
        </VStack>
    )
}
export default Dashboard;