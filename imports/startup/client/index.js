import AFRAME from 'aframe';
import { Bert } from 'meteor/themeteorchef:bert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './routes.js';
import $ from 'jquery';
import { Session } from 'meteor/session';

Bert.defaults.style = 'growl-top-right';

AFRAME.registerSystem('meteor', {
  init() {
    // Get config.
    let config = this.sceneEl.getAttribute('meteor');  // No getComputedAttr before attach.
    // if (!(config instanceof Object)) { config = AFRAME.utils.styleParser.parse(config); }
    // if (!config) { return; }

    this.broadcastingEntities = {};
    this.entities = {};
    this.interval = 10;
    console.log(config);
    console.log(this.sceneEl);
    console.log($(this.sceneEl));

    // Set up Meteor sync.
  },

  tick(time) {
    if (time - this.time < this.interval) { return; }
    this.time = time;
    Session.set('TIME', time);
    Session.set('THIS_TIME', this.time);
    //console.log(this.time);
  },
});

/**
 * Data holder for the scene.
 */
AFRAME.registerComponent('meteor', {
  schema: {
    channel: {type: 'string'},
    interval: {type: 'number'}
  }
});

/**
 * Get attribute that handles individual component properties.
 */
function getComputedAttribute (el, attribute) {
  // Handle individual component property.
  var split = attribute.split('|');
  if (split.length === 2) {
    return el.getComputedAttribute(split[0])[split[1]];
  }
  return el.getComputedAttribute(attribute);
}

/**
 * Set attribute that handles individual component properties.
 */
function setAttribute (el, attribute, value) {
  // Handle individual component property.
  var split = attribute.split('|');
  if (split.length === 2) {
    el.setAttribute(split[0], split[1], value);
    return;
  }
  el.setAttribute(attribute, value);
}
