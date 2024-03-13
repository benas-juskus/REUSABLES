import { Box, Button} from "@mui/material";
import colorTheme from "../../../layout/colorTheme";
import { Link } from 'react-router-dom';

const SingleItemQuickView = ({item}) => {
    return (
        <Box component={Link} 
            to={`/item/${item.id}`} 
            sx={{
                borderBottom: "1px solid black", 
                display: "flex", 
                textDecoration: "none"}}>
            <img src={item.photo} alt="item_image" style={{ width: "5em", height: "5em", objectFit: "cover"}}></img>
            <span style={{color: "black", width: "100%", minHeight: "100%",padding: "0 0.5em", backgroundColor: colorTheme.palette.secondary.main}}>{item.name}</span>
        </Box>
    )
}

const RecentItemsList = ({user_items}) => {
    return (
        <Box sx={{ 
                boxShadow: 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between", 
                alignItems: "center",
                minHeight: "100%", 
                width: "30%", 
                backgroundColor: colorTheme.palette.secondary.light}}>
            <Box sx={{
                    scrollbarWidth: "none" , 
                    overflowY: "scroll", 
                    width: "100%"}}>
                {user_items.map((item) => (
                    <SingleItemQuickView item={item}/>
                ))}
            </Box>
            <Box sx={{
                    width: "100%", 
                    display: "flex", 
                    justifyContent: "center"}}>
                <Button sx={{
                        width: "60%", 
                        margin: "0.8em 0", 
                        backgroundColor: colorTheme.palette.primary.dark}}
                    variant="contained">
                    View All Items</Button>
            </Box>
        </Box>
    )
};

export default RecentItemsList;