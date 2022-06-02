import { FC } from 'react';
import './App.scss';
import Footer from './components/layout/Footer/Footer';
import NavBar from './components/layout/Header/NavBar';
import MainPage from './views/MainPage/MainPage';

const App: FC = () => {
  return (
    <div className="App">
      <NavBar/>
      <MainPage/>
      <Footer/>
    </div>
  );
}

export default App;
