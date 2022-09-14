import LoanInputs from "@/components/LoanInputs";
import React, { useEffect, useRef, useState } from "react";
// import AmortizationSchedule from "../AmortizationSchedule";
// import LoanCard, { LoanCardControls } from "../../Inputs/LoanCard";

const dollar = (number) => number;

/**
 * @Component ActionCenterPayment
 * @description Quick tool nested in the action center
 * @returns {node} Node with base loan card inputs and the monthly payment for a loan defaulted to conventional type
 */
const Payment = () => {
    const [loan, setLoan] = useState(null);
    const [tableLoan, setTableLoan] = useState(null);
    const [monthlyPayment, setMonthlyPayment] = useState();
    // const loanCardControlsRef = useRef(new LoanCardControls().setAll(false));
    // const loanCardControls = loanCardControlsRef.current;
    // loanCardControls.baseRate = true;
    // loanCardControls.amount = true;
    // loanCardControls.term = true;

    useEffect(() => {
        // const newLoan = new Loan({ baseAmount: 270000 });
        // setLoan(newLoan);
        // setTableLoan(newLoan.clone());
        // setMonthlyPayment(dollar(newLoan.monthlyPayment));
    }, []);

    const shouldRecalculate = (() => {
        if (!loan) return false;
        const { baseRate, amount, term } = loan;
        return (
            tableLoan?.baseRate !== baseRate ||
            tableLoan?.amount !== amount ||
            tableLoan?.term !== term
        );
    })();

    const calculateResults = () => {
        setTableLoan(loan.clone());
        setMonthlyPayment(dollar(loan.amortizationSchedule[0].payment || 0));
    };

    return (
        <>
            <LoanInputs />
            {/* <Row stack>
                <Col size="6">
                    <LoanCard
                        isVertical
                        loan={loan}
                        controls={loanCardControls}
                    />
                </Col>
                <Col>
                    <ButtonPrimary
                        action="success"
                        text={shouldRecalculate ? "Recalculate" : "Calculate"}
                        onClick={calculateResults}
                        buttonProps={{ disabled: !shouldRecalculate }}
                    />
                    <ButtonSecondary
                        action="primary"
                        classNames="btnBlue"
                        icon="external-link"
                        iconRight={true}
                        text={"View Full Schedule"}
                        onClick={redirectToAmortCalc}
                    />
                </Col>
                <Col size="12" className="has-text-centered">
                    <HeaderText
                        type="section"
                        main={monthlyPayment}
                        sub="Monthly Payment"
                    />
                </Col>
                <Col>{tableLoan && <AmortizationSchedule loan={tableLoan} />}</Col>
            </Row> */}
        </>
    );
};

export default Payment;
