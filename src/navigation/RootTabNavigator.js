// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React, { useState } from 'react';
// import { View } from 'react-native';
// import { useTheme } from 'react-native-paper';
// import {
//     NAVIGATION_TO_PROFILE_SCREEN,
//     NAVIGATION_TO_ALERT_MAIN_SCREEN,
//     NAVIGATION_TO_SCHEDULE_MAIN_SCREEN,
//     NAVIGATION_TO_STATS_MAIN_SCREEN,
//     NAVIGATION_TO_SHIFTS_MAIN_SCREEN,
//     NAVIGATION_TO_ALERT_FILTER_SCREEN,
//     NAVIGATION_TO_SETTING_SCREEN,
// } from './routes';
// import { theme } from '../constants/theme';
// import ShiftsMainScreen from '../screens/ShiftsScreen/ShiftsMainScreen';
// import ScheduleMainScreen from '../screens/ScheduleScreen/ScheduleMainScreen';
// import StatsMainScreen from '../screens/StatsScreen/StatsMainScreen';
// import AlertMainScreen from '../screens/AlertScreen/AlertMainScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
// import MenuModal from '../components/appSpecific/MenuModal';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';
// import {
//     titleShifts,
//     titleSchedule,
//     titleAlerts,
//     titleStats,
//     titleProfile,
//     userTwo,
//     autoCapitalizeNone,
//     trashModalTitle
// } from '../constants/StringConstants';
// import { getStartDate } from '../util/date';
// import { ScaledSheet } from 'react-native-size-matters';

// const Tab = createBottomTabNavigator();

// function RootTabNavigator({ navigation }) {
//     const { colors } = useTheme();
//     const [modalVisible, setModalVisible] = useState(false);

//     return (
//         <Tab.Navigator
//             initialRouteName={NAVIGATION_TO_PROFILE_SCREEN}
//             screenOptions={{
//                 tabBarStyle: { backgroundColor: colors.grayNav },
//                 tabBarActiveTintColor: colors.standardBlue,
//                 tabBarInactiveTintColor: colors.darkGrey,
//                 labelStyle: styleSheet.labeStyleRoot,
//                 backBehavior: autoCapitalizeNone,
//             }}>

//             <Tab.Screen
//                 name={NAVIGATION_TO_SHIFTS_MAIN_SCREEN}
//                 component={ShiftsMainScreen}
//                 initialParams={{ dateId: "0-" + ((new Date().getDate() - 1) + getStartDate(new Date())), fetchedCalendarData: null }}
//                 options={{
//                     title: titleShifts,
//                     headerShown: false,
//                     tabBarLabelStyle: styleSheet.bottomTabTitle,
//                     tabBarIcon: ({ size, color }) => (
//                         <AntDesign name={'search1'} size={size} color={color} />
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name={NAVIGATION_TO_SCHEDULE_MAIN_SCREEN}
//                 component={ScheduleMainScreen}
//                 options={{
//                     headerShown: false,
//                     title: titleSchedule,
//                     tabBarLabelStyle: styleSheet.bottomTabTitle,
//                     tabBarIcon: ({ color, size }) => (
//                         <AntDesign name={'calendar'} size={size} color={color} />
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name={NAVIGATION_TO_STATS_MAIN_SCREEN}
//                 component={StatsMainScreen}
//                 options={{
//                     title: titleStats,
//                     headerBackVisible: false,
//                     headerShown: false,
//                     tabBarLabelStyle: styleSheet.bottomTabTitle,
//                     tabBarIcon: ({ color, size }) => (
//                         <FontAwesome name={'line-chart'} size={size} color={color} />
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name={NAVIGATION_TO_ALERT_MAIN_SCREEN}
//                 component={AlertMainScreen}
//                 options={{
//                     title: titleAlerts,
//                     headerBackVisible: false,
//                     tabBarLabelStyle: styleSheet.bottomTabTitle,
//                     headerStyle: {
//                         backgroundColor: theme.colors.secondaryNavy,
//                     },
//                     headerTintColor: theme.colors.standardWhite,
//                     headerTitleAlign: styleSheet.headerTextAlign,
//                     headerTitleStyle: styleSheet.headerTitle,
//                     tabBarIcon: ({ color, size }) => (
//                         <Ionicons
//                             name={'notifications-outline'}
//                             size={size}
//                             color={color}
//                         />
//                     ),
//                     // tabBarBadge: 2,
//                     // tabBarBadgeStyle: { backgroundColor: 'red' },
//                     headerRight: () => (
//                         <View style={styleSheet.flexDirectionRow}>
//                             <FontAwesome
//                                 name="sliders"
//                                 size={20}
//                                 color={theme.colors.standardWhite}
//                                 style={styleSheet.rightSpacing18}
//                                 onPress={() =>
//                                     navigation.navigate(NAVIGATION_TO_ALERT_FILTER_SCREEN)
//                                 }
//                             />
//                             <Entypo
//                                 name="dots-three-vertical"
//                                 size={20}
//                                 color={theme.colors.standardWhite}
//                                 style={styleSheet.rightSpacing18}
//                                 onPress={() => setModalVisible(true)}
//                             />

//                             <View>
//                                 <MenuModal
//                                     modalVisible={modalVisible}
//                                     setModalVisible={setModalVisible}
//                                     navigation={navigation}
//                                     title={trashModalTitle}
//                                 />
//                             </View>
//                         </View>
//                     ),
//                 }}
//             />

//             <Tab.Screen
//                 name={NAVIGATION_TO_PROFILE_SCREEN}
//                 component={ProfileScreen}
//                 initialParams={{ user: userTwo }}
//                 options={{
//                     title: titleProfile,
//                     headerBackVisible: false,
//                     tabBarLabelStyle: styleSheet.bottomTabTitle,
//                     headerStyle: {
//                         backgroundColor: theme.colors.secondaryNavy,
//                     },
//                     headerTintColor: theme.colors.standardWhite,
//                     headerTitleAlign: styleSheet.headerTextAlign,
//                     headerTitleStyle: styleSheet.headerTitle,
//                     headerRight: () => (
//                         <Feather
//                             name="settings"
//                             size={24}
//                             color={theme.colors.standardWhite}
//                             style={styleSheet.rightSpacing18}
//                             onPress={() => navigation.navigate(NAVIGATION_TO_SETTING_SCREEN)}
//                         />
//                     ),
//                     tabBarIcon: ({ color, size }) => (
//                         <Ionicons name={'person-outline'} size={size} color={color} />
//                     ),
//                 }}
//             />
//         </Tab.Navigator>
//     );
// }

// const styleSheet = ScaledSheet.create({
//     headerTitle: {
//         color: theme.colors.standardWhite,
//         ...theme.typography.heading4
//     },
//     bottomTabTitle: {
//         ...theme.typography.label2JostSemibold
//     },
//     headerTextAlign: 'center',
//     labeStyleRoot: {
//         paddingBottom: '10@ms',
//         fontSize: 12
//     },
//     flexDirectionRow: {
//         flexDirection: 'row',
//     },
//     rightSpacing18: {
//         marginRight: '18@ms',
//     },
// })

// export default RootTabNavigator;
