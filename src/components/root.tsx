// Root entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { Global } from '@emotion/core';
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faStarHalfAlt);
library.add(faStar);

/* Local */

// Components
import ScrollTop from '@/components/helpers/scrollTop';

// Global styles
import globalStyles from '@/global/styles';

// Routes
import NavBar from '@/components/helpers/navbar';
import routes from '@/data/routes';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

// ----------------------------------------------------------------------------
const theme = createMuiTheme({});

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Helmet>
        <title>HomeBar</title>
      </Helmet>
      <ScrollTop>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      </ScrollTop>
      <NavBar />
    </ThemeProvider>
  );
};

export default hot(module)(Root);

//
// const Root = () => (
//   <div>
//     <Global styles={globalStyles} />
//     <Helmet>
//       <title>ReactQL starter kit - edit me!</title>
//     </Helmet>
//     <ScrollTop>
//       <Switch>
//         {routes.map(route => (
//           <Route key={route.path} {...route} />
//         ))}
//       </Switch>
//     </ScrollTop>
//   </div>
// );
//
// export default hot(module)(Root);
