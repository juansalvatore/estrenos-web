import styled from 'styled-components';
import { rem } from 'polished';

export const GoBack = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${rem('60px')};
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: ${rem('180px')};
  margin: ${rem('20px')} 0;
`;

export const TableContainer = styled.div`
  height: ${rem('400px')};
`;