import React, { useState, useEffect } from "react";
import Form from "./RepaymentForm";
import Table from "./Table";
import FlashMessage from "./FlashMessage";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import SignUpPrompt from "./SignUpPrompt";

const RepaymentsTracker = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [expenses, setExpenses] = useState(() => {
        // Retrieve expenses from localStorage on component mount
        const storedExpenses = localStorage.getItem("expenses");
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    });
    const [newExpense, setNewExpense] = useState("");
    const [newInitialAmount, setNewInitialAmount] = useState("");
    const [newAmountReduced, setNewAmountReduced] = useState("");
    const [newDeductionDate, setNewDeductionDate] = useState("");
    const [newAnnualInterestRate, setNewAnnualInterestRate] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [validation, setValidation] = useState({
        expense: true,
        initialAmount: true,
        amountReduced: true,
        deductionDate: true,
        annualInterestRate: true,
    });

    const [showSignUpPrompt, setShowSignUpPrompt] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataEntryCount, setDataEntryCount] = useState(() => {
        const storedExpenses = localStorage.getItem("expenses");
        return storedExpenses ? JSON.parse(storedExpenses).length : 0;
    });

    useEffect(() => {
        // Check if the data entry count reaches 3 and the user is not logged in
        if (dataEntryCount >= 3 && !isLoggedIn) {
          // Show the sign-up prompt
          setShowSignUpPrompt(true);
        }
    }, [dataEntryCount, isLoggedIn]);

    useEffect(() => {
        // Save expenses to localStorage whenever expenses state changes
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const handleInputChange = (field, value) => {
        setValidation((prevValidation) => ({
        ...prevValidation,
        [field]: true,
        }));

        switch (field) {
        case "expense":
            setNewExpense(value);
            break;
        case "initialAmount":
            setNewInitialAmount(value);
            break;
        case "amountReduced":
            setNewAmountReduced(value);
            break;
        case "deductionDate":
            setNewDeductionDate(value);
            break;
        case "annualInterestRate":
            setNewAnnualInterestRate(value);
            break;
        default:
            break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const areInputsValid =
            newExpense.trim() !== "" &&
            newInitialAmount.trim() !== "" &&
            newAmountReduced.trim() !== "" &&
            newDeductionDate.trim() !== "" &&
            newAnnualInterestRate.trim() !== "";

            if (areInputsValid) {
            setValidation({
                expense: true,
                initialAmount: true,
                amountReduced: true,
                deductionDate: true,
                annualInterestRate: true,
            });

            if (editIndex === null) {
                addExpense();
            } else {
                saveExpense();
            }
        }
    };

    const handleLogin = () => {
        setShowSignUpPrompt(false);
        setIsLoggedIn(true);
    };      

    const addExpense = () => {
        const areInputsValid = validateInputs();
        if (areInputsValid) {
            setExpenses((prevExpenses) => [
                ...prevExpenses,
                {
                    title: newExpense,
                    initialAmount: parseFloat(newInitialAmount),
                    amountReduced: parseFloat(newAmountReduced),
                    deductionDate: newDeductionDate,
                    annualInterestRate: parseFloat(newAnnualInterestRate),
                },
            ]);
            clearForm();
            setFlashMessage({ type: 'success', message: 'Expense added successfully.' });
            setTimeout(() => {
                setFlashMessage(null);
            }, 1500);
            // Increment the data entry counter
            setDataEntryCount((prevCount) => prevCount + 1);
        }
    };

    const validateInputs = () => {
        const areInputsValid =
            newExpense.trim() !== '' &&
            newInitialAmount !== '' &&
            newAmountReduced !== '' &&
            newDeductionDate.trim() !== '' &&
            newAnnualInterestRate !== '';
    
        if (!areInputsValid) {
            setFlashMessage({ type: 'error', message: 'Please fill in all the required fields.' });
            setTimeout(() => {
                setFlashMessage(null);
            }, 1500);
        }
    
        setValidation({
            expense: newExpense.trim() !== '',
            initialAmount: newInitialAmount !== '',
            amountReduced: newAmountReduced !== '',
            deductionDate: newDeductionDate.trim() !== '',
            annualInterestRate: newAnnualInterestRate !== '',
        });
    
        return areInputsValid;
    };    

    const openEditModal = (index) => {
        // Set the state variables with the details of the expense to be edited
        const expenseToEdit = expenses[index];
        setNewExpense(expenseToEdit.title);
        setNewInitialAmount(expenseToEdit.initialAmount.toString());
        setNewAmountReduced(expenseToEdit.amountReduced.toString());
        setNewDeductionDate(expenseToEdit.deductionDate);
        setNewAnnualInterestRate(expenseToEdit.annualInterestRate.toString());
    
        // Set the edit index to the current index
        setEditIndex(index);
    
        // Open the edit modal
        setShowEditModal(true);
    };
    

    const cancelEdit = () => {
        setShowEditModal(false);
    }

    const saveExpense = () => {
        if (newExpense.trim() !== '') {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = {
            title: newExpense,
            initialAmount: parseFloat(newInitialAmount),
            amountReduced: parseFloat(newAmountReduced),
            deductionDate: newDeductionDate,
            annualInterestRate: parseFloat(newAnnualInterestRate),
        };
        setExpenses(updatedExpenses);
        setEditIndex(null);
        setFlashMessage({ type: 'info', message: 'Changes saved successfully.' });
        setTimeout(() => {
            setFlashMessage(null);
        }, 1500);
            clearForm();
        } else {
            setFlashMessage({ type: 'error', message: 'Please fill in the required fields.' });
            setTimeout(() => {
                setFlashMessage(null);
            }, 1500);
        }
    };
  
    const deleteExpense = (index) => {
        setShowDeleteModal(true);
        setEditIndex(index);
    };

    const confirmDelete = () => {
        // Perform deletion and hide modal
        const updatedExpenses = [...expenses];
        updatedExpenses.splice(editIndex, 1);
        setExpenses(updatedExpenses);
        setEditIndex(null);
        setShowDeleteModal(false);
        setFlashMessage({ type: 'success', message: 'Expense deleted successfully.' });
        setTimeout(() => setFlashMessage(null), 1500);
    };

    const cancelDelete = () => {
        // Cancel deletion and hide modal
        setShowDeleteModal(false);
    };

    const clearForm = () => {
        setNewExpense('');
        setNewInitialAmount('');
        setNewAmountReduced('');
        setNewDeductionDate('');
        setNewAnnualInterestRate('');
        setEditIndex(null);
    };

    const calculateRemainingAmount = (initialAmount, amountReduced, interestRate) => {
        let remainingAmount = parseFloat(initialAmount);
    
        // Deduct the amount for the current month
        remainingAmount -= parseFloat(amountReduced);
    
        // Check if 12 months have passed
        if (remainingAmount > 0 && remainingAmount <= parseFloat(amountReduced)) {
            // Calculate interest
            const interest = remainingAmount * (interestRate / 100);
            // Add interest to the remaining amount
            remainingAmount += interest;
        }
    
        // Return the remaining amount to the nearest decimal point
        return remainingAmount.toFixed(2);
    };

    const isSaveDisabled = editIndex === null || newExpense.trim() === '';
    const isClearDisabled = !(
        newExpense || newInitialAmount || newAmountReduced || newDeductionDate || newAnnualInterestRate || editIndex !== null
    );
    const isAddExpenseDisabled = editIndex !== null;

    return (
        <main className="max-w-full overflow-x-hidden mt-24 m-4 bg-white text-[#181028] p-8 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Loan Repayments Tracker</h2>
          <div className={`${isLoggedIn || dataEntryCount < 3 ? '' : 'blur'}`}>
            <Form
                newExpense={newExpense}
                newInitialAmount={newInitialAmount}
                newAmountReduced={newAmountReduced}
                newDeductionDate={newDeductionDate}
                newAnnualInterestRate={newAnnualInterestRate}
                handleInputChange={handleInputChange}
                addExpense={addExpense}
                clearForm={clearForm}
                saveExpense={saveExpense}
                isSaveDisabled={isSaveDisabled}
                isClearDisabled={isClearDisabled}
                isAddExpenseDisabled={isAddExpenseDisabled}
                validation={validation}
                handleSubmit={handleSubmit}
            />
            <Table
                expenses={expenses}
                calculateRemainingAmount={calculateRemainingAmount}
                openEditModal={openEditModal}
                deleteExpense={deleteExpense}
            />
            {showEditModal && (
                <EditModal
                newExpense={newExpense}
                newInitialAmount={newInitialAmount}
                newAmountReduced={newAmountReduced}
                newDeductionDate={newDeductionDate}
                newAnnualInterestRate={newAnnualInterestRate}
                handleInputChange={handleInputChange}
                saveExpense={saveExpense}
                clearForm={clearForm}
                cancelEdit={cancelEdit}
                isSaveDisabled={isSaveDisabled}
                validation={validation}
                handleSubmit={handleSubmit}
                />
            )}
            <FlashMessage flashMessage={flashMessage} />
            <DeleteModal
                showDeleteModal={showDeleteModal}
                confirmDelete={confirmDelete}
                cancelDelete={cancelDelete}
            />
            </div>
            {showSignUpPrompt && <SignUpPrompt isOpen={true} onClose={() => setShowSignUpPrompt(false)} onLogin={handleLogin} />}
        </main>
    );
};

export default RepaymentsTracker;
