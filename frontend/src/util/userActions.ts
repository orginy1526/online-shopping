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

  //   public async getOneUser(userId: number): Promise<User> {
  //     const response = await axios.get<User[]>(
  //       "http://localhost:3001/api/user/" + userId
  //     );
  //     return response.data[0];
  //   }
}

const userActions = new UserActions();
export default userActions;
