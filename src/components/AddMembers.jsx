import { InputTags } from "react-bootstrap-tagsinput";
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm"
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../states/groupMembers";
import { useState } from "react";
import { groupNameState } from "../states/groupName";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { Form } from "react-bootstrap";

export const AddMembers = () => {
    const groupName = useRecoilValue(groupNameState)
    const [validated, setValidated] = useState(false)
    const [groupMembersString, setGroupMembersString] = useState('')
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState)
    const navigate = useNavigate()

    const isSamsungInternet = () => {
        return window.navigator.userAgent.includes('SamsungBrowser')
    }

    const header = `${groupName} 그룹 멤버들의 이름을 입력해 주세요`

    const handleSubmit = (e) => {
        e.preventDefault()
        setValidated(true)

        if(groupMembers.length > 0){
            navigate(ROUTES.EXPENSE_MAIN)
        } 
        else if(isSamsungInternet() && groupMembersString.length > 0){
            setGroupMembersString(groupMembersString.split(','))
        }
    }
    
    return (
        <CenteredOverlayForm
            title={header}
            validated={validated}
            handleSubmit={handleSubmit}
        >
            { isSamsungInternet() ?
                <Form.Control 
                    placeholder="이름 간 컴마(,)로 구분"
                    onChange={(e) => setGroupMembersString(e.target.value)}
                />
            :
                <InputTags 
                    placeholder='이름 간 띄어쓰기'
                    onTags={(value) => setGroupMembers(value.values)}
                    data-testid='input-member-names'
                />
            }

            { validated && groupMembers.length === 0 && (
                <StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요</StyledErrorMessage>
            )}
        </CenteredOverlayForm>
    );
}

const StyledErrorMessage = styled.span`
    color: red;
`