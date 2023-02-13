import "./Register2.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import { useForm } from "react-hook-form";
import User from "../../model/User";
import userActions from "../../util/userActions";

function Register2(): JSX.Element {
  const [cities, setCities] = useState<object[]>([]);
  const [streets, setStreets] = useState<object[]>([]);

  const location = useLocation();
  const newUser = location.state.newUser;

  // needs to be changed
  const navigate = useNavigate();

  // setValue

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data: any) => {
    console.log(newUser);
    console.log(data);
    const user = new User();
    user.email = newUser.email;
    user.password = newUser.password;
    user.first_name = data.first_name;
    user.last_name = data.last_name;
    user.city = data.city;
    user.street = data.street;
    console.log(user);
    await userActions
      .addUser(user)
      .then((user) => navigate("/about", { state: { user } }));
  };

  // navigate("/products");

  useEffect(() => {
    // cities
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab"
    )
      .then((response) => response.json())
      .then((data) => {
        setCities(data.result.records);
        console.log(data.result.records);
      });
    // streets
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=1b14e41c-85b3-4c21-bdce-9fe48185ffca"
    )
      .then((response) => response.json())
      .then((data) => {
        setStreets(data.result.records);
        console.log(data.result.records);
      });
  }, [newUser]);

  return (
    <div className="Register2">
      <FormLabel onSubmit={handleSubmit(onSubmit)}>
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
                <Button
                  onClick={() => navigate("/register")}
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  <ArrowBackIcon />
                  &nbsp;Back to previous stage
                </Button>
                <br />
                {/* firstName */}
                <TextField
                  // name="input1Value"
                  // ref={input1Ref}
                  required
                  label="firstName"
                  id="firstName"
                  {...register("first_name")}
                />
                {/* lastName */}
                <TextField
                  {...register("last_name")}
                  required
                  label="lastName"
                  id="lastName"
                  // onChange={handleChange}
                />
                {/* cities */}

                <TextField
                  // {...register("cities")}
                  required
                  // onClick={handleChange}
                  id="cities"
                  select
                  label="Cities"
                  {...register("city")}
                  helperText="Please select your currency"
                >
                  {cities.map((city: any) => (
                    <MenuItem
                      key={city._id}
                      // onClick={handleChange}
                      value={city.שם_ישוב}
                    >
                      {city.שם_ישוב}
                    </MenuItem>
                  ))}
                </TextField>

                {/* streets */}
                <TextField
                  required
                  {...register("street")}
                  // onClick={handleChange}
                  id="streets"
                  select
                  label="Streets"
                  helperText="Please select your currency"
                >
                  {streets.map((street: any) => (
                    <MenuItem key={street._id} value={street.street_name}>
                      {street.street_name}
                    </MenuItem>
                  ))}
                </TextField>
              </CardContent>

              {/* submit */}
              <Button
                type="submit"
                variant="contained"
                sx={{ marginBottom: 2 }}
              >
                To Start Shopping!
              </Button>
            </Box>
          </Card>
        </Grid>
      </FormLabel>
    </div>
  );
}

export default Register2;
