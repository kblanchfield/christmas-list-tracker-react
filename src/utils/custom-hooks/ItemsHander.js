import { useState } from 'react'

const useItemHandler = () => {
    const [isEditItemFormVisible, setEditFormVisible] = useState(false)
    const [itemToEdit, setItemToEdit] = useState({})

    const showEditItemForm = bool => {
        setEditFormVisible(bool)
    }

    const updateItemToEdit = item => {
        setItemToEdit(item)
    }

    return {
        isEditItemFormVisible,
        showEditItemForm,
        itemToEdit,
        updateItemToEdit
    }
}

export default useItemHandler