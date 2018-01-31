'use strict';

export default class {

  constructor() {
    this.tabGroup = Ti.UI.createTabGroup({
      tabs: this._generateTabs(),
      activeTabIconTint: '#ca2127',
      tabsTranslucent: false
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
  
  _generateTab(title, icon) {
    return Ti.UI.createTab({
      title: title, 
      window: this._generateWindow(title), 
      icon: `assets/images/${icon}`
    });
  }
  
  _generateWindow(title) {
    return Ti.UI.createWindow({
      backgroundColor: '#fff', 
      title: title,
      translucent: false
    });
  }
  
  _fadeIn() {
    const label = Ti.UI.createLabel({
      text: 'ES6+ rocks!',
      opacity: 0
    });

    this.tabGroup.activeTab.window.add(label);

    label.animate({
      opacity: 1,
      duration: 500
    });
  }
  
  _onOpen(event) {
    Ti.API.info('We\'re ready!');
  }
  
  boot() {
    this.tabGroup.open();
  }
}
