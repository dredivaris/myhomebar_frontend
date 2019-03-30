import beverages from '@/queries/beverages';
import { allApiBeverages } from '@/queries/types/allApiBeverages';
import { List, Typography } from '@material-ui/core';
import * as React from 'react';
import { Query } from 'react-apollo';

// ----------------------------------------------------------------------------

// Say hello from GraphQL, along with a HackerNews feed fetched by GraphQL
const Recipes: React.FC = () => {
  // console.log('props are', props);

  return (
    <Query<allApiBeverages> query={beverages}>
      {(result) => {
        if (result.data && result.data.allApiBeverages) {
          console.log('our results are...', result.data.allApiBeverages.nodes);
          const beverages = result.data.allApiBeverages.nodes;
          beverages.map((bev) => {
            console.log('in bev, ', bev);
          });
        }

        // Any errors? Say so!
        if (result.error) {
          return <h1>Error retrieving units! &mdash; {result.error}</h1>;
        }

        // If the data is still loading, return with a basic
        // message to alert the user
        if (result.loading) {
          return <h1>Loading units ...</h1>;
        }
        // const name = result.data!.allApiUnits!.nodes[0]!.name;
        // const {
        //   data: {
        //     allApiUnits: { nodes },
        //   },
        // } = result;

        // Otherwise, we have data to work with... map over it with a
        // bullet-point list

        return (
          <>
            <List>
              {result.data &&
                result.data.allApiBeverages &&
                result.data.allApiBeverages.nodes.map((bev) => {
                  return <Typography>{bev!.name}</Typography>;
                })}
              {/*{result.data!.hn.topStories.map(story => (*/}
              {/*  <Story key={story.id}>*/}
              {/*    <a href={story.url} target="_blank">*/}
              {/*      {story.title}*/}
              {/*    </a>*/}
              {/*  </Story>*/}
              {/*))}*/}
            </List>
          </>
        );
      }}
    </Query>
  );
};

export default Recipes;
