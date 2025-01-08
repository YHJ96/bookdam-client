import React from 'react';
import type { TooltipRenderProps } from 'react-joyride';

import { Button, Card, CardContent, CardFooter } from '@/shared/ui';
import { Hide } from '@/shared/utils/react';

function TourTooltip({ tooltipProps, primaryProps, step, index, size }: TooltipRenderProps) {
  return (
    <Card {...tooltipProps} className="w-[320px] overflow-hidden rounded-xl border-none">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-black/20 px-3 py-1 text-sm font-medium dark:bg-white/20">
            {index + 1} / {size}
          </span>
        </div>
        <p className="whitespace-pre-wrap text-base leading-relaxed">{step.content}</p>
      </CardContent>

      <Hide
        condition={step.hideFooter}
        component={
          <CardFooter className="flex justify-end border-t border-white/10 pb-4 pt-4">
            <Button {...primaryProps} className="px-6 transition-colors duration-300">
              다음
            </Button>
          </CardFooter>
        }
      />
    </Card>
  );
}

export default TourTooltip;
