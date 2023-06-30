import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { LoggedStackParamList } from '..';
import ToggleMenu from '@components/ToggleMenu';

/**
 * Types
 */

type HomeScreenProps = StackScreenProps<LoggedStackParamList, 'Home'>;

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { height: windowHeigth, width: windowWidth } = useWindowDimensions();
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}>
      <Text style={{ fontSize: 30 }}>HOME</Text>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          maxHeight: windowHeigth - 155,
        }}>
        <ToggleMenu navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
