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

export type NodeEdgesRepository = {
  id: string;
  name: string;
  descriptionHTML: string;
  owner: OwnerNodeEdgesRepository;
  primaryLanguage: PrimaryLanguageNodeEdgesRepository;
  stargazers: StargazersNodeEdgesRepository;
  url: string;
  viewerHasStarred: boolean;
  viewerSubscription: "SUBSCRIBED" | "UNSUBSCRIBED" | "IGNORED";
  watchers: WatchersNodeEdgesRepository;
};

export type EdgesRepository = {
  node: NodeEdgesRepository;
};

export type Repositories = {
  edges: Array<EdgesRepository>;
};
