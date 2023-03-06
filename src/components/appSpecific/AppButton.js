import {View, TextInput, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const AppButton = ({
  btnText,
  onPress,
  styleProps,
  textStyleProps,
  isDisabled = false,
}) => {
  const {colors, typography} = useTheme();
  const styles = makeStyles({colors, typography});

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.container, styleProps]}>
      <Text style={[styles.btnText, textStyleProps]}>{btnText}</Text>
    </TouchableOpacity>
  );
};

const makeStyles = ({colors, typography}) =>
  ScaledSheet.create({
    container: {
      width: '100%',
      height: '55@ms',
      borderRadius: '5@ms',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    btnText: {
      color: colors.whiteF,
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 21,
    },
  });

export default AppButton;
