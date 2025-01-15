import React from 'react';

type IfElseProps = {
  condition: boolean;
  then: React.ReactNode;
  other: React.ReactNode;
};

function IfElse({ condition, then, other }: IfElseProps) {
  return condition ? then : other;
}

export default IfElse;
