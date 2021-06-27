/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from 'axios';
import NavBar from './LoginNavBar.js'
import { set } from 'mongoose';
import { Center, Spinner, Box, Text, VStack, Container, Input, Stack, Textarea, Button, useColorMode } from '@chakra-ui/react';
export default function Dashboard( { history } ) {
    const { colorMode, toggleColorMode } = useColorMode();
    const [classroom, setClassroom] = React.useState( {} )
    const [user, setUser] = React.useState( {} )

    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [guildID, setGuildID] = React.useState("")
    const [links, setLinks] = React.useState("")

    const [loading, setLoading ] = React.useState(true)

    React.useEffect( () => {
        const fetchData = async () => {
          await axios.get('http://localhost:3001/api/auth/', {
            withCredentials: true }).then( ( { data } ) => {
                console.log(data)
                setUser(data)
            }).catch(err => { 
                history.push('/');  
                console.log(err);
            })  
        }
        fetchData();
    }, [])
    React.useEffect( () => {
      async function fetchData() {
        await axios.get('http://localhost:3001/api/auth/classrooms', {
        withCredentials: true }).then( ( { data } ) => {
          console.log("DATA");
          console.log(data)
          setClassroom(data);
          setLoading(false);
        }).catch(err => { 
          console.log(err);
        })
      }
      fetchData();
    }, [])

    console.log("classes");
    console.log(classroom);

    const handleSubmit = async e => {
      e.preventDefault();
  
      const newAssignment = {
        guildID: guildID,
        title: title,
        description:  description,
        links: links
      }
      
      try {
        const res = await axios.post('http://localhost:3001/api/auth/assignment', newAssignment).then(response => console.log(response));
      } catch (err) {
        console.log(err)
      }
    }

    return !loading?(
        <div>
            <NavBar user = {user} classes = {classroom.data}/>
            <VStack>
                <Container maxW="container.xl" padding="2">
                    <Box borderWidth="1px" borderRadius="lg" padding="2">
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <Box><Text fontSize="xl">Assignments</Text></Box>
                                <Input placeholder="Guild ID" size="lg" isRequired={true} value={guildID} onChange={(e) => setGuildID(e.target.value)}/>
                                <Input placeholder="Title" size="lg" isRequired={true} value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <Input placeholder="Description" size="lg" isRequired={true} value={description} onChange={(e) => setDescription(e.target.value)}/>
                                <Textarea placeholder="Link" size="lg" isRequired={true} value={links} onChange={(e) => setLinks(e.target.value)}/>
                                <Button colorScheme="blue" type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </Box>
                </Container>
            </VStack>
        </div>
    ) : (
      <Center h="300px" w = "300px">
        <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="Loading your data..."
      />
      </Center>
    )
  }