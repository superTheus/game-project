import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Base from './views/Base';

import Home from './views/Home';
import Game from './views/Game';
import Rules from './views/Rules';
import Ranking from './views/Ranking';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={Base(Home)} />
        <Route path='/game' element={Base(Game)} />
        <Route path='/rules' element={Base(Rules)} />
        <Route path='/Ranking' element={Base(Ranking)} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;