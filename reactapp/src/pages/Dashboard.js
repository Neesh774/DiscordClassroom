/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from 'axios';
import NavBar from './LoginNavBar.js'

export default function Dashboard( { history } ) {
    
    const [user, setUser] = React.useState( {} )
    const [loading, setLoading ] = React.useState(true)
    React.useEffect( () => {
        const fetchData = async () => {
          await axios.get('http://localhost:3001/api/auth/', {
            withCredentials: true }).then( ( { data } ) => {
                console.log(data)
                setUser(data)
                setLoading(false)
            }).catch(err => { 
                history.push('/');  
                console.log(err);
                setLoading(false);
            })  
        }
        fetchData();
    }, [])
    return (
        <NavBar user = {user}/>
    );
  }