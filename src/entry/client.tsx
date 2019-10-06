// Client entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// Create browser history, for navigation a la single page apps
import createBrowserHistory from 'history/createBrowserHistory';

// React, our UI engine
import * as React from 'react';

// HOC for enabling Apollo GraphQL `<Query>` and `<Mutation>`
import { ApolloProvider } from 'react-apollo';

// Attach React to the browser DOM
import * as ReactDOM from 'react-dom';

// Single page app routing
import { Router } from 'react-router-dom';

/* Local */

// Our main component, and the starting point for server/browser loading
import Root from '@/components/root';

// Helper function that cretes a new Apollo client per request
import { createClient } from '@/lib/apollo';

// MobX state
import { State } from '@/data/state';
import { rehydrate, StateProvider } from '@/lib/mobx';
import { CookiesProvider } from 'react-cookie';

// ----------------------------------------------------------------------------

// Create Apollo client

// Create new MobX state
const state = new State();

// Create a browser history
const history = createBrowserHistory();

// Rehydrate MobX state, if applicable
rehydrate(state);

// Render
class Main extends React.Component {
  state = {
    client: null,
  };
  async componentWillMount() {
    try {
      const client = await createClient(null);
      this.setState({ client });
    } catch (e) {
      console.log('Client failed with', e);
    }
  }

  render() {
    return (
      <CookiesProvider>
        <StateProvider value={state}>
          <ApolloProvider client={this.state.client!}>
            <Router history={history}>
              <Root />
            </Router>
          </ApolloProvider>
        </StateProvider>
      </CookiesProvider>
    );
  }
}
ReactDOM.render(<Main />, document.getElementById('root'));
