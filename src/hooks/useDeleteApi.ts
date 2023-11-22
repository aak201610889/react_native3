import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

const deleteApiData = async (url: string, id: number) => {
  try {
    // Assuming the id is part of the URL or you can adjust accordingly
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete data from API');
  }
};

const useDeleteApi = (url: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((id: number) => deleteApiData(url, id), {
    onSuccess: () => {
      // Invalidate and refetch the data after a successful delete
      queryClient.invalidateQueries('apiData');
    },
  });

  return mutation;
};

export default useDeleteApi;
