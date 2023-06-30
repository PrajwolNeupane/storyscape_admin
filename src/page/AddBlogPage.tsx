import { Button, HStack, VStack, Box, Image, FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useAppSelector } from "../app/store";
import { usePostBlogMutation } from "../Features/auth/postBlogSlice";

interface Props {

}

const tags = [
    "Websites",
    "Mobile App",
    "Graphic Design",
    "UI / UX Design",
    "Internet of Things",
    "Technology",
    "Artificial Intelligence",
    "AI and Machine Learning",
    "Database",
    "Networking"
];

let AddBlogPage: FC<Props> = ({ }) => {

    const [data, setData] = useState<Array<{ image: null | File | string, description: null | string }> | null>(null);
    const [title, setTitle] = useState<string | null>("Title");
    const [selectedTag, setSelectedTag] = useState<string>('Websites');
    const [postBlog] = usePostBlogMutation();

    const { token } = useAppSelector((state) => state.Token);



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

    const onSubmmit = async () => {
        const formData = new FormData();
        data?.forEach(element => {
            if (element.image) {
                formData.append('images', element.image);
            } else if (element.description) {
                formData.append('paragraphs', element.description);
            }
        });
        if (token) {
            formData.append('token', token);
        }
        formData.append('tag', selectedTag);
        if (title) {
            formData.append('title', title);
        }
        const res = await postBlog(Object.fromEntries(formData)).unwrap();
        console.log(res);
        const convertedFormData = Object.fromEntries(formData);
        console.log(convertedFormData);
        console.log(title);
    }

    return (
        <>
            <VStack minHeight={"89.2vh"} bgColor={'dark.600'} alignItems={"center"} p="20px 10%" gap={"30px"}>
                <VStack position={'sticky'} top={"75px"} w={'100%'} bgColor={'dark.600'} pb={"20px"} zIndex={'1'}>
                    <Box contentEditable w={"100%"} fontSize={"50px"} color={"text.400"} border={"0px"} _focus={{ outline: "none" }} textAlign={"center"} fontWeight={"semibold"} onInput={(e) => {
                        setTitle((e.target as HTMLDivElement).textContent);
                    }}>{'Title'}</Box>
                    <HStack margin={'0px auto'} >
                        <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }} onClick={addImage}>Add Image</Button>
                        <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"text.300"} _hover={{ bgColor: "text.200" }} onClick={addParagraphs}>Add Paragraph</Button>
                    </HStack>
                </VStack>
                <FormControl w={"400px"}>
                    <FormLabel fontWeight={"medium"} fontSize={"sm"} color={'text.200'} >Tag</FormLabel>
                    <Select rounded={'md'} fontSize={"xs"} fontWeight={"medium"} color={"text.200"} bg={'dark.600'} onChange={(e) => {
                        setSelectedTag(e.target.value);
                    }}>
                        {
                            tags.map((curr, indx) => (
                                <Text as="option" key={indx} value={curr} color={"text.200"} style={{ background: "#363435" }}>{curr}</Text>

                            ))
                        }
                    </Select>
                </FormControl>
                {
                    //URL.createObjectURL
                    data?.map((curr, indx) => {
                        if (curr.image) {
                            return (<HStack w={"100%"} justifyContent={'space-between'} alignItems={'flex-start'}>
                                <input type="file" style={{ display: "none" }} id={indx + '-image'} onChange={(e) => {
                                    if (e?.target.files) {
                                        const updatedData = [...data];
                                        updatedData[indx] = {
                                            image: e.target.files[0],
                                            description: null
                                        }
                                        setData(updatedData);
                                    }
                                }} />
                                <Image key={indx} src={typeof curr.image == 'string' ? curr.image : URL.createObjectURL(curr.image)} w={"100%"} height={"400px"} objectFit={"contain"} />
                                <VStack alignItems={'flex-stretch'}>
                                    <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"error.500"} _hover={{ bgColor: "error.700" }} color={"text.100"} onClick={() => {
                                        document.getElementById(indx + '-image')?.click();
                                    }}>Change Image</Button>
                                    <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"error.500"} _hover={{ bgColor: "error.700" }} color={"text.100"} onClick={() => {
                                        const temp = data.slice(0, indx).concat(data.slice(indx + 1))
                                        setData(temp);
                                    }}>Remove</Button>
                                </VStack>
                            </HStack>)
                        } else if (curr.description) {
                            return <HStack w={"100%"} justifyContent={'space-between'} alignItems={'flex-start'}>
                                <Box key={indx} contentEditable w={"80%"} fontSize={"xs"} color={"text.300"} border={"0px"} _focus={{ outline: "none" }} onInput={(e) => {
                                    data[indx] = {
                                        image: null,
                                        description: (e.target as HTMLDivElement).textContent
                                    }
                                }}  >{curr.description}</Box>
                                <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"error.500"} _hover={{ bgColor: "error.700" }} color={"text.100"} onClick={() => {
                                    const temp = data.slice(0, indx).concat(data.slice(indx + 1))
                                    setData(temp);
                                }}>Remove</Button>
                            </HStack>
                        }
                    })
                }
                <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"success.700"} _hover={{ bgColor: "success.900" }} color={"text.100"} onClick={() => {
                    onSubmmit();
                }}>Post Blog</Button>

            </VStack>
        </>
    )
}
export default AddBlogPage