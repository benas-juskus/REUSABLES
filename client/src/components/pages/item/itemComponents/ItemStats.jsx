import { Box, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import colorTheme from "../../../layout/colorTheme";
import styled from "@emotion/styled";
import PlaceIcon from '@mui/icons-material/Place';

const Paragrahp = styled(Typography) ({
    color: colorTheme.palette.primary.main, 
    fontSize:"1.2em", 
    margin:"0.5rem 0 0 1rem"
})


const Stats = (props) => {
    
    return (
        <Box sx={{
            display:"flex",
            justifyContent:"space-between", 
            width:"100%",
            backgroundColor: colorTheme.palette.secondary.dark,
            padding:"0.5em 0 ",
            }}>
            <Box sx={{display: "flex"}}>
                <Paragrahp >ID: {props.item.id}</Paragrahp>
                <Paragrahp >Updated: {props.item.updated_at}</Paragrahp>
                {props.favoured &&<Box sx={{display: "flex"}}>
                    <FavoriteIcon sx={{color: colorTheme.palette.primary.main, width: "1em", height: "1em", padding:"0.3em 0 0 0.5em" }}/>
                    <Paragrahp style={{marginLeft:"0"}}>Favoured:{props.favoured}</Paragrahp>
                </Box>}
            </Box> 
            <Box sx={{display: "flex"}}> 
                {/* <VisibilityIcon sx={{color: colorTheme.palette.primary.dark, width: "1em", height: "1em", padding:"0.3em 0.5em 0"}}/> */}
                <PlaceIcon sx={{color: colorTheme.palette.primary.dark, width: "1.5em", height: "1.5em", padding:"0 0.5em",justifySelf: "end"}}/>
                <ShareIcon sx={{color: colorTheme.palette.primary.dark, width: "1.5em", height: "1.5em", padding:"0 0.5em",justifySelf: "end"}} />
                <EditIcon sx={{color: colorTheme.palette.primary.dark, width: "1.5em", height: "1.5em", padding:"0 0.5em",alignSelf: "end"}}/>
            </Box>
        </Box>
    )
}

export default Stats