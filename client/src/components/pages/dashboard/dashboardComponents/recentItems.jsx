import { Box, Button} from "@mui/material";
import colorTheme from "../../../layout/colorTheme";

const SingleItemQuickView = ({item}) => {
    return (
        <Box sx={{borderBottom: 1, display: "flex"}}>
            <img src={item.photo} alt="item_image" style={{width: "5em", height: "5em", objectFit: "cover"}}></img>
            <h3 style={{width: "100%", minHeight: "100%",margin: "0 0.5em", backgroundColor: colorTheme.palette.secondary.main}}>{item.name}</h3>
        </Box>
    )
}

const RecentItemsList = ({user_items}) => {
    return (
        <Box sx={{ boxShadow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center",minHeight: "100%", width: "30%", backgroundColor: colorTheme.palette.secondary.light}}>
            <Box sx={{width: "100%"}}>
                {user_items.map((item) => (
                    <SingleItemQuickView item={item}/>
                ))}
            </Box>
            <Box sx={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Button variant="contained" sx={{width: "60%", margin: "0.8em 0", backgroundColor: colorTheme.palette.primary.dark}}>View All</Button>
            </Box>
        </Box>
    )
};

export default RecentItemsList;