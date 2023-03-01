import { View, Text, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import Line from '../genric/Line';
import { updateAlertsFilterData } from '../../store/alertsApi/NotificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Filters = ({
    nameFilter,
    value,
    setValue,
    line,
    marginTop,
    locationValue,
    setLocationValue,
    location,
    onChange
}) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isClicked, setClicked] = useState(false);

    const dispatch = useDispatch()
    const notificationsState = useSelector(state => state.notificationsApi)

    useEffect(() => {
        const alertFiltersData = notificationsState.alertFiltersData
        if (isEnabled) {
            const data = [...alertFiltersData]
            if (!data.includes(nameFilter)) {
                data.push(nameFilter)
                dispatch(updateAlertsFilterData(data))
            }
        } else {
            if (isClicked) {
                setClicked(false)
                const data = [...alertFiltersData]
                const ind = alertFiltersData.indexOf(nameFilter)
                data.splice(ind, 1)
                dispatch(updateAlertsFilterData(data))
            }
        }
    }, [isEnabled])

    useEffect(() => {
        if (notificationsState.alertFiltersData.includes(nameFilter))
            setIsEnabled(true)
        else
            setIsEnabled(false)
    }, [notificationsState.alertFiltersData])

    const alertsToggleSwitch = () => {
        setClicked(true)
        setIsEnabled(!isEnabled)
    };

    const locationToggleSwitch = () => {
        if (onChange) {
            onChange()
        } else {
            setLocationValue(!locationValue)
        }
    };

    const { colors, typography } = useTheme();
    const styles = makeStyles({ colors, typography, marginTop });

    return (
        <View style={styles.container}>
            {line && <Line />}
            <View style={styles.filters}>
                <Text style={styles.filterName}>{nameFilter}</Text>
                <Switch
                    trackColor={{ false: colors.switchTrackColorFalse, true: colors.switchTrackColorTrue }}
                    thumbColor={isEnabled ? colors.standardBlue : colors.switchThumbColorDiabled}
                    ios_backgroundColor={colors.switchIosBackgroundColor}
                    onValueChange={location ? locationToggleSwitch : alertsToggleSwitch}
                    value={location ? locationValue : isEnabled}
                />
            </View>
        </View>
    );
};

const makeStyles = ({ colors, typography, marginTop }) =>
    ScaledSheet.create({
        container: {
            marginTop: marginTop || '15@ms',
        },
        filterName: {
            ...typography.body1JostMedium,
            color: colors.standardBlack,
        },
        filters: {
            flexDirection: 'row',
            justifyContent: "space-between",
            marginTop: "15@ms",
            marginRight: "16@ms"
        }
    });

export default Filters;
