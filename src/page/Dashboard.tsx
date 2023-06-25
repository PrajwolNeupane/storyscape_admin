import { Avatar, Button, HStack, Heading, VStack, Text, Box, Table, Td, Th, Tr } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { deleteTokenCookie } from "../helper/cookiee";
import { useAppDispatch, useAppSelector } from "../app/store";
import { setToken } from "../app/reducer/tokenReducer";
import { setAuth } from "../app/reducer/authReducer";


interface Props {

}

let Dashboard: FC<Props> = ({ }) => {

    const dispatch = useAppDispatch();
    const { auth } = useAppSelector((state) => state.Auth);

    const data = [
        {
            id: 1,
            date: 20230204,
            title: "Hello",
            link: "https://robohash.org/Prajwol%20Neupane0",
            likes: 23,
            dislikes: 2,
        },
        {
            id: 2,
            date: 20230205,
            title: "Hello",
            link: "https://robohash.org/Prajwol%20Neupane0",
            likes: 23,
            dislikes: 2,
        },
        {
            id: 3,
            date: 20230206,
            title: "Hello",
            link: "https://robohash.org/Prajwol%20Neupane0",
            likes: 23,
            dislikes: 2,
        },
        {
            id: 4,
            date: 20230207,
            title: "Hello",
            link: "https://robohash.org/Prajwol%20Neupane0",
            likes: 23,
            dislikes: 2,
        },
        {
            id: 5,
            date: 20230208,
            title: "Hello",
            link: "https://robohash.org/Prajwol%20Neupane0",
            likes: 23,
            dislikes: 2,
        }
    ]


    return (

        <VStack bgColor={'dark.600'} p={"40px 5%"} alignItems={"flex-start"} gap={"40px"}>
            <HStack gap={"60px"} justifyContent={"flex-start"}>
                <Avatar src={auth?.photoURL} bgColor={"text.200"} width={"180px"} height={"180px"} />
                <VStack alignItems={"start"}>
                    <Heading fontWeight={"semibold"} fontSize={"sm"} color={"text.300"}>{auth?.name}</Heading>
                    <Heading fontWeight={"medium"} fontSize={"xs"} color={"text.300"}>{auth?.email}</Heading>
                    <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }} onClick={() => {
                        deleteTokenCookie();
                        dispatch(setToken(null));
                        dispatch(setAuth(null));
                    }}>Log Out</Button>
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
            <Table variant={"simple"} color={"text.300"}>
                <Tr >
                    <Th color={"text.300"} textTransform={"none"} fontSize={"xs"} fontWeight={"semibold"}>
                        No.
                    </Th>
                    <Th w={"20%"} color={"text.300"} textTransform={"none"} fontSize={"xs"} fontWeight={"semibold"}>
                        Published Date
                    </Th>
                    <Th w={"20%"} color={"text.300"} textTransform={"none"} fontSize={"xs"} fontWeight={"semibold"}>
                        Title
                    </Th>
                    <Th color={"text.300"} textTransform={"none"} fontSize={"xs"} fontWeight={"semibold"}>
                        Link
                    </Th>
                    <Th color={"text.300"} textTransform={"none"} fontSize={"xs"} fontWeight={"semibold"}>
                        Total Likes
                    </Th>
                    <Th color={"text.300"} textTransform={"none"} fontSize={"xs"} fontWeight={"semibold"}>
                        Total Dislikes
                    </Th>
                    <Th w={"20%"} color={"text.300"} textTransform={"none"} fontSize={"xs"} fontWeight={"semibold"}>
                        Action
                    </Th>
                </Tr>
                {
                    data.map((curr, indx) => (
                        <Tr key={indx}>
                            <Td>
                                {curr?.id}
                            </Td>
                            <Td>
                                {curr?.date}
                            </Td>
                            <Td>
                                {curr?.title}
                            </Td>
                            <Td>
                                <Button as={Link} target="blank" to={curr?.link} p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }}>
                                    View Blog
                                </Button>
                            </Td>
                            <Td>
                                {curr?.likes}
                            </Td>
                            <Td>
                                {curr?.dislikes}
                            </Td>
                            <Td as={HStack}>
                                <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }}>
                                    Update Blog
                                </Button>
                                <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"error.500"} _hover={{ bgColor: "error.700" }} color={"dark.900"}>
                                    Delete Blog
                                </Button>
                            </Td>
                        </Tr>
                    ))
                }
            </Table>
        </VStack>


    )
}
export default Dashboard;