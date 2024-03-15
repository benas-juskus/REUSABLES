import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { createTheme, Button, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import styled from "@emotion/styled";
import Axios from "axios";
import { Link } from "react-router-dom";

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

const ForgotPassword = () => {
  const [errMsgEmail, setErrMsgEmail] = useState("");

  // Initial form values
  const initialValues = {
    email: "",
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email address").required("Email is required!"),
  });

  const handleFormSubmit = async (values) => {
    console.log("Form Values:", values);
    try {
      // Sends a request to backend to handle the forgot password functionality
      const response = await Axios.post("/forgot-password", { email: values.email });

      // Handle response from the backend (display a success message)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="form">
              <Box width={300} sx={{ mb: 2, width: "100%", display: "flex" }}>
                <EmailIcon sx={{ color: "action.active", mr: 1, mt: 2 }} />
                <InputField
                  size="small"
                  variant="standard"
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(errors.email && touched.email)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Box>
              <StyledButton type="submit" variant="contained" disabled={isSubmitting}>Send Reset Email</StyledButton>
            </form>
          )}
        </Formik>
        <Box mt={2}>
          Remembered your password? <Link to="/login">Login</Link>
        </Box>
      </FormWrapper>
    </Wrapper>
  );
};

export default ForgotPassword;
