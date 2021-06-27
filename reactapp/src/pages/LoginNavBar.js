import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
  MenuDivider,
  MenuItemOption,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Image,
  MenuOptionGroup
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, useColorMode } from '@chakra-ui/icons';

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link as RouteLink
// } from 'react-router-dom'

// const Links = ['Assignments', 'Resources'];
// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={'md'}
//     _hover={{
//       textDecoration: 'none',
//       bg: useColorModeValue('gray.200', 'gray.700'),
//     }}
//     href={'#'}>
//     {children}
//   </Link>
// );

export default function Simple( { user, classes } ) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [guildID, setguildID] = useState("");
  const [guildName, setguildName] = useState("");

  const signout = () => {
    window.location.href = 'http://localhost:3000'
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }
  let avatarURL = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;

console.log(`user`);
console.log(user);
let botGuilds = [];
console.log(classes);
user.guilds.forEach(guild => {
  classes.forEach(room =>{
    console.log(`Comparing ${room.guildID} and ${guild.id}`)
    if(room.guildID === guild.id){
      botGuilds.push(guild)
    }
  })
})

console.log("BOT GUILDS");
console.log(botGuilds);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Text fontSize="xl">Discord Classroom</Text></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {/* {Links.map((link) => (
                <Link as={RouteLink} to="/">
                {link}
              </Link>
              ))} */}
            </HStack>
          </HStack>
          <Menu autoSelect={true} matchWidth={true}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              Guilds
            </MenuButton>
            <MenuList>
              <MenuOptionGroup defaultValue="0" type="radio">
                {
                  botGuilds.map((guild, index) => {
                    return (<MenuItemOption value={index} minH="48px" onClick={() =>{setguildID(guild.id); setguildName(guild.name)}}>
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                        mr="12px"
                      />
                      <span>{guild.name}</span>
                    </MenuItemOption>)
                  })
                }
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Box><Text fontSize="xl">{guildName?(`${guildName}(Guild ID: ${guildID})`): "Select a guild to edit"}</Text></Box>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}>
                { <Avatar
                  size={'sm'}
                  src={
                    avatarURL 
                  }
                /> }
              </MenuButton>
              <MenuList>
                <MenuItem onClick={signout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}