import React, { memo, useEffect, useState } from "react";
// import { dollar } from "../../Utilities/formatters";
// import Table from "../GenericUI/Table";
// import BaseCheckboxRadio from "../Inputs/Base/BaseCheckboxRadio";

// https://mui.com/material-ui/react-table/

/**
 * @function
 * @desc Comma separates and prepends dollar sign ($) to input number.
 * @param {int | string} number - Number to format
 * @returns {string} - Number in dollar format
 */
export const dollar = (number) => {
    const val = Math.round(Math.abs(number));
    const dollarSign = Math.round(number) < 0 ? "$-" : "$";
    if (isNaN(val)) return "N/A";
    return number;
    // return `${dollarSign}${commaSeparateNumber(val)}`;
};

/**
 * @Component AmortizationSchedule
 * @param {Loan} props.loan
 * @param {boolean} props.isMonthly
 * @returns {node} Amortization Schedule table
 */
const AmortizationSchedule = memo(({ loan }) => {
    const [isMonthly, setIsMonthly] = useState(true);
    const [tableData, setTableData] = useState([]);
    const { baseRate, amount, term } = loan;

    useEffect(() => {
        setTableData(getAmortizationScheduleTableData());
    }, [baseRate, amount, term, isMonthly]);

    const getAmortizationScheduleTableData = () => {
        const amortizationScheduleHeader = {
            index: "Payment #",
            payment: "P&I",
            principal: "Principal",
            interest: "Interest",
            balance: "Balance",
        };
        const amortizationSchedule = isMonthly
            ? getMonthlyAmortizationSchedule()
            : getYearlyAmortizationSchedule();
        return [amortizationScheduleHeader, ...amortizationSchedule];
    };

    const getMonthlyAmortizationSchedule = () => {
        return loan.amortizationSchedule.map((amort, i) => ({
            index: i + 1,
            payment: dollar(Math.round(amort.payment)),
            principal: dollar(Math.round(amort.principal)),
            interest: dollar(Math.round(amort.interest)),
            balance: dollar(Math.round(amort.balance)),
        }));
    };

    const getYearlyAmortizationSchedule = () => {
        const yearlyAmortizationSchedule = [];

        const pushYearlyAmortization = (amort, paymentNumber) => {
            yearlyAmortizationSchedule.push({
                index: paymentNumber,
                payment: dollar(Math.round(amort.total)),
                principal: dollar(Math.round(amort.totalPrincipal)),
                interest: dollar(Math.round(amort.totalInterest)),
                balance: dollar(Math.round(amort.balance)),
            });
        };

        const amortizationScheduleLength = loan.amortizationSchedule.length;
        if (amortizationScheduleLength < 12) {
            const amort =
                loan.amortizationSchedule[amortizationScheduleLength - 1];
            pushYearlyAmortization(amort, 1);
        } else {
            loan.amortizationSchedule.forEach((amort, i) => {
                if ((i + 1) % 12 === 0)
                    pushYearlyAmortization(amort, (i + 1) / 12);
            });
        }
        return yearlyAmortizationSchedule;
    };

    return (
        <>
            {/* <BaseCheckboxRadio
                label="Monthly"
                buttonProps={{
                    onClick: () => setIsMonthly(true),
                    type: "radio",
                    checked: isMonthly,
                }}
            />
            <BaseCheckboxRadio
                label="Yearly"
                buttonProps={{
                    onClick: () => setIsMonthly(false),
                    type: "radio",
                    checked: !isMonthly,
                }}
            />
            <Table data={tableData} /> */}
        </>
    );
});

export default AmortizationSchedule;
