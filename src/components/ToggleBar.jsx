import styled from "styled-components";

const ToggleBar = ({list, selectedIdx, onclick}) => {
    return <ToggleDiv>
        { list.map((item, idx) => <ToggleItem
            key={item}
            selected={idx == selectedIdx}
            onClick={ () => onclick(idx) } >
                {item}
            </ToggleItem>) }
    </ToggleDiv>
}

const ToggleDiv = styled.div`
    margin-left: 20px;
    margin-right: 20px;

    display: flex;
    flex-direction: horizontal;
    align-items: center;
    gap: 3px;
    padding: 5px;

    background-color: #FFFFFF;
    height: 52px;
    border-radius: calc(52px / 2);
`;

const ToggleItem = styled.button`
    flex: 1 1 0;
    color: ${(props) => props.selected ? '#FFFFFF' : '#FF6B6B'};
    background-color: ${(props) => props.selected ? '#FF5A6D' : 'transparent'};
    
    height: 42px;
    border-radius: calc(42px / 2);

    font-family: 'Pretendard-Regular';
    font-size: 16px;


`;

export default ToggleBar;