import React, { useEffect, useState, CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "./Movie.css";
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Movie() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#1277B8");
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const today = new Date();
            //날짜는 전날로 설정

            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            let targetDt = `${year}${month}${day - 1}`;


            const api_key = process.env.REACT_APP_KOBIS_API_KEY
            const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${api_key}&targetDt=${targetDt}`;
            const response = await fetch(url);
            const data = await response.json();
            const BoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            if (!BoxOfficeList) {
                throw new Error("Invalid API resposne");
            }
            const posterMoviesList = await Promise.all(
                BoxOfficeList.map(async (movie) => {
                    const posterURL = await getPoster(movie.movieNm, movie.openDt);
                    return { ...movie, posterURL };
                })
            );
            console.log(posterMoviesList);
            setMovieList(posterMoviesList);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const formatNumber = (number) => {
        if (number >= 10000000) {
            return Math.round(number / 10000000) + "천만";
        } else if (number >= 100000) {
            return Math.round(number / 100000) + "만";
        } else if (number >= 10000 && number < 100000) {
            return Math.round(number / 10000) + "만";
        }

        return number;
    };

    const getPoster = async (title, openDt) => {
        try {
            const KMDB_API_KEY = process.env.REACT_APP_KOREA_FILM_KEY
            const encodedTitle = encodeURIComponent(title.replace(/!!/g, " "));
            const encodedOpenDt = encodeURIComponent(openDt);
            const url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&listCount=30&query=${encodedTitle}&releaseDts=${encodedOpenDt}&ServiceKey=${KMDB_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            /* console.log(data); */
            const poster = data.Data[0].Result[0].posters;
            const posterURLs = poster.split("|");
            return posterURLs[0];
        } catch (error) {
            console.error("error fetching poster", error);
            return "";
        }
    };

    return (
        <div className="movies-board">
            {loading && (
                <MoonLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )}

            {!loading &&
                (movieList.length === 0 ? (
                    <div style={{ color: "black", fontSize: "20px" }}>
                        영화 목록 불러오는 중...
                    </div>
                ) : (
                    movieList.map((movie) => (
                        <div className="movie-list" key={movie.movieCd}>
                            <div className="movie">
                                <img src={movie.posterURL} alt={movie.movieNm} />
                                <p className="rank">{movie.rank}</p>
                                <div className="movie-desc">
                                    <div className="movie-title">{movie.movieNm}</div>
                                    <p className="movie-audCnt">
                                        today: {formatNumber(movie.audiCnt)} 명
                                    </p>
                                    <p className="movie-audAll">
                                        {formatNumber(movie.audiAcc)} 명
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
        </div>
    );
}

export default Movie;