import React, { useEffect } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { DisqusErrorBoundary } from './DisqusErrorBoundary';

interface DisqusForumProps {
  shortname?: string;
  identifier?: string;
  title?: string;
}

export const DisqusForum: React.FC<DisqusForumProps> = ({
  shortname = 'class-work',
  identifier = 'sg-property-investor-forum-v1',
  title = 'Singapore Real Estate Investor Community Forum'
}) => {
  const pageUrl = typeof window !== 'undefined'
    ? window.location.origin + window.location.pathname
    : 'https://example.com/sg-property';

  const disqusConfig = {
    url: pageUrl,
    identifier: identifier,
    title: title,
    language: 'en'
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      (window as any).disqus_config = function (this: any) {
        this.page.url = pageUrl;
        this.page.identifier = identifier;
        this.page.title = title;
        this.language = 'en';
      };

      if ((window as any).DISQUS) {
        (window as any).DISQUS.reset({
          reload: true,
          config: (window as any).disqus_config
        });
      }
    } catch (err) {
      console.warn('Disqus init prevented cross-origin warning:', err);
    }
  }, [pageUrl, identifier, title]);

  return (
    <section id="community-disqus-forum" className="w-full mt-12 mb-8">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-400 rounded-2xl border border-emerald-500/30 shadow-inner">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Disqus Community Discussion Forum
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  Live Forum
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Share market insights, ask property valuation questions, and discuss Singapore real estate trends.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-xs font-bold text-emerald-400 bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <DisqusErrorBoundary shortname={shortname} fallbackText="Comments">
                <CommentCount shortname={shortname} config={disqusConfig}>
                  Disqus Comments
                </CommentCount>
              </DisqusErrorBoundary>
            </div>

            <a
              href={`https://disqus.com/home/forum/${shortname}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700/80 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              Open on Disqus <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Disqus Embed Container */}
        <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800/90 min-h-[320px]">
          <DisqusErrorBoundary shortname={shortname} fallbackText="Disqus community discussion thread">
            <DiscussionEmbed shortname={shortname} config={disqusConfig} />
          </DisqusErrorBoundary>
        </div>

      </div>
    </section>
  );
};
