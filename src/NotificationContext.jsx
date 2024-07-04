// 6.23
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => { // used here
  switch (action.type) {
    case "NOTIFICATION":
      return action.payload
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
      </NotificationContext.Provider>
    )
  }

export default NotificationContext

// const [notification, notificationDispatch] = useReducer(notificationReducer, '')