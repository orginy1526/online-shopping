import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import adminActions from "../../util/adminActions";

// editIcon
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import Product from "../../model/Product";

export default function FormDialog(e: any) {
  const product = e.e;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // use effect
  React.useEffect(() => {}, []);

  // setValue
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: product.id,
      user_id: product.user_id,
      product_name: product.product_name,
      price: product.price,
      category: product.category,
      image: product.image,
    },
  });

  const onChange = async (event: any) => {
    console.log(event.target.value);
    console.log(product);

    // setProduct({ ...product, first_name: event.target.value });
  };

  const onSubmit = async (data: any) => {
    data.price = Number(data.price);
    console.log(data);
    adminActions.updateProduct(data.id, data).then(() => {
      window.location.reload();
    });
    handleClose();
  };
  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="name"
            type="text"
            fullWidth
            {...register("product_name")}
            onChange={onChange}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="normal"
            id="price"
            label="price"
            type="number"
            {...register("price")}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="normal"
            id="category"
            label="category"
            type="text"
            fullWidth
            {...register("category")}
            variant="standard"
          />
          <Typography sx={{ margin: 2 }}>
            <img
              src={product.image}
              alt={"image of " + product.product_name}
              style={{ width: "200px", height: "200px" }}
            />
          </Typography>
          <Button sx={{ margin: 2 }} variant="contained" component="label">
            Replace Image
            <input type="file" hidden {...register("image")} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
