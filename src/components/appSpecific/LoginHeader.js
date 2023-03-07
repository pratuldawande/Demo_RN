import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

const LoginHeader = ({onPress}) => {
  const {colors, typography} = useTheme();
  const styles = makeStyles({colors, typography});

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtnContainer} onPress={onPress}>
        {onPress && (
          <Image
            style={styles.backBtnImage}
            source={require('../../assets/images/backIcon.png')}
          />
        )}
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/images/headerAppIcon.png')}
        />
      </View>
    </View>
  );
};

const makeStyles = ({colors, typography}) =>
  ScaledSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '32@ms',
    },
    backBtnContainer: {
      width: '25@ms',
      height: '25@ms',
      justifyContent: 'center',
    },
    backBtnImage: {
      width: '9@ms',
      height: '15@ms',
    },
    logoContainer: {
      height: '25@ms',
      justifyContent: 'center',
    },
    logoImage: {
      width: '110@ms',
      height: '23@ms',
    },
  });

export default LoginHeader;
