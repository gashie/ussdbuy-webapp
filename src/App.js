import React,{useEffect} from "react";
 import {  useDispatch } from "react-redux";

//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';
import { getMe } from "./store/auth/login/actions";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch]);
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
