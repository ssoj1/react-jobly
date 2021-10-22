import axios from "axios";
import jwt from "jsonwebtoken";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    /** bluerprint for making request 
     * accepts endpoint for request, data, method(default to get)
     * returns response wrapped in try/catch
    */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    console.log({ url, data, params, headers, method })
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. 
   * accepts company handle
   * returns object of company data 
   * throws error if not successful
  */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies, accepts search filters as a string 
   * returns array of comapny objects: [{company},{company}]
   * throws error if not successful
  */

  static async getCompanies(searchFilters) {
    console.log("searchFilters in companies is ", searchFilters);

    let searchData = {};
    if (searchFilters !== "") {
      searchData = { name: searchFilters };
    };

    const res = await this.request(`companies`, searchData);
    return res.companies;
  }

  /** Get all jobs, accepts search filters as a string 
   * returns data on jobs array of obj: [{job},{job}]]
   * throws error if not successful
  */

  static async getJobs(searchFilters) {
    console.log("searchFilters in jobs is ", searchFilters);

    let searchData = {};
    if (searchFilters !== "") {
      searchData = { title: searchFilters };
    };

    const res = await this.request(`jobs`, searchData);
    return res.jobs;
  }

  /** Accepts username and password as strings, 
   * returns token or error message 
   * throws error if not successful
   * */

  static async checkUserCredentials(username, password) {
    const credentials = {
      username,
      password
    };
    console.log({credentials})
    const res = await this.request('auth/token', credentials, 'post');
    console.log("res in check user credentials", res);
    return res.token;
  }

  /** Updates user in DB based on input user data, 
   * accepts obj of user data (comes directly from form submission)
   * returns response of user data {user: { username, firstName, lastName, email, isAdmin }}
   * throws error if not successful
   * */

  static async updateUser(userData) {

    const userDataForUpdate = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    }

    const res = await this.request(`users/${userData.username}`,
      userDataForUpdate, 'patch');
    console.log("in updateUser res is ", res)

    return res;
  }

  /** Accepts token string and returns user data based on that token
   * accepts token
   * returns user data like: { username, firstName, lastName, email, isAdmin }
   * returns null if token payload is null (on initial render)
   * throws error if not successful
   * */
  static async getUserByToken(token) {
    console.log("token in get user by token", token)
    const payload = jwt.decode(token);
    console.log("payload in getuserbytoken", payload)

    if (payload === null) {
      return null;
    } else {
      const res = await this.request(`users/${payload.username}`);
      return res.user;
    };
  }

  /** Registers user into database
   * accepts userdata {username, password}
   * returns token string on successful registration
   * throws error if not successful
   * */
  static async registerUser(userData) {
    console.log("userData ", userData)

    const res = await this.request(`auth/register`, userData, 'post');
    return res.token;

  }
}

export default JoblyApi;