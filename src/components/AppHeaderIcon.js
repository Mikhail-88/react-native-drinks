import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Fontisto } from '@expo/vector-icons';

export const AppHeaderIcon = props => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      color="black"
      IconComponent={Fontisto}
    />
  );
};