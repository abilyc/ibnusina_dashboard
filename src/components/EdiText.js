import EdiText from "react-editext";
import { styled } from '@mui/material/styles';


const StyledEdit = styled(EdiText)`
    button {
        border-radius: 5px;
    }
    button[editext="edit-button"] {
        display: none;    
        color: #000;
        width: 50px;
    }
    button[editext="save-button"] {
        width: 50px;
        &:hover {
            background: greenyellow;
        }
    }
    button[editext="cancel-button"] {
        &:hover {
            background: crimson;
            color: #fff;
        }
    }
    input, textarea {
        border-style: hidden;
        font-size: 16px;
        color: #FFF;
        text-shadow: 0 0 3px rgba(0,0,0,0.6);
        background: rgba(255,255,255,0.6);
        width: 0;
        font-weight: bold;
        border-radius: 5px;
    }
    input:focus, textarea:focus {
        outline: none;
    }
    // div[editext="view-container"], div[editext="edit-container"] {
    //     background: rgba(0,0,0,0.7);
    //     padding: 5px;
    //     padding-left: 15px;
    //     border-radius: 5px;
    //     color: #fff;
    // }
    div[editext="view"]{
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        text-shadow: 0 0 3px rgba(0,0,0,0.6);
    }
`;

export const TitleEdit = (props) => <StyledEdit {...props} />;