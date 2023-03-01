import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
  } from 'react-native';
  import React, {useState, useEffect, useRef} from 'react';
  import {useTheme} from 'react-native-paper';
  import {ScaledSheet} from 'react-native-size-matters';
  import AppAsyncStorage from '../../utils/AppAsyncStorage';
  import withLoadingSpinner from '../../components/hoc/withLoadingSpinner';
  import {statusBarDarkContent} from '../../constants/StringConstants'
  
  const HomeScreen = ({navigation, setLoadingSpinnerVisibility}) => {
    const {colors, typography} = useTheme();
    const styles = makeStyles({colors, typography});
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={statusBarDarkContent}
          hidden={false}
          backgroundColor={colors.standardWhite}
          translucent={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}>
          <View style={styles.scrollViewBottom}>
              <Text>Hello home</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const makeStyles = ({colors, typography}) =>
    ScaledSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      logoContainer: {
        alignItems: 'center',
      },
      image: {
        resizeMode: 'contain',
        width: '200@ms',
        height: '200@ms',
      },
      textContainer: {
        marginLeft: '15@ms',
      },
      loginTextStyle: {
        color: colors.standardBlack,
        ...typography.h2JostBold,
      },
      loginToTextStyle: {
        ...typography.body1JostMedium,
        color: colors.lightGrey,
      },
      faceIDContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '20@ms',
      },
      faceIDText: {
        ...typography.h4JostSemiBold,
        color: colors.lightGrey,
      },
      scrollViewBottom: {
        flex: 1,
      },
      flexDirectionRow: {
        flexDirection: 'row',
      },
      rightSpacing: {
        marginRight: '8@ms',
      },
      versionContainer: {
        marginBottom: '20@ms',
      },
    });
  
  export default withLoadingSpinner()(HomeScreen);
  