import React from 'react'
import { Text } from '../component/Text';
import { View, Alert } from 'react-native';
import { CheckBox, Button } from 'react-native-elements'

const someTag = ['red', 'blue', 'green', 'red', 'blue', 'green', 'red', 'blue', 'green'];
const clicked = () => {
    Alert.alert('clicked');
}
function renderTag() {
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

function Filter() {
    return (
        <View>
            <View style={{ flexDirection: 'row', marginTop: 32, marginLeft: 29, marginRight: 29, justifyContent: 'space-between' }}>
                <Button
                    title="Cancel"
                    type="clear"
                    titleStyle={{ fontFamily: 'NotoSansBold', color: '#FF8686', fontSize: 12 }}
                    buttonStyle={{ height: 32, backgroundColor: 'transparent' }}
                    onPress={null}
                />
                <Button
                    title="Search filters"
                    type="clear"
                    titleStyle={{ fontFamily: 'NotoSansBold', color: '#000000', fontSize: 14 }}
                    buttonStyle={{ height: 32, backgroundColor: 'transparent' }}
                    onPress={null}
                />
                <Button
                    title="Apply"
                    type="clear"
                    titleStyle={{ fontFamily: 'NotoSansBold', color: '#FF8686', fontSize: 12 }}
                    buttonStyle={{ height: 32, backgroundColor: 'transparent' }}
                    onPress={null}
                />
            </View>
            <View style={{ marginLeft: 38, marginRight: 38, }}>
                <Text
                    style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                    Category
                </Text>

                <View style={{ borderColor: '#868686', borderBottomWidth: 0.5, marginTop: 7 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, marginTop: 15, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Bag
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Bottle
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Certificate
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Keyring
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Money
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Tumbler
                    </Text>
                </View>

                {/* -----------------------------------------  */}

                <Text
                    style={{ fontFamily: 'NotoSansBold', color: '#868686', fontSize: 13, marginTop: 17 }}>
                    Color
                </Text>

                <View style={{ borderColor: '#868686', borderBottomWidth: 0.5, marginTop: 7 }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, marginTop: 15, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Beige
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Brown
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Blue
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Cream
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Crimson
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Cyan
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Gold
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Green
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, }}>
                    <CheckBox
                        value={null}
                        onValueChange={null}
                    />
                    <Text style={{ fontFamily: 'NotoSans', color: '#000000', fontSize: 11, }}>
                        Grey
                    </Text>
                </View>
            </View>

            {/* ------------------Tag-------------------------- */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 0, marginLeft: 29, marginRight: 29 }}>
                {renderTag()}
            </View>
            {/* ----------------------------------------------- */}
        </View>
    )
}

export default Filter;
