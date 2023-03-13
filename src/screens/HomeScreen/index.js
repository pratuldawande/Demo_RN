import {View, Text, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import AppAsyncStorage from '../../utils/AppAsyncStorage';
import withLoadingSpinner from '../../components/hoc/withLoadingSpinner';
import {statusBarDarkContent} from '../../constants/StringConstants';

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
          <Text>Welcome to Home</Text>
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
  });

export default withLoadingSpinner()(HomeScreen);
