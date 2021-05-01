const config = {
    screens: {
        QRCode: {
            path: ':operation'
        }
    }
};

const linking = {
    prefixes: ["lafaas://app"],
    config,
};

export default linking;