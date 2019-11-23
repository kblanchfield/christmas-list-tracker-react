import React, { useRef, useContext, useEffect } from "react"
import { authContext } from "../contexts/AuthContext"
import { listsContext } from "../contexts/ListsContext"
import { itemsContext } from "../contexts/ItemsContext"
import { apiRequest } from '../utils/Helpers'
import ErrorMessage from "../components/ErrorMessage"
import useErrorHandler from "../utils/custom-hooks/ErrorHandler"

const EditItem = () => {
    const { auth } = useContext(authContext)
    const { updatePersonalList } = useContext(listsContext)
    const { itemToEdit, showEditItemForm } = useContext(itemsContext)
    const { error } = useErrorHandler(null)
    const itemNameInput = useRef(null)
    const itemCommentInput = useRef(null)
    const itemLinksInput = useRef(null)

    useEffect(() => {
        itemNameInput.current.value = itemToEdit.name
        itemCommentInput.current.value = itemToEdit.comment
        itemLinksInput.current.value = itemToEdit.links
    }, [itemToEdit])

    const editItem = async () => {
        const itemName = itemNameInput.current.value
        const itemComment = itemCommentInput.current.value
        const itemLinks = itemLinksInput.current.value.split(',')
        
        const response = await apiRequest(
            `/.netlify/functions/update-personal-item/`,
            "put",
            {
                item: { username: auth.name, name: itemToEdit.name },
                updatedItem: { updatedName: itemName, updatedComment: itemComment, updatedLinks: itemLinks }
            }
        )
        if (!response.updated) {
            console.log("Couldn't update personal list for some reason")
            return
        }
        if (response.updated) {
            updatePersonalList(response.personalList)
            showEditItemForm(false)
        }
    }

    return (
        <div className="new-personal-item">
            <p>Edit the item on your list below.</p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    editItem()
                }}
            >
                <input type="text" ref={itemNameInput} />
                <input type="text" ref={itemCommentInput} />
                <input type="text" ref={itemLinksInput} />
                <button type="submit">
                    Edit
                </button>
                <br />
                {error && <ErrorMessage errorMessage={error} />}
            </form>
        </div>
    )
}

export default EditItem