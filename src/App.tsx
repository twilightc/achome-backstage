import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
// import MainPage from "./pages/main/main";
import MiniDrawer from './components/drawer/drawer';
import UploadMerchandisePage from './pages/upload-merchandise/upload-merchandise';

import MerchandiseList from './components/merchandise-list/merchandise-list';

const App: React.FC = () => {
  return (
    <>
      <MiniDrawer>
        <Route path="/merchandise-list" component={MerchandiseList} />
        <Route path="/add-merchandise" component={UploadMerchandisePage} />
      </MiniDrawer>
    </>
  );
};

export default App;
