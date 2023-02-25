import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

import { Grid, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userActions from "../../../util/userActions";

export interface Props {
  text?: string;
  userId?: any;
}
type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer(props: Props) {
  const [products, setProducts] = React.useState({});

  // turn object to array
  const objToArr = (obj: object) => {
    return Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));
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
  const [productName, setProductName] = React.useState([]);
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      // console.log("to");
      // console.log(props.userId.id);

      userActions.getShoppingCartProducts(props.userId.id).then((res) => {
        let arr: any = [];
        res.map((e: any) => {
          arr.push({ name: e.product_name, price: e.price, id: e.id });
        });
        setProductName(arr);
        console.log(arr);
      });
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const handleClick = async (id: any) => {
    console.log(id);
    await userActions.getProduct(id).then(console.log);
    let newCart: any;
    await userActions.getShoppingCart(props.userId.id).then((res) => {
      // newCart(res)
      const oldCart = res.products.arr;
      // console.log(res.products.arr)
      oldCart.map((e: any) => {
        console.log(e);
        if (e.id === id) {
          const i = oldCart.indexOf(e);
          oldCart.splice(i, 1);
          res.products.arr=oldCart
        }

      });
      console.log(res);
      userActions.updatedShoppingCart(res).then(console.log);
    });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {productName.map((item: any) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              <ListItemIcon>
                {item.price}
                <AttachMoneyIcon />
                <DeleteOutlineIcon onClick={() => handleClick(item.id)} />
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

  // navigate
  const navigate = useNavigate();

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="contained" onClick={toggleDrawer(anchor, true)}>
            <ShoppingCartIcon /> {props.text}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
