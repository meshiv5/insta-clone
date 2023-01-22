import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContextProider";

export default function PostGrid() {
  const { postData } = useContext(userContext);
  const navigate = useNavigate();
  return (
    <SimpleGrid overflow={"hidden"} w={["80%", "60%", "60%"]} className="" columns={[1, 1, 2, 3]} spacing={10} m={"auto"}>
      {postData.map((post) => {
        return (
          <Box
            onClick={() => {
              navigate(`/post/${post._id}`);
            }}
            className="cursor-pointer max-sm:w-[100%]"
            key={post._id}
          >
            <Image src={post.image} w={"350px"} h={"350px"} />
          </Box>
        );
      })}
    </SimpleGrid>
  );
}
