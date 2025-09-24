import * as React from 'react';

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined);

interface PopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ open, onOpenChange, children }) => {
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onOpenChange]);

  return (
    <PopoverContext.Provider value={{ open, setOpen: onOpenChange }}>
      <div className="relative" ref={popoverRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps {
  children: React.ReactNode;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) return <>{children}</>;
  if (!React.isValidElement(children)) return <>{children}</>;
  const childElement = children as React.ReactElement<any>;
  const origOnClick = childElement.props.onClick;
  return React.cloneElement(childElement, {
    ...childElement.props,
    onClick: (e: React.MouseEvent) => {
      ctx.setOpen(!ctx.open);
      if (origOnClick) origOnClick(e);
    },
    'aria-haspopup': 'dialog',
    'aria-expanded': ctx.open,
  });
};

interface PopoverContentProps {
  className?: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  className = '',
  children,
  side = 'bottom',
  align = 'center',
}) => {
  const ctx = React.useContext(PopoverContext);
  if (!ctx || !ctx.open) return null;

  // Positioning logic
  let positionClass = '';
  if (side === 'top') positionClass += ' bottom-full mb-2 ';
  if (side === 'bottom') positionClass += ' top-full mt-2 ';
  if (side === 'left') positionClass += ' right-full mr-2 top-0 ';
  if (side === 'right') positionClass += ' left-full ml-2 top-0 ';
  if (align === 'start') positionClass += ' left-0 ';
  else if (align === 'end') positionClass += ' right-0 ';
  else positionClass += ' left-1/2 -translate-x-1/2 ';

  // Responsive width and prevent horizontal overflow
  const style: React.CSSProperties = {
    minWidth: 80,
    maxWidth: '96vw',
    width: '100%',
    boxSizing: 'border-box',
    ...((side === 'left' || side === 'right') && { width: 'auto', minWidth: 80, maxWidth: 240 }),
  };

  return (
    <div
      className={`absolute z-50 bg-slate-800 border border-slate-700 text-slate-100 rounded-lg shadow ${positionClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
