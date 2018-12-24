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
    ],
    // this list is generated from python script at /scripts/list-huc.py
    hucArray: ['City of Reno-Truckee River', 'Downie River', 'Lemmon Valley', 'Little Truckee River', 'Lower North Yuba River', 'Middle Middle Fork Feather River', 'Middle North Yuba River', 'Middle Yuba River', 'Sierra Valley', 'Smithneck Creek', 'South Fork Feather River', 'Upper Long Valley Creek', 'Upper Middle Fork Feather River', 'Upper North Yuba River'],
};

angular.module('postfirerecovery')
.constant('appSettings', settings);
