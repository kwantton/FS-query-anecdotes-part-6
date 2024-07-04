import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from "react"                                                  // 6.23
import NotificationContext from "../NotificationContext"                            // 6.23

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)      // 6.23
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])      
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      notificationDispatch({                                                        // 6.23. 6.24: check that this works only if successful
        type:'NOTIFICATION', 
        payload: `new anecdote "${newAnecdote.content}" added!`
      })
      setTimeout(() => {notificationDispatch({type:"NOTIFICATION",payload:''})},5000)
    },
    
    onError: () => {                                                                // 6.24
      notificationDispatch({
        type:'NOTIFICATION', 
        payload: `length too short: please write more than 5 characters (example: "shit happens" instead of "shit")`
      })
      setTimeout(() => {notificationDispatch({type:"NOTIFICATION",payload:''})},5000)
    }                                                              // 6.24; if it fails (less than 5 char -> error, or other problem), then...
  })
  const queryClient = useQueryClient()  

const onCreate = async (event) => {
  event.preventDefault()
  const content = event.target.anecdote.value
  event.target.anecdote.value = ''
  newAnecdoteMutation.mutate({ content, votes: 0 })  
  
  
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
