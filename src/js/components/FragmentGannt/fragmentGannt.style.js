import styled from 'styled-components';

export const GanntContainer = styled.div`
    max-height: 50vh;
`;

export const TimelineBar = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.TABLE_HEADER_BG};
  cursor: pointer;

  span {
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.WHITE_BLACK};
    margin: 0 10px;
  }

  svg {
    color: ${({ theme }) => theme.WHITE_BLACK};
    font-size: 14px;
    margin: 0 5px;
  }
`;

export const Timeline = styled.div`
  height: calc(50vh - 30px);
  display: ${({ expanded }) => (expanded ? 'block' : 'none')}
`;
