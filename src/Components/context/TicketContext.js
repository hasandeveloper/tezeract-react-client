import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import { CHANNEL_BASE_URL } from '../../Utils/apiURL';
import { CUSTOMERS_URI } from '../../Utils/apiURL';

export const TicketContext = createContext()



    //initial state
    let INITIAL_STATE = []

    const ticketReducer = (state, action) = {
        
    }

    export const TicketContextProvider = ({children}) => {
        const [state, dispatch] = useReducer(ticketReducer, INITIAL_STATE);

        return (
            <>
                <TicketContext.Provider value={state}>{children}</TicketContext.Provider>
            </>
        )
    }

