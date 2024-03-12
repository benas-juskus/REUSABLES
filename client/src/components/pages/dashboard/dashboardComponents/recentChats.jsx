import { Box, Button} from "@mui/material";
import colorTheme from "../../../layout/colorTheme";
import { Link } from 'react-router-dom';

const ItemImagePreview = ({photo}) => {
    return (
        <img src={photo} alt="item_image" style={{ width: "5em", height: "5em", objectFit: "cover"}}></img>
    )
}

const SingleChatPreview = ({transaction}) => {
    return (
        <Box  sx={{
                borderBottom: "1px solid black", 
                display: "flex", textDecoration: "none"}} 
            component={Link} to={`/transaction/${transaction.id}`}>
            <ItemImagePreview photo={"https://placehold.co/400x400"}/>
            <Box sx={{
                    paddingLeft: "0.5em",
                    margin: "0 0",
                    color: "black", 
                    width: "100%", 
                    minHeight: "100%", 
                    backgroundColor: colorTheme.palette.secondary.main}}>
                <p>Chat with username</p>
                <small>{transaction.item2_id ? `Trading ${transaction.item1_id} and ${transaction.item2_id}` : `Selling ${transaction.item1_id}`}</small>
            </Box>
            {transaction.item2_id ? <ItemImagePreview photo={"https://placehold.co/400x400"}/> : null}
        </Box>
    )
}

const RecentChats = ({transactions}) => {
    return (
        <Box sx={{
                boxShadow: 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between", 
                alignItems: "center",
                minHeight: "100%", 
                maxHeight: "100%", 
                width: "30%", 
                backgroundColor: colorTheme.palette.secondary.light}}>
            <Box sx={{
                    scrollbarWidth: "none" , 
                    overflowY: "scroll", 
                    width: "100%"}}>
                {transactions.map((transaction) => (
                    <SingleChatPreview transaction={transaction}/>
                ))}
            </Box>
            <Box sx={{
                    width: "100%", 
                    display: "flex", 
                    justifyContent: "center"}}>
                <Button sx={{
                        width: "60%", 
                        margin: "0.8em 0", 
                        backgroundColor: colorTheme.palette.primary.dark
                    }} href="/messenger" variant="contained" >Open Messenger</Button>
            </Box>
        </Box>
    )
};

export default RecentChats;