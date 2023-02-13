import Navbar from "../Navbar/Navbar";
import "./Order.css";
// list
import UndoIcon from "@mui/icons-material/Undo";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { createInferTypeNode } from "typescript";
import FormLabel from "@mui/material/FormLabel";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { styled } from "@mui/material/styles";

// grid
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

// search
import * as React from "react";
import { alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// date input

import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// creditCard
// import { Form, Field } from "react-final-form";
// import Payment from "payment";

// const clearNumber = (value = "") => {
//   return value.replace(/\D+/g, "");
// };

// const formatCreditCardNumber = (value: any) => {
//   if (!value) {
//     return value;
//   }

//   const issuer = Payment.fns.cardType(value);
//   const clearValue = clearNumber(value);
//   let nextValue;

//   switch (issuer) {
//     case "amex":
//       nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
//         4,
//         10
//       )} ${clearValue.slice(10, 15)}`;
//       break;
//     case "dinersclub":
//       nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
//         4,
//         10
//       )} ${clearValue.slice(10, 14)}`;
//       break;
//     default:
//       nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
//         4,
//         8
//       )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
//       break;
//   }

//   return nextValue.trim();
// };

// const formatCVC = (value: any, prevValue: any, allValues: any = {}) => {
//   const clearValue = clearNumber(value);
//   let maxLength = 3;

//   if (allValues.number) {
//     const issuer = Payment.fns.cardType(allValues.number);
//   }

//   return clearValue.slice(0, maxLength);
// };

// const formatExpirationDate = (value: any) => {
//   const clearValue = clearNumber(value);

//   if (clearValue.length >= 3) {
//     return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
//   }

//   return clearValue;
// };

// search

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

//

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

function Order(): JSX.Element {
  // date
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );

  const handleChange2 = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  // form
  const [cities, setCities] = useState<object[]>([]);
  const [streets, setStreets] = useState<object[]>([]);

  // needs to be changed
  const navigate = useNavigate();

  let [userValue, setUserValue] = useState({
    id: "",
    email: "",
    password: "",
    password2: "",
  });

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate("/products");
  };

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
  }, []);
  // cart
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch(
      "https://eforms.com/download/2019/01/Receipt-Template.pdf"
    ).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "https://eforms.com/download/2019/01/Receipt-Template.pdf";
        alink.click();
      });
    });
  };
  return (
    <div className="Order">
      <Navbar />
      {/* grid */}
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              {/* final cart */}
              <Button variant="outlined" onClick={() => navigate("/products")}>
                <UndoIcon />
                &nbsp;Back to Shop
              </Button>
              <Search sx={{ mt: 2 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 200,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    All products
                  </ListSubheader>
                }
              >
                {["product1", "product2", "product3", "product4"].map(
                  (product) => (
                    <ListItemButton>
                      <ListItemIcon>
                        <FastfoodIcon />
                      </ListItemIcon>
                      <ListItemText primary={product} />
                      <AttachMoneyIcon />
                    </ListItemButton>
                  )
                )}
              </List>
              <Div>{"Total Price 💵"}</Div>;
            </Item>
          </Grid>
          {/* user details */}
          <Grid item xs={6}>
            <Item>
              <FormLabel onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: "100vh", textAlign: "center" }}
                >
                  {/* heading */}
                  <Typography fontFamily="sans-serif" variant="h4" gutterBottom>
                    Order 🗳️
                  </Typography>
                  <Card sx={{ width: "100%" }}>
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
                        {/* cities */}

                        <TextField
                          required
                          onChange={handleChange}
                          id="cities"
                          select
                          label="Cities"
                          helperText="Please select your currency"
                        >
                          {cities.map((city: any) => (
                            <MenuItem key={city._id} value={city.שם_ישוב}>
                              {city.שם_ישוב}
                            </MenuItem>
                          ))}
                        </TextField>

                        {/* streets */}
                        <TextField
                          required
                          onChange={handleChange}
                          id="streets"
                          select
                          label="streets"
                          helperText="Please select your currency"
                        >
                          {streets.map((street: any) => (
                            <MenuItem
                              key={street._id}
                              value={street.street_name}
                            >
                              {street.street_name}
                            </MenuItem>
                          ))}
                        </TextField>

                        {/* shoppingDate */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          {/* <Stack > */}
                          <DesktopDatePicker
                            label="Date to Deliver"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange2}
                            renderInput={(params) => <TextField {...params} />}
                          />
                          {/* </Stack> */}
                        </LocalizationProvider>
                        <hr />
                        {/* creditCard */}
                        {/* creditName */}
                        <TextField
                          required
                          type="text"
                          label="creditName"
                          id="creditName"
                          onChange={handleChange}
                        />
                        {/* creditNumber */}
                        <TextField
                          required
                          inputProps={{ placeholder: "Card Number" }}
                          type="tel"
                          // label="creditNumber"
                          id="creditNumber"
                          onChange={handleChange}
                        />

                        {/* creditDate */}
                        <TextField
                          required
                          type="Date"
                          label="creditDate"
                          id="creditDate"
                          onChange={handleChange}
                        />
                        {/* creditCvc */}
                        <TextField
                          required
                          type="text"
                          label="creditCvc"
                          id="creditCvc"
                          onChange={handleChange}
                        />
                        <Button onClick={onButtonClick}>Download PDF</Button>
                      </CardContent>
                      {/* submit */}
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginBottom: 2 }}
                      >
                        To Order!
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </FormLabel>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Order;
