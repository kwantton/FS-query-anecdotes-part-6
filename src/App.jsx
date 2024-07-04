import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from "react"                                              // 6.23
import NotificationContext from "./NotificationContext"                         // 6.23


const App = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)  // 6.23
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes:anecdote.votes+1 })
    console.log("handleVote: anecdote.content:", anecdote.content)
    notificationDispatch({                                                      // 6.23
      type:'NOTIFICATION', 
      payload: `voted for "${anecdote.content}"`
    })
    setTimeout(() => {notificationDispatch({type:"NOTIFICATION",payload:''})},5000)
  }

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes,
    retry:1 // tries only once again, then says error if server is still not replying with 200 ok
  })  
  console.log("result:",JSON.parse(JSON.stringify(result)))
  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }
  if ( result.isError ) {
    return <span>anecdote service not available due to problems in server</span>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>     
        <Notification/>
        <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App