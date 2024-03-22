import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { createTheme, Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import styled from "@emotion/styled";
import Axios from "axios";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

// Styled elements and color theme
const formTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#9DBC98",
      dark: "#638889",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fcf6e8",
      main: "#F9EFDB",
      dark: "#EBD9B4",
      contrastText: "#000",
    },
  },
});

const InputField = styled(TextField)({
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #fcf6e8 inset",
    backgroundColor: "transparent",
  },
  "& label.Mui-focused": {
    color: formTheme.palette.primary.dark,
  },
  "& .MuiInputBase-input": {
    color: formTheme.palette.primary.dark,
  },
  width: "80%",
});

const Wrapper = styled(Box)({
  background:
    "linear-gradient(to right bottom, #F9EFDB, #9DBC98)",
  backgroundSize: "100% 50%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom",
  height: "100vh",
  width: "100vw",
  position: "relative",
  "@media (max-width: 600px)": {
    backgroundSize: "cover",
  },
});

const FormWrapper = styled(Box)({
  width: 300,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: formTheme.palette.secondary.light,
  borderRadius: 7,
  padding: "0 30px 30px 30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
  "@media (max-width: 600px)": {
    position: "relative",
    width: "calc(100% - 60px)",
    borderRadius: 0,
  },
});

const StyledButton = styled(Button)({
  backgroundColor: formTheme.palette.primary.main,
  color: "white",
  "&:hover": {
    backgroundColor: formTheme.palette.primary.dark,
  },
  borderRadius: 20,
  alignSelf: "flex-start",
});

const Registration = () => {
  const [errMsgPass, setErrMsgPass] = useState("");
  const [errMsgMail, setErrMsgMail] = useState("");

  // Initial registration credentials
  const initialValues = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  // Form field validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required!"),
    email: Yup.string().email("Invalid Email address").required("Email is required!"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required!"),
    repeatPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Repeat Password is required!"),
  });

  const handleFormSubmit = async (values) => {
    console.log("Form Values:", values);
    try {
      // Your form submission logic goes here
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <img src="./assets/logos/Logo-main-no-bg.png" alt="logo" width= '250px' style={{margin: '-120px auto 20px'}}/>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="form" style={{width:"100%"}}>
              <Box width={300} sx={{ mb: 2, width: "100%", display: "flex" }}>
                <PersonIcon sx={{ color: "action.active", mr: 1, mt: 2 }} />
                <InputField

                  size="small"
                  variant="standard"
                  name="username"
                  label="Username"
                  value={values.username}
                  helperText={touched.username && errors.username}
                  error={Boolean(errors.username && touched.username)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <Box width={300} sx={{ mb: 2, width: "100%", display: "flex" }}>
                <EmailIcon sx={{ color: "action.active", mr: 1, mt: 2 }} />
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
              <Box width={300} sx={{ mb: 2, width: "100%", display: "flex" }}>
                <KeyIcon sx={{ color: "action.active", mr: 1, mt: 2 }} />
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
              <Box width={300} sx={{ mb: 2, width: "100%", display: "flex" }}>
                <KeyIcon sx={{ color: "action.active", mr: 1, mt: 2 }} />
                <InputField
                  size="small"
                  variant="standard"
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  value={values.repeatPassword}
                  helperText={touched.repeatPassword && errors.repeatPassword}
                  error={Boolean(errors.repeatPassword && touched.repeatPassword)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <StyledButton type="submit" variant="contained" disabled={isSubmitting}>Register</StyledButton>
            </form>
          )}
        </Formik>
        <Box mt={2}>
          Already have an account? <Link to="/">Login</Link>
        </Box>
      </FormWrapper>
    </Wrapper>
  );
};

export default Registration;
