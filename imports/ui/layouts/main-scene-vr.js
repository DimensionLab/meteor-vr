import React, { PropTypes } from 'react';
import 'aframe';
import { browserHistory } from 'react-router';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
// import extras from 'aframe-extras';
// extras.registerAll();
// import { Session } from 'meteor/session';
import { updatePosition } from '../../api/users/methods.js';

class VR extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      materialColor: 'blue',
      position: '5 -2 -12',
      newPosition: null,
      newRotation: null,
      updating: false,
    };
  }

  componentDidMount() {
    const self = this;

    document.querySelector('#avatar').addEventListener('componentchanged', (evt) => {
      if (evt.detail.name === 'position' && evt.detail.oldData !== evt.detail.newData) {
        self.setState({ newPosition: evt.detail.newData, updating: true });
        self.setState({ newRotation: document.querySelector('#avatar').getAttribute('rotation'), updating: true });
      } else {
        self.setState({ updating: false });
      }
    });
  }

  render() {
    const { materialColor, position, newPosition, newRotation } = this.state;
    const { user } = this.props;

    return (
      <a-scene meteor="channel: hello!!!; interval: 10;" physics fog="type: linear; color: #AAB; far: 30; near: 0">

        <a-assets timeout='5000'>
          <a-asset-item id="tree1" src="models/lowpoly/Models/Tree Type1 04.dae"></a-asset-item>
          <a-asset-item id="github-obj" src="models/social/github.obj"></a-asset-item>
          <a-asset-item id="twitter-obj" src="models/social/twitter.obj"></a-asset-item>
          <a-asset-item id="crate-obj" src="models/crate/crate.obj"></a-asset-item>
          <a-asset-item id="crate-mtl" src="models/crate/crate.mtl"></a-asset-item>
          <a-mixin
            id="avatar-head"
            geometry="primitive: box; depth: 0.3; height: 0.3; width: 0.3"
            material="color: #222">
          </a-mixin>
        </a-assets>

        <a-entity
          camera
          look-controls
          wasd-controls
          id="avatar"
          mixin="avatar-head"
          position={user && user.position ? `${user.position.x} ${user.position.y} ${user.position.z}` : '-1 2 -5'}
          rotation={user && user.rotation ? `${user.rotation.x} ${user.rotation.y} ${user.rotation.z}` : '0 0 0'}
          jump-ability="enableDoubleJump: true; distance: 2;"
          onChange={(e) => this.handlePlayer(e)}
        >
          <a-cursor color="#4CC3D9" fuse="true" timeout="2000"></a-cursor>
        </a-entity>

        <a-plane rotation="-90 0 0" width="50" height="50" color="#7BC8A4"></a-plane>

        <a-obj-model
          src="#github-obj"
          position="1 2 0"
          rotation="90 0 90"
          scale="8 8 8"
          onClick={() => this.goToGithub()}
        >
        </a-obj-model>

        <a-obj-model
          src="#twitter-obj"
          position="1 2 1"
          rotation="90 0 90"
          scale="8 8 8"
          onClick={() => this.goToTwitter()}
        >
        </a-obj-model>

        <a-collada-model
          src="#tree1"
          position={position}
          scale="1.8 1.8 1.8"
          onClick={() => this.savePosition(newPosition, newRotation)}
        >
        </a-collada-model>

        <a-entity
          obj-model="obj: #crate-obj; mtl: #crate-mtl"
          position="-4 1 6"
          onClick={() => this.goHome()}
        >
        </a-entity>

        <a-box id="orange-cube" position="-4 3.5 -2" rotation="30 30 0" width="2" depth="2"
             height="2" color="#F16745" roughness="0.8">
          <a-event name="mouseenter" scale="3 1 1" color="#FFC65D"></a-event>
          <a-event name="mouseenter" target="#shadow" scale="3 2 2"></a-event>
          <a-event name="mouseleave" scale="1 1 1" color="#F16745"></a-event>
          <a-event name="mouseleave" target="#shadow" scale="2 2 2"></a-event>
        </a-box>

        <a-entity
          ref="cubeRef"
          onClick={() => this.handleColorChange()}
          id="cube"
          geometry="primitive: box"
          material={`color: ${materialColor}`}
          position="-9 1 4"
        ></a-entity>

        <a-sky color="#ECECEC"></a-sky>
      </a-scene>
    );
  }

  handleColorChange() {
    const { materialColor } = this.state;

    if (materialColor === 'blue') {
      this.setState({ materialColor: 'red' });
    } else {
      this.setState({ materialColor: 'blue' });
    }
  }

  goHome() {
    browserHistory.push('/meteor-vr');
  }

  goToTwitter() {
    window.location = 'https://twitter.com/michaltakac';
  }

  goToGithub() {
    window.location = 'https://github.com/michaltakac';
  }

  changePosition() {
    this.setState({ position: '8 -2 -10' });
  }

  savePosition(newPosition, newRotation) {
    updatePosition.call({ position: newPosition, rotation: newRotation }, (error) => {
      if (error) {
        console.log(error.message);
      }
    });
  }
}

VR.propTypes = {
  user: PropTypes.object,
};

const composer = (props, onData) => {
  onData(null, { user: Meteor.user() });
};

export default composeWithTracker(composer, {}, {}, { pure: false })(VR);
