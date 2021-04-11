import React, { useState, useEffect } from 'react'
import { Text } from '../component/Text';
import { View, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox, Button } from 'react-native-elements'



const someTag = ['red', 'blue', 'green', 'red', 'blue', 'green', 'red', 'blue', 'green'];
const clicked = () => {
    Alert.alert('clicked');
}
function Tag() {
    return someTag.map((item, key) => {
        return (
            <Button
                title={item + "  x"}
                key={key}
                titleStyle={{ padding: 7, marginTop: -3, fontFamily: 'NotoSans', color: '#ffffff', fontSize: 11 }}
                buttonStyle={{ height: 32, borderRadius: 10, backgroundColor: '#ff8686', alignSelf: 'flex-start', marginRight: 5, marginBottom: 5 }}
                onPress={clicked}
            />
        )
    })
}

function Filter({ navigation }) {
    const [filter, setFilter] = useState([0, 0, 0, 0, 0, 0, 0]);
    
    function sendFilter() {
        let i;
        let tempFilter = [];
        let filterList = ['Bag', 'Bottle', 'Certificate', 'Keyring', 'Tumbler'];
        for(i=0; i<filter.length; i++ ) {
            if(filter[i] === true){
                tempFilter.push(filterList[i])
            }
        }
        navigation.navigate('List', { filters: tempFilter })
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button
                    title="Cancel"
                    type="clear"
                    titleStyle={{ fontFamily: 'NotoSansBold', color: '#FF8686', fontSize: 13 }}
                    containerStyle={{ marginLeft: 15 }}
                    buttonStyle={{ height: 40, backgroundColor: 'transparent' }}
                    onPress={() => navigation.goBack()}
                />
            ),
            headerRight: () => (
                <Button
                    title="Apply"
                    type="clear"
                    titleStyle={{ fontFamily: 'NotoSansBold', color: '#FF8686', fontSize: 13 }}
                    containerStyle={{ marginRight: 15 }}
                    buttonStyle={{ height: 40, backgroundColor: 'transparent' }}
                    onPress={() => sendFilter()}
                />
            )
        });
    }, [navigation]);

    return (
        <View>
            <View style={{ marginHorizontal: 35 }}>

                <Text
                    style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                    Category
                </Text>

                <View style={{ borderColor: '#cccccc', borderWidth: 0.5, marginTop: 7 }} />

                <View style={{ marginTop: 5 }}>
                    {['Bag', 'Bottle', 'Certificate', 'Keyring', 'Tumbler'].map((each, index) => {
                        return (
                            <CheckBox
                                key={index}
                                title={each}
                                fontFamily='NotoSans'
                                textStyle={{ fontSize: 14 }}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, marginVertical: -5 }}
                                checkedIcon={<MaterialIcons name='check-box' size={20} color='#ff8686' />}
                                uncheckedIcon={<MaterialIcons name='check-box-outline-blank' size={20} color='#aaaaaa' />}
                                checked={filter[index]}
                                onPress={() => {
                                    let newFilter = [...filter];
                                    newFilter[index] = !newFilter[index];
                                    setFilter(newFilter);
                                }}
                            />
                        )
                    })}
                </View>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, marginHorizontal: 30 }}>
                {Tag()}
            </View>

        </View>
    )
}

export default Filter;
