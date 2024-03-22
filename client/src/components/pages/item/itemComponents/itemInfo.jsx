import { Box, Container, Button } from "@mui/material";
import colorTheme from "../../../layout/colorTheme";


const ItemInfo = (props) => {
    
    return (
        <Container sx={{display:"flex", flexDirection:"column", height:"100%", padding:"2rem 0"}}>
            {props.item.price && 
                <Box
                sx={{
                    backgroundColor: colorTheme.palette.secondary.dark,
                    width: "fit-content",
                    padding: "0.2em 1em",
                    borderRadius: "20px",
                }}>
                    <p style={{margin: "0",fontSize: "1.5em"}}>{props.item.price}&euro;</p>
                </Box>}
            <Box>
                <p>{props.item.description}</p>
            </Box>
            <Box >
                {props.for_sale && 
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            margin: "0.5em",
                            width:"fit-content",
                            backgroundColor: colorTheme.palette.primary.dark,
                            borderRadius: 20,
                            alignSelf: "flex-end",
                            '&:hover': {
                                backgroundColor: colorTheme.palette.primary.dark,
                            },
                            // marginTop:"1rem"
                    }}>Buy</Button>}
                {props.exchange && 
                    <Button
                    variant="contained"
                        size="small"
                        sx={{
                            marginLeft: "0.5em",
                            width:"fit-content",
                            backgroundColor: colorTheme.palette.primary.dark,
                            borderRadius: 20,
                            alignSelf: "flex-end",
                            '&:hover': {
                                backgroundColor: colorTheme.palette.primary.dark,
                            },
                            // marginTop:"1rem",
                            
                    }}>Exchange</Button>}
            </Box>
        </Container>
    )

}

export default ItemInfo