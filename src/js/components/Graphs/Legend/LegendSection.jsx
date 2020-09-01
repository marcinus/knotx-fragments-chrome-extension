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

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setDocPageLink } from '../../../state/actions/pageData';
import {
  LegendHeader,
  LegendItemIcon,
  SquareIcon,
  CircleIcon,
  RectangleIcon,
  LineIcon,
  LegendItemDescription,
  LegendItem,
  LegendSectionContainer,
} from './legend.style';

/* eslint-disable react/display-name */
const getIcon = {
  square: (color) => (<SquareIcon color={color} />),
  circle: (color) => (<CircleIcon color={color} />),
  rectangle: (color) => (<RectangleIcon color={color} />),
  solid: (color) => (<LineIcon color={color} shape="solid" />),
  dashed: (color) => (<LineIcon color={color} shape="dashed" />),
};
/* eslint-enable react/display-name */

const LegendSection = ({ tabId, title, items }) => {
  const dispatch = useDispatch();
  const sectionItems = items.map(({
    desc,
    shape,
    color,
    docs,
  }) => (
    <LegendItem key={desc}>
      <LegendItemIcon>
        {getIcon[shape] ? getIcon[shape](color) : ''}
      </LegendItemIcon>
      <LegendItemDescription onClick={() => dispatch(setDocPageLink({ id: tabId, docPageLink: docs }))}>
        {desc}
      </LegendItemDescription>
    </LegendItem>
  ));

  return (
    <LegendSectionContainer>
      <LegendHeader>{title}</LegendHeader>
      {sectionItems}
    </LegendSectionContainer>
  );
};

LegendSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.instanceOf(Object).isRequired,
  tabId: PropTypes.instanceOf(Object).isRequired,
};

export default LegendSection;
