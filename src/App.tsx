import React from 'react';
import './App.scss';
// import MainPage from "./pages/main/main";
import MiniDrawer from './components/drawer/drawer';
import UploadMerchandisePage from './pages/upload-merchandise/upload-merchandise';

const App: React.FC = () => {
  return (
    <>
      <MiniDrawer>
        <UploadMerchandisePage></UploadMerchandisePage>
      </MiniDrawer>
    </>
  );
};

export default App;
