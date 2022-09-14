import TextField from "@mui/material/TextField";

const LoanInputs = () => {
    return (
        <>
            <h1>Loan Inputs</h1>
            <TextField
                // error
                // id="filled-error"
                label="Amount"
                // defaultValue="Hello World"
                // variant="filled"
            />
            <TextField label="Term (Yrs)" />
            <TextField label="Rate" />
        </>
    );
};

export default LoanInputs;
