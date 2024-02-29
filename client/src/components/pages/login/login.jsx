import { useState } from "react";
// import Input from "../../inputs/name/input";
import Box from '@mui/material/Box';
import {Formik} from 'formik'
import * as Yup from 'yup'
import { createTheme, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import styled from "@emotion/styled";
import Axios  from 'axios';

// styled elements and color theme
const formTheme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#9DBC98",
        dark: "#638889",
        contrastText: "#fff"
      },
      secondary: {
        light: "#fcf6e8",
        main: "#F9EFDB",
        dark: "#EBD9B4",
        contrastText: "#000"
      }
    }
  });

const InputField = styled(TextField)({
    '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px #fcf6e8 inset',
        backgroundColor: 'transparent',
    },
    '& label.Mui-focused': {
        color: formTheme.palette.primary.dark,
    },
    '& .MuiInputBase-input': {
        color: formTheme.palette.primary.dark,
    }
});

const Wrapper = styled(Box)({
    background: 'linear-gradient(to right bottom, #F9EFDB, #9DBC98)', 
    backgroundSize: ' 100% 50% ', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'bottom', 
    height: '100vh',
    position: 'relative'
})

const FormWrapper = styled(Box)({
    width: 400,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: formTheme.palette.secondary.light,
    borderRadius: 7,
    padding: '0 0px 30px 30px',
    // paddingRight: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
    ".form ": {
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const StyledButton = styled(Button)({
    backgroundColor: formTheme.palette.primary.main,
    color: 'white',
    '&:hover': {
        backgroundColor: formTheme.palette.primary.dark,
    },
    borderRadius: 20,
    alignSelf: 'flex-start'
})

//====================================================================

const Login = () => {

    const [errMsgPass, setErrMsgPass] = useState("");
    const [errMsgMail, setErrMsgMail] = useState("");



        // initial login credentials
    const initialValues = {
        email: "",
        password: "",
        // remember: true
    };
  

    // form field validation schema
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Password must be 6 character length")
            .required("Password is required!"),
        email: Yup.string().email("Invalid Email address").required("Email is required!")
  });

  const handleFormSubmit = async (values) => {
    console.log("Form Values:", values);
    try {
        const response = await Axios.get("/test", {params: {email: values.email, password: values.password}});
        if (response.data.user) {
            setErrMsgMail("");
            console.log(response.data.message);
            // console.log(user.data.user.username);
            console.log(response.data.passMatch);
            console.log(response.data.errMsgPass);
            console.log(response.data.errMsgMail);
            if (response.data.errMsgPass) {
                setErrMsgPass(response.data.errMsgPass);
            } else setErrMsgPass("");
        } else {
            setErrMsgMail(response.data.errMsgMail);
        }     
    } catch (error) {
        console.log(error);
    }
  }

    return (
        <Wrapper>
            <FormWrapper>
                <img src="./Logo-main-no-bg.png" alt="" />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting}) => ( 
                        <form onSubmit={handleSubmit} className='form'>
                            <Box width={300} sx={{ mx: 'auto', mb: 2, mt: 4, width:'fit-content' }}>
                                <EmailIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                                <InputField
                                    size="small" 
                                    variant="standard" 
                                    name="email"
                                    label="Email" 
                                    type="email"
                                    value={values.email} 
                                    helperText={touched.email && (errors.email || errMsgMail)}
                                    error={Boolean((errors.email || errMsgMail) && touched.email)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Box width={300} sx={{ mx: 'auto', mb: 3, mt: 1, width:'fit-content' }}>
                                <KeyIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                                <InputField 
                                    size="small" 
                                    variant="standard" 
                                    name="password"
                                    label="Password" 
                                    type="password" 
                                    value={values.password} 
                                    helperText={touched.password && (errors.password || errMsgPass)}
                                    error={Boolean((errors.password || errMsgPass) && touched.password)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <StyledButton type="submit" variant="contained" disabled={isSubmitting}>Sign In</StyledButton>
                        </form>
                    )}
                </Formik>
            </FormWrapper>
        </Wrapper>
    )
}

export default Login