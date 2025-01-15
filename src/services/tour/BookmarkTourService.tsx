'use client';

import React from 'react';
import type { CallBackProps, Step } from 'react-joyride';

import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { TourTooltip } from '@/components/tour';

import { useTourStore } from '@/store';

const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

function BookmarkTourService() {
  const { theme } = useTheme();
  const { isTour } = useTourStore();
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
      content: '북마크 옵션으로 수정과 삭제를 할 수 있습니다.',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '#excel-button',
      content: '엑셀 다운로드 버튼을 눌러 북마크를 다운로드합니다.',
      placement: 'right',
      disableBeacon: true,
    },
    {
      target: '#floating-button',
      content: '버튼을 눌러 북마크를 추가할 수 있습니다.',
      placement: 'left',
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status !== 'finished') return;
    router.push('/trash');
  };

  return (
    <Joyride
      run={isTour}
      continuous={true}
      steps={steps}
      callback={handleJoyrideCallback}
      disableOverlayClose={true}
      hideCloseButton={true}
      tooltipComponent={(context) => <TourTooltip {...context} />}
      spotlightPadding={10}
      styles={{
        options: {
          overlayColor: '#000000CC',
          arrowColor: theme === 'dark' ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)',
        },
      }}
    />
  );
}

export default BookmarkTourService;
