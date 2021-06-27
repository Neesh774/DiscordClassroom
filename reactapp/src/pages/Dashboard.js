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

    const [astitle, setAsTitle] = React.useState("")
    const [asdescription, setAsDescription] = React.useState("")
    const [asguildID, setAsGuildID] = React.useState("")
    const [aslinks, setAsLinks] = React.useState("")
    const [rtitle, setRTitle] = React.useState("")
    const [rdescription, setRDescription] = React.useState("")
    const [rguildID, setRGuildID] = React.useState("")
    const [rlinks, setRLinks] = React.useState("")
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

    const handleAsSubmit = async e => {
      e.preventDefault();
  
      const newAssignment = {
        guildID: asguildID,
        title: astitle,
        description:  asdescription,
        links: aslinks
      }
      
      try {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/auth/assignment',
            data: newAssignment
          });
      } catch (err) {
        console.log(err)
      }
      setAsGuildID("");
      setAsTitle("");
      setAsDescription("");
      setAsLinks("");
    }
    const handleRSubmit = async e => {
        e.preventDefault();
    
        const newAssignment = {
          guildID: rguildID,
          title: rtitle,
          description:  rdescription,
          links: rlinks
        }
        
        try {
          const res = await axios({
              method: 'post',
              url: 'http://localhost:3001/api/auth/resources',
              data: newAssignment
            });
        } catch (err) {
          console.log(err)
        }
        setAsGuildID("");
        setAsTitle("");
        setAsDescription("");
        setAsLinks("");
      }
    return !loading?(
        <div>
            <NavBar user = {user} classes = {classroom.data}/>
            <VStack>
                <Container maxW="container.xl" padding="2">
                    <Box borderWidth="1px" borderRadius="lg" padding="2">
                        <form onSubmit={handleAsSubmit}>
                            <Stack spacing={3}>
                                <Box><Text fontSize="xl">Assignments</Text></Box>
                                <Input placeholder="Guild ID" size="lg" isRequired={true} value={asguildID} onChange={(e) => setAsGuildID(e.target.value)}/>
                                <Input placeholder="Title" size="lg" isRequired={true} value={astitle} onChange={(e) => setAsTitle(e.target.value)}/>
                                <Input placeholder="Description" size="lg" isRequired={true} value={asdescription} onChange={(e) => setAsDescription(e.target.value)}/>
                                <Textarea placeholder="Link" size="lg" isRequired={true} value={aslinks} onChange={(e) => setAsLinks(e.target.value)}/>
                                <Button colorScheme="blue" type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </Box>
                </Container>
                <Container maxW="container.xl" padding="2">
                    <Box borderWidth="1px" borderRadius="lg" padding="2">
                        <form onSubmit={handleRSubmit}>
                            <Stack spacing={3}>
                                <Box><Text fontSize="xl">Resource</Text></Box>
                                <Input placeholder="Guild ID" size="lg" isRequired={true} value={rguildID} onChange={(e) => setRGuildID(e.target.value)}/>
                                <Input placeholder="Title" size="lg" isRequired={true} value={rtitle} onChange={(e) => setRTitle(e.target.value)}/>
                                <Input placeholder="Description" size="lg" isRequired={true} value={rdescription} onChange={(e) => setRDescription(e.target.value)}/>
                                <Textarea placeholder="Link" size="lg" isRequired={true} value={rlinks} onChange={(e) => setRLinks(e.target.value)}/>
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