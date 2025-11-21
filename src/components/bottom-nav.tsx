'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, Apple, TrendingUp, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/workouts', icon: Dumbbell, label: 'Treinos' },
    { href: '/nutrition', icon: Apple, label: 'Nutrição' },
    { href: '/progress', icon: TrendingUp, label: 'Progresso' },
    { href: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#2A2A2A] z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-[#4CAF50]' : 'text-[#B0B0B0] hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
