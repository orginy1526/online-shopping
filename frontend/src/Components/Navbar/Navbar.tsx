import "./Navbar.css";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Await, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

// menu
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// second drawer

// drawer
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Grid } from "@mui/material";
import userActions from "../../util/userActions";
import Product from "../../model/Product";

// transfer products
import { DataContext } from "../../util/DataContext";
import Products from "../Products/Products";
import TemporaryDrawer from "./TemporaryDrawer/TemporaryDrawer";

type Anchor = "top" | "left" | "bottom" | "right";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

// collapse
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  onChildData?: (data: any) => void;
  user?: any;
}

const drawerWidth = 240;
const navItems = ["About", "Details", "Products", "Logout"];

// navbar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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

function Navbar(props: Props): JSX.Element {
  // get products by category
  const getProductsByCategory = async (category: string | String) => {
    console.log(category);
    await userActions
      .getProductByCategory(category)
      .then((res) => props.onChildData && props.onChildData(res));
  };
  // search product
  const [name, setName] = useState("");
  const getProductByName = (e: any) => {
    setName(e.target.value);
  };

  const [products, setProducts] = useState([]);

  const onSearch = async (name: string) => {
    await userActions
      .getProductByName(`${name}`)
      .then((res) => props.onChildData && props.onChildData(res));
    console.log(products);
  };
  // drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["product1", "product2", "product3", "product4"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
              <ListItemIcon>
                <AttachMoneyIcon />
                <DeleteOutlineIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
        <Box textAlign="center" sx={{ m: 1 }}>
          <Button variant="outlined">
            Delete All &nbsp;
            <DeleteForeverIcon />{" "}
          </Button>
        </Box>
        <Box textAlign="center" sx={{ m: 2 }}>
          <Button
            onClick={() => navigate("/order")}
            variant="contained"
            sx={{ p: 2 }}
          >
            <b> Order now !</b> &nbsp;
            <DoneOutlineIcon />{" "}
          </Button>
        </Box>
      </List>
      <Divider />
    </Box>
  );

  // menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // products
  const categories = [
    "fruit",
    "Vegetables",
    "Vegan",
    "Snacks",
    "Meat",
    "Dairy",
  ];
  // const [products, setProducts] = useState<object[]>([]);

  // get shopping cart
  const [shoppingCart, setShoppingCart] = useState<any>();

  // const getShoppingCartProducts = async () => {
  //   await userActions.getShoppingCartProducts(shoppingCart).then(console.log);
  // };
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(props.user);
    console.log(props.user);
    // userId
    // old api products
    fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=4cc6c561-5975-4bac-904f-c06489ceeb6d"
    ).then((res) => res.json());
  }, [user]);

  // collapse
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <DrawerHeader>
        <Typography variant="h6" sx={{ my: 2 }}>
          Giny's SuperMarket
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {/*category menu */}
        <Button
          sx={{ mb: 2 }}
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          // aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Food Categories
        </Button>
        {/* cart */}
        {/* drawer */}
        <TemporaryDrawer text="cart" userId={user} />
        <Button
          sx={{ display: "block" }}
          onClick={() => navigate("/about" , { state: { user: user } })}
        >
          About{" "}
        </Button>
        <Button
          sx={{ display: "block" }}
          onClick={() => navigate("/details", { state: { user: user } })}
        >
          Details{" "}
        </Button>
        <Button
          sx={{ display: "block" }}
          onClick={() => navigate("/products", { state: { user: user } })}
        >
          Products{" "}
        </Button>

        {/* logout */}
        <Button sx={{ display: "block" }} onClick={() => navigate("/")}>
          Logout&nbsp; <LogoutIcon />
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {categories.map((item: String) => (
            <MenuItem
              // key={item}
              onClick={() => {
                handleClose();
                handleDrawerToggle();
                getProductsByCategory(item);
              }}
              disableRipple
            >
              <EditIcon />
              {item}
            </MenuItem>
          ))}
        </StyledMenu>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // navigate
  const navigate = useNavigate();
  return (
    <div className="Navbar">
      {/* collapse */}
      <Box sx={{ display: "flex", margin: -3 }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
              onClick={() => navigate("/about", { state: { user: user } })}
            >
              Giny's SuperMarket
            </Typography>
            {/* regular navbar */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {/*category menu */}
              <Button
                sx={{ mb: 2 }}
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Food Categories
              </Button>
              <Button sx={{ color: "#fff" }}>
                <TemporaryDrawer text="cart" userId={user} />
              </Button>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate("/about", { state: { user: user } })}
              >
                About{" "}
              </Button>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate("/details", { state: { user: user } })}
              >
                Details{" "}
              </Button>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate("/products", { state: { user: user } })}
              >
                Products{" "}
              </Button>
              <Button sx={{ color: "#fff" }} onClick={() => navigate("/")}>
                Logout&nbsp; <LogoutIcon />
              </Button>
              {/* cart */}
              {/* drawer */}
            </Box>
            <Search onChange={getProductByName}>
              <Button
                sx={{
                  color: "#fff",
                  padding: "theme.spacing(0, 2)",
                  height: "100%",
                }}
                onClick={() => onSearch(name)}
              >
                <SearchIcon />
              </Button>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Typography></Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Navbar;
