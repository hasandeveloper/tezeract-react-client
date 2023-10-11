import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CHANNEL_BASE_URL, TICKET_BASE_URL, CUSTOMERS_URI, ORDERS_URI, TICKET_FIELD_URI } from '../../Utils/apiURL';


const  Create = () => {
  const [customerData, setCustomerData] = useState([]);
  const [orderData, setOrderData] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
        axios.get(`${CHANNEL_BASE_URL}${CUSTOMERS_URI}`).then(response => {
          if(response.status === 200){
            setCustomerData(response.data);
          }
        }).catch((e) =>{alert(e)})
  },[]);

  const fetchOrders = (e) => {
    axios.get(`${CHANNEL_BASE_URL}/${CUSTOMERS_URI}/${e.target.value}${ORDERS_URI}`).then(response => {
      if(response.status === 200){
        setOrderData(response.data);
      }
    }).catch((e) =>{alert(e)})

    setIsVisible(true)
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    
    
    try{

      const ticketFieldBody = await
      axios.get(`${TICKET_BASE_URL}/${TICKET_FIELD_URI}`)
      debugger;
      // axios.put(`${TICKET_BASE_URL}/${TICKET_FIELD_URI}`, {
      //   "ticket_field": {
      //     "custom_field_options": [
      //       {"name": "Apple Pie", "value": "apple"},
      //       {"name": "Pecan Pie", "value": "pecan"}
      //     ]
      
      // }})
    }catch(error){
      alert(error)
    }
  }

  return (
    <div className='container my-4'>
      <h1>Create Ticket</h1>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" className="form-control" id="subject"/>
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment</label>
          <input type="text" className="form-control" id="comment"/>
        </div>

        <div className="mb-3">
        <label htmlFor="priority" className="form-label">Priority</label>
          <select className="form-select" aria-label="Default select priority" id="priority">
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        <div className="mb-3">
        <label htmlFor="customer" className="form-label">Customer</label>
          <select className="form-select" aria-label="Default select customer" id="customer" onChange={fetchOrders}>
            {customerData.map(customer => {
              return <option value={customer.id}>{customer.name}</option>
            })}           
          </select>
        </div>

        {isVisible ? (
        <div className="mb-3">
        <label htmlFor="order" className="form-label">Order</label>
          <select className="form-select" aria-label="Default select order" id="order" >
            {orderData.map(order => {
              return <option value={order.id}>{order.name}</option>
            })}           
          </select>
        </div>
        ) : null}

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Create;