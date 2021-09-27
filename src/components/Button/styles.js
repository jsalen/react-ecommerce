import styled from 'styled-components';

export const Btn = styled.button`
  width: ${(props) => (props.size === 'md' ? '50%' : '100%')};
  height: 45px;
  margin: ${(props) => (props.size === 'md' ? '0 auto' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d9bf0;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;

  & svg {
    margin-left: 4px;
  }
`;
