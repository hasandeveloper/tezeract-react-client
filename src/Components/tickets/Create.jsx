import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CHANNEL_BASE_URL, TICKET_BASE_URL, CUSTOMERS_URI, ORDERS_URI, TICKET_FIELD_URI, TOKEN } from '../../Utils/apiURL';


const Create = () => {
  const [customerData, setCustomerData] = useState([]);
  const [orderData, setOrderData] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const [formData, setFormData] = useState({
    subject: "",
    comment: "",
    priority: "",
    customer: ""
  })

  useEffect(() => {
        axios.get(`${CHANNEL_BASE_URL}${CUSTOMERS_URI}`).then(response => {
          if(response.status === 200){
            setCustomerData(response.data);
          }
        }).catch((e) =>{alert(e)})
  },[]);

  const fetchOrders = (e) => {
    if(e.target.value === ''){
      setFormData({
        ...formData, 
        [e.target.name]: "",
      })
      setIsVisible(false)
    }else{
      axios.get(`${CHANNEL_BASE_URL}/${CUSTOMERS_URI}/${e.target.value}${ORDERS_URI}`).then(response => {
        if(response.status === 200){
          setOrderData(response.data);
        }
      }).catch((e) =>{alert("haha",e)})
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
    var list = []
    try{
      const ticketFieldBody = await
       axios.get(`${TICKET_BASE_URL}/${TICKET_FIELD_URI}`,{
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
      })

      if(ticketFieldBody.status === 200){
        ticketFieldBody.data.ticket_field.custom_field_options.map(customer => {
          let customerObj = {
            name: customer.name,
            value: customer.value
          }
    
          list.push(customerObj)
         })
         updateCustomerDetailInList(list)
      }
    }catch(error){
      alert(error)
    }
  }

  const updateCustomerDetailInList = (list) => {
    axios.get(`${CHANNEL_BASE_URL}${CUSTOMERS_URI}/${formData.customer}`).then(response => {
      if(response.status === 200){
        
        list.push({
            name: response.data["name"],
            value: formData.customer
        })

      }
      updateTicketField(list)
    }).catch((e) =>{alert(e)})
  }


  const updateTicketField = (list) => {
      axios.put(`${TICKET_BASE_URL}/${TICKET_FIELD_URI}`, {
        "ticket_field": {
          "custom_field_options": list
      }},{
          headers: {
            'Authorization': `Bearer ${TOKEN}`
          }
        }).catch((e) =>{alert(e)})

        createTicket()
  }

  const createTicket = () => {

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