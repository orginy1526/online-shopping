import "./About.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Button, CardActionArea, Grid } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import userActions from "../../util/userActions";
// import cartDrawer from "../Navbar/cartDrawer/cartDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TemporaryDrawer from "../Navbar/TemporaryDrawer/TemporaryDrawer";

function About(): JSX.Element {
  const [text, setText] = useState("");
  const [shoppingCartStatus, setShoppingCartStatus] = useState("");
  const location = useLocation();
  const user = location.state.user;

  useEffect(() => {
    console.log(user);

    userActions.getShoppingCartStatus(user.id).then((res) => {
      setShoppingCartStatus(res);
      switch (shoppingCartStatus) {
        case "open":
          setText("continue shopping");
          break;
        case "close":
          setText("new shopping");
          break;
        case "new":
          setText("first shopping");
          break;
      }
    });
  }, [shoppingCartStatus, user]);

  // cart button text
  return (
    <div className="About">
      <Navbar user={user} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", textAlign: "center" }}
      >
        <img
          style={{ height: "100px" }}
          src="https://cdn.pixabay.com/photo/2018/01/14/23/05/ecommerce-3082813__480.jpg"
          alt="A men shop from the mobile"
        />
        <Card sx={{ maxWidth: 345, mt: 3 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Giny's Shopping SuperMarket
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Giny's Shopping SuperMarket is Israel's 1st English online
                supermarket grocery shopping and delivery service. MINIMUM
                ORDER: NIS 500.00 BEFORE DELIVERY CHARGES. General delivery
                times within 24 to 48 hours.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        {shoppingCartStatus === "open" && (
          <>
            <Alert sx={{ m: 3 }} severity="warning">
              You have an open cart 🙀
            </Alert>
          </>
        )}
        {shoppingCartStatus === "close" && (
          <Alert severity="info">check You're last reservation 👀</Alert>
        )}
        {shoppingCartStatus === "new" && (
          <Alert sx={{ m: 3 }} severity="success">
            Welcome Aboard! 😄
          </Alert>
        )}
        <TemporaryDrawer text={text} userId={user} />
      </Grid>
    </div>
  );
}

export default About;
