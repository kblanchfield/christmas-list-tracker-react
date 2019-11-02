import React, { useContext } from 'react'
import { authContext } from "../contexts/AuthContext"
import { listsContext } from "../contexts/ListsContext"
import NewPersonalItem from './NewPersonalItem'
import './../App.css'

const PersonalList = () => {
  const { auth } = useContext(authContext)
  const { personalList } = useContext(listsContext)

  return (
    <div className="personal-list">
        <p>Hi, <span className="display-name">{auth.name}</span>. Here's your Christmas list</p>
        {personalList.map(item => <p key={item.name}>{item.name}, {item.comment}, {item.links}</p>)}
        <NewPersonalItem />
    </div>
  )
}

export default PersonalList