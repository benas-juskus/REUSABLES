import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import EuroIcon from '@mui/icons-material/Euro';
import styled from '@emotion/styled';


// Usage: change labet text for one you want tu use (for example Email or Username).
//        change type: username ,email, password or number.
//        valid variable is set in form component depending on validation of input.
//        errmsg is set in form component. Text comes from error mesage from back-end server. 
// Example:
//        <Input label="Email" type="email" valid={valid} errtxt={errmsg}/> 
// 
export default function Input(props) {


  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        {props.type === "username" && <AccountCircle sx={{ color: 'action.active', mr: 1, mt: 2.5 }} />}
        {props.type === "email" && <EmailIcon sx={{ color: 'action.active', mr: 1, mt: 2.5 }} />}
        {props.type === "password" && <KeyIcon sx={{ color: 'action.active', mr: 1, mt: 2.5 }} />}
        {props.type === "number" && <EuroIcon sx={{ color: 'action.active', mr: 1, mt: 2.5 }} />}
        {props.valid === "true" && <TextField 

            inputProps={{
                style: {
                WebkitBoxShadow: "0 0 0 1000px white inset",
                backgroundColor: "transparent",
                /* Add more styles as needed */
                },
            }}
            id="input-with-sx" 
            label={props.label} 
            variant="standard" 
            helperText={props.errtxt} 
            type={props.type} 
            value={props.value}/>}
        {props.valid === "false" && <TextField id="input-with-sx" label={props.label} variant="standard" error helperText={props.errtxt} type={props.type}/>}
    </Box>
  );
} 