import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  AppState,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
// import AppAsyncStorage from '../../utils/AppAsyncStorage';
import withLoadingSpinner from '../../components/hoc/withLoadingSpinner';
import {
  statusBarDarkContent,
  mobileNumHandleChange,
  PLATFORM_IOS,
  KeyboardAvoidingViewBehaviourPadding,
  KeyboardAvoidingViewBehaviourHeight,
  keyboardTypePhonePad,
  loginString,
  continueBtn,
} from '../../constants/StringConstants';
import LoginHeader from '../../components/appSpecific/LoginHeader';
import {Formik} from 'formik';
import {loginValidation} from '../../utils/validation';
import {useHeaderHeight} from '@react-navigation/elements';
import AppTextInput from '../../components/appSpecific/AppTextInput';
import AppButton from '../../components/appSpecific/AppButton';
import {NAVIGATION_TO_OTP_SCREEN} from '../../navigation/routes';
import {useLogin} from '../../api/auth.api';

const LoginScreen = ({navigation, setLoadingSpinnerVisibility}) => {
  const {colors, typography} = useTheme();
  const styles = makeStyles({colors, typography});
  const headerHeight = useHeaderHeight();
  const [initialFormValues, setInitialFormValues] = useState({});
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

  useEffect(() => {
    setInitialFormValues({
      mobileNumber: '',
    });
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setLoadingSpinnerVisibility(false);
      navigation.navigate(NAVIGATION_TO_OTP_SCREEN, {
        contact: data?.data?.contact,
        id: data?.data?.id,
      });
    } else if (isError) {
      setLoadingSpinnerVisibility(false);
    }
  }, [isSuccess, isError]);

  const getOtp = values => {
    reset();
    if (!isLoading) {
      setLoadingSpinnerVisibility(true);
      login({contact: values.mobileNumber});
    }
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
        <LoginHeader />
      </View>
      <Formik
        initialValues={initialFormValues}
        validationSchema={loginValidation}
        validateOnMount={true}
        enableReinitialize
        onSubmit={getOtp}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
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
              <View style={styles.textInputView}>
                <AppTextInput
                  onChangeText={handleChange(mobileNumHandleChange)}
                  onBlur={handleBlur(mobileNumHandleChange)}
                  value={values.mobileNumber}
                  styleProps={styles.input}
                  iconSouce={require('../../assets/images/mobileIcon.png')}
                  iconStyle={styles.iconStyle}
                  // keyboardType={keyboardTypePhonePad}
                />
              </View>
              {errors.mobileNumber && touched.mobileNumber && (
                <Text style={styles.error}>{errors.mobileNumber}</Text>
              )}
              <Text style={styles.needMobileNumText}>
                {loginString.needMobileNum}
              </Text>
              <View>
                <AppButton btnText={continueBtn} onPress={handleSubmit} />
              </View>

              <TouchableOpacity
                style={styles.termAndCondition}
                onPress={() => {}}>
                <Text>{loginString.termAndCondition}</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
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
      // backgroundColor: 'red',
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
    textInput: {
      backgroundColor: colors.lightPurple,
      height: '56@ms',
    },
    input: {
      flex: 1,
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
    needMobileNumText: {
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 18,
      paddingHorizontal: '60@ms',
      fontWeight: 'bold',
      color: colors.fontBlack,
      textAlign: 'center',
      marginVertical: '50@ms',
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
      marginTop: '158@ms',
    },
  });

export default withLoadingSpinner()(LoginScreen);
