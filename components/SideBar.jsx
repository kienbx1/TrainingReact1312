import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import Badge from '@mui/material/Badge'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { FaHome, FaUser, FaHandHoldingUsd } from 'react-icons/fa'
import { GiConverseShoe } from 'react-icons/gi'
import { SiBrandfolder } from 'react-icons/si'
import { SlMenu } from 'react-icons/Sl'
import { FiBell } from 'react-icons/fi'
import { ImExit } from 'react-icons/Im'
import { resetState } from '../redux/slices/authSlice'
import { ListItem } from '@mui/material'
import {
  addTask,
  selectActiveSideBar
} from '../redux/slices/isActiveSideBarSlice'
import Popover from '@mui/material/Popover'
import Cookies from 'universal-cookie'

const colorSideBar = '#f9f9f9'
const sizeIcon = 20

const menu = [
  {
    title: '',
    children: [
      {
        path: '/admin/home',
        des: 'Trang chủ',
        icon: <FaHome size={sizeIcon} className='mr-2 text-red-500' />,
        txtColor: 'text-yellow-500'
      }
    ]
  },
  {
    title: 'Manage',
    children: [
      {
        path: '/admin/user/users',
        des: 'Người dùng',
        icon: <FaUser size={sizeIcon} className='mr-2 text-yellow-500' />,
        txtColor: 'text-yellow-500',
        expand: ['Admin', 'User']
      },
      {
        path: '/admin/statistical',
        des: 'Đơn hàng',
        icon: (
          <FaHandHoldingUsd size={sizeIcon} className='mr-2 text-green-500' />
        ),
        txtColor: 'text-green-500'
      },
      {
        path: '/admin/product/products',
        des: 'Sản phẩm',
        icon: <GiConverseShoe size={sizeIcon} className='mr-2 text-blue-500' />,
        txtColor: 'text-blue-900'
      },
      {
        path: '/admin/brand',
        des: 'Thương hiệu',
        icon: (
          <SiBrandfolder size={sizeIcon} className='mr-2 text-violet-500' />
        ),
        txtColor: 'text-blue-900'
      }
    ]
  },
  {
    title: 'Action',
    children: [
      {
        path: '/',
        des: 'Thoát',
        icon: <ImExit size={sizeIcon} className='mr-2 text-red-500' />,
        txtColor: 'text-yellow-500'
      }
    ]
  }
]

const notifications = [
  {
    text: 'Tuấn vừa cập nhật thông tin'
  },
  {
    text: 'Tuấn vừa cập nhật thông tin'
  },
  {
    text: 'Tuấn vừa cập nhật thông tin'
  },
  {
    text: 'Tuấn vừa cập nhật thông tin'
  }
]

const drawerWidth = 240
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 0,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'hidden',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function PersistentDrawerLeft () {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('Trang chủ')
  const { user } = useSelector((state) => state?.auth)
  const [openLisNotification, setOpenLisNotification] = useState(false)
  const selectedPage = useSelector(selectActiveSideBar)
  const cookies = new Cookies()

  const handleClickNotification = (event) => {
    setOpenLisNotification(event.currentTarget)
  }
  const handleCloseNotification = () => {
    setOpenLisNotification(null)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const router = useRouter()

  return (
    <Box sx={{ display: 'flex', zIndex: 10 }}>
      <Popover
        open={openLisNotification}
        anchorEl={openLisNotification}
        onClose={handleCloseNotification}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Typography sx={{ p: 2, fontSize: 22, fontStyle: 'bold' }}>
          Thông báo
        </Typography>
        <Divider />
        {notifications.map((notification, index) => (
          <div key={index} className='flex flex-row items-center'>
            <div className='w3/4 flex flex-col'>
              <Typography sx={{ fontSize: 20, p: 2, color: 'gray' }}>
                {notification?.text || ''}
              </Typography>
              <Divider sx={{ mx: 3 }} />
            </div>
          </div>
        ))}
      </Popover>
      <CssBaseline />
      <AppBar
        elevation={0}
        position='fixed'
        open={open}
        sx={{ p: 1, background: `${colorSideBar}` }}
      >
        <Toolbar className='flex flex-row justify-between'>
          <div className='flex flex-row items-center'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{
                marginRight: 0,
                ...(open && { display: 'none' })
              }}
            >
              <SlMenu color='black' />
            </IconButton>
            <Typography
              className='uppercase text-black ml-4'
              variant='h6'
              noWrap
              component='div'
            >
              {title}
            </Typography>
          </div>
          <div className='flex flex-row text-black items-center'>
            <Typography>{user?.name || ''}</Typography>
            <img className='rounded-full w-10 mx-4' src={user?.profilePicUrl} />
            <Badge badgeContent={4} max={99} color='error'>
              <FiBell
                className='cursor-pointer'
                size={20}
                onClick={handleClickNotification}
              />
            </Badge>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: `${colorSideBar}`
          }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderWidth: 0
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader
          className='flex flex-row mt-2'
          style={{ background: `${colorSideBar}` }}
        >
          <img
            src='/Images/king-shoes-low-resolution-logo-black-on-transparent-background.png'
            className='w-20 mr-11'
          />
          <SlMenu
            size={25}
            className='text-black cursor-pointer'
            onClick={handleDrawerClose}
          >
            {theme.direction === 'rtl' ? <SlMenu /> : <SlMenu />}
          </SlMenu>
        </DrawerHeader>
        {menu.map((item, index) => {
          return (
            <div key={index}>
              <List>
                {item.title && (
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{ fontSize: 20 }}
                    sx={{ opacity: open ? 1 : 0, px: 2 }}
                  />
                )}
                {item.children.map((child, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: 'block' }}
                  >
                    <ListItemButton
                      onClick={() => {
                        if (child.path === '/') {
                          dispatch(resetState())
                          cookies.remove('token')
                          if (cookies.get('token') === undefined) { router.push('/login') }
                        } else {
                          dispatch(addTask(child.path))
                          router.push(child.path)
                          setTitle(child.des)
                        }
                      }}
                      selected={selectedPage === child.path}
                      sx={{
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        mx: 2,
                        my: 1,
                        borderRadius: 3,
                        '&.Mui-selected': {
                          backgroundColor: '#B2BEB5',
                          boxShadow: 10
                        },
                        ':hover': {
                          backgroundColor: '#D3D3D3'
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center'
                        }}
                      >
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={child.des}
                        sx={{
                          opacity: open ? 1 : 0,
                          fontSize: 17,
                          fontWeight: 10
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ mx: 3 }} />
            </div>
          )
        })}
      </Drawer>
      <Main open={open} />
    </Box>
  )
}
