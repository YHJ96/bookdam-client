/* eslint-disable react/no-children-prop */
import React from 'react';

import { Controls, Description, Primary, Stories, Subtitle, Title } from '@storybook/blocks';
import type { ArgTypes, Decorator, Meta } from '@storybook/react';

class MetaGenerator<T extends React.FunctionComponent<any>> {
  private meta: Meta<T>;
  private component: T;

  constructor(component: T) {
    this.component = component;
    this.meta = {
      component,
      parameters: {
        docs: {
          description: {},
        },
      },
    };
  }

  setDocsDescription(description: string) {
    this.meta.parameters!.docs.description.component = description;
    return this;
  }

  setArgTypes(args: ArgTypes<React.ComponentProps<T>>) {
    this.meta.args = args;
    return this;
  }

  setDecorator(decorator: Decorator<T>) {
    this.meta.decorators = [decorator];
    return this;
  }

  setRender(css: React.CSSProperties) {
    const Component = this.component;
    this.meta.render = (args: React.ComponentProps<T>) => (
      <div style={css}>
        <Component {...args} />
      </div>
    );
    return this;
  }

  setLayout(type: 'fullscreen' | 'centered') {
    this.meta.parameters!.layout = type;
    return this;
  }

  setDisableStories(bool: boolean) {
    bool
      ? (this.meta.parameters!.docs.page = () => {
          return (
            <>
              <Title />
              <Subtitle />
              <Description />
              <Primary />
              <Controls />
            </>
          );
        })
      : (this.meta.parameters!.docs.page = () => {
          return (
            <>
              <Title />
              <Subtitle />
              <Description />
              <Primary />
              <Controls />
              <Stories />
            </>
          );
        });

    return this;
  }

  build() {
    return this.meta;
  }
}

export default MetaGenerator;
