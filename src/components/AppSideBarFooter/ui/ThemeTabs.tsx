import React from 'react';

import { useTheme } from 'next-themes';

import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Laptop, Moon, Sun } from 'lucide-react';

import { Tabs, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider } from '@/shared/ui';

const THEME = [
  { key: 'system', name: '시스템', icon: Laptop },
  { key: 'light', name: '라이트', icon: Sun },
  { key: 'dark', name: '다크', icon: Moon },
] as const;

function ThemeTabs() {
  const { setTheme, theme } = useTheme();
  const hanldeThemeButtonOnClick = (theme: 'system' | 'light' | 'dark') => () => setTheme(theme);

  return (
    <Tabs defaultValue={theme}>
      <TabsList className="h-6 gap-2 rounded-full py-4">
        <TooltipProvider>
          {THEME.map((theme) => (
            <Tooltip key={theme.key}>
              <TabsTrigger
                value={theme.key}
                className="size-6 rounded-full p-0"
                onClick={hanldeThemeButtonOnClick(theme.key)}
              >
                <TooltipTrigger asChild>
                  <theme.icon className="size-4" />
                </TooltipTrigger>
                <TooltipContent>{theme.name}</TooltipContent>
              </TabsTrigger>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TabsList>
    </Tabs>
  );
}

export default ThemeTabs;
