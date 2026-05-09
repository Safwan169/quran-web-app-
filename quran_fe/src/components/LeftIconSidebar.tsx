import React from 'react';
import {
  Home,
  Grid3x3,
  Bookmark,
  Compass,
  Apps,
} from 'lucide-react';
import Link from 'next/link';

interface LeftIconSidebarProps {
  activeIcon?: 'home' | 'dots' | 'bookmark' | 'compass' | 'apps';
}

const icons = [
  { id: 'home', icon: Home, href: '/' },
  { id: 'dots', icon: Grid3x3, href: '#' },
  { id: 'bookmark', icon: Bookmark, href: '#' },
  { id: 'compass', icon: Compass, href: '#' },
  { id: 'apps', icon: Apps, href: '#' },
];

export function LeftIconSidebar({ activeIcon = 'home' }: LeftIconSidebarProps) {
  return (
    <aside className="hidden md:flex flex-col items-center justify-start w-16 bg-dark-sidebar border-r border-gray-700 h-screen fixed left-0 top-0 pt-4 gap-8">
      {icons.map(({ id, icon: Icon, href }) => (
        <Link key={id} href={href}>
          <button
            className={`p-3 rounded-lg transition-colors ${
              activeIcon === id
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            aria-label={id}
            title={id}
          >
            <Icon size={24} />
          </button>
        </Link>
      ))}
    </aside>
  );
}
