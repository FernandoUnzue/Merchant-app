import React, { FC, ReactNode } from 'react';

export const ShowIf: FC<{ condition?: boolean; children: ReactNode }> = ({
  condition = false,
  children,
}) => {
  if (condition) {
    return <>{children}</>;
  }
  return null;
};
