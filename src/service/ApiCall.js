import axios from "axios";
import { BaseUrl } from "./Baseurl";
export const ApiCall = async (method, endPoint, data, params) => {
  var url = BaseUrl + endPoint;
  try {
    const res = await axios({
      method,
      url,
      params,
      data,
    });
    var response = { status: true, message: res.data };
    return response;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message ?? "something went wrong",
    };
  }
};
