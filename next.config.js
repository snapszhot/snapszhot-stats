const path = require('path')

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    swcMinify: true,
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@components': path.join(__dirname, 'components'),
            '@lib': path.join(__dirname, 'lib'),
        }

        return config
    },
}
