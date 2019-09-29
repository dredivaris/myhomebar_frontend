import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as React from 'react';

const Recipe: React.FC = (props) => {
  const { usersRecipe, handleChange, expanded} = props;

  return (
    <ExpansionPanel
      expanded={expanded === `panel${usersRecipe.id}`}
      onChange={handleChange(`panel${usersRecipe.id}`)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography>{usersRecipe.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus
          est, id dignissim quam.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Recipe;
