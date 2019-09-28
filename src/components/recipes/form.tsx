import { ADD_RECIPE } from '@/queries/graphene_graphql_mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import * as React from 'react';
import Mutation from 'react-apollo/Mutation';
import { Simulate } from 'react-dom/test-utils';
import StarRatingComponent from 'react-star-rating-component';
import input = Simulate.input;

const drawerWidth = 1200;
const useStyles = makeStyles((theme) => {
  return {
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp,
      }),
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
      paddingTop: '6px',
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

const RecipeForm: React.FC = ({}) => {
  const classes = useStyles();
  const [type, setType] = React.useState('COCKTAIL');
  const [rating, setRating] = React.useState(4);

  const [values, setValues] = React.useState({
    directions: '',
    ingredients: '',
    name: '',
    rating: 0.0,
    ratingSet: false,
    recipeType: 'COCKTAIL',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeSelect = (event) => {
    console.log('in select change', event.target.name, event.target.value);

    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onStarClick = (nextValue, prevValue, name, e) => {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }

    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    // console.log(e);
    setValues({ ...values, ['rating']: nextValue, ['ratingSet']: true });
  };

  return (
    <Mutation mutation={ADD_RECIPE}>
      {(addRecipe, { data }) => (
        <div>
          <form
            onSubmit={(e) => {
              console.log('in onsubmit, ', values);

              e.preventDefault();
              addRecipe({
                variables: values,
              });
              // nameInput.value = '';
            }}
          >
            <Grid container direction="row">
              <Grid item xs={12} sm={4} className={classes.grid}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input id="name" name="name" autoFocus onChange={handleChange('name')} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <FormLabel>Ingredients:</FormLabel>
                  <TextField
                    multiline
                    rows="31"
                    rowsMax="100"
                    defaultValue=""
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    id="ingredients"
                    name="ingredients"
                    onChange={handleChange('ingredients')}
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="source">Source</InputLabel>
                  <Input
                    id="source"
                    name="source"
                    onChange={handleChange('source')}
                    autoFocus
                    className={classes.extras}
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="source-url">Source Url</InputLabel>
                  <Input
                    id="source-url"
                    name="source-url"
                    type="url"
                    onChange={handleChange('sourceUrl')}
                    autoFocus
                    className={classes.extras}
                  />
                </FormControl>
                <FormControl margin="normal" fullWidth>
                  <InputLabel htmlFor="attribution">Attribution</InputLabel>
                  <Input
                    id="attribution"
                    name="attribution"
                    onChange={handleChange('attribution')}
                    autoFocus
                    className={classes.extras}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={8} className={classes.grid}>
                <Grid container direction="row">
                  <Grid item xs={12} sm={8} className={classes.grid}>
                    <FormControl margin="dense" required fullWidth variant="filled">
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={values.recipeType}
                        onChange={handleChangeSelect}
                        inputProps={{
                          id: 'recipe-type',
                          name: 'recipeType',
                        }}
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
                      id="rating"
                      name="rating"
                      starCount={5}
                      starColor="#ffb400"
                      emptyStarColor="#ffb400"
                      value={values.rating}
                      onStarClick={onStarClick}
                      renderStarIcon={(index: any, value: any) => {
                        return (
                          <span>
                            <FontAwesomeIcon
                              icon="star"
                              size="lg"
                              style={
                                index <= value
                                  ? {
                                    color: 'rgb(255, 180, 0)',
                                    cursor: 'pointer',
                                    float: 'right',
                                  }
                                  : {
                                    color: 'rgb(51, 51, 51)',
                                    cursor: 'pointer',
                                    float: 'right',
                                  }
                              }
                            />
                          </span>
                        );
                      }}
                      renderStarIconHalf={() => {
                        return (
                          <span>
                            <FontAwesomeIcon icon="star-half-alt" size="lg" />
                          </span>
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="glassware">Glassware</InputLabel>
                      <Input
                        id="glassware"
                        name="glassware"
                        onChange={handleChange('glassware')}
                        autoFocus
                        className={classes.extras}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="tools">Tools</InputLabel>
                      <Input
                        id="tools"
                        name="tools"
                        onChange={handleChange('tools')}
                        autoFocus
                        className={classes.extras}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <FormControl margin="normal" fullWidth>
                      <InputLabel htmlFor="garnish">Garnish</InputLabel>
                      <Input
                        id="garnish"
                        name="garnish"
                        onChange={handleChange('garnish')}
                        autoFocus
                        className={classes.extras}
                      />
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
                    <FormControl margin="normal" required fullWidth>
                      <FormLabel>Directions:</FormLabel>
                      <TextField
                        multiline
                        rows="18"
                        rowsMax="100"
                        defaultValue=""
                        className={classes.textFieldRight}
                        margin="normal"
                        variant="filled"
                        id="directions"
                        name="directions"
                        onChange={handleChange('directions')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl margin="normal" fullWidth>
                      <FormLabel>Notes:</FormLabel>
                      <TextField
                        id="notes"
                        name="notes"
                        onChange={handleChange('notes')}
                        multiline
                        rows="3"
                        rowsMax="100"
                        defaultValue=""
                        className={classes.textFieldRight}
                        margin="normal"
                        variant="filled"
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
        </div>
      )}
    </Mutation>
  );
};

export default RecipeForm;
