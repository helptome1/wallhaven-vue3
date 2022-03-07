module.exports = {
    packagerConfig: {
        name: 'new-wallhaven',
        icon: './src/assets/logo.ico',
        asar: true
    },
    makers: [
        {
            name: '@electron-forge/maker-zip'
        },
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                authors: 'HelpToMe',
                iconUrl: './src/assets/logo.ico',
                setupIcon: './src/assets/logo.ico',
            }
        },
        {
            // Mac
            name: '@electron-forge/maker-dmg',
            config: {

            }
        }
    ]
}