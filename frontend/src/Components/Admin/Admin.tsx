import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Drawer, Grid, styled, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

// logoutIcon
import LogoutIcon from "@mui/icons-material/Logout";
import FormDialog from "./FormDialog";
import { useNavigate } from "react-router-dom";
// componentAttribute
import PersistentDrawerLeft from "./PersistentDrawerLeft";
// edit dialog
import FormDialogCopy from "./FormDialog copy";
// info icon
import InfoIcon from "@mui/icons-material/Info";
import adminActions from "../../util/adminActions";

// products
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Admin(): JSX.Element {
  const navigate = useNavigate();
  // show component
  const [isShown, setIsShown] = useState(false);

  const handleClick = (product: any) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
    console.log(product);
    setProduct(product);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };
  // products
  const categories = [
    "Fruit",
    "Vegetables",
    "Vegan",
    "Snacks",
    "Meat",
    "Dairy",
  ];
  const [products, setProducts] = useState<object[]>([]);
  const [product, setProduct] = useState<object>({});

  useEffect(() => {
    adminActions.getProducts().then((res) => setProducts(res));
  }, []);
  return (
    <div className="Admin">
      {/* navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button color="inherit">
                <FormDialog />
              </Button>
            </Typography>
            <Button color="inherit" onClick={() => navigate("/")}>
              Logout &nbsp;
              <LogoutIcon />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* 👇️ show component on click */}
      {isShown && <PersistentDrawerLeft e={product} />}
      {/* products list */}
      <Grid
        marginTop={0.5}
        spacing={2}
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {products.map((product: any) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Item>
              <Button>
                <img
                  id={product.id}
                  key={product.id}
                  style={{ width: "200px", height: "200px" }}
                  src={product.image}
                  alt={"image of " + product.product_name}
                />
                <ImageListItemBar
                  title={product.product_name}
                  subtitle={product.price + "💲"}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${product.product_name}`}
                    >
                      <FormDialogCopy e={product} />
                      <InfoIcon onClick={() => handleClick(product)} />
                    </IconButton>
                  }
                />
              </Button>
            </Item>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Admin;
