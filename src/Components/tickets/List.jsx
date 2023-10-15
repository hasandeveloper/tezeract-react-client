import React, {useContext} from 'react'
import { CreateContext } from '../context/CreateContext'

const List = () => {
  const {state} = useContext(CreateContext)
  return (
    <div className='container my-4'>
      <h2 className='text-center'>
        Tickets
      </h2>

      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Subject</th>
            <th scope="col">Comment</th>
            <th scope="col">Priority</th>
            <th scope="col">Customer</th>
            <th scope="col">Order</th>
          </tr>
        </thead>
        <tbody>
        {state.map(ticket => {
            return( <tr>
              <td>{ticket.subject}</td>
              <td>{ticket.comment}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.customer}</td>
              <td>wip</td>
            </tr>
            )
        })}
        </tbody>
        </table>
    </div>

  )
}

export default List;