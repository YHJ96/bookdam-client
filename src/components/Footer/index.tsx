import { Github, Mail } from 'lucide-react';

import { Button } from '@/shared/ui';

export default function Footer() {
  return (
    <footer className="border-b border-t bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-6 sm:px-16 sm:py-24">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-16">
          <div className="flex items-center space-x-8 sm:space-x-16">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/YHJ96"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <Github className="h-10 w-10 sm:h-20 sm:w-20" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="mailto:yhj960226@gmail.com"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <Mail className="h-10 w-10 sm:h-20 sm:w-20" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">@Created by YHJ96</p>
        </div>
      </div>
    </footer>
  );
}
