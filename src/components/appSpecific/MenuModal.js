import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { NAVIGATION_TO_ALERT_TRASH_SCREEN } from '../../navigation/routes';
import { viewTrash, reportMessage, modalAnimationTypeFade } from '../../constants/StringConstants';

const MenuModal = ({
    modalVisible,
    setModalVisible,
    navigation,
    title,
    onPressReportChat
}) => {

    const { colors, typography } = useTheme();
    const styles = makeStyles({ colors, typography });

    return (
        <View>
            <Modal
                animationType={modalAnimationTypeFade}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <TouchableOpacity style={styles.container1} onPress={() => setModalVisible(!modalVisible)}>
                    <TouchableWithoutFeedback
                        activeOpacity={0.4}
                        style={styles.onPressStyle}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            if (title === viewTrash) {
                                navigation.navigate(NAVIGATION_TO_ALERT_TRASH_SCREEN)
                            }
                            else if (title === reportMessage) {
                                onPressReportChat()
                            }
                        }}
                    >
                        <View style={styles.container}>
                            <Text style={styles.filterResult}>{title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const makeStyles = ({ colors, typography }) =>
    ScaledSheet.create({
        container1: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: {
            width: '70%',
            backgroundColor: colors.standardWhite,
            marginTop: '80@ms',
            borderRadius: '10@ms',
            marginLeft: 'auto',
            margin: '16@ms',
            paddingBottom: "16@ms"
        },
        filterResult: {
            ...typography.body2JostMedium,
            marginLeft: '15@ms',
            marginTop: '15@ms',
            color: colors.standardBlack,
        },
        onPressStyle: {
            marginTop: '28@ms',
            marginLeft: '16@ms',
        },
    });

export default MenuModal;
