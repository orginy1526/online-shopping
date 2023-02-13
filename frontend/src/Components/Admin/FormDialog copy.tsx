import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

// editIcon
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import Product from "../../model/Product";

export default function FormDialog(e: any) {
  const [product, setProduct] = React.useState(e.e);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // React.useEffect(() => {
  // }, [e, product]);

  // setValue
  const { register, handleSubmit, setValue } = useForm();

  const onChange = async (event: any) => {
    // console.log(data);
    console.log(event.target.value);

    setProduct({ ...product, first_name: event.target.value });

    // const product = new Product();
    // product.category = data.category;
    // product.price = Number(data.price);
    // product.product_name = data.product_name;
    // product.image = data.image[0].name;
    // await adminActions.adsdProduct(product).then(console.log);
    // handleClose();
  };

  const onSubmit = async (data: any) => {
    console.log(data);
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
            value={product.product_name}
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
