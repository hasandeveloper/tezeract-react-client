import React, { useReducer, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CHANNEL_BASE_URL, TICKET_BASE_URL, CUSTOMERS_URI, ORDERS_URI, TICKET_FIELD_URI, TOKEN, TICKET_URI } from '../../Utils/apiURL';

export const CreateContext = createContext()

  const INITIAL_STATE = []

  const createReducer = (state, action) => {
    switch(action.type) {
      case "ADD_TICKET":
        return [...state, action.payload]
      default:
        return state
    }
  }

  export const CreateContextProvider = ({children}) => {
      const [customerData, setCustomerData] = useState([])
      const [orderData, setOrderData] = useState([])
      const [state, dispatch] = useReducer(createReducer, INITIAL_STATE)


      useEffect(() => {
          axios.get(`${CHANNEL_BASE_URL}${CUSTOMERS_URI}`).then(response => {
            if(response.status === 200){
              setCustomerData(response.data)
            }
          }).catch((e) =>{alert("error from get customers",e)})
      },[]);

      const getOrdersForCustomer = (customerId) =>{
          axios.get(`${CHANNEL_BASE_URL}/${CUSTOMERS_URI}/${customerId}${ORDERS_URI}`).then(response => {
              if(response.status === 200){
                  setOrderData(response.data)
              }
            }).catch((e) =>{alert("error from fetch order",e)})
      } 

      const createTicketProcess = async(FormData) => {
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
                updateCustomerDetailInList(list,FormData)
            }
          }catch(error){
            alert(error)
          }
      }

      const updateCustomerDetailInList = (list, formData) => {
      
        axios.get(`${CHANNEL_BASE_URL}${CUSTOMERS_URI}/${formData.customer}`).then(response => {
        if(response.status === 200){
            list.push({
                name: response.data["name"],
                value: formData.customer
            })
        }
          updateTicketField(list, formData)
        }).catch((e) =>{alert(e)})
      }

      const updateTicketField = async(list, formData) => {
          let response
          try{
              response = await
              axios.put(`${TICKET_BASE_URL}/${TICKET_FIELD_URI}`, {
                  "ticket_field": {
                    "custom_field_options": list
                }},{
                    headers: {
                      'Authorization': `Bearer ${TOKEN}`
                    }
              })
              if(response.status === 200){
                  createTicket(list, formData)
              }
          }catch(error){
              alert("error from update ticket field",error)
          }
  
    
            
      }
  
      const createTicket = async(list, formData) => {
          let response
          try{
              response = await
              axios.post(`${TICKET_BASE_URL}/${TICKET_URI}`, {
                  "ticket": {
                    "comment": {
                      "body": formData.comment
                    },
                    "custom_fields": [{"id": 4398063301247, "value": list[list.length - 1].value}],
                    "priority": formData.priority,
                    "subject": formData.subject
                  }
                },{
                    headers: {
                      'Authorization': `Bearer ${TOKEN}`
                    }
              })
              if(response.status === 201){
                  alert("Created ticket")
                  let ticket = {
                    "subject": formData.subject,
                    "comment": formData.comment,
                    "priority": formData.priority,
                    "customer": list[list.length - 1].name
                  }
                  dispatch({
                    type: "ADD_TICKET",
                    payload: ticket
                  })
              }
          }catch(error){
              alert("error from create ticket ",error)
          }
  
      }

      return (
          <>
              <CreateContext.Provider value={{customerData, getOrdersForCustomer, orderData, createTicketProcess, state}}>{children}</CreateContext.Provider>
          </>
      )
  }

