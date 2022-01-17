import { gql } from "@apollo/client";
import { REPOSITORY_FRAGMENT } from "./fragments";

export const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query getRepositories($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

export const STAR_REPOSITORY = gql`
  mutation ($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
        ... on Repository {
          id
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

export const REMOVE_STAR_REPOSITORY = gql`
  mutation ($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
        ... on Repository {
          id
          stargazers {
            totalCount
          }
        }
      }
    }
  }
`;

export const SUBSCRIBE_REPO_HANDLING = gql`
  mutation SubscribeRepo($id: ID!, $subscribeState: SubscriptionState!) {
    updateSubscription(input: { state: $subscribeState, subscribableId: $id }) {
      subscribable {
        viewerSubscription
        id
        ... on Repository {
          id
          name
          watchers {
            totalCount
          }
        }
      }
    }
  }
`;
