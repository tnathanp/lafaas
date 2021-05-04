const config = {
    screens: {
        End: {
            path: 'endClaim/:type'
        },
        QRCode: {
            path: ':operation'
        },
        Noti: {
            path: 'match/:item_id'
        }
    }
};

const linking = {
    prefixes: ["lafaas://app"],
    config,
};

export default linking;