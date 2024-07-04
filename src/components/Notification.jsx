// 6.23
import { useContext } from "react" 
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  if (notification === '') return null
  // if (true) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
