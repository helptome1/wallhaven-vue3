module.exports = {
    packagerConfig: {
        name: 'new-wallhaven',
        icon: './build/icon/logo.ico',
        asar: true
    },
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                authors: 'HelpToMe',
                iconUrl: './build/icon/logo.ico',
                setupIcon: './build/icon/logo.ico',
            }
        }
    ]
}
