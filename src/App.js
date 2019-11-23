import React from 'react'
import RootContainer from './containers/RootContainer'
import AuthContextProvider from "./contexts/AuthContext"
import ListsContextProvider from "./contexts/ListsContext"
import ItemsContextProvider from "./contexts/ItemsContext"

const App = () => {
  return (
    <AuthContextProvider>
      <ListsContextProvider>
        <ItemsContextProvider>
          <RootContainer />
        </ItemsContextProvider>
      </ListsContextProvider>
    </AuthContextProvider>
  )
}

export default App