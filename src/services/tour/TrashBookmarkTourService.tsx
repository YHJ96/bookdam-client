'use client';

import React, { useMemo, useRef } from 'react';
import type { CallBackProps, Step, StoreHelpers } from 'react-joyride';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { TourTooltip } from '@/components/tour';

import { useUserUtils } from '@/entities/user';
import { useTourStore } from '@/store';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

function TrashBookmarkTourService() {
  const router = useRouter();
  const { setRole } = useUserUtils();
  const { isTour, cachingRole, endTour } = useTourStore();
  const helperRef = useRef<StoreHelpers>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

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
      content: '옵션을 클릭해보세요.',
      placement: 'bottom',
      disableBeacon: true,
      spotlightClicks: true,
      hideFooter: true,
    },
    {
      target: '#trash-bookmark-options-content',
      content: '복구 버튼을 눌러 북마크를 복구합니다.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '#trash-bookmark-options-content',
      content: '영구 삭제 버튼을 눌러 북마크를 영구 삭제합니다.',
      placement: 'right',
      disableBeacon: true,
    },
  ];

  const domEvent = useMemo(() => {
    const handleDismissEvent = () => {
      timerRef.current = setTimeout(() => helperRef.current?.next(), 300);
      document.addEventListener('pointerdown', domEvent.preventDismiss, true);
      document.addEventListener('focusin', domEvent.preventDismiss, true);
    };

    const preventDismiss = (e: Event) => {
      e.stopPropagation();
      e.preventDefault();
    };

    return { handleDismissEvent, preventDismiss };
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { index, type, status } = data;
    const $button = document.querySelector<HTMLButtonElement>('button[aria-haspopup="menu"]');

    if (index === 2 && type === 'tooltip') {
      $button?.addEventListener('pointerdown', domEvent.handleDismissEvent);
    }

    if (status === 'finished') {
      document.removeEventListener('pointerdown', domEvent.preventDismiss, true);
      document.removeEventListener('focusin', domEvent.preventDismiss, true);
      $button?.removeEventListener('pointerdown', domEvent.handleDismissEvent);
      clearTimeout(timerRef.current);
      if (cachingRole === null) return;
      setRole(cachingRole);
      endTour();

      router.push('/');

      queueMicrotask(() => {
        const pointerEvent = new PointerEvent('pointerdown');
        document.dispatchEvent(pointerEvent);
      });
    }
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
          arrowColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)',
        },
      }}
    />
  );
}

export default TrashBookmarkTourService;
