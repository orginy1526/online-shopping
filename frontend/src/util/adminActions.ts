import axios from "axios";
import Product from "../model/Product";

// turn object to array
const objToArr = (obj: object) => {
  return Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));
};

class AdminActions {
  public async addProduct(product: Product): Promise<any> {
    const res = await axios.post<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/product/addProduct",
      product
    );
    return res.data.product;
  }
  public async getProducts(): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/product/getProducts"
    );
    return objToArr(response.data)[0].products;
  }
  public async updateProduct(
    productId: string,
    product: Product
  ): Promise<any> {
    const res = await axios.put<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/product/updateProduct/" +
        productId,
      product
    );
    // return res.data.product;
    return res.data.updated_product;
  }
}

const adminActions = new AdminActions();
export default adminActions;
