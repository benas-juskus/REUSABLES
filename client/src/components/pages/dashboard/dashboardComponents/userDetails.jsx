import Rating from '@mui/material/Rating';
import { useState } from "react";
import { Box, Button} from "@mui/material";
import { Link } from 'react-router-dom';
import {Formik} from 'formik';
import colorTheme from '../../../layout/colorTheme';
import Tooltip from '@mui/material/Tooltip';

const RatingDisplay = ({value}) => {
    return (
        <Box sx={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                marginTop: "3em"}}>
            <span>Your current rating is</span>
            <h1 style={{margin: "0"}}>{value}</h1>  
            <Rating name="user_rating" value={value} readOnly precision={0.1} size="large"/>
        </Box>
    )
}

const ProfilePicture = ({image}) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Formik>
            <form action="#" method="POST">
                <Tooltip title="Change Profile Picture">
                    <img 
                        alt="profile_image" 
                        src={image}
                        style={{
                            opacity: isHovered ? 0.8 : 1,
                            cursor: isHovered ? "pointer" : "auto",
                            width: "20em", 
                            height: "20em", 
                            borderRadius: "50%",
                            objectFit: "cover",
                            }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        />
                </Tooltip>
            </form>
        </Formik>
    )
};

const toggleUsernameChange = () => {
    // TODO
}

const UsernameControlBtn = ({username}) => {
    return (
        <Button 
            variant="contained" 
            onClick={toggleUsernameChange}
            sx={{
                height: "3em",
                marginTop: "0.8em",
                backgroundColor: colorTheme.palette.primary.dark
            }}>Change Username
        </Button>
    )
};

const ChangePasswordBtn = () => {
    return (
        <Button 
            variant="contained" 
            sx={{
                height: "3em", 
                marginTop: "0.8em", 
                color: "black",
                margin: "0.8em 0",
                backgroundColor: colorTheme.palette.secondary.light
                }}>
        Change Password
        </Button>
    )
}

const UserDetails = ({user_data}) => {
    return (
        <Box sx={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                justifyContent: "space-between",
                width: "30%",
                minHeight: "100%",
                boxShadow: 1,
                backgroundColor: colorTheme.palette.secondary.light}}> 
            <RatingDisplay value={user_data.rating}/>
            <ProfilePicture image={user_data.photo}></ProfilePicture>
            <h2>{user_data.username}</h2>
            <UsernameControlBtn username={user_data.username}></UsernameControlBtn>
            <ChangePasswordBtn></ChangePasswordBtn>
        </Box>
    )
};

export default UserDetails;