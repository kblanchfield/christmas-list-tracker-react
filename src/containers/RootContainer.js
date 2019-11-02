import React, { useContext } from 'react'
import { authContext } from "../contexts/AuthContext"
import LogInForm from '../components/LogInForm'
import Lists from '../components/Lists'

function RootContainer(){
    const { auth } = useContext(authContext)

    return (
        <>
            {auth.id
                ? <Lists />
                : <LogInForm />
            }
        </>
    )
}

export default RootContainer