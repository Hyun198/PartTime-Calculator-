import { useQuery } from '@tanstack/react-query';
import kobis from "../utils/kobis";

const API_KOBIS_KEY = process.env.REACT_APP_KOBIS_API_KEY;

const fetchMovieInfo = async ({ queryKey }) => {
    const [, targetDt] = queryKey;
    const response = await kobis.get(`searchDailyBoxOfficeList.json?key=${API_KOBIS_KEY}&targetDt=${targetDt}`);
    return response.data;
};

export const useMovieInfoQuery = ({ targetDt }) => {
    return useQuery({
        queryKey: ['movie-info', targetDt],
        queryFn: fetchMovieInfo,
        select: (result) => result.boxOfficeResult.dailyBoxOfficeList,
    });
};
