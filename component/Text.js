import React from 'react';
import * as NativeElement from 'react-native-elements';

const Text = (props) => {
    let fontStyle = 'NotoSans';
    if (props.style.fontWeight != null) {
        switch (props.style.fontWeight) {
            case '100': case 'thin': fontStyle = 'NotoSansThin'; break;
            case '200': case 'extra-light': fontStyle = 'NotoSansExtraLight'; break;
            case '300': case 'light': fontStyle = 'NotoSansLight'; break;
            case '400': case 'normal': fontStyle = 'NotoSans'; break;
            case '500': case 'medium': fontStyle = 'NotoSansMedium'; break;
            case '600': case 'semi-bold': fontStyle = 'NotoSansSemiBold'; break;
            case '700': case 'bold': fontStyle = 'NotoSansBold'; break;
            case '800': case 'extra-bold': fontStyle = 'NotoSansExtraBold'; break;
            case '900': case 'black': fontStyle = 'NotoSansBlack'; break;
        }
        delete props.style['fontWeight'];
    }

    return (
        <NativeElement.Text style={[{ fontFamily: fontStyle, color: 'white' }, props.style]}>{props.children}</NativeElement.Text>
    )
}

export { Text };