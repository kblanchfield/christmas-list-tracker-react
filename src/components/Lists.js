import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonalList from './PersonalList'
import OthersLists from './OthersLists'
import '../App.css'

const Lists = ( )=> {
  return (
    <>
        <PersonalList />
        <OthersLists />
    </>
  )
}

export default Lists