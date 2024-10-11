import styled from "@emotion/styled";

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

function App() {
  return <Button>Click me!</Button>;
}

export default App;
