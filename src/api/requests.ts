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
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            ...repository
          }
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

export const SUBSCRIBE_REPO = gql`
  mutation SubscribeRepo($id: ID!) {
    updateSubscription(input: { state: SUBSCRIBED, subscribableId: $id }) {
      subscribable {
        viewerSubscription
        id
      }
    }
  }
`;

export const UNSUBSCRIBE_REPO = gql`
  mutation SubscribeRepo($id: ID!) {
    updateSubscription(input: { state: UNSUBSCRIBED, subscribableId: $id }) {
      subscribable {
        viewerSubscription
        id
      }
    }
  }
`;

export const IGNORE_REPO = gql`
  mutation SubscribeRepo($id: ID!) {
    updateSubscription(input: { state: IGNORED, subscribableId: $id }) {
      subscribable {
        viewerSubscription
        id
      }
    }
  }
`;
