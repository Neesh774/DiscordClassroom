import { ReactNode } from 'react';
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
  MenuDivider,
  MenuItemOption,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Image,
  MenuOptionGroup
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { getUserDetails } from '.././utils/api'

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link as RouteLink
// } from 'react-router-dom'

const Links = ['Assignments', 'Resources'];
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signout = () => {
    window.location.href = 'http://localhost:3000'
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }
  let avatarURL = '';

  console.log(avatarURL);
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
          <Menu autoSelect={true}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              Guilds
            </MenuButton>
            <MenuList>
              <MenuOptionGroup defaultValue="1">
                <MenuItemOption value="1" minH="30px">
                  <Image
                    boxSize="2rem"
                    borderRadius="full"
                    src="https://i.redd.it/s9biyhs4lix61.jpg"
                    alt="Guild 1"
                    mr="12px"
                  />
                  <span>Guild 1</span>
                </MenuItemOption>
                <MenuItemOption value="2" minH="48px">
                  <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://i.redd.it/s9biyhs4lix61.jpg"
                      alt="Guild 2"
                      mr="12px"
                    />
                    <span>Guild 2</span>
                </MenuItemOption>
                <MenuItemOption value="3" minH="48px">
                  <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src="https://i.redd.it/s9biyhs4lix61.jpg"
                      alt="Guild 3"
                      mr="12px"
                    />
                    <span>Guild 3</span>
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}