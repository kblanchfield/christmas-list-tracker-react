import React from 'react'
import OthersList from './OthersList'
import { listsContext } from "../contexts/ListsContext"
import './../App.css'

const OthersLists = () => {

  const { othersLists } = useContext(listsContext)

  const others = ["Alex", "Bernie", "Claire", "Dee"]
  // const others = Object.keys(othersLists)

  return (
    <div className="others-lists">
        {others.map(person => <OthersList key={person} name={person} />)}
    </div>
  )
}

export default OthersLists