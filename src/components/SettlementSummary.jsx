import { useRecoilValue } from "recoil"
import { expensesState } from "../states/expenses"
import { groupMembersState } from "../states/groupMembers"
import styled from "styled-components"
import { StyledTitle } from "./AddExpenseForm"
import { Button } from "react-bootstrap"
import { toPng } from "html-to-image"
import { useRef } from "react"
import { ArrowRight, CloudDownload, Download } from "react-bootstrap-icons"

const calculateMinimumTransaction = (expenses, members, amountPerPerson) => {
    const minTransaction = []
    if (amountPerPerson === 0){
        return minTransaction
    }

    // 1. 사람마다 내야 하는 금액
    const membersToPay = {}
    members.forEach(member => {
        membersToPay[member] = amountPerPerson
    })

    // 2. 사람마다 내야 하는 금액 반영하기
    expenses.forEach(({ amount, payer }) => {
        membersToPay[payer] -= amount
    })

    // 3. amount를 기준으로 오름차순 정렬하기
    const sortedMembersToPay = Object.keys(membersToPay)
        .map(member => (
            {member: member, amount: membersToPay[member]}
        ))
        .sort((a, b) => a.amount - b.amount)

    // 4. minTransaction 계산하기
    let left = 0
    let right = sortedMembersToPay.length - 1

    while (left < right) {
        while (left < right && sortedMembersToPay[left].amount === 0){
            left += 1
        }
        
        while (left < right && sortedMembersToPay[right].amount === 0){
            right -= 1
        }

        const toReceive = sortedMembersToPay[left]
        const toSend = sortedMembersToPay[right]
        const amountToReceive = Math.abs(toReceive.amount)
        const amountToSend = Math.abs(toSend.amount)

        if (amountToReceive < amountToSend){
            minTransaction.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount: amountToReceive
            })
            
            toReceive.amount = 0
            toSend.amount -= amountToReceive
            left += 1
        } else {
            minTransaction.push({
                receiver: toReceive.member,
                sender: toSend.member,
                amount: amountToSend
            })

            toSend.amount = 0
            toReceive.amount += amountToSend
            right -= 1
        }
    }

    return minTransaction
}

export const SettlementSummary = () => {
    // reference to download image
    const wrapperElement = useRef(null)
    
    // Recoil State - Expenses, Members
    const expenses = useRecoilValue(expensesState)
    // const members = ['A', 'B', 'C', 'D']
    const members = useRecoilValue(groupMembersState)
    
    const totalExpenseAmount = parseInt(
        expenses.reduce((prevAmount, curExpense) => prevAmount + parseInt(curExpense.amount), 0))
    const groupMembersCount = members.length
    const splitAmount = totalExpenseAmount / groupMembersCount

    const minimumTransaction = calculateMinimumTransaction(expenses, members, splitAmount)

    const exportToImage = () => {
        if (wrapperElement.current === null){
            return
        }
        
        toPng(wrapperElement.current, {
            filter: (node) => {
                return (node.tagName !== 'BUTTON')
            }
        })
            .then((dataUrl) => {
                let link = document.createElement('a');
                link.download = 'settlement-summary.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <StyledWrapper ref={wrapperElement}>
            <StyledTitle>2. 정산은 이렇게!</StyledTitle>
            { totalExpenseAmount > 0 && groupMembersCount > 0 && (
                <>
                    <StyledSummary>
                        <span>{groupMembersCount}명 - 총 {totalExpenseAmount} 원 지출</span>
                        <br />
                        <span>한 사람 당 {splitAmount} 원</span>
                    </StyledSummary>

                    <StyledUl>
                        { minimumTransaction.map(({receiver, sender, amount}, idx) => (
                            <li key={`transaction-${idx}`}>
                                <span>{sender}가 {receiver}에게 {amount} 원 보내기</span>
                            </li>
                        )) }
                    </StyledUl>
                    <StyledButton data-testid='btn-download' onClick={exportToImage}>
                        <Download />
                    </StyledButton>
                </>
            ) }
        </StyledWrapper>
    )
}

const StyledWrapper = styled.div`
    padding: 50px;
    background-color: #683BA1;
    color: #FFFBFB;
    box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    text-align: center;
    font-size: 22px;
    position: relative;
`

const StyledSummary = styled.div`
    margin-top: 31px;
`

const StyledUl = styled.ul`
    margin-top: 31px;
    font-weight: 600;
    line-height: 40px;
    list-style-type: disclosure-closed;
    li::marker {
        animation: blinker 1.5s linear infinite;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
`

const StyledButton = styled(Button)`
    background: none;
    border: none;
    font-size: 25px;
    position: absolute;
    top: 15px;
    right: 15px;

    &:hover, &:active{
        background: none;
        color: #683BA1;
    }
`