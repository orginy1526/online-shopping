import "./About.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Alert, Box, CardActionArea, Grid } from "@mui/material";
import Navbar from "../Navbar/Navbar";

function About(): JSX.Element {
  return (
    <div className="About">
      <Navbar />
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
        <Alert sx={{ m: 3 }} severity="success">
          Welcome Aboard! 😄
        </Alert>
        <Alert severity="info">check You're last reservation 👀</Alert>
        <Alert sx={{ m: 3 }} severity="warning">You have an open cart 🙀</Alert>

      </Grid>
    </div>
  );
}

export default About;
