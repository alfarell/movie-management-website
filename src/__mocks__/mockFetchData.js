import Axios from 'axios';

const mockFetchData = async (mockData) => {
    await Axios.get.mockResolvedValueOnce({
        data: mockData,
    });
}

const mockFetchAllData = async (mockAllData) => {
    await Axios.all.mockResolvedValueOnce(mockAllData);
}

export { mockFetchData, mockFetchAllData };