import { useState } from 'react'

const useListsHandler = () => {
    const [personalList, setPersonalList] = useState([])
    const [othersLists, setOthersLists] = useState({})

    const updatePersonalList = list => {
        console.log("updating personal list with: ", list)
        setPersonalList(list)
    }

    const updateOthersLists = lists => {
        console.log("updating others lists with: ", lists)
        setOthersLists(lists)
    }

    return {
        personalList,
        othersLists,
        updatePersonalList,
        updateOthersLists
    }
}

export default useListsHandler