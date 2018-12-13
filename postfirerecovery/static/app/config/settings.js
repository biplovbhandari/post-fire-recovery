var settings = {
    menus: [
        {
            'name': 'Methods',
            'url': '/method/',
            'show': false
        },
        {
            'name': 'Service Applications',
            'url': '/service-applications/',
            'show': false
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
