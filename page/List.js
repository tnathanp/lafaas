import React, { useState, useEffect } from 'react';
import { Button, Input, SearchBar } from 'react-native-elements';
import { StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { Text } from '../component/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import Item  from '../component/Item';

const List = ({ navigation }) => {
    const [search, setSearch] = useState("");



    return (
        
            <View style={{flex: 1 , paddingTop: 86 }}>
                <SearchBar
                    placeholder="search"
                    onChangeText={value => setSearch(value)}
                    containerStyle = { styles.searchContainer }
                    inputContainerStyle = {styles.inputContainer}
                    inputStyle= {styles.input}
                    value = {search}
                />
                <Item/>
                
            </View>

    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        padding: 24
    },
    inputContainer: {
        fontFamily: 'NotoSans',
        backgroundColor: '#e7e7e7',
        fontSize: 16,
        borderRadius: 20,

    },
    input: {
        color: '#868686',
        marginBottom: 3,
        fontSize: 16,
        fontFamily: 'NotoSans'
    }
});

export default List;
