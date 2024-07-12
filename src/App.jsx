import { useState } from 'react';
import Header from './Header/header'
import Weather from './Weather/Weather'
import Time from './Time/Time'
import Movie from './Movie/Movie'
import './App.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }


  return (
    <>
      <Header />
      <Movie />
      <Time />
      <Weather />
    </>
  );
}


export default App;
