'use client';

import React, { useRef } from 'react';
import type { CallBackProps, Step, StoreHelpers } from 'react-joyride';

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { TourTooltip } from '@/components/tour';
import { EndTourDialog } from '@/components/tour';

import { useUserUtils } from '@/entities/user';
import { useDialog } from '@/shared/hooks';
import { useTourStore } from '@/store';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

function TrashBookmarkTourService() {
  const { theme } = useTheme();
  const { open } = useDialog();
  const router = useRouter();
  const { setRole } = useUserUtils();
  const { isTour, cachingRole, endTour } = useTourStore();
  const helperRef = useRef<StoreHelpers>();
  const steps: Step[] = [
    {
      target: '#trash-bookmark-list',
      content: '삭제된 북마크 리스트가 표시됩니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#trash-bookmark-list > [id^="trash-bookmark"]:first-child',
      content: '삭제된 북마크 입니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#trash-bookmark-options-trigger',
      content: '휴지통 북마크 옵션으로 복구와 영구 삭제를 할 수 있습니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = async (data: CallBackProps) => {
    const { status } = data;

    if (status !== 'finished') return;
    if (cachingRole === null) return;

    const isConfirm = await open(EndTourDialog, {});
    if (!isConfirm) return;

    setRole(cachingRole);
    endTour();
    router.push('/');
  };

  return (
    <Joyride
      run={isTour}
      continuous={true}
      steps={steps}
      callback={handleJoyrideCallback}
      getHelpers={(helper) => (helperRef.current = helper)}
      disableOverlayClose={true}
      hideCloseButton={true}
      floaterProps={{ hideArrow: false }}
      tooltipComponent={(context) => <TourTooltip {...context} />}
      styles={{
        options: {
          overlayColor: '#000000CC',
          arrowColor: theme === 'dark' ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)',
        },
      }}
    />
  );
}

export default TrashBookmarkTourService;
