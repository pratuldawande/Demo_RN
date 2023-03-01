import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import { ScaledSheet } from "react-native-size-matters";

const Footer = ({
    handleCounterMove,
    handleCounterMoveBack,
    handleSubmit,
    active,
    isValid,
    hasRole,
}) => {

    const { colors, typography } = useTheme();
    const styles = makeStyles({ colors, typography, active });

    return (
        <View style={styles.btmContainer}>
            <View style={styles.navigationDotContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (active == 1) handleCounterMoveBack();
                    }}
                >
                    <View style={active == 0 ? styles.dot1 : styles.dot} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (isValid && active == 0) handleCounterMove();
                        if (active == 2) handleCounterMoveBack();
                    }}
                >
                    <View style={active == 1 ? styles.dot1 : styles.dot}></View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        if (active == 1 && hasRole) handleCounterMove();
                    }}
                >
                    <View style={active == 2 ? styles.dot1 : styles.dot}></View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={active == 3 ? styles.dot1 : styles.dot}></View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={!isValid}
                style={
                    isValid
                        ? styles.nextButtonContainer
                        : styles.nextButtonContainerDisabled
                }
            >
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};
const makeStyles = ({ colors, typography, active }) =>
    ScaledSheet.create({
        buttonText: {
            color: colors.standardWhite,
            ...typography.h1JostSemiBold,
        },
        btmContainer: {
            marginBottom: '10@ms',
            marginTop: '10@ms',
        },
        navigationDotContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        dot1: {
            width: "8@ms",
            height: "8@ms",
            backgroundColor: colors.secondaryNavy,
            borderRadius: "4@ms",
            marginLeft: "16@ms",
        },
        dot: {
            width: "8@ms",
            height: "8@ms",
            backgroundColor: colors.grey,
            borderRadius: "4@ms",
            marginLeft: "16@ms",
        },
        nextButtonContainer: {
            borderRadius: "50@ms",
            backgroundColor: colors.standardBlue,
            alignItems: "center",
            justifyContent: "center",
            padding: "10@ms",
            marginTop: "20@ms",
            margin: "16@ms",
        },
        nextButtonContainerDisabled: {
            borderRadius: "50@ms",
            backgroundColor: colors.standardBlue,
            alignItems: "center",
            justifyContent: "center",
            padding: "10@ms",
            marginTop: "20@ms",
            margin: "16@ms",
            opacity: 0.4,
        },
        buttonText: {
            color: colors.standardWhite,
            ...typography.h4JostSemiBold,
        },
    });
export default Footer;