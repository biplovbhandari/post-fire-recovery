var settings = {
    menus: [
        {
            'name': 'About',
            'url': '#',
            'show': true
        },
        {
            'name': 'Contact Us',
            'url': '#',
            'show': true
        }
    ],
    applicationName: 'Post Fire Recovery',
    partnersHeader: [
        {
            'alt': 'The National Aeronautics and Space Administration',
            'url': 'https://www.nasa.gov/',
            'src': 'images/nasa.png',
            'className': 'nasa'
        },
        {
            'alt': 'Spatial Infomatics Group',
            'url': 'https://sig-gis.com/',
            'src': 'images/sig.png',
            'className': 'sig'
        }
    ]
};

angular.module('postfirerecovery')
.constant('appSettings', settings);
