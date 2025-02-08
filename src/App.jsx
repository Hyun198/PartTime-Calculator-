import Header from './Header/header'
import Time from './Time/Time'
import Movie from './Movie/Movie'
import './App.css';
import Bus from './Bus/Bus';
import { Routes, Route } from 'react-router-dom';
function App() {



  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Time />} />
        <Route path="/boxoffice" element={<Movie />} />
        <Route path="/bus" element={<Bus />} />
      </Routes>
    </>
  );
}


export default App;
