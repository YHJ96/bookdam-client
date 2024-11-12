import React from 'react';

type HideProps = {
  condition: boolean;
  component: React.ReactNode;
};

function Hide({ condition, component }: HideProps) {
  return condition ? null : component;
}

export default Hide;
