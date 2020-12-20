import { getDataLocal } from "common/function";
import { KEY_STORE, REQUEST_TYPE } from "common/constants";
import axios from "axios";
import QueryString from "query-string";

export default class BaseAPI {
  static async getData(type, queryBody) {
    return this.postGateWay(type, REQUEST_TYPE.GET, undefined, queryBody);
  }

  static async postData(type, body, token) {
    return this.postGateWay(type, REQUEST_TYPE.POST, body, undefined, token);
  }

  static async putData(type, body, token) {
    return this.postGateWay(type, REQUEST_TYPE.PUT, body, undefined, token);
  }

  static async deleteData(type, queryBody) {
    return this.postGateWay(type, REQUEST_TYPE.DELETE, undefined, queryBody);
  }

  static async getDataByMe(type, id) {
    return this.postGateWay(type + `/me/${id}`);
  }

  static async getConfigByType(param) {
    return this.postGateWay(`config/type/${param}`);
  }

  static async getConfigByTypeMultiple(body) {
    return this.postGateWay("config/typeMulti", REQUEST_TYPE.POST, {
      setting: body,
    });
  }

  static async postGateWay(
    action,
    method = REQUEST_TYPE.GET,
    body,
    queryBody,
    tokenUser
  ) {
    try {
      let serverUrl = "http://13.212.8.105:3031/api/";
      const token = tokenUser || getDataLocal(KEY_STORE.JWT_TOKEN);
      const config = {
        headers: {
          os: "website",
          Authorization: "Bearer " + token,
        },
      };

      let axiosInstance = axios.create(config);
      let queryStr = "";
      if (queryBody) {
        const queryFly = QueryString.stringify(queryBody);
        queryStr = "?" + queryFly;
      }

      const response = await axiosInstance[method](
        serverUrl + action + queryStr,
        body,
        config
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      if (tokenUser) {
        return error.message === "Request failed with status code 401"
          ? "authenFailed"
          : null;
      } else {
        return null;
      }
    }
  }
}
