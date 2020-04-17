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

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { constructTimeline } from '../../../helpers/timeline/declarationHelper';
import { drawTimeline } from '../../../helpers/timeline/drawHelper';
import { Timeline } from './timeline.style';

const NodePerformanceTimeline = ({ graphJson }) => {
  const timelineRef = useRef(null);

  useEffect(() => {
    timelineRef.current.innerHTML = '';
    if (graphJson) {
      const timelineDeclaration = constructTimeline(graphJson);
      drawTimeline(timelineRef.current, timelineDeclaration);
    }
  }, [graphJson]);

  return (
    <Timeline tabIndex="0" ref={timelineRef} />
  );
};

NodePerformanceTimeline.defaultProps = {
  graphJson: null,
};

NodePerformanceTimeline.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  graphJson: PropTypes.object,
};

export default NodePerformanceTimeline;
