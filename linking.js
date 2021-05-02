const config = {
    screens: {
        End: {
            path: 'endClaim/:type'
        },
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