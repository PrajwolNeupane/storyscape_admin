import { Button, HStack, VStack, Box, Image, FormControl, FormLabel, Select, Text,useToast } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useAppSelector } from "../app/store";
import { usePostBlogMutation } from "../Features/auth/postBlogSlice";
import { ClipLoader } from "react-spinners";

interface Props {

}

const tags = [
    "Websites",
    "Mobile App",
    "Graphic Design",
    "UI UX Design",
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
    const [postBlog, { isLoading }] = usePostBlogMutation();
    const toast = useToast();

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

    const onSubmit = async () => {
        const formData = new FormData();
        const paragraphsData: Array<any> = [];
        const imageData: Array<File | string> = [];
        var imageCount = 0;
        data?.forEach((element, indx) => {
            if (element.image) {
                // formData.append(`images`, element.image);
                imageCount = imageCount + 1;
                imageData.push(element.image);
                imageCount = imageCount + 1;
            } else if (element.description) {
                paragraphsData.push({ paragraph: element.description, indx: indx });
            }
        });
        if (token) {
            formData.set("token", token);
        }
        if (imageData.length > 0) {
            // imageData.forEach((image, index) => {
            //     formData.append(`image-${index}`, image);
            //   });
            console.log(imageData)
            formData.append('images', imageData[0]);
        }
        if (paragraphsData) {
            formData.append("paragraphs", JSON.stringify(paragraphsData));
        }
        formData.append("tag", selectedTag);
        if (title) {
            formData.append("title", title);
        }
        const res = await postBlog(Object.fromEntries(formData)).unwrap();
        if(res.blog){
            setData(null);
            setTitle(null);
            toast({
                title: "Blog Added",
                description: "Blog Added Sucesfully",
                duration: 5000,
                isClosable: true,
                status: 'success',
                position: 'bottom-right',

            });
        }
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
                {
                    isLoading ? <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"brand.400"} _hover={{ bgColor: "brand.600" }} color={"dark.100"} as={HStack} cursor={'pointer'}>Post Blog <ClipLoader color="black" size={'25px'}/></Button> : <Button p={"0px 20px"} fontWeight={"medium"} fontSize={"xs"} bgColor={"brand.400"} _hover={{ bgColor: "brand.700" }} color={"dark.100"} onClick={() => {
                        onSubmit();
                    }}>Post Blog</Button>
                }

            </VStack>
        </>
    )
}
export default AddBlogPage