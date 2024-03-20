import { Box, Typography } from "@mui/material";
import colorTheme from "../../../layout/colorTheme";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Paragrahp = styled(Typography) ({
    color: colorTheme.palette.primary.main, 
    fontSize:"1.2em", 
    marginLeft:" 1rem"
})


const Stats = (props) => {

const [itemOwner, setItemOwner] = useState({});

    useEffect(() => {
        const getOwner = async () => {
            console.log(props.item.users_id);
            const owner = await Axios.post("/users/show/",{id: props.item.users_id});
            console.log(owner.data);
            setItemOwner(owner.data);
        }
        getOwner();
    }, [])
    
    return (
        <Box sx={{
            display:"flex",
            justifyContent:"space-between", 
            width:"100%",
            backgroundColor: colorTheme.palette.secondary.dark,
            padding:"0.5em 0 ",
            }}>
            <Box sx={{display: "flex"}}>
                <Paragrahp >Listed by: <Link to={`/user/${itemOwner.id}`}>{itemOwner.username}</Link></Paragrahp>
            </Box> 
        </Box>
    )
}

export default Stats