import React, { useContext}  from 'react'
import { authContext } from "../contexts/AuthContext"
import { listsContext } from "../contexts/ListsContext"
import { apiRequest } from '../utils/Helpers'
import './Lists.css'

const OthersItem = ({ username, name, comment, links, reserver, buyer, bought }) => {

    const { auth } = useContext(authContext)
    const { updateOthersLists } = useContext(listsContext)

    const updateBoughtState = async () => {
        if (!reserver || reserver === auth.name || buyer === auth.name) {
            const response = await apiRequest(
                `/.netlify/functions/update-others-item/`,
                "put",
                { user: auth.name, item: { username, name, comment, links, buyer: auth.name, reserver, bought: !bought } }
            )
            if (!response.updated) {
                console.log("Couldn't update others' lists for some reason")
                return
            }
            updateOthersLists(response.othersLists)
        }
    }

    const updateReservedState = async () => {
        if (!reserver || reserver === auth.name || reserver === '') {
            const newReserver = reserver ? '' : auth.name
            const response = await apiRequest(
                `/.netlify/functions/update-others-item/`,
                "put",
                { user: auth.name, item: { username, name, comment, links, reserver: newReserver, bought: false } }
            )
            if (!response.updated) {
                console.log("Couldn't update others' lists for some reason")
                return
            }
            updateOthersLists(response.othersLists)
        }
    }

    return (
        <div style={{ textDecoration: bought ? 'line-through' : ''}}>
            <p>
                <button className="hidden-button" onClick={updateBoughtState}>
                    {bought 
                        ? <i className="far fa-check-square"></i>
                        : <i className="far fa-square"></i>
                    }
                </button>
                {name}
                <span className="item-comment"> - {comment}</span>, 
                {links ? links.map((link, index) => {
                    if (link.length > 0) {
                        if (index === links.length - 1) {
                            return <a href={link} target='_blank' rel="noopener noreferrer" key={index}>Link</a>
                        } else {
                            return <a href={link} target='_blank' rel="noopener noreferrer" key={index}>Link</a>
                        }
                    } else {
                        return ''
                    }
                }) : ''}
                <br />
                {bought
                    ? ` (bought by ${buyer})`
                    :
                        <button className="hidden-button" onClick={updateReservedState}>
                            <i style={{ color: reserver ? '#C0392B' : 'black', marginLeft: '-1px'}} className="fas fa-snowman"></i>
                        </button>
                }
                {!bought && reserver
                    ? ` (reserved by ${reserver})`
                    : ''
                }
            </p>
        </div>
    )
}
  
export default OthersItem