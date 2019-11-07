import React, { useContext, useEffect } from 'react'
import { authContext } from "../contexts/AuthContext"
import { listsContext } from "../contexts/ListsContext"
import { apiRequest } from '../utils/Helpers'
import NewPersonalItem from './NewPersonalItem'
import PersonalItem from './PersonalItem'
import '../App.css'
import './Lists.css'

const PersonalList = () => {
  const { auth } = useContext(authContext)
  const { personalList, updatePersonalList } = useContext(listsContext)

  useEffect(() => {
    const getPersonalList = async () => {
      const newList = await apiRequest(
          `http://localhost:4001/items/${auth.name}`,
          "get"
      )
      if (!newList.found) {
          console.log("couldn't find personal list for some reason")
          return
      }
      updatePersonalList(newList.personalList)
      console.log("lists context: ", personalList)
    }
    getPersonalList()
  }, [])

  return (
    <div className="personal-list">
      <p className="name">Hi, <span className="display-name">{auth.name}</span>.</p>
      {personalList.length === 0 
      ? <p>You haven't added anything to your Christmas list yet. Get a move on!</p>
      : <p>Check out your Christmas list 👇</p>}
      <div className="list">
        {personalList.map(item => <PersonalItem key={item.name} name={item.name} comment={item.comment} links={item.links} />)}
      </div>
      <NewPersonalItem />
    </div>
  )
}

export default PersonalList