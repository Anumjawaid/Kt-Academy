const webpack = require('webpack');

webpack({
    // [Configuration Object](/configuration/)
}, (err, stats) => { // [Stats Object](#stats-object)
    if (err || stats.hasErrors()) {
        // [Handle errors here](#error-handling)
    }
    // Done processing
});

module.exports = {
    env: {
        baseUrl: 'https://kt.academy',
    },
    i18n: {
        locales: ['en', 'pl'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    async redirects() {
        return [
            {
                source: '/pl/article/przyszlosc-programowaniu',
                destination: 'pl/article/przyszlosc-programowania',
                permanent: true,
            },
        ]
    },
    images: {
        domains: ['github.com', 'marcinmoskala.com', 'kt.academy', 'lh3.googleusercontent.com', 'cdn.shortpixel.ai'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [24, 48, 64, 96, 144, 192, 384, 576]
    },
}
