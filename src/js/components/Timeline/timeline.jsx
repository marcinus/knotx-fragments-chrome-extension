/*
 * Copyright (C) 2020 Knot.x Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { constructTimeline } from '../../helpers/timeline/declarationHelper';
import { drawTimeline } from '../../helpers/timeline/drawHelper';
import { TimelineContainer, Timeline } from './timeline.style';

import 'vis-timeline/dist/vis-timeline-graph2d.min.css';

const selectors = {
  TIMELINE: '.timelineContainer .timeline',
};

const TimelineComponent = ({
  graphJson,
}) => {
  useEffect(() => {
    const timelineContainer = document.querySelector(selectors.TIMELINE);
    const timelineDeclaration = constructTimeline(graphJson);
    drawTimeline(timelineContainer, timelineDeclaration);
  }, []);

  return (
    <TimelineContainer className="timelineContainer">
      <Timeline className="timeline" />
    </TimelineContainer>
  );
};

TimelineComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  graphJson: PropTypes.object.isRequired,
};

export default TimelineComponent;
