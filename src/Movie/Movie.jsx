import React, { useEffect, useState, CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import "./Movie.css";
import all from '../assets/all.png'
import twelve from '../assets/12.png'
import fifteen from '../assets/15.png'
import eighteen from '../assets/18.png'

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
            day = Number(day) - 1;
            day = day < 10 ? "0" + day : day;
            const targetDt = `${year}${month}${day}`;
            const api_key = process.env.REACT_APP_KOBIS_API_KEY
            const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${api_key}&targetDt=${targetDt}`;
            const response = await fetch(url);
            const data = await response.json();
            const BoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
            if (!BoxOfficeList) {
                throw new Error("Invalid API response");
            }
            //poster 정보 불러오기
            const posterMoviesList = await Promise.all(
                BoxOfficeList.map(async (movie) => {
                    const movieInfo = await fetchMoviesInfo(movie.movieCd);
                    const posterURL = await getPoster(movie.movieNm, movie.openDt);
                    return { ...movie, movieInfo, posterURL };
                })
            );
            setMovieList(posterMoviesList);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const fetchMoviesInfo = async (movieCd) => {
        try {
            const api_key = process.env.REACT_APP_KOBIS_API_KEY;
            const url = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${api_key}&movieCd=${movieCd}`
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const getPoster = async (title, openDt) => {
        try {
            const KMDB_API_KEY = process.env.REACT_APP_KOREA_FILM_KEY
            const encodedTitle = encodeURIComponent(title.replace(/!!/g, " "));
            const encodedOpenDt = encodeURIComponent(openDt);
            const url = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&listCount=30&query=${encodedTitle}&releaseDts=${encodedOpenDt}&ServiceKey=${KMDB_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            const poster = data.Data[0].Result[0].posters;
            const posterURLs = poster.split("|");
            return posterURLs[0];
        } catch (error) {
            console.error("error fetching poster", error);
            return "";
        }
    };

    const MovieAdult = (age) => {
        if (age === "전체관람가") {
            return <img className="watch-rank" src={all} alt="전체관람가" />;
        } else if (age === "12세이상관람가") {
            return <img className="watch-rank" src={twelve} alt="12세이상관람가" />;
        } else if (age === "15세이상관람가") {
            return <img className="watch-rank" src={fifteen} alt="15세이상관람가" />;
        } else if (age === "청소년관람불가") {
            return <img className="watch-rank" src={eighteen} alt="청소년관람불가" />;
        }
    }

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
                (movieList?.length === 0 ? (
                    <div style={{ color: "black", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>
                        다음에 다시 이용해주세요. 😭
                    </div>
                ) : (
                    movieList?.map((movie) => (

                        <div className="movie-list" key={movie.movieCd}>
                            <a href={`https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(movie.movieNm)}`} target="_blank">
                                <img src={movie.posterURL} alt={movie.movieNm} />
                            </a>
                            <div className="movie">
                                <p className="rank">{movie.rank}</p>
                                <div className="movie-desc">
                                    <div className="movie-title">
                                        <h2>{movie.movieNm}</h2>
                                        <span className="movie-adults">
                                            {MovieAdult(movie.movieInfo.movieInfoResult.movieInfo.audits[0].watchGradeNm)}
                                        </span>
                                    </div>

                                    <p className="movie-audCnt">
                                        전날 관람객 수: {Number(movie.audiCnt).toLocaleString()} 명
                                    </p>
                                    <p>개봉일: {movie.openDt}</p>
                                    <p className="movie-audAll">
                                        총 관람객 수: {Number(movie.audiAcc).toLocaleString()} 명
                                    </p>
                                    <p className="movie-actors">
                                        {movie.movieInfo.movieInfoResult.movieInfo.actors.slice(0, 3).map(actor => (
                                            <p>{actor.peopleNm}</p>
                                        ))}
                                    </p>
                                    <p className="show-time">
                                        Running Time: {movie.movieInfo.movieInfoResult.movieInfo.showTm}분
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