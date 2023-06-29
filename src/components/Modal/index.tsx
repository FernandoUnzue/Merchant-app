import { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Card } from '@components/Card';

/**
 * Modal
 */

export const Modal: FC<{ children?: ReactNode }> = ({ children }) => (
  <Card containerStyle={styles.container}>{children}</Card>
);

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    zIndex: 4,
    height: '90%',
    position: 'absolute',
    top: '2%',
    bottom: '8%',
    paddingHorizontal: '8%',
  },
});
