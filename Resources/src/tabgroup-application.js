'use strict';

export default class TabGroupApplication {

  constructor() {
    this.tabGroup = Ti.UI.createTabGroup({
      activeTabIconTint: '#ca2127',
      tabsTranslucent: false
    });
  }

  _generateTab(title = 'Untitled', icon = 'icon-unknown.png') {
    return Ti.UI.createTab({
      title: title, 
      window: this._generateWindow(title), 
      icon: `assets/images/${icon}`
    });
  }
	
	_onOpen() {
		Ti.API.info('Hello from our subclass!');
	}
  
  _generateWindow(title) {
    return Ti.UI.createWindow({
      backgroundColor: '#fff', 
      title: title,
      translucent: false
    });
  }

  boot() {
    this.tabGroup.open();
  }
}
