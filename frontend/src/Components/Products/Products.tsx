import "./Products.css";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Grid, styled } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Paper from "@mui/material/Paper";
import CustomizedDialogs from "./CustomizedDialogs";
import userActions from "../../util/userActions";
// transfer products
import { DataContext } from "../../util/DataContext";
import React, { useContext, useRef } from "react";

// products
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Products(): JSX.Element {
  // transfer data
  const myData = useRef("");
  const handleChildData = (data: any) => {
    myData.current = data;
    setProducts(data);
    console.log(products);
  };

  // show component
  const [isShown, setIsShown] = useState(false);
  const [product, setProduct] = useState<object>({});
  let [bool, setBool] = useState(false);

  const handleClick = (e: any, product: any, bool: boolean) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
    setProduct(product);
    setBool(bool);
    console.log(bool);
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

  useEffect(() => {
    userActions
      .getProducts()
      .then((products) => {
        setProducts(products);
      })
      .then(console.log);
  }, []);

  return (
    <div className="Products">
      {/* navbar */}
      <Navbar onChildData={handleChildData} />

      {/* dialog  */}
      {isShown && <CustomizedDialogs product={product} bool={bool} />}

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
                  alt=""
                />
                <ImageListItemBar
                  title={product.product_name}
                  subtitle={product.category}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${product.price}`}
                    >
                      <InfoIcon
                        onClick={(e) => handleClick(e, product, true)}
                      />
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

export default Products;
