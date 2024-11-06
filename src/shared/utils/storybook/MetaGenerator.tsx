import type { ComponentProps, ComponentType } from 'react';

import type { ArgTypes, Decorator, Meta } from '@storybook/react';

class MetaGenerator<T extends ComponentType<any>> {
  private meta: Meta<T>;

  constructor(component: T) {
    this.meta = {
      parameters: {
        component,
        darkMode: { stylePreview: true },
        layout: 'centered',
        docs: {
          description: {},
        },
      },
      tags: ['autodocs'],
    };
  }

  setTitle(title: string) {
    this.meta.title = title;
    return this;
  }

  setDocsDescription(description: string) {
    this.meta.parameters!.docs.description.component = description;
    return this;
  }

  setArgTypes(args: ArgTypes<ComponentProps<T>>) {
    this.meta.args = args;
    return this;
  }

  setDecorator(decorator: Decorator<T>) {
    this.meta.decorators = [decorator];
    return this;
  }

  build() {
    return this.meta;
  }
}

export default MetaGenerator;
