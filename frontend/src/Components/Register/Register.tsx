import {
  Grid,
  Typography,
  Card,
  Box,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Register.css";
import axios from "axios";
import userActions from "../../util/userActions";
import User from "../../model/User";

function Register(): JSX.Element {
  const navigate = useNavigate();

  let [userValue, setUserValue] = useState({
    id: "",
    email: "",
    password: "",
    password2: "",
  });

  // const addUser = async (email: string, password: string) => {
  //   return await axios.post(
  //     "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/user/addUser1",
  //     {
  //       email: email,
  //       password: password,
  //     }
  //   );
  // };

  //   on text filed change function
  let handleChange = (event: any) => {
    let value = event.target.value;
    let id = event.target.id;

    switch (id) {
      case "id":
        setUserValue({ ...userValue, id: value });
        break;
      case "email":
        setUserValue({ ...userValue, email: value });
        break;
      case "password":
        setUserValue({ ...userValue, password: value });
        break;
      case "password2":
        setUserValue({ ...userValue, password2: value });
        break;
    }
  };

  const alertErr = (text: string) => {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // validation
    const idRegex = /^\d{9}$/;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let checkEmptyFiled = Object.values(userValue).includes("");

    checkEmptyFiled && alertErr("All Fields Required ");
    !idRegex.test(userValue.id) &&
      alertErr("You're ID number must contain 9 numbers");
    !emailRegex.test(userValue.email) &&
      alertErr("Email must be in correct format of example@mail.com");
    !passwordRegex.test(userValue.password) &&
      alertErr(
        "Password need to contain small big letters numbers and special characters such as 	#	$	%	&"
      );
    userValue.password !== userValue.password2 &&
      alertErr("Make sure the password is the same!");
    if (
      !checkEmptyFiled &&
      idRegex.test(userValue.id) &&
      emailRegex.test(userValue.email) &&
      passwordRegex.test(userValue.password) &&
      userValue.password === userValue.password2
    ) {
      const newUser = new User();
      newUser.email = userValue.email;
      newUser.password = userValue.password;
      console.log(newUser);

      navigate(`/register2`, { state: { newUser } });

      // userActions.addUser(newUser).then(console.log);
    }
  };
  return (
    <div className="Register">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", textAlign: "center" }}
      >
        {/* heading */}
        <Typography
          fontFamily="sans-serif"
          variant="h4"
          gutterBottom
          sx={{ mb: 5 }}
        >
          2️⃣ more steps before you 🛒
        </Typography>
        <Card sx={{ width: "50%" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
              },
            }}
            autoComplete="off"
          >
            <CardContent>
              {/* id */}
              <TextField required label="id" id="id" onChange={handleChange} />
              {/* email */}
              <TextField
                required
                label="email"
                id="email"
                type="email"
                onChange={handleChange}
              />
              {/* password */}
              <TextField
                required
                label="Password"
                id="password"
                onChange={handleChange}
              />

              <TextField
                required
                label="verifyPassword"
                id="password2"
                onChange={handleChange}
              />
            </CardContent>

            {/* login */}

            <Typography sx={{ m: 1 }}>
              Remembered do have an account? &nbsp;
              <Link onClick={() => navigate("/")} to={"/"}>
                Login
              </Link>
            </Typography>
            {/* submit */}
            <Button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              variant="contained"
              sx={{ marginBottom: 2 }}
            >
              to the final step
            </Button>
          </Box>
        </Card>
      </Grid>
    </div>
  );
}

export default Register;
