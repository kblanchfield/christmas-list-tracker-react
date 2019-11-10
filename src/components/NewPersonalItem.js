import React, { useRef, useContext } from "react"
import { authContext } from "../contexts/AuthContext"
import { listsContext } from "../contexts/ListsContext"
import { apiRequest } from '../utils/Helpers'

/** Presentation */
import ErrorMessage from "../components/ErrorMessage"

/** Custom Hooks */
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
        // post new item to db and get back complete personal list for user_id
        const newItem = await apiRequest(
            "/.netlify/functions/add-personal-item",
            "post",
            { item: { username: auth.name, name: itemName, comment: itemComment, links: itemLinks, bought: false }}
        )
        if (!newItem.created) {
            console.log("item not added for some reason")
            return
        }
        console.log("getting personal list from NewPersonalItem component")
        const newList = await apiRequest(
            `/.netlify/functions/personal-list?username=${auth.name}`,
            "get"
        )
        if (!newList.found) {
            console.log("couldn't find personal list for some reason")
            return
        }
        updatePersonalList(newList.personalList)
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