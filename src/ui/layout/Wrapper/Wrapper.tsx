import React from 'react';
import { ReactNode } from 'react';
import { View } from 'react-native';

interface IProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: IProps) => {
  return <View style={{ padding: 20 }}>{children}</View>;
};
