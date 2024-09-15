import { error } from "console";

export default {
  getData: async (url: string, data: any) => {
    let options: any = {
      method: "GET",
    };

    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers = {
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }
    try {
      const response = await fetch(process.env.BASEURL + url, options);
      if (!response) {
        console.log("No response");
      }
      return await response.json();
    } catch (err) {
      throw new Error("unable to get data");
    }
  },

  postData: async (url: string, data: any) => {
    let options: any = {
      method: "POST",
    };

    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.headers = {
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(data);
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + url,
        options
      );
      if (!response) {
        throw new Error("Network response not ok");
      }
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  },
};
