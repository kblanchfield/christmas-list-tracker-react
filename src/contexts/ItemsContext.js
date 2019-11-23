import React, { createContext } from 'react'
import useItemsHandler from '../utils/custom-hooks/ItemsHander'

export const itemsContext = createContext({
    itemToEdit: {},
    updateItemToEdit: () => {},
    isEditItemFormVisible: false,
    showEditItemForm: () => {}
})

const { Provider } = itemsContext

const ItemsProvider = ({ children }) => {
    const { itemToEdit, updateItemToEdit, isEditItemFormVisible, showEditItemForm } = useItemsHandler()

    return (
        <Provider value={{ itemToEdit, updateItemToEdit, isEditItemFormVisible, showEditItemForm }}>
            {children}
        </Provider>
    )
}

export default ItemsProvider