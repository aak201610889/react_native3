import axios from 'axios';
import {useMutation} from 'react-query';

const postApiData = async (url: string, body = null, headers = {}) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        

        ...headers,
      },
    });

    console.log(response);
    const responseData = response?.data;
    console.log(responseData);

    try {
      return responseData;
    } catch (error) {
      return responseData;
    }
  } catch (error: any) {
    throw new Error(`Failed to post data to API: ${error.message}`);
  }
};

const usePostApi = () => {
  return useMutation((data: any) =>
    postApiData(data.url, data.body, data.headers),
  );
};

export default usePostApi;
