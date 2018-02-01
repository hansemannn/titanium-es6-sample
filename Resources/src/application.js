'use strict';

import TabGroupApplication from './tabgroup-application';

export default class extends TabGroupApplication {

  constructor() {
    super();

    this._generateTabs().forEach(tab => {
      this.tabGroup.addTab(tab);
    });

    this.tabGroup.addEventListener('open', (event) => {
      this._onOpen(event);
      this._fadeIn();
    });
  }
  
  _generateTabs() {
    return [
      this._generateTab('Home', 'icon-home.png'),
      this._generateTab('Hyperloop', 'icon-hyperloop.png')
    ];
  }

  _fadeIn() {
    const whatDoesItDo = ['rocks!'];
    const secondArray = ['ES6+', ...whatDoesItDo];
    
    const label = Ti.UI.createLabel({
      text: secondArray.join(' '),
      opacity: 0
    });

    this.tabGroup.activeTab.window.add(label);

    label.animate({
      opacity: 1,
      duration: 500
    });
  }
  
  _onOpen(event) {
    super._onOpen(event);
      
    // Test ES6 number formatting
    var l10nEN = new Intl.NumberFormat('en-US');
    var l10nDE = new Intl.NumberFormat('de-DE');
    Ti.API.info(l10nEN.format(1234567.89));
    Ti.API.info(l10nDE.format(1234567.89));
    
    // Test ES6 date formatting
    var l10nEN = new Intl.DateTimeFormat('en-US');
    var l10nDE = new Intl.DateTimeFormat('de-DE');
    Ti.API.info(l10nEN.format(new Date("2015-01-02")));
    Ti.API.info(l10nDE.format(new Date("2015-01-02")));
    
    // Get current location (asynchronous)
    this._getUserLocation().then(coordinates => {
      alert(`Found location!\n\nLatitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);
    }).catch(error => {
      alert(`Error receiving current location: ${error}`);
    });
  }

  // Use Promises
  _getUserLocation() {
    return new Promise((resolve, reject) => {
      Ti.Geolocation.getCurrentPosition(event => {
        if (!event.success) {
          reject(event.error);
        } else {
          resolve(event.coords);
        }
      });
    });
  }
  
  boot() {
    super.boot();
  }
  
  // Use async/await
  // FIXME: Current throws, work in progress!
  
  // async _getUserLocation() {
  //   const coordinates = await Ti.Geolocation.getCurrentPosition(event => {
  //     return new Promise(resolve => {
  //       resolve(event.coords);
  //     });
  //   });
  //   alert(`Found location! Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);
  // }
}
