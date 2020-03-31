import styled from 'styled-components';

export const Timeline = styled.div`
  height: 100%;

  .vis-labelset .vis-label {
    color: ${({ theme }) => theme.TEXT};
  }

  .vis-label.vis-nested-group.vis-group-level-unknown-but-gte1 {
    background-color: ${({ theme }) => theme.BACKGROUND};
    border-color: #BFBFBF;
  }

  .vis-time-axis .vis-text {
    color: ${({ theme }) => theme.TEXT};
  }
`;
