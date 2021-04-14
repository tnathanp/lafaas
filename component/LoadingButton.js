import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingButton = () => {
    return (
        <LottieView
            style={{
                width: 40,
                height: 40,
                backgroundColor: 'transparent',
                alignSelf: 'center'
            }}
            source={require('../assets/anim/7774-button-loading.json')}
            autoPlay
        />
    );
}

export default LoadingButton;