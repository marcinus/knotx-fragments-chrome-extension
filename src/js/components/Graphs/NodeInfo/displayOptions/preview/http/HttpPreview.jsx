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

import React, { useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import renderjson from 'renderjson';
import {
  PreviewContainer,
  RequestContainer,
  ResponseContainer,
  LoopBar,
  PreviewWrapper,
} from './httpPreview.styled';

renderjson.set_icons('+', '-');
renderjson.set_show_to_level(1);

const HttpPreview = ({ nodeJson }) => {
  const request = useRef(null);
  const response = useRef(null);

  const [loopIndex, setLoopIndex] = useState(0);
  const [requestInfo, setRequestInfo] = useState(nodeJson.response.invocations[0].logs.request);
  const [responseInfo, setResponseInfo] = useState(nodeJson.response.invocations[0].logs.response);
  const [responseBodyInfo, setResponseBodyInfo] = useState(nodeJson.response.invocations[0].logs.responseBody);


  const setInfo = (index) => {
    setLoopIndex(index);
    setRequestInfo(nodeJson.response.invocations[loopIndex].logs.request);
    setResponseInfo(nodeJson.response.invocations[loopIndex].logs.response);
    setResponseBodyInfo(nodeJson.response.invocations[loopIndex].logs.responseBody);
  };

  useLayoutEffect(() => {
    request.current.innerHTML = '';
    request.current.appendChild(renderjson(requestInfo));
    response.current.innerHTML = '';
    response.current.appendChild(renderjson({
      responseStatus: responseInfo,
      responseBody: responseBodyInfo,
    }));
  }, [nodeJson]);

  const createInvocationButtons = () => {
    const { invocations } = nodeJson.response;

    return invocations.map((_, index) => (
      // TODO add unique key
      // eslint-disable-next-line react/jsx-key
      <button type="button" onClick={() => setInfo(index)}>
        {index + 1}
      </button>
    ));
  };

  return (
    <PreviewWrapper>
      <LoopBar>
        {createInvocationButtons()}
      </LoopBar>
      <PreviewContainer>
        <RequestContainer>
          <h2>Request</h2>
          <div ref={request} />
        </RequestContainer>
        <ResponseContainer>
          <h2>Response</h2>
          <div ref={response} />
        </ResponseContainer>
      </PreviewContainer>
    </PreviewWrapper>

  );
};

HttpPreview.defaultProps = {
  nodeJson: null,
};

HttpPreview.propTypes = {
  nodeJson: PropTypes.instanceOf(Object),
};

export default HttpPreview;
