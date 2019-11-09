import { useState, useCallback } from 'react'

const useListsHandler = () => {
    const [personalList, setPersonalList] = useState([])
    const [othersLists, setOthersLists] = useState({})

    const updatePersonalList = useCallback(list => {
        setPersonalList(list)
    }, [])

    const updateOthersLists = useCallback(lists => {
        setOthersLists(lists)
    }, [])

    return {
        personalList,
        othersLists,
        updatePersonalList,
        updateOthersLists
    }
}

export default useListsHandler