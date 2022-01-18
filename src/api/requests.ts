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

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query ($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      repositories(first: 5, after: $cursor) {
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

export const GET_ISSUES_OF_REPOSITORY = gql`
  query ($repositoryOwner: String!, $repositoryName: String!) {
    repository(name: $repositoryName, owner: $repositoryOwner) {
      issues(first: 2, orderBy: { field: CREATED_AT, direction: DESC }) {
        edges {
          node {
            id
            number
            state
            title
            url
            body
          }
        }
      }
    }
  }
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
