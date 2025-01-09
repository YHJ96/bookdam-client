'use client';

import React, { useMemo, useRef } from 'react';
import type { CallBackProps, Step, StoreHelpers } from 'react-joyride';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { TourTooltip } from '@/components/tour';

import { useTourStore } from '@/store';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

function BookmarkTourService() {
  const { isTour } = useTourStore();
  const helperRef = useRef<StoreHelpers>();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();

  const steps: Step[] = [
    {
      target: '#bookmark-list',
      content: '북마크 리스트가 표시됩니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#bookmark-list > [id^="bookmark"]:first-child',
      content: '북마크를 클릭하면 저장되어 있는 URL로 이동합니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#bookmark-tag-filter',
      content: '태그를 클릭하면 해당 태그를 가진 북마크만 표시됩니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#bookmark-search-input',
      content: '태그가 선택되어 있으면 태그와 검색 결과를 모두 포함하는 북마크만 표시됩니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#bookmark-select-order',
      content: '북마크의 정렬 순서를 선택할 수 있습니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#bookmark-options-trigger',
      content: '옵션을 클릭해보세요.',
      placement: 'bottom',
      disableBeacon: true,
      hideFooter: true,
      spotlightClicks: true,
    },
    {
      target: '#bookmark-options-content',
      content: '수정 버튼을 눌러 북마크를 수정합니다.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '#bookmark-options-content',
      content: '삭제 버튼을 눌러 북마크를 삭제합니다.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '#excel-button',
      content: '엑셀 다운로드 버튼을 눌러 북마크를 다운로드합니다.',
      placement: 'right',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '#floating-button',
      content: '버튼을 클릭해 보세요.',
      placement: 'left',
      disableBeacon: true,
      hideFooter: true,
      spotlightClicks: true,
    },
    {
      target: '#bookmark-create-dialog',
      content: 'URL은 필수로 입력하고 제목과 내용은 선택적으로 입력할 수 있습니다.',
      placement: 'left',
      disableBeacon: true,
      spotlightClicks: false,
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
    const $floatingButton = document.querySelector<HTMLButtonElement>('#floating-button');

    if (index === 5 && type === 'tooltip') {
      $button?.addEventListener('pointerdown', domEvent.handleDismissEvent);
      document.addEventListener('click', domEvent.preventDismiss);
    }

    if (index === 8 && type === 'tooltip') {
      document.removeEventListener('pointerdown', domEvent.preventDismiss, true);
      document.removeEventListener('focusin', domEvent.preventDismiss, true);
      document.removeEventListener('click', domEvent.preventDismiss);
      $button?.removeEventListener('pointerdown', domEvent.handleDismissEvent);
      clearTimeout(timerRef.current);

      queueMicrotask(() => {
        const pointerEvent = new PointerEvent('pointerdown');
        document.dispatchEvent(pointerEvent);
      });
    }

    if (index === 9 && type === 'tooltip') {
      $floatingButton?.addEventListener('click', domEvent.handleDismissEvent);
    }

    if (index === 10 && type === 'tooltip') {
      document.body.style.pointerEvents = 'auto';
    }

    if (status === 'finished') {
      document.removeEventListener('pointerdown', domEvent.preventDismiss, true);
      document.removeEventListener('focusin', domEvent.preventDismiss, true);
      $floatingButton?.removeEventListener('click', domEvent.handleDismissEvent);
      clearTimeout(timerRef.current);

      queueMicrotask(() => {
        const pointerEvent = new PointerEvent('pointerdown');
        document.dispatchEvent(pointerEvent);
      });

      router.push('/trash');
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
      tooltipComponent={(context) => <TourTooltip {...context} />}
      spotlightPadding={10}
      styles={{
        options: {
          overlayColor: '#000000CC',
          arrowColor: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)',
        },
      }}
    />
  );
}

export default BookmarkTourService;
