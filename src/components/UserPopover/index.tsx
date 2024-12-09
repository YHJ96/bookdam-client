'use client';

import * as React from 'react';

import { ChevronsUpDown, LogOut } from 'lucide-react';

import { ThemeTabs, UserAvatar } from '@/components';
import { Button, Popover, PopoverContent, PopoverTrigger, Separator, SidebarMenuButton } from '@/shared/ui';

type UserPopoverProps = {
  name: string;
  avatar: string;
  email: string;
};

function UserPopover({ name, avatar, email }: UserPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarMenuButton size="lg">
          <UserAvatar name={name} email={email} avatarSrc={avatar} />
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <UserAvatar name={name} email={email} avatarSrc={avatar} />
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
  );
}

export default UserPopover;
