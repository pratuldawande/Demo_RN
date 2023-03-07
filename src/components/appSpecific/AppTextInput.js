import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const AppTextInput = ({
  onPressIcon,
  onChangeText,
  styleProps,
  value,
  keyboardType,
  onBlur,
  isIconClick = false,
  iconSouce,
  iconStyle,
  containerStyleProps,
  textinputRef,
  maxLength,
  onKeyPress,
}) => {
  const {colors, typography} = useTheme();
  const styles = makeStyles({colors, typography});

  return (
    <View style={[styles.container, containerStyleProps]}>
      <TextInput
        style={[styles.input, styleProps]}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        onBlur={onBlur}
        ref={textinputRef}
        maxLength={maxLength}
        onKeyPress={onKeyPress}
      />
      {iconSouce && (
        <TouchableOpacity onPress={onPressIcon} disabled={!isIconClick}>
          <Image style={iconStyle} source={iconSouce} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const makeStyles = ({colors, typography}) =>
  ScaledSheet.create({
    container: {
      borderWidth: '1@ms',
      height: '55@ms',
      borderRadius: '5@ms',
      borderColor: colors.gray,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: '17@ms',
    },
    input: {
      height: '100%',
      paddingLeft: '24@ms',
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 23,
      color: colors.fontBlack,
    },
    image: {
      width: 20,
      height: 30,
    },
  });

export default AppTextInput;
