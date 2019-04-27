// ReactQL example page - delete this folder for your own project!

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// Hacker News GraphQL example
// import HackerNews from "./hackernews";
import Layout from '@/components/helpers/layout';
import RecipeForm from '@/components/recipes/form';
import { Divider, Drawer, IconButton, Paper, Theme, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/styles';
import classNames from 'classnames';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import RecipeListAppBar from './recipe_list_app_bar';
import RecipesComponent from './recipes';

/* Local */

// ----------------------------------------------------------------------------
const drawerWidth = 1200;
const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    appBarShift: {
      marginRight: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    content: {
      flexGrow: 1,
      marginRight: -drawerWidth,
      padding: theme.spacing.unit * 3,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
    },
    contentShift: {
      marginRight: 0,
      transition: theme.transitions.create('margin', {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.easeOut,
      }),
    },
    drawer: {
      flexShrink: 0,
      width: drawerWidth,
    },
    drawerHeader: {
      alignItems: 'center',
      display: 'flex',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    extras: {
      marginRight: '22px',
    },
    grid: {
      padding: 8,
    },
    hide: {
      display: 'none',
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    root: {
      display: 'flex',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    textFieldRight: {
      marginLeft: theme.spacing.unit,
      marginRight: '22px',
    },
    title: {
      paddingLeft: '8px',
      paddingTop: '8px',
    },
  };
});

// const theme = useTheme<Theme>();
// import { install } from '@material-ui/styles';
// install();

// interface IIndexState {
//   recipes: React.FC | null;
// }

const RecipesContainer = (props) => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let token = null;
  try {
    token = Cookies.get('homebarToken');
  } catch {}
  if (!token) {
    props.history.push('/login');
  }

  // const RecipesComponent = this.state.recipes || (() => <h2>Loading...</h2>);

  function handleDrawerOpen() {
    setOpen(true);
  }
  function handleDrawerClose() {
    setOpen(false);
  }
  return (
    <>
      <RecipeListAppBar
        position="fixed"
        handleAddDrawerOpen={handleDrawerOpen}
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      />
      <Layout>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Paper>
            <Typography variant="h5" className={classes.title}>
              Add new recipe
            </Typography>
            <RecipeForm />
          </Paper>
        </Drawer>
        <RecipesComponent />
      </Layout>
    </>
  );
};

export default RecipesContainer;
