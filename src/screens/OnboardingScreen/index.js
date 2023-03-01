import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import AppAsyncStorage from '../../utils/AppAsyncStorage';
import withLoadingSpinner from '../../components/hoc/withLoadingSpinner';
import Swiper from 'react-native-swiper';
import {skipBtn, nextBtn,showOnboardingKey} from '../../constants/StringConstants';
import { NAVIGATION_TO_LOGIN_SCREEN } from '../../navigation/routes';

const OnboardingScreen = ({navigation, setLoadingSpinnerVisibility}) => {
  const {colors, typography} = useTheme();
  const styles = makeStyles({colors, typography});
  const [swipperIndex, setSwipperIndex] = useState(0);

  useEffect(()=>{
    checkShowOnboarding()
  },[])

  const checkShowOnboarding = async()=>{
    const showOnboarding = await AppAsyncStorage.getValue(showOnboardingKey)
    if(JSON.parse(showOnboarding)){
      setSwipperIndex(2)
    }
  }

  const onIndexSwipperChanged = index => {
    if(index ===2){
      AppAsyncStorage.setValue(showOnboardingKey,JSON.stringify(true))
    }
    setSwipperIndex(index);
  };

  const onPressSkip = () => {
    setSwipperIndex(2);
    AppAsyncStorage.setValue(showOnboardingKey,JSON.stringify(true))
  };

  const BottomContainer = ({title, body}) => (
    <View style={styles.bottomContainer}>
      <Text style={styles.wlcmTitle}>{title}</Text>
      <Text style={styles.startedTitle}>{body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Swiper
        index={swipperIndex}
        onIndexChanged={onIndexSwipperChanged}
        style={styles.swiperView}
        dotColor={colors.grey}
        activeDotColor={colors.primary}
        loop={false}
        showsPagination={swipperIndex !== 2}
        showsButtons={true}
        scrollEnabled={false}
        dotStyle={styles.dotStyle}
        buttonWrapperStyle={styles.buttonWrapperStyle}
        activeDotStyle={styles.dotStyle}
        nextButton={<Text style={styles.buttonText}>{nextBtn}</Text>}
        prevButton={<Text style={styles.buttonText}></Text>}>
        <View style={styles.slideView}>
          <Image
            style={styles.image}
            source={require('../../assets/images/onboardingOne.png')}
          />
          <BottomContainer title={'Welcome'} body={'Get started!'} />
        </View>
        <View style={styles.slideView}>
          <Image
            style={styles.image}
            source={require('../../assets/images/onboardingTwo.png')}
          />
          <BottomContainer title={'Provide'} body={'Many Features'} />
        </View>
        <View style={[styles.slideViewEnd]}>
          <Image
            style={styles.imageEnd}
            source={require('../../assets/images/onboardingEnd.png')}
          />
          <View style={styles.bottomEndContainer}>
            <Text style={styles.wlcmTitle}>Finish</Text>
            <Text style={styles.exploreTitle}>Explore Now!</Text>
          </View>
          <TouchableOpacity style={styles.continueBtnContainer} onPress={()=>{
            navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)
          }}>
            <Text style={styles.letsContinueBtnText}>Lets Continue</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
      {swipperIndex !== 2 && (
        <TouchableOpacity style={styles.skipBtn} onPress={onPressSkip}>
          <Text>{skipBtn}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const makeStyles = ({colors, typography}) =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.lightPurple,
    },
    slideView: {
      flex: 1,
    },
    slideViewEnd: {
      flex: 1,
      backgroundColor: colors.blackOne,
      paddingTop: '50@ms',
      paddingHorizontal: '32@ms',
    },
    dotStyle: {
      marginBottom: '10@ms',
      width: '8@ms',
      height: '8@ms',
      bottom: 0,
    },
    image: {width: '100%', height: '651@ms'},
    imageEnd: {width: '100%', height: '520@ms'},
    buttonWrapperStyle: {
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      paddingHorizontal: '50@ms',
      paddingVertical: '30@ms',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      zIndex: 10,
    },
    skipBtn: {
      position: 'absolute',
      bottom: '30@ms',
      paddingLeft: '50@ms',
      zIndex: 10,
    },
    bottomContainer: {
      width: '100%',
      backgroundColor: colors.lightPurple,
      position: 'absolute',
      bottom: 0,
      height: '240@ms',
      zIndex: 2,
      borderTopLeftRadius: '25@ms',
      borderTopRightRadius: '25@ms',
      paddingTop: '23@ms',
      alignItems: 'center',
    },
    wlcmTitle: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 28,
      lineHeight: 35,
      color: colors.primary,
      marginBottom: '6@ms',
    },
    startedTitle: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 36,
      lineHeight: 35,
      color: colors.blackOne,
      marginBottom: '6@ms',
    },
    exploreTitle: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 36,
      lineHeight: 35,
      color: colors.standardWhite,
      marginBottom: '6@ms',
    },
    bottomEndContainer:{
      width: '100%',
      alignItems: 'center',
    },
    continueBtnContainer:{
      width:'100%',
      height:'55@ms',
      backgroundColor:colors.primary,
      alignItems:'center',
      justifyContent:'center',
      marginTop:'40@ms'
    },
    letsContinueBtnText:{
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 21,
      color: colors.standardWhite,
    }
  });

export default withLoadingSpinner()(OnboardingScreen);
