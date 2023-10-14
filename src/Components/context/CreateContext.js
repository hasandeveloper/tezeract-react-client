import React, { useReducer, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CHANNEL_BASE_URL, TICKET_BASE_URL, CUSTOMERS_URI, ORDERS_URI, TICKET_FIELD_URI, TOKEN } from '../../Utils/apiURL';

export const CreateContext = createContext()

    const updateCustomerDetailInList = (list, formData) => {
        
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
  
          createTicket(list)
    }
  
    const createTicket = (list) => {
        debugger;
    }

    export const CreateContextProvider = ({children}) => {
        const [customerData, setCustomerData] = useState([])
        const [orderData, setOrderData] = useState([])

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


      
        return (
            <>
                <CreateContext.Provider value={{customerData, getOrdersForCustomer, orderData, createTicketProcess}}>{children}</CreateContext.Provider>
            </>
        )
    }

