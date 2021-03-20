import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

class BackButton extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button
                title="Back"
                icon={<Entypo name="chevron-left" size={16} style={{ marginTop: -3, marginRight: -8 }} color='#fc8181' />}
                titleStyle={{ fontSize: 13, fontFamily: 'NotoSans', padding: 10, marginTop: Platform.OS === 'ios' ? -5 : -2, color: '#fc8181' }}
                buttonStyle={{ width: 70, height: 26, borderRadius: 20, backgroundColor: 'white' }}
                onPress={() => this.props.navigation.goBack()}
            />
        );
    }
}

export default BackButton;