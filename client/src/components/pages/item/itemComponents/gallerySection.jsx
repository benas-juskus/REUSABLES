import {Container, Box} from "@mui/material";
import styled from "@emotion/styled";
import Gallery from './itemGallery';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import colorTheme from "../../../layout/colorTheme";

// import { useHistory } from "react-router-dom";


const Wrapper = styled(Box) ({
    border: "1px solid black",
    borderRadius: "5px",
    width: "fit-content",
    boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
    // marginTop: "2em",
    background: "linear-gradient(to right bottom, #F9EFDB, #9DBC98) ",
})

const GallerySection = (props) => {

    // const history = useHistory()

    // const goBack = () => {
    //     history.goBack(); // Navigates to the previous page
    //   };

    return (
        <Container sx={{display:"flex",flexDirection:"column", width: "fit-content", paddingLeft: "0", paddingBottom: "2rem"}}>
            <Box sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <ArrowBackIosNewIcon sx={{
                    color: "white", 
                    width: "1.1em", height: "1.1em", 
                    margin:"0.7rem 0.5em 0 0",
                    backgroundColor: colorTheme.palette.primary.dark,
                    padding:0.5,
                    borderRadius: "20px",
                    // onclick:{ goBack}
                    }} />
                <h1 style={{margin: "0.5rem", textAlign: "end"}}>{props.itemName}</h1>
            </Box>
            <Wrapper className="gallery-wrapper">
                <Gallery />
            </Wrapper>
        </Container>  
    )
}

export default GallerySection