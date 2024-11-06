import { Github, Mail } from 'lucide-react';

import { Button } from '@/shared/ui';

// Dark
export default function Footer() {
  return (
    <footer className="w-full border-b border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-center justify-between gap-8 py-12 sm:flex-row sm:px-20">
        <div className="flex items-center space-x-16">
          <Button variant="ghost" size="icon" asChild>
            <a
              className="text-gray-600 hover:text-gray-900 dark:hover:bg-neutral-800"
              href="https://github.com/YHJ96"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-16 w-16 sm:h-20 sm:w-20" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="mailto:9668788@gmail.com" className="text-gray-600 hover:text-gray-900 dark:hover:bg-neutral-800">
              <Mail className="h-16 w-16 sm:h-20 sm:w-20" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
        </div>
        <p className="text-xs text-gray-600 sm:text-sm">@Created by YHJ96</p>
      </div>
    </footer>
  );
}
