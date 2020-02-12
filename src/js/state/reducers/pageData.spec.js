
import pageDataReducer, { initState } from './pageData';
import { SET_PAGE_DATA, REMOVE_PAGE_DATA } from '../actionTypes/pageData';


const currentPageData = {
  id: 'example_id_0',
  url: 'www.exampleurl0.com',
  fragments: [],
};

const nextPageData = {
  id: 'example_id_1',
  url: 'www.exampleurl1.com',
  fragments: [],
};


describe('pageData reducer', () => {
  test('Handles empty action', () => {
    const state = pageDataReducer(undefined, {});
    expect(state).toEqual(initState);
  });

  describe('SET_PAGE_DATA', () => {
    test('Handles SET_PAGE_DATA action with initial state', () => {
      const expectedData = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
        },
      };

      const state = pageDataReducer(undefined, { type: SET_PAGE_DATA, pageData: currentPageData });
      expect(state).toEqual(expectedData);
    });

    test('Handles SET_PAGE_DATA action with some data already existing in state', () => {
      const initialState = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
        },
      };

      const expectedData = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
        },
        [nextPageData.id]: {
          url: nextPageData.url,
          fragments: nextPageData.fragments,
        },
      };

      const state = pageDataReducer(initialState, { type: SET_PAGE_DATA, pageData: nextPageData });
      expect(state).toEqual(expectedData);
    });
  });

  describe('REMOVE_PAGE_DATA', () => {
    test('Handles REMOVE_PAGE_DATA action with initial state', () => {
      const state = pageDataReducer(undefined, { type: REMOVE_PAGE_DATA, pageData: { id: currentPageData.id } });
      expect(state).toEqual(initState);
    });

    test('Handles REMOVE_PAGE_DATA action with some data already existing in state', () => {
      const initialState = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
        },
      };

      const expectedData = {
        [nextPageData.id]: {
          url: nextPageData.url,
          fragments: nextPageData.fragments,
        },
      };

      const state = pageDataReducer(initialState, { type: SET_PAGE_DATA, pageData: nextPageData });
      pageDataReducer(state, { type: REMOVE_PAGE_DATA, pageData: { id: currentPageData.id } });
      expect(state).toEqual(expectedData);
    });
  });
});
