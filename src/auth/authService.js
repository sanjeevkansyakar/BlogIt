import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // My API Endpoint
      .setProject(conf.appwriteProjectId); //My project Id

    this.account = new Account(this.client); // Craeting Account
  }

  //  sign up
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        this.logIn(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //   Login
  async logIn({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw new Error(error);
    }
  }

  //   Current User
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser ", error);
    }

    return null;
  }

  //   Logout
  async logOut() {
    try {
      this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout", error);
    }
  }
}

// create instance of Class and export it.
const authService = new AuthService();

export default authService;
