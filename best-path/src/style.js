import styled from 'styled-components';

export const SectionName = styled.h2`
  text-align: left;
`;

export const Container = styled.div`
  width: 60vw;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const ItemsSection = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ItemTable = styled.table`
  width: 350px;
  border-collapse: collapse;
  border: 1px solid black;
`;

export const ItemTableHeader = styled.thead`
  border-bottom: 1px solid black;
`;

export const GraphSection = styled.div`
    display: flex;
  justify-content: space-evenly;
`;

export const CalculateButton = styled.button`
  border-radius: 12px;
  outline: none;
  background-color: transparent;
  padding: 6px 12px;
  border: 1px solid black;
  margin-top: 5rem;
`;

export const CreateButton = styled.button`
  margin-top: 1rem;
`;

export const VertexSelect = styled.select`
  width: 120px;
`;

export const ConfirmButton = styled.button`
  margin-left: 0.5rem;
`;