import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// addIcon
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import Product from "../../model/Product";
import adminActions from "../../util/adminActions";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const { register, handleSubmit, setValue } = useForm();

  const handleClose = () => {
    console.log(register);
    setOpen(false);
  };

  // setValue

  const onSubmit = async (data: any) => {
    const product = new Product();
    product.category = data.category;
    product.price = Number(data.price);
    product.product_name = data.product_name;
    product.image = data.image[0].name;
    await adminActions.addProduct(product).then(console.log);
    handleClose();
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        <AddIcon />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            {...register("product_name")}
            label="name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="normal"
            {...register("price")}
            id="price"
            label="price"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="normal"
            {...register("category")}
            id="category"
            label="category"
            type="text"
            fullWidth
            variant="standard"
          />
          <Button sx={{ margin: 1 }} variant="contained" component="label">
            Upload Image
            <input type="file" hidden {...register("image")} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            // type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
