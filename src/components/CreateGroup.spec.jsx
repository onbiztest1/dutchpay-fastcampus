import { render, screen } from "@testing-library/react"
import { CreateGroup } from "./CreateGroup"
import userEvent from "@testing-library/user-event"
import { RecoilRoot } from "recoil"

const renderComponent = () => {
    render(
        <RecoilRoot>
            <CreateGroup />
        </RecoilRoot>
    )
    
    const input = screen.getByPlaceholderText('2022 제주도 여행')
    const saveButton = screen.getByText('저장')
    const errorMessage = screen.getByText('그룹 이름을 입력해주세요')

    return {
        input,
        saveButton,
        errorMessage
    }
}

describe('그룹 생성 컴포넌트', () => {
    test('그룹 이름 입력 컴포넌트가 렌더링 되는가', () => {
        const { input, saveButton } = renderComponent()

        expect(input).not.toBeNull()
        expect(saveButton).not.toBeNull()
    })

    test('그룹 이름을 입력하지 않고 저장 버튼을 클릭시, 에러 메시지를 노출한다', async () => {
        const { saveButton, errorMessage } = renderComponent()

        await userEvent.click(saveButton)
        expect(errorMessage).toHaveAttribute('data-valid', 'false')
    })

    test('그룹 이름을 입력하고 저장 버튼을 클릭시, 저장 성공', async () => {
        const { input, saveButton, errorMessage } = renderComponent()

        await userEvent.type(input, '예시 그룹명')
        await userEvent.click(saveButton)
        expect(errorMessage).toHaveAttribute('data-valid', 'true')
    })
})