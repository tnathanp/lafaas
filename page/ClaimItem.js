import React, { useState } from 'react'; 
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';



const ClaimItem = ({ navigation }) => {
    const [thetext, setThetext] = useState("not clicked");
    const itemName = "Starbuck Tumbler";
    const itemDes = "Lorem ipsum dolor sit amet, consectetur adipiscing elitsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ";

    return (
        <View>
            <View style={{backgroundColor: '#435353', height: '45%'}}>
                <Image 
                    style={{height: '100%', width: '100%'}}
                    source={require("../images/tumber.jpg")}/>
                <View style={{ position: 'absolute', top: 50, left: 20 }}>
                    <Button
                        title="Back"
                        icon={<Entypo name="chevron-left" size={16} style={{ marginTop: -3, marginRight: -8 }} color='#fc8181' />}
                        titleStyle={{ fontSize: 13, fontFamily: 'NotoSans', padding: 10, marginTop: -5, color: '#fc8181' }}
                        buttonStyle={{ width: 70, height: 26, borderRadius: 20, backgroundColor: 'white' }}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
            <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color:'black', margin: 24}}
                    >{itemName}</Text>
                <Text style={{ fontSize: 14, color:'black', marginLeft: 24}}
                    >Description:</Text>
                <Text style={{ fontSize: 14, color:'black', marginLeft: 24, marginTop: 10, marginRight: 24}}
                    >{itemDes}</Text>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color:'black', margin: 24, alignItems: 'center'}}
                        >Is this yours?</Text>
                    <LinearGradient 
                        colors={['#fc8181', '#f6a085']} 
                        locations={[0.7, 1]} 
                        style={{ borderRadius: 20, width: 119, height: 33, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => setThetext('clicked')}> 
                            <Text style={{ fontSize:18, fontWeight:'bold'}}>{thetext}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    itemImage: {

    },
    inputBox: {
        backgroundColor: 'white',
        opacity: 0.75,
        borderRadius: 10,
        borderBottomColor: 'transparent'
    },
    input: {
        fontFamily: 'NotoSansBold',
        fontSize: 16,
        padding: 10
    },
    label: {
        color: 'white',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSansBold'
    }
});

export default ClaimItem;