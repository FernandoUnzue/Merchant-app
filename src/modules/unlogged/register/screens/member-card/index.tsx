import { FC, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ThemeContext, useThemedStyles } from '@core/theme';
import { useLoginContainer } from '@modules/unlogged/hooks';
import { UnloggedStackParamList } from '@modules/unlogged';
import { Button } from '@components/Button';
import { LoginFooter } from '@components/LoginFooter';
import { Card } from '@components/Card';
import { Spacer } from '@components/Spacer';
import { useDisableGoBack } from '@core/hooks';
import CardMember from '@components/CardMemberView';

/**
 * Types
 */

type MemberCardScreenProps = StackScreenProps<
  UnloggedStackParamList,
  'MemberCard'
>;

/**
 * Constants
 */

const IMAGE_MARGIN = 0.03;
const IMAGE_ASPECT_RATIO = 0.6619;

/**
 * MemberCard Screen
 */

export const MemberCard: FC<MemberCardScreenProps> = ({
  route: {
    params: { cardNumber },
  },
  navigation: { navigate },
}) => {
  useDisableGoBack();
  const style = useThemedStyles(styles);
  const { container } = useLoginContainer();
  const { height: windowHeigth, width: windowWidth } = useWindowDimensions();

  const [modalShow, setModalShow] = useState<boolean>(false);
  const closeModal = ()=>{
    setModalShow(false);
  }
  const openModal = () =>{
    setModalShow(true);
  }
  return (
    <>
      <View style={[style.container, container]} />
      <LoginFooter />
      <View style={style.contentContainer}>
        <View style={style.memberCardWrapper}>
          <Pressable
          onPress={()=> openModal()}
          >
          <Image
            source={require('../../../../../../assets/images/CardHorizontal.png')}
            resizeMode="contain"
            style={[
              style.memberCard,
              {
                width: windowWidth * (1 - IMAGE_MARGIN),
                height: windowWidth * (1 - IMAGE_MARGIN) * IMAGE_ASPECT_RATIO,
              },
            ]}
          />
          </Pressable>
        </View>
        <Spacer height={'3%'} />
        <Card>
          <View style={[style.infoContainer, { height: windowHeigth * 0.3 }]}>
            <Text style={style.title}>
              {`LA TUA MEMBER CARD N. ${cardNumber}`}
            </Text>
            <View>
              <Text style={style.text}>è stata generata correttamente!</Text>
              <Text style={style.text}>
                Riceverai a breve un SMS di conferma
              </Text>
            </View>
            <Button
              accessibilityLabel="prosegui"
              title="accedi"
              type="secondary"
              onPress={() => navigate('Login')}
            />
          </View>
        </Card>
      </View>
      <CardMember modalShow={modalShow} closeModal={closeModal} cardNumber={cardNumber} />
    </>
  );
};

/**
 * Styles
 */

const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      zIndex: 4,
      height: '90%',
      position: 'absolute',
      top: '2%',
      bottom: '8%',
    },
    title: {
      fontFamily: theme.fonts.black,
      fontSize: 24,
      color: theme.colors.text,
    },
    text: {
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
    infoContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    memberCardWrapper: {
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.24,
      shadowRadius: 10,
      elevation: 8,
    },
    memberCard: {
      marginLeft: '1.5%',
    },
  });
