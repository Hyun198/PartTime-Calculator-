import Header from './Header/header'
import Time from './Time/Time'
import Movie from './Movie/Movie'
import Weather from './Weather/Weather'
import './App.css';
import Bus from './Bus/Bus';

//버스노선 api 


function App() {

  return (
    <>
      <Header />
      <Movie />
      <Time />

      <Bus />

    </>
  );
}


export default App;
