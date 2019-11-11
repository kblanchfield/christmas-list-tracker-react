import React, { useRef, useContext } from "react"
import { authContext } from "../contexts/AuthContext"
import { listsContext } from "../contexts/ListsContext"
import { apiRequest } from '../utils/Helpers'
import ErrorMessage from "../components/ErrorMessage"
import useErrorHandler from "../utils/custom-hooks/ErrorHandler"

const AddItem = () => {
    const { auth } = useContext(authContext)
    const { updatePersonalList } = useContext(listsContext)
    const { error, showError } = useErrorHandler(null)
    const itemNameInput = useRef(null)
    const itemCommentInput = useRef(null)
    const itemLinksInput = useRef(null)

    const resetForm = () => {
        itemNameInput.current.value = ""
        itemCommentInput.current.value = ""
        itemLinksInput.current.value = ""
    }

    const addNewItem = async () => {
        if (!itemNameInput.current) {
            return showError("You've got to name your item before clicking add.")
        }
        const itemName = itemNameInput.current.value
        const itemComment = itemCommentInput.current.value
        const itemLinks = itemLinksInput.current.value.split(',')
        
        const response = await apiRequest(
            "/.netlify/functions/add-personal-item",
            "post",
            { item: { username: auth.name, name: itemName, comment: itemComment, links: itemLinks, bought: false } }
        )
        if (!response.created) {
            console.log("Item not added for some reason")
            return
        }
        updatePersonalList(response.personalList)
        resetForm()
    }

    return (
        <div className="new-personal-item">
            <p>Add an item to your list below.</p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    addNewItem()
                }}
            >
                <input type="text" ref={itemNameInput} placeholder="Item name" />
                <input type="text" ref={itemCommentInput} placeholder="Comments" />
                <input type="text" ref={itemLinksInput} placeholder="Links (separated by a comma)" />
                <button type="submit">
                    Add
                </button>
                <br />
                {error && <ErrorMessage errorMessage={error} />}
            </form>
        </div>
    )
}

export default AddItem