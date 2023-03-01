import { View, Text, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import {getVersion,getBuildNumber} from 'react-native-device-info';

const AppVersion = ({containerStyle}) => {

    const { colors, typography } = useTheme();
    const styles = makeStyles({ colors, typography});

    return (
        <View style={[containerStyle]}>
            <Text style={styles.versionText}>{`Version ${getVersion()} (${getBuildNumber()})`}</Text>
        </View>
    );
};

const makeStyles = ({ colors, typography, marginTop }) =>
    ScaledSheet.create({
        versionText:{
            ...typography.label2JostSemibold,
            color: colors.versionColor,
        }
    });

export default AppVersion;
