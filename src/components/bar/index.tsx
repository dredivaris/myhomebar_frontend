import * as Cookies from 'js-cookie';
import * as React from 'react';
import { withRouter } from 'react-router';

// ----------------------------------------------------------------------------

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
const Bar: React.FC = ({history}) => {
  let token = null;
  try {
    token = Cookies.get('homebarToken');
  } catch {}
  if (!token) {
    history.push('/login');
  }

  return (
    <>
      <h2>Bar loaded!</h2>
    </>
  );
};

export default withRouter(Bar);
