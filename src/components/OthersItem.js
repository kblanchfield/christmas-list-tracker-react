import React, { useContext}  from 'react'
import { authContext } from "../contexts/AuthContext"
import { listsContext } from "../contexts/ListsContext"
import { apiRequest } from '../utils/Helpers'
import './Lists.css'

const OthersItem = ({ username, name, comment, links, reserver, buyer, bought }) => {

    const { auth } = useContext(authContext)
    const { updateOthersLists } = useContext(listsContext)
  
    const getUpdatedOthersLists = async () => {
        const newLists = await apiRequest(
            `http://localhost:4001/items/others/${auth.name}`,
            "get"
        )
        if (!newLists.found) {
            console.log("Couldn't find others' lists for some reason")
            return
        }
        updateOthersLists(newLists.othersLists)
    }

    const updateBoughtState = async () => {
        if (!reserver || reserver === auth.name || buyer === auth.name) {
            const response = await apiRequest(
                `http://localhost:4001/items`,
                "put",
                { item: { username, name, comment, links, buyer: auth.name, reserver, bought: !bought }}
            )
            if (!response.updated) {
                console.log("Couldn't update others' lists for some reason")
                return
            } else {
                console.log("Item updated")
            }
            getUpdatedOthersLists()
        }
    }

    const updateReservedState = async () => {
        if (!reserver || reserver === auth.name || reserver === '') {
            const newReserver = reserver ? '' : auth.name
            const response = await apiRequest(
                `http://localhost:4001/items`,
                "put",
                { item: { username, name, comment, links, reserver: newReserver, bought: false }}
            )
            if (!response.updated) {
                console.log("Couldn't update others' lists for some reason")
                return
            } else {
                console.log("Item updated")
            }
            getUpdatedOthersLists()
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
                {links.map((link, index) => {
                    if (link.length > 0) {
                        console.log(username, " link ", index)
                        if (index === links.length - 1) {
                            console.log(index, " last link: ", link)
                            return <a href={link} target='_blank' rel="noopener noreferrer" key={index}>Link</a>
                        } else {
                            console.log(index, " not last link: ", link)
                            return <a href={link} target='_blank' rel="noopener noreferrer" key={index}>Link</a>
                        }
                    }
                })}
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