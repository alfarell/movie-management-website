import Axios from 'axios';

const mockFetchData = async (mockData) => {
    await Axios.get.mockResolvedValueOnce({
        data: mockData,
    });
}

export default mockFetchData;