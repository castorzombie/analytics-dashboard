import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  headerLeft?: React.ReactNode;
  showTitle?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, headerLeft, showTitle = true }) => {
  return (
  <div className="min-h-screen flex flex-col bg-slate-900 text-background-foreground">
      <header className="w-full py-4 px-0 sm:px-4 md:px-8 lg:px-16 bg-slate-900 text-white shadow flex items-center justify-between">
        <div className="flex flex-1 items-center gap-4 w-full justify-center sm:justify-start">
          {headerLeft}
          {showTitle && (
            <h1
              className="text-2xl font-bold tracking-tight ml-2 sm:ml-0 text-center sm:text-left w-full"
              style={{
                background:
                  'linear-gradient(-135deg, rgb(170, 181, 234) 0%, rgb(65, 215, 189) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Analytics Dashboard
            </h1>
          )}
        </div>
        {/* Add nav or user info here if needed */}
      </header>
      <main className="flex-1 px-2 sm:px-4 md:px-8 lg:px-16 py-2 sm:py-4 md:py-8">{children}</main>
      <footer className="w-full py-4 px-8 bg-slate-900 text-gray-400 text-center text-sm">
        &copy; {new Date().getFullYear()} Analytics Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
