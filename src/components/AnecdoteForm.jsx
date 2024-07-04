import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from "react"                                              // 6.23
import NotificationContext from "../NotificationContext"                         // 6.23

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)  // 6.23
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])      
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })
  const queryClient = useQueryClient()  

const onCreate = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  newAnecdoteMutation.mutate({ content, votes: 0 })  
  
  notificationDispatch({                                                        // 6.23
    type:'NOTIFICATION', 
    payload: `new anecdote "${content}" added!`
  })
  setTimeout(() => {notificationDispatch({type:"NOTIFICATION",payload:''})},5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
