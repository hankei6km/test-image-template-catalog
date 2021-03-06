import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import Link from '../components/Link';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: '36rem',
    // padding: '0 1rem',
    width: '100%',
    margin: '0rem auto 2rem'
  },
  title: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > .MuiBox-root': {
      width: '100%',
      maxWidth: theme.breakpoints.values.md
    }
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > .MuiBox-root': {
      width: '100%',
      maxWidth: theme.breakpoints.values.md,
      padding: theme.spacing(1)
    }
  }
}));

type Props = {
  children?: ReactNode;
  title?: string;
  home?: boolean;
};

const Layout = ({
  children,
  title = 'This is the default title',
  home
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Head>
        <title>{`${title} - ${process.env.APP_NAME}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar>
          <Box className={classes.title}>
            <Box>
              {home ? (
                <Box>
                  <Typography variant="h6" color="textPrimary">
                    {`${process.env.APP_NAME}`}
                  </Typography>
                </Box>
              ) : (
                <Link aria-label="page title" underline="none" href="/">
                  <Box>
                    <Typography variant="h6" color="textPrimary">
                      {`${process.env.APP_NAME}`}
                    </Typography>
                  </Box>
                </Link>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={classes.content}>
        <Box>{children}</Box>
      </Box>
    </div>
  );
};
export default Layout;
