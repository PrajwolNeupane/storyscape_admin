import { Button, HStack, VStack, Box, Image } from "@chakra-ui/react";
import { FC, useState } from "react";

interface Props {

}

let AddBlogPage: FC<Props> = ({ }) => {

    const [data, setData] = useState<Array<{ image: null | string, description: null | string }> | null>(null);

    const addImage = () => {
        if (data) {
            setData([...data, { description: null, image: "https://media.geeksforgeeks.org/wp-content/uploads/20230427130955/CSS-Tutorial.webp" }]);
        } else {
            setData([{ description: null, image: "https://media.geeksforgeeks.org/wp-content/uploads/20230427130955/CSS-Tutorial.webp" }]);
        }
    }
    const addParagraphs = () => {
        if (data) {
            setData([...data, { description: "Lorem", image: null }]);
        } else {
            setData([{ description: "Lorem", image: null }]);
        }
    }

    return (
        <>
            <VStack minHeight={"89.2vh"} bgColor={'dark.600'} alignItems={"center"} p="20px 10%" gap={"30px"}>
                <Box contentEditable w={"100%"} fontSize={"50px"} color={"text.400"} border={"0px"} _focus={{ outline: "none" }} textAlign={"center"} fontWeight={"medium"}>Title</Box>
                <HStack>
                    <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }} onClick={addImage}>Add Image</Button>
                    <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }} onClick={addParagraphs}>Add Paragraph</Button>
                </HStack>
                {
                    data?.map((curr, indx) => {
                        if (curr.image) {
                            return (<Image key={indx} src="https://media.geeksforgeeks.org/wp-content/uploads/20230427130955/CSS-Tutorial.webp" w={"100%"} height={"400px"} objectFit={"contain"} />)
                        } else if (curr.description) {
                            return <Box key={indx} contentEditable w={"100%"} fontSize={"xs"} color={"text.300"} border={"0px"} _focus={{ outline: "none" }}>{curr.description}</Box>
                        }
                    })
                }


            </VStack>
        </>
    )
}
export default AddBlogPage