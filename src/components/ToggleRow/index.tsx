import { ShowIf } from '@components/ShowIf';
import { ThemeContext, useThemedStyles } from '@core/theme';
import UnderlineIcon from '@core/theme/SVGS/Underline';
import React, { ReactNode, useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  title1: string;
  title2: string;
  children1: ReactNode;
  children2: ReactNode;
  children2_Disable?: boolean;
  children1_Disable?: boolean;
  defaultActive?: '1' | '2';
  separator?: boolean;
  iconUnderline?: ReactNode;
  showUnderlineIcon2?: boolean;
  showUnderlineIcon1?: boolean;
  greylish?: boolean;
  onlyUnderlineActive?: boolean;
  headerContStyle?: ViewStyle;
  contentFullWidth?: boolean;
};

const ToggleRow: React.FC<Props> = ({
  title1,
  title2,
  children1,
  children2,
  children1_Disable = false,
  children2_Disable = false,
  defaultActive = '1',
  separator = false,
  iconUnderline = null,
  showUnderlineIcon1 = true,
  showUnderlineIcon2 = true,
  greylish = true,
  onlyUnderlineActive = false,
  headerContStyle,
  contentFullWidth = false,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [rowActive, setRowActive] = useState<number>(1);

  const setActive = useCallback(
    (active: number) => {
      setRowActive(active);
      if (active === 1) {
        setShow(false);
      } else {
        setShow(true);
      }
    },
    [show, rowActive],
  );
  const style = useThemedStyles(styles);
  return (
    <View style={style.container}>
      <View style={{ ...style.headerCont, ...headerContStyle }}>
        <View style={rowActive === 1 ? style.bullet : style.bulletNoActive}>
          <Pressable
            onPress={!children1_Disable ? () => setActive(1) : () => null}>
            <Text
              style={
                rowActive === 1
                  ? style.title
                  : [greylish ? style.titleNoActive : style.title]
              }>
              {title1}
            </Text>
            {onlyUnderlineActive ? (
              <ShowIf condition={rowActive === 1}>
                <>
                  {iconUnderline ? (
                    iconUnderline
                  ) : (
                    <UnderlineIcon
                      size={20}
                      color={
                        rowActive === 1
                          ? 'rgba(136, 218, 212, 1)'
                          : 'rgba(136, 218, 212, 0.5)'
                      }
                    />
                  )}
                </>
              </ShowIf>
            ) : (
              <>
                {iconUnderline ? (
                  iconUnderline
                ) : (
                  <UnderlineIcon
                    size={20}
                    color={
                      rowActive === 1
                        ? 'rgba(136, 218, 212, 1)'
                        : 'rgba(136, 218, 212, 0.5)'
                    }
                  />
                )}
              </>
            )}
          </Pressable>
        </View>
        {separator && <View style={style.verticleLine}></View>}
        <View style={rowActive === 2 ? style.bullet : style.bulletNoActive}>
          <Pressable
            onPress={!children2_Disable ? () => setActive(2) : () => null}>
            <Text
              style={
                rowActive === 2
                  ? style.title
                  : [greylish ? style.titleNoActive : style.title]
              }>
              {title2}
            </Text>
            {onlyUnderlineActive ? (
              <ShowIf condition={rowActive === 2}>
                <>
                  {iconUnderline ? (
                    iconUnderline
                  ) : (
                    <UnderlineIcon
                      size={20}
                      color={
                        rowActive === 2
                          ? 'rgba(136, 218, 212, 1)'
                          : 'rgba(136, 218, 212, 0.5)'
                      }
                    />
                  )}
                </>
              </ShowIf>
            ) : (
              <>
                {iconUnderline ? (
                  iconUnderline
                ) : (
                  <UnderlineIcon
                    size={20}
                    color={
                      rowActive === 2
                        ? 'rgba(136, 218, 212, 1)'
                        : 'rgba(136, 218, 212, 0.5)'
                    }
                  />
                )}
              </>
            )}
          </Pressable>
        </View>
      </View>
      {!show && !children1_Disable && (
        <View
          style={{
            ...style.cont1,
            paddingHorizontal: contentFullWidth ? 0 : 10,
          }}>
          {children1}
        </View>
      )}

      {show && !children2_Disable && (
        <View
          style={{
            ...style.cont2,
            paddingHorizontal: contentFullWidth ? 0 : 10,
          }}>
          {children2}
        </View>
      )}
    </View>
  );
};

export default ToggleRow;
const styles = ({ theme }: ThemeContext) =>
  StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: theme.colors.white,
    },
    verticleLine: {
      height: '100%',
      width: 1,
      backgroundColor: '#909090',
    },
    title: {
      fontSize: 16,
      fontFamily: theme.fonts.bold,
      color: theme.colors.black,
      textAlign: 'left',
    },
    titleNoActive: {
      color: '#ddd',
      fontSize: 16,
      fontFamily: theme.fonts.bold,
    },
    bullet: {
      width: '40%',
      //  borderBottomWidth: 3,
      marginRight: 3,
      //  borderColor: theme.colors.accent,
    },
    bulletNoActive: {
      width: '40%',
      // borderBottomWidth: 3,
      marginRight: 3,
      //  borderColor: theme.colors.accent,
      opacity: 0.5,
    },
    headerCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cont1: {
      paddingVertical: 10,
    },
    cont2: {
      paddingVertical: 10,
    },
  });
