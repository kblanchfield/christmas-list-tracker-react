import React from 'react'
import PersonalList from './PersonalList'
import OthersLists from './OthersLists'
import '../App.css'

const Lists = () => {
  return (
    <div className='all-lists'>
        <PersonalList />
        <OthersLists />
    </div>
  )
}

export default Lists