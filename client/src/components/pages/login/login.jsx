import { useState } from "react";
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Button, Box} from "@mui/material";
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import styled from "@emotion/styled";
import Axios  from 'axios';
import { Link } from 'react-router-dom';
import colorTheme from "../../layout/colorTheme";

const InputField = styled(TextField)({
    '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px #fcf6e8 inset',
        backgroundColor: 'transparent',
    },
    '& label.Mui-focused': {
        color: colorTheme.palette.primary.dark,
    },
    '& .MuiInputBase-input': {
        color: colorTheme.palette.primary.dark,
    },
    width: '80%'
});

const Wrapper = styled(Box)({
    background: 'linear-gradient(to right bottom, #F9EFDB, #9DBC98)', 
    backgroundSize: ' 100% 50% ', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'bottom', 
    height: '100vh',
    width: '100vw',
    position: 'relative',
    '@media (max-width: 600px)': {
        backgroundSize: 'cover', 
    },
})

const FormWrapper = styled(Box) ({
    width: 300,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: colorTheme.palette.secondary.light,
    borderRadius: 7,
    padding: '0 30px 30px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.2)',
    '@media (max-width: 600px)': {
        position: 'relative',
        width: 'calc(100% - 60px)',
        borderRadius: 0,
    },
    ".form ": {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
})
const StyledButton = styled(Button)({
    backgroundColor: colorTheme.palette.primary.main,
    color: 'white',
    '&:hover': {
        backgroundColor: colorTheme.palette.primary.dark,
    },
    borderRadius: 20,
    alignSelf: 'flex-start'
})

//====================================================================

const Login = () => {

    const [errMsgMail, setErrMsgMail] = useState("");
    const [errMsgPass, setErrMsgPass] = useState("");

    // initial login credentials
    const initialValues = {
        email: "",
        password: "",
    };
  
    // form field validation schema
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Password must be 6 character length")
            .required("Password is required!"),
        email: Yup.string().email("Invalid Email address").required("Email is required!")
  });

  const handleFormSubmit = async (values) => {
    // console.log("Form Values:", values);
    try {
        const response = await Axios.post("/login", {email: values.email, password: values.password});
        console.log("Response: ", response.data);
        localStorage.setItem("token", response.data.token);
        // setErrMsgMail("");
        // setErrMsgPass("");
    } catch (error) {
        // console.log(error);
        // console.log(error.response.data.message);

        if (error.response.data.validation) {
            let messages = [];
            let errArray = error.response.data.validation.errors;
            for (let err of errArray) {
                if (err.path === "email") {
                    messages.push(err.msg);
                    setErrMsgMail(messages.join(','));
                    setErrMsgPass("");
                } else {
                    messages.push(err.msg);
                    setErrMsgPass(messages.join(','));
                }
            }
        }

        if (error.response.data.errorFor === "email") {
            setErrMsgMail(error.response.data.message);
        } else {
            setErrMsgPass(error.response.data.message);
        }
    }
  }

    return (
        <Wrapper>
            <FormWrapper >
                <img src="./assets/logos/Logo-main-no-bg.png" alt="logo" width= '250px' style={{margin: '-120px auto 0'}}/>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting}) => ( 
                        <form onSubmit={handleSubmit} className='form'>
                            <Box width={300} sx={{mt: 2, mb: 2, width:'100%', display: 'flex' }}>
                                <EmailIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                                <InputField
                                    size="small" 
                                    variant="standard" 
                                    name="email"
                                    label="Email" 
                                    type="email"
                                    value={values.email} 
                                    helperText={touched.email && (errors.email || errMsgMail)}
                                    error={Boolean((errors.email || errMsgMail !== "") && touched.email)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Box width={300} sx={{ mb: 1, mt: 1, width:'100%', display: 'flex' }}>
                                <KeyIcon sx={{ color: 'action.active', mr: 1, mt: 2 }} />
                                <InputField 
                                    size="small" 
                                    variant="standard" 
                                    name="password"
                                    label="Password" 
                                    type="password" 
                                    value={values.password} 
                                    helperText={touched.password && (errors.password || errMsgPass)}
                                    error={Boolean((errors.password || errMsgPass !== "") && touched.password)}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Box>
                            <Link to="/forgot-password" style={{margin:'0 11% 0 0',alignSelf: 'flex-end', color: '#638889', }}>Forgot Password?</Link>
                            <StyledButton type="submit" variant="contained" disabled={isSubmitting}>Sign In</StyledButton>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'start'}}>
                                <p style={{margin:0}}>Don't have an account?</p>
                                <Link to="/register" style={{margin:'0 10px', color: '#638889', }}>Sign Up</Link>
                            </Box>
                        </form>
                    )}
                </Formik>
            </FormWrapper>
        </Wrapper>
    )
}

export default Login