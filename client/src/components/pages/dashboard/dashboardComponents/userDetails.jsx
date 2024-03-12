import Rating from '@mui/material/Rating';
import { Box, Button} from "@mui/material";
import colorTheme from '../../../layout/colorTheme';

const RatingDisplay = ({value}) => {
    return (
        <Box style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3em"}}>
            <span>Your current rating is</span>
            <h1 style={{margin: "0"}}>{value}</h1>  
            <Rating name="user_rating" value={value} readOnly precision={0.1} size="large"/>
        </Box>
    )
}

const ProfilePicture = ({image}) => {
    return (
        <img 
            alt="profile_image" 
            src={image}
            style={{
                width: "20em", 
                height: "20em", 
                borderRadius: "50%",
                objectFit: "cover",
                }}>
        </img>
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
            style={{
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
            style={{
                height: "3em", 
                marginTop: "0.8em", 
                color: "black", 
                backgroundColor: colorTheme.palette.secondary.light
                }}>
        Change Password
        </Button>
    )
}

const UserDetails = ({user_data}) => {
    return (
        <div style={{
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                marginTop: "3em"}}> 
            <RatingDisplay value={user_data.rating}/>
            <ProfilePicture image={user_data.photo}></ProfilePicture>
            <h2>{user_data.username}</h2>
            <UsernameControlBtn username={user_data.username}></UsernameControlBtn>
            <ChangePasswordBtn></ChangePasswordBtn>
        </div>
    )
};

export default UserDetails;