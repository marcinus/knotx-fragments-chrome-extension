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

/* eslint-disable no-undef */

// page object is from jest-puppeteer API

const snapshot = async (url) => {
  await page.goto(url);
  return page.screenshot();
};

describe('SidePanel', () => {
  it('is visually correct', async () => {
    const image = await snapshot('http://localhost:6006/iframe.html?id=logic-components-sidepanel--side-panel-story');
    expect(image).toMatchImageSnapshot();
  });
});

describe('FragmentGantt', () => {
  it('is visually correct', async () => {
    const image = await snapshot(
      'http://localhost:6006/iframe.html?id=logic-components-sidepanel-fragmentgantt--fragment-gantt-story',
    );
    expect(image).toMatchImageSnapshot();
  });
});

describe('FragmentList', () => {
  it('FragmentList is visually correct', async () => {
    const image = await snapshot(
      'http://localhost:6006/iframe.html?id=logic-components-sidepanel-fragmentlist--fragment-list-story',
    );
    expect(image).toMatchImageSnapshot();
  });

  it('FragmentListItem is visually correct', async () => {
    // eslint-disable-next-line max-len
    const image = await snapshot('http://localhost:6006/iframe.html?id=logic-components-sidepanel-fragmentlist-fragmentlistitem--fragment-list-item-story');
    expect(image).toMatchImageSnapshot();
  });
});

describe('Legend', () => {
  it('is visually correct', async () => {
    const image = await snapshot(
      'http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph-legend--legend',
    );
    expect(image).toMatchImageSnapshot();
  });
});

describe('NodeInfo', () => {
  it('is visually correct', async () => {
    const image = await snapshot(
      'http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph-nodeinfo--node-info-story',
    );
    expect(image).toMatchImageSnapshot();
  });
});

describe('NodePerformanceTimeline', () => {
  it('is visually correct', async () => {
    const image = await snapshot(
      // eslint-disable-next-line max-len
      'http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph-nodeperformancetimeline--node-performance-timeline-story',
    );
    expect(image).toMatchImageSnapshot();
  });
});

describe('Graph', () => {
  it('is visually correct', async () => {
    const image = await snapshot('http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph--graph');
    expect(image).toMatchImageSnapshot();
  });
});
