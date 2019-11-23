import React, { useContext } from 'react'
import { itemsContext } from "../contexts/ItemsContext"
import './Lists.css'

const PersonalItem = ({ name, comment, links }) => {
    const { updateItemToEdit, showEditItemForm } = useContext(itemsContext) 

    const selectItemToEdit = () => {
        const item = { name, comment, links }
        showEditItemForm(true)
        updateItemToEdit(item)
    }

    return (
        <p><i onClick={selectItemToEdit} className="far fa-snowflake"></i>
            {name}
            <span className="item-comment"> - {comment}</span>, 
            {links ? links.map(link => {
                if (link.length > 0) {
                    return <a href={link} target='_blank' rel="noopener noreferrer" key={link}> Link</a>
                } else {
                    return ''
                }
            }) : ''}
        </p>
    )
}

export default PersonalItem