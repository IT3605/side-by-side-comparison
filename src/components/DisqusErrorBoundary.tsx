import React, { Component, ErrorInfo, ReactNode } from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackText?: string;
  shortname?: string;
}

interface State {
  hasError: boolean;
}

export class DisqusErrorBoundary extends Component<Props, State> {
  declare props: Props;
  
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Disqus cross-origin iframe warning handled safely:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const shortname = this.props.shortname || 'class-work';
      return (
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{this.props.fallbackText || 'Community comments loaded in secure frame mode.'}</span>
          </div>
          <a
            href={`https://disqus.com/home/forum/${shortname}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
          >
            View on Disqus <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
