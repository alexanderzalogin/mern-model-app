'use client'

import React, { ReactNode } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'

interface LinkItemProps {
  name: string
  icon: IconType,
  url: String
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, url: "/dashboard"},
  { name: 'Trending', icon: FiTrendingUp, url: "#" },
  { name: 'Explore', icon: FiCompass, url: "#" },
  { name: 'Favourites', icon: FiStar, url: "#" },
  { name: 'Settings', icon: FiSettings, url: "#" },
]

export default function SimpleSidebar({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(user.type);
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.800')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('gray.800', 'gray.800')}
      // borderRight="1px"
      // borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full' }}
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Menu
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
            {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  url: String
  children: ReactText
}
const NavItem = ({ icon, url, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={url.toString()}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        // p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.500',
          color: 'white',
          mr: '0px'
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="3"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="md" ml="4" fontFamily="monospace" fontWeight="bold">
        Menu
      </Text>
    </Flex>
  )
}
