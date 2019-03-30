// ReactQL example page - delete this folder for your own project!

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// Hacker News GraphQL example
// import HackerNews from "./hackernews";
import Layout from '@/components/helpers/layout';
import {
  Button,
  Divider,
  Drawer,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select, TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/styles';
import classNames from 'classnames';
import * as React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import RecipeListAppBar from './recipe_list_app_bar';
import RecipesComponent from './recipes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Local */

// ----------------------------------------------------------------------------
const drawerWidth = 1200;
// const theme = useTheme<Theme>();
// import { install } from '@material-ui/styles';
// install();
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

// interface IIndexState {
//   recipes: React.FC | null;
// }

const RecipesContainer = () => {
  const classes = useStyles();
  const theme: Theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('COCKTAIL');
  const [rating, setRating] = React.useState(4);
  // const RecipesComponent = this.state.recipes || (() => <h2>Loading...</h2>);

  function handleDrawerOpen() {
    setOpen(true);
  }
  function handleDrawerClose() {
    setOpen(false);
  }
  const onStarClick = (nextValue, prevValue, name, e) => {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }

    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    // console.log(e);
    setRating(nextValue);
  };
  // TODO: currently figuring out how to display forms with multiple dynamic fields (ingredients)
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
            <Typography variant="h5" className={classes.title}>Add new recipe</Typography>
            <form>
              <Grid container direction="row">
                <Grid item xs={12} sm={4} className={classes.grid}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Name</InputLabel>
                    <Input id="name" name="name" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <FormLabel>Ingredients:</FormLabel>
                    <TextField
                      id="filled-multiline-static"
                      multiline
                      rows="35"
                      rowsMax="100"
                      defaultValue=""
                      className={classes.textField}
                      margin="normal"
                      variant="filled"
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="source">Source</InputLabel>
                    <Input id="source" name="source" autoFocus className={classes.extras}/>
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="source-url">Source Url</InputLabel>
                    <Input id="source-url" name="source-url" autoFocus className={classes.extras} />
                  </FormControl>

                </Grid>
                <Grid item xs={12} sm={8} className={classes.grid}>
                  <Grid container direction="row">
                    <Grid item xs={12} sm={8} className={classes.grid}>
                      <FormControl margin="dense" required fullWidth variant="filled">
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={type}
                          // onChange={handleChange}
                          // inputProps={{
                          //   name: 'age',
                          //   id: 'age-simple',
                        >
                          <MenuItem value="COCKTAIL">
                            <em>Cocktail</em>
                          </MenuItem>
                          <MenuItem value={'COCKTAIL'}>Cocktail</MenuItem>
                          <MenuItem value={'CORDIAL'}>Cordial</MenuItem>
                          <MenuItem value={'BITTERS'}>Bitters</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.grid}>
                      <StarRatingComponent
                        name="app6"
                        starCount={5}
                        starColor="#ffb400"
                        emptyStarColor="#ffb400"
                        value={rating}
                        onStarClick={onStarClick}
                        renderStarIcon={(index: any, value: any) => {
                          return (
                            <span>
                          <FontAwesomeIcon
                            icon="star"
                            size="lg"
                            style={
                              index <= value
                                ? {float: 'right', cursor: 'pointer', color: 'rgb(255, 180, 0)'}
                                : {float: 'right', cursor: 'pointer', color: 'rgb(51, 51, 51)'}}/>
                        </span>
                          );
                        }}
                        renderStarIconHalf={() => {
                          // todo: add half star
                          return (
                            <span>
                          <FontAwesomeIcon icon="star-half-alt" size="lg"/>
                        </span>
                          );
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sm={4}>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="glassware">Glassware</InputLabel>
                        <Input id="glassware" name="glassware" autoFocus className={classes.extras}/>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="tools">Tools</InputLabel>
                        <Input id="tools" name="tools" autoFocus className={classes.extras} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="garnish">Garnish</InputLabel>
                        <Input id="garnish" name="garnish" autoFocus className={classes.extras} />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl margin="normal" fullWidth>
                        <FormLabel>Description:</FormLabel>
                        <TextField
                          id="filled-multiline-static"
                          multiline
                          rows="8"
                          rowsMax="100"
                          defaultValue=""
                          className={classes.textFieldRight}
                          margin="normal"
                          variant="filled"
                          name="description"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl margin="normal" fullWidth>
                        <FormLabel>Directions:</FormLabel>
                        <TextField
                          id="filled-multiline-static"
                          multiline
                          rows="18"
                          rowsMax="100"
                          defaultValue=""
                          className={classes.textFieldRight}
                          margin="normal"
                          variant="filled"
                          name="directions"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl margin="normal" fullWidth>
                        <FormLabel>Notes:</FormLabel>
                        <TextField
                          id="filled-multiline-static"
                          multiline
                          rows="3"
                          rowsMax="100"
                          defaultValue=""
                          className={classes.textFieldRight}
                          margin="normal"
                          variant="filled"
                          name="notes"
                        />
                      </FormControl>
                    </Grid>

                  </Grid>
                </Grid>

                {/*<FormControlLabel*/}
                {/*  control={<Checkbox value="remember" color="primary" />}*/}
                {/*  label="Remember me"*/}
                {/*/>*/}
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Save recipe
                </Button>
              </Grid>
            </form>
          </Paper>
        </Drawer>
        <RecipesComponent />
      </Layout>
    </>
  );
};

export default RecipesContainer;
