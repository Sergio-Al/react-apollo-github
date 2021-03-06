import React from "react";

export type WatchersNodeEdgesRepository = {
  totalCount: number;
};

export type StargazersNodeEdgesRepository = {
  totalCount: number;
};

export type PrimaryLanguageNodeEdgesRepository = {
  name: string;
};

export type OwnerNodeEdgesRepository = {
  login: string;
  url: string;
};

export type viewerSubscriptionStatuses =
  | "SUBSCRIBED"
  | "UNSUBSCRIBED"
  | "IGNORED";

export type NodeEdgesRepository = {
  id: string;
  name: string;
  descriptionHTML: string;
  owner: OwnerNodeEdgesRepository;
  primaryLanguage: PrimaryLanguageNodeEdgesRepository | null;
  stargazers: StargazersNodeEdgesRepository;
  url: string;
  viewerHasStarred: boolean;
  viewerSubscription: viewerSubscriptionStatuses;
  watchers: WatchersNodeEdgesRepository;
};

export type EdgesRepository = {
  node: NodeEdgesRepository;
};

export type PageInfoRepository = {
  endCursor: string;
  hasNextPage: boolean;
};

export type Repositories = {
  edges: Array<EdgesRepository>;
  pageInfo: PageInfoRepository;
};

// Issues

export type Issues = {
  edges: Array<EdgesIssues>;
};

export type EdgesIssues = {
  node: NodeIssues;
};

export type NodeIssues = {
  id: string;
  number: number;
  state: string;
  title: string;
  url: string;
  body: string;
};

export type ISSUE_STATES = "NONE" | "OPEN" | "CLOSED";
