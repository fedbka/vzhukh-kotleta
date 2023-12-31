import { Route, Routes, useLocation } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../../pages/ConstructorPage/ConstructorPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import FeedPage from "../../pages/FeedPage/FeedPage";

const App = () => {
  const location = useLocation();
  return (
    <div>
      <AppHeader />
      <Routes location={location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<FeedPage/>}/>
        <Route path='/profile' element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
