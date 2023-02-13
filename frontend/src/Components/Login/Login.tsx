import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Grid, Link, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userActions from "../../util/userActions";

function Login(): JSX.Element {
  // all users
  const [users, setUsers] = useState<any>([]);
  // const [user, setUser] = useState<any>();

  // user value from text filed
  let [userValue, setUserValue] = useState({ email: "", password: "" });

  // navigation
  const navigate = useNavigate();

  useEffect(() => {
    // getting users from this api
    userActions.getUsers().then((res) => setUsers(res));
  }, []);

  //   on text filed change function
  let handleChange = (event: any) => {
    let value = event.target.value;
    let type = event.target.type;
    type === "email"
      ? setUserValue({ ...userValue, email: value })
      : setUserValue({ ...userValue, password: value });
  };

  // user password & email for example
  // "talmor@gmail.com"
  // "1234"

  // admin email & password
  // orginy1526@gmail.com
  // Orginy123!

  const onSubmit = async (event: any) => {
    event.preventDefault();
    // password validation
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(users);
    // is user exist?
    const isUserExist = users!.find(
      (user: any) =>
        user.email === userValue.email && user.password === userValue.password
    );
    const isEmail = users!.find((user: any) => user.email === userValue.email);
    const isPassword = users!.find(
      (user: any) => user.password === userValue.password
    );

    const isAdmin = users!.find(
      () =>
        "orginy1526@gmail.com" === userValue.email &&
        "Orginy123!" === userValue.password
    );
    let user = users.filter(
      (user: any) =>
      user.email === userValue.email && user.password === userValue.password
    );
    user = user[0]
    console.log(user);

    isEmail &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "wrong password",
      });
    isPassword &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "wrong email",
      });
    isUserExist
      ? navigate("/about", { state: { user } })
      : !emailRegex.test(userValue.email) &&
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email must be in correct format of example@mail.com",
        });
    if (!isUserExist && !isEmail && !isPassword)
      Swal.fire({
        icon: "error",
        title: "Hmmm...",
        html: '<h4>R U Registered?</h4> click here 👇<br/> <br/><a href="http://localhost:3000/register">Register</a>',
      });

    isAdmin && navigate("/admin");
  };
  return (
    <div className="Login">
      {/* login page */}
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
          Giny's Online SuperMarket 🛒
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
              {/* email */}
              <TextField
                required
                label="email"
                type="email"
                onChange={handleChange}
              />
              {/* password */}
              <TextField
                required
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </CardContent>
            {/* register */}
            <Typography sx={{ mb: 2 }}>
              Don't have an account? &nbsp;
              <Link onClick={() => navigate("/register")}>Register</Link>
            </Typography>
            {/* submit */}
            <Button
              type="submit"
              onClick={(event) => onSubmit(event)}
              variant="contained"
              sx={{ marginBottom: 2 }}
            >
              Login
            </Button>
          </Box>
        </Card>
      </Grid>
    </div>
  );
}

export default Login;
