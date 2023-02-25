import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
// list

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
// add icon
import AddIcon from "@mui/icons-material/Add";
import userActions from "../../util/userActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  user?: any;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

// turn object to array
const objToArr = (obj: object) => {
  return Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));
};

export default function CustomizedDialogs({ product, bool, user }: any) {
  const [open, setOpen] = React.useState(true);
  // addProduct
  let arr: any = [];
  let shoppingCart = {};
  const addProduct = async (product: any) => {
    await userActions.getShoppingCart(user.id).then((res) => {
      let arr: any = [];

      if (Object.keys(res.products).length === 0) {
        console.log("empty");
        console.log(product);
        arr.push(product);
        res.products = { arr };
        let newArr = res.products.arr;
        newArr.map((e: any) => {
          e.qty = 1;
        });
        console.log("res", res);
      } else {
        console.log("full");
        let newArr = res.products.arr;
        let counter = 0;
        newArr.map((e: any, i: number) => {
          // console.log(i);
          if (e.id === product.id) {
            console.log("increase qty");
            counter = 1;
            ++e.qty;
          }
        });
        if (counter === 0) {
          res.products.arr.push(product);
          console.log(counter);
        }
        // counter = 0;
        // console.log(counter);
        // counter > 1 && console.log('yeshhh')
      }
      shoppingCart = res;
    });
    await userActions.updatedShoppingCart(shoppingCart).then((res) => {
      const newArr = res.products.arr;
      console.log(newArr);
      newArr.map((e: any) => {
        if (e.id === product.id) {
          product.qty = e.qty;
        }
      });
    });
    console.log("product", product);
  };

  React.useEffect(() => {
    console.log(product);
  }, [product]);

  const handleClickOpen = () => {
    setOpen(open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      {bool && handleClickOpen}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {product.product_name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <b>category: </b> {product.category}
            </ListItem>
            <ListItem>
              <b>price: </b> {product.price}
            </ListItem>
            <ListItem>
              <b>qty: </b> {product.qty}
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              addProduct(product);
            }}
          >
            <AddIcon />
          </Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
