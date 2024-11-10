/* eslint-disable react/no-children-prop */
import React from 'react';

import type { Decorator, StoryObj } from '@storybook/react';

class StoryGenerator<T extends React.FunctionComponent<any>> {
  private story: StoryObj<T>;
  private component: T;

  constructor(component: T) {
    this.component = component;
    this.story = {
      parameters: {
        docs: {},
        viewport: {},
      },
      args: {},
    } as unknown as StoryObj<T>;
  }

  setDocsDisable(bool: boolean) {
    this.story.parameters!.docs.disable = bool;
    return this;
  }

  setArgs(args: React.ComponentProps<T>) {
    this.story.args = args;
    return this;
  }

  setViewPort(view: 'pc' | 'mobile') {
    this.story.parameters!.viewport.defaultViewport = view;
    return this;
  }

  setDecorator(decorator: Decorator<T>) {
    this.story.decorators = [decorator];
    return this;
  }

  setRender(css: React.CSSProperties) {
    const Component = this.component;
    this.story.render = (args: React.ComponentProps<T>) => (
      <div style={css}>
        <Component {...args} />
      </div>
    );
    return this;
  }

  setLayout(layout: 'fullscreen' | 'centered') {
    this.story.parameters!.layout = layout;
    return this;
  }

  build() {
    return this.story;
  }
}

export default StoryGenerator;
