import React, { useState, Fragment } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Overlay } from 'react-native-elements';

const withLoadingSpinner = () => (WrappedComponent) => (props) => {
    const [loadingSpinnerVisibility, setLoadingSpinnerVisibility] = useState(false);

    const propsWithSpinnerProps = {
        ...props,
        setLoadingSpinnerVisibility: (boolean) => setLoadingSpinnerVisibility(boolean),
    };

    return (
        <Fragment>
            <WrappedComponent {...propsWithSpinnerProps} />
            <Overlay
                isVisible={loadingSpinnerVisibility}
                fullScreen
                overlayStyle={styles.overlayLoaderStyle}>
                <Image source={require('../../assets/images/spinner.gif')} style={{ width: 100, height: 100 }} />
            </Overlay>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    overlayLoaderStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default withLoadingSpinner;
