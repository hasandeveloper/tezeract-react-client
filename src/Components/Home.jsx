import React from 'react';
import {useNavigate} from "react-router-dom"; 
import Create from './tickets/Create';
import List from './tickets/List';
import { CreateContextProvider } from './context/CreateContext';


const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <CreateContextProvider>
      <Create/>
      <List/>
    </CreateContextProvider>
    </>
  )
}

export default Home;