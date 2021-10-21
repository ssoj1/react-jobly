import axios from "axios";

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

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on an individual user by username*/

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }


  /** Get all companies, accepts search filters as a string */

  static async getCompanies(searchFilters) { 
    console.log("searchFilters in companies is ", searchFilters);

    let searchData = {};
    if ( searchFilters !== "" ) {
      searchData = { name: searchFilters };
    };

    const res = await this.request(`companies`, searchData);
    return res.companies;
  }

  /** Get all jobs, accepts search filters as a string */

  static async getJobs(searchFilters) {
    console.log("searchFilters in jobs is ", searchFilters);

    let searchData = {};
    if ( searchFilters !== "" ) {
      searchData = { title: searchFilters }; 
    };

    const res = await this.request(`jobs`, searchData);
    return res.jobs;
  }

  /** Accepts username and password as strings, returns token or error message */

  static async checkUserCredentials(username, password){
    const credentials = {
      username, 
      password
    }; 

    try {
      const res = await this.request('/auth/token', credentials, 'post');
      return res;
    } 
    catch(err) {
      return err.message;
    }; 
  }

  static async updateUser(userData) {
    try {
      const res = await this.request(`/users/${userData.username}}`, 
                                    userData, 'patch');
      return res;
    } 
    catch(err) {
      return err.message;
    }; 

  }

}

export default JoblyApi;