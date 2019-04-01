import * as React from 'react';
import { Icon } from 'native-base';

export const tabBarIcon = (name: string) => ({ tintColor }: {tintColor: string}) => (
  <Icon
    style={{ backgroundColor: 'transparent', fontSize: 24, color: tintColor }}
    name={name}
  />
);