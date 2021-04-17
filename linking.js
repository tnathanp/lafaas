const config = {
    screens: {
        QRCode: {
            path: 'error/:msg',
            parse: {
                msg: (msg) => `${msg}`,
            },
        },
    },
};

const linking = {
    prefixes: ["lafaas://app"],
    config,
};

export default linking;