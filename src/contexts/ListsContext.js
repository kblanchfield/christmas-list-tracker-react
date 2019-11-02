import React, { createContext } from 'react'
import useListsHandler from '../utils/custom-hooks/ListsHander'

export const listsContext = createContext({
  personalList: [],
  othersLists: {},
  updatePersonalList: () => {},
  updateOthersLists: () => {},
})

const { Provider } = listsContext

const ListsProvider = ({ children }) => {
    const { personalList, othersLists, updatePersonalList, updateOthersLists } = useListsHandler()

    return (
        <Provider value={{ personalList, othersLists, updatePersonalList, updateOthersLists }}>
            {children}
        </Provider>
    )
}

export default ListsProvider