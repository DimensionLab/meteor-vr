import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export const Index = () => (
  <Jumbotron className="text-center">
    <h2>MeteorVR</h2>
    <p>Work-in-progress. Using A-Frame for web-based VR. Trying to achieve multiuser
    VR experience in browser. Not working as expected yet!</p>
    <p>You can help by forking <a href="https://github.com/DimensionLab/meteor-vr">this</a> repo and contributing!</p>
  </Jumbotron>
);
