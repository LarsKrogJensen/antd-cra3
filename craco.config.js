const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: {
                lessLoaderOptions: {
                    modifyVars: {
                        "@primary-color": "#1DA57A",
                        "@link-color": "#1DA57A",
                        "@border-radius-base": "2px"
                    },
                    javascriptEnabled: true
                }
            }
        }
    ]
};