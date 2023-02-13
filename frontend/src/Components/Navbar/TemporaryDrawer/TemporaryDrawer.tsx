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

export interface Props {
  text: string;
}
type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer(props: Props) {
  console.log(props.text);
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
