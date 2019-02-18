// Root entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { Global } from '@emotion/core';
import * as React from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';

/* Local */

// Components
import ScrollTop from '@/components/helpers/scrollTop';

// Global styles
import globalStyles from '@/global/styles';

// Routes
import routes from '@/data/routes';

// ----------------------------------------------------------------------------

const Root = () => (
  <div>
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
  </div>
);

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
