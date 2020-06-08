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
  ExecutionContainer,
  RequestContainer,
  ResponseContainer,
  LoopBar,
  HttpExecutionWrapper,
} from './httpExecution.styled';

renderjson.set_icons('+', '-');
renderjson.set_show_to_level(1);

const HttpExecution = ({ nodeJson }) => {
  const request = useRef(null);
  const response = useRef(null);

  const [loopIndex, setLoopIndex] = useState(0);
  const [requestInfo, setRequestInfo] = useState(nodeJson.response.invocations[0].logs.request);
  const [responseInfo, setResponseInfo] = useState(nodeJson.response.invocations[0].logs.response);
  const [responseBody, setResponseBody] = useState(nodeJson.response.invocations[0].logs.responseBody);


  const setInfo = (index) => {
    setLoopIndex(index);
    setRequestInfo(nodeJson.response.invocations[loopIndex].logs.request);
    setResponseInfo(nodeJson.response.invocations[loopIndex].logs.response);
    setResponseBody(nodeJson.response.invocations[loopIndex].logs.responseBody);
  };

  useLayoutEffect(() => {
    request.current.innerHTML = '';
    request.current.appendChild(renderjson(requestInfo));
    response.current.innerHTML = '';
    response.current.appendChild(renderjson({ respone: responseInfo, responseBody }));
  }, [nodeJson]);

  const createInvocationButtons = () => {
    const { invocations } = nodeJson.response;

    return invocations.map((_, index) => (
      // eslint-disable-next-line react/jsx-key
      <button type="button" onClick={() => setInfo(index)}>
        {index + 1}
      </button>
    ));
  };

  return (
    <HttpExecutionWrapper>
      <LoopBar>
        {createInvocationButtons()}
      </LoopBar>
      <ExecutionContainer>
        <RequestContainer>
          <h2>Request</h2>
          <div ref={request} />
        </RequestContainer>
        <ResponseContainer>
          <h2>Response</h2>
          <div ref={response} />
        </ResponseContainer>
      </ExecutionContainer>
    </HttpExecutionWrapper>
  );
};

HttpExecution.defaultProps = {
  nodeJson: null,
};

HttpExecution.propTypes = {
  nodeJson: PropTypes.instanceOf(Object),
};

export default HttpExecution;
