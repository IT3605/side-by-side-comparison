import React, { useState, useRef, useEffect } from 'react';
import { Info, HelpCircle, X, Sparkles, BookOpen, Calculator } from 'lucide-react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content?: React.ReactNode;
  title?: string;
  badge?: string;
  formula?: string;
  benchmark?: string;
  children?: React.ReactNode;
  position?: TooltipPosition;
  className?: string;
  widthClass?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  title,
  badge,
  formula,
  benchmark,
  children,
  position = 'top',
  className = '',
  widthClass = 'w-72 sm:w-80',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside on mobile or desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {/* Trigger Button or Wrapped Content */}
      {children ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="cursor-help inline-flex items-center gap-1"
        >
          {children}
        </div>
      ) : (
        <button
          type="button"
          aria-label={title || 'Technical definition'}
          aria-expanded={isOpen}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="p-0.5 text-slate-400 hover:text-emerald-400 focus:text-emerald-300 transition-colors rounded-full hover:bg-slate-800/80 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Floating Tooltip Bubble */}
      {isOpen && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`absolute z-50 ${getPositionClasses()} ${widthClass} p-3.5 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 text-slate-200 rounded-xl shadow-2xl shadow-slate-950/80 text-xs pointer-events-auto transition-all animate-fadeIn`}
          style={{ maxWidth: 'calc(100vw - 32px)' }}
        >
          {/* Header */}
          {(title || badge) && (
            <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{title}</span>
              </div>
              {badge && (
                <span className="px-1.5 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold rounded shrink-0">
                  {badge}
                </span>
              )}
            </div>
          )}

          {/* Description Content */}
          <div className="text-[11px] leading-relaxed text-slate-300 space-y-2">
            {content}
          </div>

          {/* Formula Section if available */}
          {formula && (
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 bg-slate-950/60 p-2 rounded-lg text-[10px] font-mono text-emerald-300/90 border border-slate-800">
              <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
                <Calculator className="w-2.5 h-2.5 text-emerald-400" /> Formula
              </div>
              <div>{formula}</div>
            </div>
          )}

          {/* Benchmark Section if available */}
          {benchmark && (
            <div className="mt-2 text-[10px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md">
              <span className="font-semibold text-amber-400">Benchmark: </span>
              {benchmark}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const InfoTooltip: React.FC<{
  title: string;
  badge?: string;
  content: React.ReactNode;
  formula?: string;
  benchmark?: string;
  position?: TooltipPosition;
  widthClass?: string;
}> = (props) => {
  return (
    <Tooltip
      title={props.title}
      badge={props.badge}
      content={props.content}
      formula={props.formula}
      benchmark={props.benchmark}
      position={props.position}
      widthClass={props.widthClass}
    >
      <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-emerald-400 cursor-help transition-colors" />
    </Tooltip>
  );
};
