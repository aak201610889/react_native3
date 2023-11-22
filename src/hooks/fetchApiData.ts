import {useQuery} from 'react-query';
  import axios from 'axios';
const fetchApiData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from API');
  }
};

const useApi = (url: string) => {
  return useQuery('apiData', () => fetchApiData(url)); // Pass a function that returns the 
};

export default useApi;
