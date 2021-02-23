import React, { useState, useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet, ScrollView, View } from 'react-native';
import Item from '../component/Item';

const List = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState({});

    useEffect(() => fetchData(), []);

    function fetchData() {
        setData({
            register:
            {
                1:
                {
                    name: "canvas",
                    item_id: 111,
                    location: "pacific ocean",
                    color: "blue",
                    description: "sda;jfas;dlff",
                    image: 'https://picsum.photos/200/400'

                },
                2:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://picsum.photos/200/400'

                },
                3:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://picsum.photos/200/400'

                },
                4:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaopf",
                    image: 'https://picsum.photos/200/400'

                },
                5:
                {
                    name: "starbucks tumbler",
                    item_id: 222,
                    location: "Saen Saeb Canal",
                    color: "green",
                    description: "aosdfaosadaFDF;LSDFJLncn,mzcnmzcxzcxn,.zc,.ckl;asljkasfdljkfadl;ads;ladsjkcnm.,cxv,mnldaksJLJKADSLJKDSHLJKCVXBN,MCXJajklsljSDALKJ;FDSLJSDFpf",
                    image: 'https://picsum.photos/200/400'

                }
            },
            claim: {
                1:
                {
                    name: "canvas kha",
                    item_id: 333,
                    location: "pacific ocean",
                    color: "blue",
                    description: ";aldfalskfd",
                    image: 'https://picsum.photos/200/400'

                }
            }
        });
    }

    return (
        <View style={{ flex: 1, paddingTop: 86 }}>
            <SearchBar
                placeholder="search"
                onChangeText={value => setSearch(value)}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                value={search}
            />
            <Item data={data} />
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
