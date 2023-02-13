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

// products
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Products(): JSX.Element {
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
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=4cc6c561-5975-4bac-904f-c06489ceeb6d"
    )
      .then((res) => res.json())
      .then((res) => {
        const products = res.result.records;
        setProducts(products);
      });
  }, []);

  return (
    <div className="Products">
      {/* navbar */}
      <Navbar />

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
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <Item>
              <Button>
                <img
                  id={product._id}
                  key={product._id}
                  style={{ width: "200px", height: "200px" }}
                  src="https://cdn.pixabay.com/photo/2014/04/02/16/16/juice-306748__480.png"
                  alt=""
                />
                <ImageListItemBar
                  title={product.name4}
                  subtitle={product.name10}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${product.name5}`}
                    >
                      <InfoIcon onClick={(e) => handleClick(e, product, true)} />
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
