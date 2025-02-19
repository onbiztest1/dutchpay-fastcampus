import { Form, Button, Container, Row } from "react-bootstrap"
import styled from "styled-components"
import { OverlayWrapper } from "./OverlayWrapper"
import { ServiceLogo } from "./ServiceLogo"

export const CenteredOverlayForm = ({ children, title, validated, handleSubmit }) => {
    return (
        <StyledCentralizedContainer>
            <ServiceLogo />
            <OverlayWrapper>
                <Container>
                    <Form 
                        noValidate 
                        validated={validated} 
                        onSubmit={handleSubmit}
                    >
                        <StyledCentralizedContent>
                            <Row className="align-items-start">
                                <StyledTitle>{ title }</StyledTitle>
                            </Row>
                            <Row className="align-items-center">
                                { children }
                            </Row>
                            <Row className="align-items-end">
                                <StyledButton>저장</StyledButton>
                            </Row>
                        </StyledCentralizedContent>
                    </Form>
                </Container>
            </OverlayWrapper>
        </StyledCentralizedContainer>
    )
}

const StyledCentralizedContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50vw;
    min-height: 100vh;

    @media (max-width: 500px) {
        width: 80vw;
    }

`

const StyledCentralizedContent = styled(Row)`
    height: 60vh;
    justify-content: center;
    align-items: center;
`

const StyledTitle = styled.h2`
    font-weight: 700;
    line-weight: 35px;
    text-align: right;
    overflow-wrap: break-word;
    word-break: keep-all;
`

const StyledButton = styled(Button).attrs({
    type: 'submit'
})`
    width: 60%;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #6610F2;
    border: none;

    &:hover{
        background-color: #6610F2;
        filter: brightness(80%);
    }
`