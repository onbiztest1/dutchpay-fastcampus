import { useRecoilValue } from "recoil"
import { AddExpenseForm } from "./AddExpenseForm"
import { ExpenseTable } from "./ExpenseTable"
import { Container, Row, Col } from "react-bootstrap"
import styled from "styled-components"
import { groupNameState } from "../states/groupName"
import { SettlementSummary } from "./SettlementSummary"
import { ServiceLogo } from "./shared/ServiceLogo"

export const ExpenseMain = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} sm={5} md={5}>
                    <LeftPane />
                </Col>
                <Col>
                    <RightPane />
                </Col>
            </Row>
        </Container>
    )
}

const LeftPane = () => {
    return (
        <Container>
            <StyledGapRow>
                <Row>
                    <ServiceLogo />
                </Row>
                <Row>
                    <AddExpenseForm />
                </Row>
                <Row>
                    <SettlementSummary />
                </Row>
            </StyledGapRow>
        </Container>
    )
}

const StyledGapRow = styled(Row)`
    padding-top: 100px;
    gap: 5vh;
    justify-content: center;
`

const RightPane = () => {
    const groupName = useRecoilValue(groupNameState)
    
    return (
        <StyledRightPaneWrapper>
            <Row>
                <StyledGroupName>{groupName || 'Group Name'}</StyledGroupName>
            </Row>
            <Row>
                <ExpenseTable />
            </Row>
        </StyledRightPaneWrapper>
    )
}

const StyledRightPaneWrapper = styled(Container)`
    padding: 100px 31px;
`

const StyledGroupName = styled.h2`
    margin-bottom: 80px;
    font-weight: 700;
    font-size: 48px;
    line-height: 48px;
    text-align: center;
`