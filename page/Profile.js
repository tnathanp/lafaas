import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, View, ScrollView, RefreshControl, Keyboard, TouchableWithoutFeedback, SafeAreaView, Image } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Circle } from 'react-native-shape';

const Profile = ({ navigation }) => {
    const name = 'fdsfs'
    const list = [
        { name: 'List Item 1' },
        { name: 'List Item 2' }]
    return (
        <View style={{ flex: 1, paddingTop: 60, backgroundColor: 'white', }}>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <View style={{ flex: 1, textAlign: 'center' }}>
                    <TouchableOpacity style={{ flex: 1, marginLeft: -65 }} onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" color="black" size={20} />
                    </TouchableOpacity>
                </View>
                
                <View style={{ textAlign: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>PROFILE SETTING</Text>
                </View>

                <View style={{ flex: 1}}>
                    <></>
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', paddingTop: 30,left:50 }}>
                <View style={{ top: 25,marginRight:50,alignItem:'center', textAlign: 'center'}}>
                    <Circle color="#f6a085" scale={2} style={{alignItems: 'center',justifyContent:'center'}} />
                    <Text style={{   justifyContent: "center",alignSelf: 'center',fontSize: 40, color: '#ffffff', fontWeight: 'bold', position: 'absolute',top:-3 }}>{name[0].toUpperCase()}</Text>
                </View>

                <View >

                    <Text style={{ fontSize: 25, color: '#000000', fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ fontSize: 16, color: '#000000', }}>username</Text>
                </View>
               
            </View>
            <View style={{ flex: 1,padding:30,top:-250 }}>
                <Text style={styles.title}>Password Setting</Text>
                <Button
                    title='change password'
                    onPress={() => null}
                    titleStyle={{ padding: 50, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3 }}
                    buttonStyle={{ borderRadius: 10, marginRight: 10,marginTop:10,backgroundColor:'#f6a085' }}
                   
                />
            <Text style={styles.title}>My Registered Item</Text>
            {list.map((l,i) => ( 
            <Text key={i}  style={{  fontSize:16,color: '#494949', marginTop:15,marginBottom:10 }}>{l.name}</Text>))}
           
   
                <Button
                    title='view more'
                    onPress={() => null}
                    titleStyle={{ padding: 50, fontSize: 16, fontFamily: 'NotoSansBold', marginTop: -5, marginBottom: -3,color:'#f6a085' }}
                    buttonStyle={{ borderRadius: 10, marginRight: 10,marginTop:10,borderWidth: 1, borderColor:'#f6a085',backgroundColor:'white' }}
                   
                />

            </View>
            
        </View>

    );
}

const styles = StyleSheet.create({
    title: {
        fontSize:18,
        color: '#494949', 
        fontWeight: 'bold', 
        marginTop:30
    },
    inputContainer: {
        fontFamily: 'NotoSans',
        backgroundColor: '#e7e7e7',
        fontSize: 16,
        borderRadius: 15,
        maxHeight: 40
    },
    input: {
        color: '#868686',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSans'
    },
    anim: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 0.5 * Dimensions.get('window').width,
        height: 0.5 * Dimensions.get('window').width,
        marginTop: -1 * 0.02 * Dimensions.get('window').height
    },
    footer: {
        flexDirection: 'row',
        borderTopColor: '#eee',
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 25
    }
});


export default Profile;