import styled from 'styled-components';
import { PAGE_BREAK } from '../../helpers/constants';

export const GraphWrapper = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    width: 100%;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 50%;
      flex: 1 1 auto;
    }
`;

export const GraphContainer = styled.div`
     height: calc(50% - 87px);
     flex: 1 1 auto;
     display: ${({ shouldDisplay }) => (shouldDisplay === 'graph' ? 'block' : 'none')};
`;

export const Graph = styled.div`
     height: 100%;
`;

export const PerformanceTimeLineContainer = styled.div`
     height: 50%;
     flex: 1 1 auto;
     display: ${({ shouldDisplay }) => (shouldDisplay === 'performanceTimeLine' ? 'block' : 'none')};
`;

export const GraphHeaderContainer = styled.div`
    padding: 0 5px;
    margin-left: 40px;
`;

export const GraphHeader = styled.h2`
    color: ${({ theme }) => theme.TEXT};
    margin: 10px 0;
`;

export const GraphNavigationWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const GraphToogleViewButton = styled.button`
    width: 50%;
    padding: 15px 5px;
    font-size: 12px;
    color: ${({ theme }) => theme.TEXT};
    margin: 0;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.BORDER};
    border-bottom: ${({ theme, active }) => (active ? 'none' : `1px solid ${theme.BORDER}`)};
    border-top: ${({ theme, active }) => (active ? `1px solid ${theme.BORDER}` : 'none')};

    &:nth-child(1) {
      border-left: none;
      border-right: none;
    }

    &:nth-child(2) {
      border-right: none;
    }
`;

export const LegendIcon = styled.button`
    display: block;
    position: relative;
    float: right;
    bottom: 41px;
    height: 41px;
    width: 41px;
    border: none;
    padding: 0;
    font-size: 18px;
    color: ${({ theme }) => theme.TEXT};

    &:hover {
        cursor: pointer;
    }
`;

export const GraphAdditionalPanel = styled.div`
    background-color: ${({ theme }) => theme.BACKGROUND};
    width: 100%;
    overflow: scroll;
    border-top: ${({ theme }) => `1px solid ${theme.BORDER}`};
    display: ${({ display }) => (display ? 'block' : 'none')};
    min-height: 25%;
    height: 50%;
`;

export const GraphAdditionalPanelHeader = styled.div`
    position: fixed;
    background-color: white;
    width: 100%;
    color: ${({ theme }) => theme.TEXT};

    h2 {
      font-size: 18px;
      font-weight: 400;
      margin: 10px;
    }
`;

export const GraphAdditionalPanelContent = styled.div`
    margin-top: 41px;
`;

export const GraphAdditionalPanelCloseButton = styled.div`
    position: fixed;
    width: 41px;
    height: 41px;
    right: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${({ theme }) => theme.TEXT};

    &:hover {
        cursor: pointer;
    }
`;
