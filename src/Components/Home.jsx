import React from 'react';
import {useNavigate} from "react-router-dom"; 
import Create from './tickets/Create';
import List from './tickets/List';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='container my-3'>
         <button type="button" className='btn btn-primary'  onClick={()=>navigate("/tickets/create")}>Create Ticket</button>
      </div>

      <List/>
    </>
  )
}

export default Home;