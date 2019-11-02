import React, { useRef, useContext } from "react"
import { listsContext } from "../contexts/ListsContext"

/** Presentation */
import ErrorMessage from "../components/ErrorMessage"

/** Custom Hooks */
import useErrorHandler from "../utils/custom-hooks/ErrorHandler"

const AddItem = () => {
    const lists = useContext(listsContext)
    const { error, showError } = useErrorHandler(null)
    const itemNameInput = useRef(null)
    const itemCommentInput = useRef(null)
    const itemLinksInput = useRef(null)

    const addNewItem = async () => {
        if (!itemNameInput.current) {
            return showError("Please type an item before clicking add.")
        }
        const itemName = itemNameInput.current.value
        const itemComment = itemCommentInput.current.value
        const itemLinks = itemLinksInput.current.value
        // post new item to db and get back complete personal list for user_id
        // const allItems = await apiRequest(
        //     "https://jsonplaceholder.typicode.com/items",
        //     "post",
        //     { newItem: { name: itemName, comment: itemComment, links: itemLinks } }
        //   )
        const newPersonalList = [{ name: itemName, comment: itemComment, links: itemLinks }]
        lists.updatePersonalList(newPersonalList)
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                addNewItem()
            }}
        >
            <input type="text" ref={itemNameInput} placeholder="Add item to Christmas list" />
            <input type="text" ref={itemCommentInput} placeholder="Add item to Christmas list" />
            <input type="text" ref={itemLinksInput} placeholder="Add item to Christmas list" />
            <button type="submit">
                Add
            </button>
            <br />
            {error && <ErrorMessage errorMessage={error} />}
        </form>
    )
}

export default AddItem