import "./Details.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import React from "react";
import userActions from "../../util/userActions";
import { useLocation } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
function Details(): JSX.Element {
  const location = useLocation();
  const user = location.state.user;

  const [numOfOrders, setNumOfOrders] = React.useState("");
  const [numOfProducts, setNumOfProducts] = React.useState("");
  React.useEffect(() => {
    console.log(user);
    userActions.getNumOfOrders().then((res) => setNumOfOrders(res));
    userActions.getNumOfProducts().then((res) => setNumOfProducts(res));
  }, [user]);
  return (
    <div className="Details">
      <Navbar user={user}/>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        style={{ minHeight: "100vh", marginTop: 10 }}
      >
        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            {/* number of products */}
            <Typography variant="h5" component="div">
              Products 🗳️
            </Typography>
            <Typography variant="body2" sx={{ m: 2 }}>
              We currently hold {numOfProducts} products in store
              <br />
            </Typography>
            <hr />
            {/* number of orders */}
            <Typography variant="h5" component="div">
              Orders 💲
            </Typography>
            <Typography variant="body2" sx={{ m: 2 }}>
              We've made {numOfOrders} orders so far
              <br />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Details;
