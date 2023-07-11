import styled from 'styled-components';

interface Props {
  flexColumn?: boolean;
}

const CenteredItems = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ flexColumn }) => (flexColumn ? 'column' : 'row')};
`;

export default CenteredItems;
