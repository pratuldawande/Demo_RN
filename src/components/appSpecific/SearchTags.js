import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { updateAlertsFilterData } from '../../store/alertsApi/NotificationsSlice';

const SearchTags = ({
    nameFilter,
}) => {

    const { colors, typography } = useTheme();
    const styles = makeStyles({ colors, typography });

    const dispatch = useDispatch()
    const notificationsState = useSelector(state => state.notificationsApi)

    const removeFilter = () => {
        const data = [...notificationsState.alertFiltersData]
        if (data.includes(nameFilter)) {
            const ind = data.indexOf(nameFilter)
            data.splice(ind, 1)
            dispatch(updateAlertsFilterData(data))
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.innerContainer}>
                <Text style={styles.filterName}>{nameFilter}</Text>
                <MaterialCommunityIcons
                    name="close"
                    size={styles.size.fontSize}
                    color={colors.standardBlack}
                    style={styles.icon}
                    onPress={removeFilter}
                />
            </TouchableOpacity>
        </View>
    );
};

const makeStyles = ({ colors, typography }) =>
    ScaledSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            marginTop: '20@ms',
            marginLeft: "16@ms",
        },
        innerContainer: {
            flexDirection: 'row',
            backgroundColor: colors.standardLightBlue,
            padding: "4@ms",
            alignItems: 'center',
            borderRadius: "4@ms"
        },
        filterName: {
            marginLeft: "8@ms",
            color: colors.standardBlack,
        },
        icon: {
            marginLeft: "12@ms",
            marginRight: "8@ms"
        },
        size: {
            fontSize: "12@ms"
        }
    });

export default SearchTags;
