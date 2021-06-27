import React from 'react';
import NavBar from './LoginNavBar.tsx'
import { getUserDetails } from '.././utils/api'

export default function Dashboard( { history } ) {
    
    const [user, setUser] = React.useState( null )
    const [loading, setLoading ] = React.useState(true)

    React.useEffect( () => {
        getUserDetails().then( ( { data } ) => {
            console.log(data)
            setUser(data)
            setLoading(false)
        }).catch(err => {   
            setLoading(false)
        })
    }, [])

    return (
        <NavBar/>
    );
  }