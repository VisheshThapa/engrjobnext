import { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Image from 'next/image'
import Login from "./Login";
import UserMenu from "./UserMenu";
import logo from '../public/turtlelogo.png'
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));


const links = [{
      "link": "/",
      "label": "Home"
    },
    {
      "link": "/postjob",
      "label": "Post a Job"
    },

    {
      "link": "/enter",
      "label": "Enter"
    },
  
  ]


export default function Navbar() {
  const { session, profile } = useContext(UserContext)

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    
    <Link
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Image src = {logo} alt = 'logo image' width = '55' height = '55' />
        <h3 className='mx-0'>Otter Inventor</h3>
        
        
        
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        {/* <ActionIcon
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
          className=""
        >


          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon> */}

        {/* user is signed-in and has username */}
        {session?.user && (
          <>
            
              <Link href="/admin" className={cx(classes.link, { [classes.linkActive]: active === '/admin' })}>
                    Admin
              </Link>

              <Link href={`/${session?.user}`}>
                <Image src= '/../public/turtlelogo.png' alt = 'Profile Picture' width = '50' height='50' />
              </Link>
            
          </>
        )}

        {/* user is not signed OR has not created username */}
        {session?.user ? <UserMenu /> : <Login />}


        
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              
            </Paper>
          )}

          
        </Transition>
        
      </Container>
    </Header>
  );
}