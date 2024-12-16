'use client';

import React from 'react';

import { User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui';

type UserAvatarProps = {
  name: string;
  email: string;
  avatarSrc: string;
};

function UserAvatar({ name, email, avatarSrc }: UserAvatarProps) {
  return (
    <>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarSrc} alt="UserAvatar" />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name}</span>
        <span className="truncate text-xs">{email}</span>
      </div>
    </>
  );
}

export default UserAvatar;
