import { InputTags } from "react-bootstrap-tagsinput";
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm"
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../states/groupMembers";
import { useState } from "react";
import { groupNameState } from "../states/groupName";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export const AddMembers = () => {
    const groupName = useRecoilValue(groupNameState)
    const [validated, setValidated] = useState(false)
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)
    const navigate = useNavigate()

    const header = `${groupName} 그룹 멤버들의 이름을 입력해 주세요`

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidated(true)

        if(groupMembers.length > 0){
            navigate(ROUTES.EXPENSE_MAIN)
        }
    }
    
    return (
        <CenteredOverlayForm
            title={header}
            validated={validated}
            handleSubmit={handleSubmit}
        >
            <InputTags 
                placeholder='이름 간 띄어쓰기'
                onTags={(value) => setGroupMembers(value.values)}
                data-testid='input-member-names'
            />
            { validated && groupMembers.length === 0 && (
                <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요</StyledErrorMessage>
            )}
        </CenteredOverlayForm>
    );
}

const StyledErrorMessage = styled.span`
    color: red;
`