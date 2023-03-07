import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
// import AppAsyncStorage from '../../utils/AppAsyncStorage';
import withLoadingSpinner from '../../components/hoc/withLoadingSpinner';
import {
  statusBarDarkContent,
  PLATFORM_IOS,
  KeyboardAvoidingViewBehaviourPadding,
  KeyboardAvoidingViewBehaviourHeight,
  loginString,
  continueBtn,
  otpString,
} from '../../constants/StringConstants';
import LoginHeader from '../../components/appSpecific/LoginHeader';
import {useHeaderHeight} from '@react-navigation/elements';
import AppTextInput from '../../components/appSpecific/AppTextInput';
import AppButton from '../../components/appSpecific/AppButton';
import {useLogin, useVerifyOTP} from '../../api/auth.api';

const OTPScreen = ({navigation, setLoadingSpinnerVisibility, route}) => {
  const {colors, typography} = useTheme();
  const styles = makeStyles({colors, typography});
  const headerHeight = useHeaderHeight();
  const [otp, setOtp] = useState('');
  const inputs = useRef([]);
  const length = 4;
  const {contact, id} = route.params;
  const [time, setTime] = useState(5 * 60);
  const {
    mutate: login,
    data,
    error,
    isSuccess,
    isLoading,
    isError,
    reset,
    isIdle,
  } = useLogin();
  const {
    mutate: verifyOTP,
    data: verifyOTPData,
    error: verifyOTPError,
    isSuccess: verifyOTPISuccess,
    isLoading: verifyOTPIsLoading,
    isError: verifyOTPIsError,
  } = useVerifyOTP();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (isSuccess && data) {
      setLoadingSpinnerVisibility(false);
      setTime(60 * 5);
    } else if (isError) {
      setLoadingSpinnerVisibility(false);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (verifyOTPISuccess && verifyOTPData) {
      setLoadingSpinnerVisibility(false);
      console.log(verifyOTPData);
    } else if (verifyOTPIsError) {
      setLoadingSpinnerVisibility(false);
      console.log(verifyOTPError);
    }
  }, [verifyOTPISuccess, verifyOTPIsError]);

  const resendOTP = () => {
    setLoadingSpinnerVisibility(true);
    login({contact: contact});
  };

  const getOtp = () => {
    verifyOTP({
      id: id,
      res: {
        otp: otp,
      },
    });
  };

  const handleChange = (value, index) => {
    // Only allow digits in OTP input
    const numRegex = /^[0-9]+$/;
    if (value && !numRegex.test(value)) {
      return;
    }

    // Update OTP value
    let newOtp = otp;
    if (value) {
      newOtp = newOtp.substring(0, index) + value + newOtp.substring(index + 1);
    } else {
      newOtp = newOtp.substring(0, index) + newOtp.substring(index + 1);
    }
    setOtp(newOtp);

    // Move focus to next input field or submit OTP if all fields are filled
    if (index < length - 1 && value) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (event, index) => {
    // Handle backspace key press
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const renderInputs = () => {
    const inputArray = [];
    for (let i = 0; i < length; i++) {
      inputArray.push(
        <AppTextInput
          key={i}
          textinputRef={ref => {
            inputs.current[i] = ref;
          }}
          maxLength={1}
          keyboardType="numeric"
          value={otp[i] || ''}
          onChangeText={value => handleChange(value, i)}
          onKeyPress={event => handleKeyPress(event, i)}
          styleProps={styles.input}
          iconStyle={styles.iconStyle}
          containerStyleProps={styles.containerStyleProps}
        />,
      );
    }
    return inputArray;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={statusBarDarkContent}
        hidden={false}
        backgroundColor={colors.standardWhite}
        translucent={true}
      />
      <View style={styles.topView}>
        <LoginHeader onPress={() => navigation.goBack()} />
      </View>
      <KeyboardAvoidingView
        style={[styles.scrollView, styles.topView]}
        behavior={
          Platform.OS === PLATFORM_IOS
            ? KeyboardAvoidingViewBehaviourPadding
            : KeyboardAvoidingViewBehaviourHeight
        }
        keyboardVerticalOffset={headerHeight}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          listViewDisplayed={false}
          contentContainerStyle={styles.scrollView}>
          <Text
            style={
              styles.pleaseEnterText
            }>{`${otpString.pleaseEnter}${contact}`}</Text>
          <View style={styles.textInputView}>{renderInputs()}</View>
          <Text style={styles.dontTellText}>{otpString.dontTell}</Text>
          {time > 0 ? (
            <Text style={[styles.dontTellText, styles.timerText]}>
              {`${otpString.expiredIn} ${minutes
                .toString()
                .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </Text>
          ) : (
            <TouchableOpacity onPress={resendOTP}>
              <Text style={[styles.dontTellText, styles.timerText]}>
                {otpString.resendOTP}
              </Text>
            </TouchableOpacity>
          )}
          <View>
            <AppButton btnText={continueBtn} onPress={getOtp} />
          </View>
          <TouchableOpacity style={styles.termAndCondition} onPress={() => {}}>
            <Text>{loginString.termAndCondition}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = ({colors, typography}) =>
  ScaledSheet.create({
    container: {
      backgroundColor: colors.lightPurple,
      flex: 1,
    },
    topView: {
      paddingHorizontal: '27@ms',
    },
    scrollView: {
      flex: 1,
    },
    containerStyleProps: {
      paddingRight: 0,
    },
    textInputTheme: {
      roundness: '5@ms',
      fonts: {
        regular: {
          fontFamily: 'Mulish',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: 18,
          lineHeight: 23,
          color: colors.fontBlack,
        },
      },
      colors: {
        primary: colors.grey,
        error: colors.alertOrange,
      },
    },
    input: {
      width: '55@ms',
    },
    error: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.2,
      marginBottom: '10@ms',
      fontWeight: 'bold',
      color: colors.alertOrange,
      marginTop: '5@ms',
    },
    iconStyle: {
      width: '14@ms',
      height: '20@ms',
    },
    dontTellText: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 16,
      paddingHorizontal: '60@ms',
      fontWeight: 'bold',
      color: colors.fontBlack,
      textAlign: 'center',
      marginTop: '48@ms',
    },
    pleaseEnterText: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 22,
      paddingHorizontal: '60@ms',
      fontWeight: 'bold',
      color: colors.fontBlack,
      textAlign: 'center',
      marginTop: '70@ms',
    },
    termAndCondition: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 15,
      marginTop: '189@ms',
      alignItems: 'center',
    },
    textInputView: {
      marginTop: '37@ms',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timerText: {
      marginTop: '5@ms',
      marginBottom: '100@ms',
    },
  });

export default withLoadingSpinner()(OTPScreen);
