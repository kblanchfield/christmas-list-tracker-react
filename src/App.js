import React from 'react'
import RootContainer from './containers/RootContainer'
import AuthContextProvider from "./contexts/AuthContext"
import ListsContextProvider from "./contexts/ListsContext"

const App = () => {
  return (
    <AuthContextProvider>
      <ListsContextProvider>
        <RootContainer />
      </ListsContextProvider>
    </AuthContextProvider>
  )
}

export default App