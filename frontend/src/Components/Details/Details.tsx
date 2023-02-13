import "./Details.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
function Details(): JSX.Element {
  return (
    <div className="Details">
      <Navbar />
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
              We currently hold 0 products in store
              <br />
              {'"a benevolent smile"'}
            </Typography>
            <hr />
            {/* number of orders */}
            <Typography variant="h5" component="div">
              Orders 💲
            </Typography>
            <Typography variant="body2" sx={{ m: 2 }}>
              We've made 0 orders so far
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default Details;
