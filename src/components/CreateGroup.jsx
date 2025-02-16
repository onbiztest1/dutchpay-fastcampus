import { Form } from "react-bootstrap"
import { CenteredOverlayForm } from "./shared/CenteredOverlayForm"
import { useRecoilState } from "recoil"
import { groupNameState } from "../states/groupName"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateGroup = () => {
    const [validated, setValidated] = useState(false)
    const [validGroupName, setValidGroupName] = useState(false)
    const [groupName, setGroupName] = useRecoilState(groupNameState)
    const navigator = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget

        if(form.checkValidity()){
            setValidGroupName(true)
            navigator('/members')
        } else {
            e.stopPropagation()
            setValidGroupName(false)
        }

        setValidated(true)
    }

    return (
        <CenteredOverlayForm
            title='먼저, 더치페이 할 그룹의 이름을 정해볼까요?'
            validated={validated}
            handleSubmit={handleSubmit}
        >
            <Form.Group>
                <Form.Control
                    required
                    type="text"
                    placeholder="2022 제주도 여행"
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <Form.Control.Feedback
                    type="invalid"
                    data-valid={validGroupName}
                >
                    그룹 이름을 입력해주세요
                </Form.Control.Feedback>
            </Form.Group>
        </CenteredOverlayForm>
    )
}