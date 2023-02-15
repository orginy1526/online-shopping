import axios from "axios";
import User from "../model/User";

// turn object to array
const objToArr = (obj: object) => {
  return Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));
};

class UserActions {
  public async addUser(user: User): Promise<any> {
    const response = await axios.post<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/user/addUser",
      user
    );
    return response.data.user;
  }
  public async getUsers(): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/user/getUsers"
    );
    return objToArr(response.data)[0].users;
  }
  public async getProducts(): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/product/getProducts"
    );
    return objToArr(response.data)[0].products;
  }

  public async getShoppingCartStatus(userId: string): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/shoppingCart/getShoppingCartStatus/" +
        userId
    );
    return objToArr(response.data)[0].shoppingCart_status;
  }

  public async getUser(userId: string): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/user/getUser/" +
        userId
    );
    return objToArr(response.data)[0].user;
  }
  public async getNumOfOrders(): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/order/getNumOfOrders"
    );
    return response.data.orders_number;
  }
  public async getNumOfProducts(): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/product/getNumOfProducts"
    );
    return response.data.products_number;
  }

  public async getProductByName(name: string): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/product/getProductByName/" +
        name
    );
    return objToArr(response.data)[0].product;
  }

  public async getProductByCategory(category: string | String): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/product/getProductByCategory/" +
        category
    );
    return objToArr(response.data)[0].products;
  }
  public async getShoppingCart(userId: string): Promise<any> {
    const response = await axios.get<any>(
      "https://trlnmyjbc2.execute-api.us-east-1.amazonaws.com/dev/shoppingCart/getShoppingCart/" +
        userId
    );
    return objToArr(response.data)[0].shoppingCart;
  }
  public async getShoppingCartProducts(shoppingCart: any): Promise<any> {
    return objToArr(shoppingCart.products);
  }
}

const userActions = new UserActions();
export default userActions;
