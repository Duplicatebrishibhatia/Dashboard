import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link 
                  href="/" 
                  className="text-xl font-bold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/items" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Items
              </Link>
              <Link 
                href="/items/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Add Item
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 pb-8">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Dashboard © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
} 