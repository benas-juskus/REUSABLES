import {Container, Button, Box} from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const itemImages =[
    
    { photo: "https://picsum.photos/500/500"},
    { photo: "https://picsum.photos/500/504"},
    { photo: "https://picsum.photos/500/501", main: true},
    { photo: "https://picsum.photos/500/502"},
    { photo: "https://picsum.photos/500/503"},
]
// 
const Wrapper = styled(Box) ({
    width: "fit-content",
    border: "1px solid grey",
    borderRadius: "5px",
    background: "white",
    margin: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap:"0.2rem",
    padding: "0.2rem",
    
})
const MainPhoto = styled(Box) ({
    width: "30rem",
    height: "30rem",
    borderRadius: "5px",
    backgroundSize: "cover",
    
})
const SecondaryPhoto = styled(Box) ({
    width: "100%",
    height: "7rem",
    borderRadius: "5px",
    backgroundSize: "cover",

})


const ItemGallery = () => {

    const [mainPhoto, setMainPhoto] = useState("");
    const [secondaryPhotos, setSecondaryPhotos] = useState([]);

    useEffect(() => {
        setMainPhoto(itemImages.find((item) => item.main === true).photo)

        setSecondaryPhotos(
            itemImages.filter((item) => item.main !== true)
            )
        console.log(secondaryPhotos);
    }, [])
    
    return (
        <Wrapper>
            <MainPhoto className = "mainPhoto" sx={{backgroundImage: `url(${mainPhoto})`}}/>
            <Box sx={{display: "flex", gap: "0.2rem", flexGrow: 1}}>
                { secondaryPhotos.map((item, index) => (
                    <SecondaryPhoto  key={index} sx={{backgroundImage: `url(${item.photo})`}}/>
                ))}
            </Box>
        </Wrapper>
    )
}

export default ItemGallery