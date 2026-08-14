import React from 'react';

declare module 'disqus-react' {
  export interface DiscussionEmbedConfig {
    url?: string;
    identifier?: string;
    title?: string;
    language?: string;
  }

  export interface DiscussionEmbedProps {
    shortname: string;
    config: DiscussionEmbedConfig;
  }

  export interface CommentCountProps {
    shortname: string;
    config: DiscussionEmbedConfig;
    children?: React.ReactNode;
    className?: string;
  }

  export class DiscussionEmbed extends React.Component<DiscussionEmbedProps> {}
  export class CommentCount extends React.Component<CommentCountProps> {}
}
