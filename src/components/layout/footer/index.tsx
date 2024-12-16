'use client';

import { Github, Mail } from 'lucide-react';

import { Button } from '@/shared/ui';

export default function Footer() {
  return (
    <footer className="w-full border-t border-primary">
      <div className="flex flex-col items-center justify-between gap-1 py-2.5 md:flex-row md:px-4">
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/YHJ96" target="_blank" rel="noopener noreferrer">
              <Github />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:9668788@gmail.com">
              <Mail />
              <span className="sr-only">Email</span>
            </a>
          </Button>
        </nav>
        <p className="text-xs text-gray-600 dark:text-gray-400 md:text-sm">@Created by YHJ96</p>
      </div>
    </footer>
  );
}
