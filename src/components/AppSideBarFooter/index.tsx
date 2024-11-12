'use client';

import * as React from 'react';

import { ChevronsUpDown, LogOut } from 'lucide-react';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui';

import { ThemeTabs, UserAvatar } from './ui';

function AppSideBarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Popover>
            {/* [FIX_ME] 모달 분리 */}
            <PopoverTrigger asChild>
              <SidebarMenuButton size="lg">
                <UserAvatar name="YHJ96" email="9668788@naver.com" avatarSrc="https://github.com/yhj96.png" />
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <UserAvatar name="YHJ96" email="9668788@naver.com" avatarSrc="https://github.com/yhj96.png" />
              </div>
              <Separator />
              <Button variant="ghost" className="h6 justify-start px-2.5 py-1.5 text-sm">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
              <Separator />
              <div>
                <span className="text-xs text-gray-500">설정</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm">테마</span>
                  <ThemeTabs />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export default AppSideBarFooter;
