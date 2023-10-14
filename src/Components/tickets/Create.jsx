import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { CHANNEL_BASE_URL, TICKET_BASE_URL, CUSTOMERS_URI, ORDERS_URI, TICKET_FIELD_URI, TOKEN } from '../../Utils/apiURL';
import { CreateContext } from '../context/CreateContext';


const Create = () => {
  const {customerData, getOrdersForCustomer, orderData, createTicketProcess} = useContext(CreateContext)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    comment: "",
    priority: "",
    customer: ""
  })

  const fetchOrders = async (e) => {
    if(e.target.value === ''){
      setFormData({
        ...formData, 
        [e.target.name]: "",
      })
      setIsVisible(false)
    }else{
      getOrdersForCustomer(e.target.value)
      setFormData({
        ...formData, 
        [e.target.name]: e.target.value,
      })
      setIsVisible(true)
    }
}

  const priorityChange = (e) => {
    if(e.target.value === ''){
      setFormData({
        ...formData, 
        [e.target.name]: '',
      })
    }else{
      setFormData({
        ...formData, 
        [e.target.name]: e.target.value,
      })
    }
  }

  const onChangeHandler = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    createTicketProcess(formData)

  }


  return (
    <div className='container my-4'>
      <h1>Create Ticket</h1>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" value={formData.subject} className="form-control" onChange={onChangeHandler} name="subject"/>
        </div>

        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment</label>
          <input type="text" value={formData.comment} className="form-control" onChange={onChangeHandler} name="comment" />
        </div>

        <div className="mb-3">
        <label htmlFor="priority" className="form-label">Priority</label>
          <select className="form-select" aria-label="Default select priority" id="priority" value={formData.priority} onChange={priorityChange} name="priority" >
            <option value=''>Select Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        <div className="mb-3">
        <label htmlFor="customer" className="form-label">Customer</label>
          <select className="form-select" value={formData.customer} aria-label="Default select customer" name="customer" onChange={fetchOrders}>
          <option value=''>Select Customer</option>
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