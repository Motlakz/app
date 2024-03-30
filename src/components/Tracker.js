import React, { useState, useEffect } from "react";
import Form from "./RepaymentForm";
import Table from "./Table";
import FlashMessage from "./FlashMessage";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { auth, onAuthStateChanged, db, doc, updateDoc, addDoc, deleteDoc, collection, getDocs } from "../firebase-config";

function RepaymentsTracker({ isLoggedIn, setIsLoggedIn, dataEntryCount, setDataEntryCount, setShowSignUpPrompt }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState("");
    const [newInitialAmount, setNewInitialAmount] = useState("");
    const [newAmountReduced, setNewAmountReduced] = useState("");
    const [newDeductionDate, setNewDeductionDate] = useState("");
    const [newAnnualInterestRate, setNewAnnualInterestRate] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editedExpense, setEditedExpense] = useState(null);
    const [expenseToDelete, setExpenseToDelete] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [validation, setValidation] = useState({
        expense: true,
        initialAmount: true,
        amountReduced: true,
        deductionDate: true,
        annualInterestRate: true,
    });
    const [hasSignedUpBefore, setHasSignedUpBefore] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          setIsLoggedIn(user !== null);
          if (user) {
            setShowSignUpPrompt(false);
            if (!hasSignedUpBefore) {
              setHasSignedUpBefore(true);
            }
            // Fetch expenses from Firestore for signed-in users
            const expensesRef = collection(db, "users", user.uid, "expenses");
            const querySnapshot = await getDocs(expensesRef);
            const fetchedExpenses = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setExpenses(fetchedExpenses);
          } else {
            if (dataEntryCount >= 3 && hasSignedUpBefore) {
              setShowSignUpPrompt(true);
            }
            // Retrieve expenses from local storage for non-signed-up users
            const storedExpenses = localStorage.getItem("expenses");
            if (storedExpenses) {
              setExpenses(JSON.parse(storedExpenses));
            }
          }
          console.log("isLoggedIn:", isLoggedIn);
          console.log("dataEntryCount:", dataEntryCount);
          console.log("hasSignedUpBefore:", hasSignedUpBefore);
        });
      
        return () => {
          unsubscribe();
        };
      }, [dataEntryCount, isLoggedIn, setIsLoggedIn, setShowSignUpPrompt, hasSignedUpBefore]);

    useEffect(() => {
        if (editedExpense) {
          setExpenses((prevExpenses) => {
            const updatedExpenses = [...prevExpenses];
            const editedExpenseIndex = updatedExpenses.findIndex((expense) => expense.id === editedExpense.id);
            if (editedExpenseIndex !== -1) {
              updatedExpenses[editedExpenseIndex] = editedExpense;
            }
            return updatedExpenses;
          });
          setEditedExpense(null);
        }
    }, [editedExpense]);

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
                return;
            } else {
                saveExpense();
            }
        }
    };

    const addExpense = async () => {
        const areInputsValid = validateInputs();
        if (!areInputsValid) {
            return;
        }
    
        const newExpenseData = {
            title: newExpense,
            initialAmount: parseFloat(newInitialAmount),
            amountReduced: parseFloat(newAmountReduced),
            deductionDate: newDeductionDate,
            annualInterestRate: parseFloat(newAnnualInterestRate),
            userId: auth.currentUser ? auth.currentUser.uid : null,
        };
    
        if (isLoggedIn) {
            // Save the expense to Firestore for signed-in users
            try {
                const expensesRef = collection(db, "users", auth.currentUser.uid, "expenses");
                const docRef = await addDoc(expensesRef, newExpenseData);
                console.log("Document written with ID: ", docRef.id);
                setExpenses((prevExpenses) => [
                    ...prevExpenses,
                    { ...newExpenseData, id: docRef.id },
                ]);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            // Save the expense to local storage for non-signed-up users
            const storedExpenses = localStorage.getItem('expenses');
            const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
            const newExpense = { ...newExpenseData, id: Date.now().toString() };
            expenses.push(newExpense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
        }
    
        clearForm();
        setFlashMessage({ type: 'success', message: 'Expense added successfully.' });
        setTimeout(() => {
            setFlashMessage(null);
        }, 1500);
        setDataEntryCount((prevCount) => prevCount + 1);
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

    const openEditModal = (expenseId) => {
        const index = expenses.findIndex((expense) => expense.id === expenseId);
        if (index !== -1) {
            const expenseToEdit = expenses[index];
            setNewExpense(expenseToEdit.title);
            setNewInitialAmount(expenseToEdit.initialAmount.toString());
            setNewAmountReduced(expenseToEdit.amountReduced.toString());
            setNewDeductionDate(expenseToEdit.deductionDate);
            setNewAnnualInterestRate(expenseToEdit.annualInterestRate.toString());
            setEditIndex(index);
            setShowEditModal(true);
        }
    };

    const cancelEdit = () => {
        setShowEditModal(false);
    }

    const saveExpense = async (e) => {
        e.preventDefault();
    
        if (newExpense.trim() !== '') {
            const updatedExpenseData = {
                title: newExpense,
                initialAmount: parseFloat(newInitialAmount),
                amountReduced: parseFloat(newAmountReduced),
                deductionDate: newDeductionDate,
                annualInterestRate: parseFloat(newAnnualInterestRate),
            };
    
            try {
                if (editIndex !== null) {
                    if (isLoggedIn) {
                        // Update the expense in Firestore for signed-in users
                        const expenseRef = doc(db, "users", auth.currentUser.uid, "expenses", expenses[editIndex].id);
                        await updateDoc(expenseRef, updatedExpenseData);
                    } else {
                        // Update the expense in local storage for non-signed-up users
                        const storedExpenses = localStorage.getItem('expenses');
                        const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
                        expenses[editIndex] = { ...expenses[editIndex], ...updatedExpenseData };
                        localStorage.setItem('expenses', JSON.stringify(expenses));
                    }
    
                    setExpenses((prevExpenses) => {
                        const updatedExpenses = [...prevExpenses];
                        updatedExpenses[editIndex] = { ...updatedExpenses[editIndex], ...updatedExpenseData };
                        return updatedExpenses;
                    });
    
                    setFlashMessage({ type: 'info', message: 'Changes saved successfully.' });
                    setTimeout(() => {
                        setFlashMessage(null);
                    }, 1500);
                } else {
                    // If it's a new expense (not an edit), add it to the database or local storage
                    await addExpense();
                }
                clearForm();
            } catch (e) {
                console.error("Error updating/adding document: ", e);
            }
        } else {
            setFlashMessage({ type: 'error', message: 'Please fill in all the required fields.' });
            setTimeout(() => {
                setFlashMessage(null);
            }, 1500);
        }
    };
      
    const deleteExpense = (expenseId) => {
        const index = expenses.findIndex((expense) => expense.id === expenseId);
        if (index !== -1) {
          const expenseToDelete = expenses[index];
          setExpenseToDelete(expenseToDelete);
          setShowDeleteModal(true);
        }
    };

    const confirmDelete = async () => {
        try {
          if (expenseToDelete) {
            if (isLoggedIn) {
              // Delete the expense from Firestore for signed-in users
              const expenseRef = doc(db, "users", auth.currentUser.uid, "expenses", expenseToDelete.id);
              await deleteDoc(expenseRef);
            } else {
              // Delete the expense from local storage for non-signed-up users
              const storedExpenses = localStorage.getItem('expenses');
              const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];
              const updatedExpenses = expenses.filter((expense) => expense.id !== expenseToDelete.id);
              localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            }
      
            setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseToDelete.id));
            setExpenseToDelete(null);
            setShowDeleteModal(false);
            setFlashMessage({ type: 'success', message: 'Expense deleted successfully.' });
            setTimeout(() => setFlashMessage(null), 1500);
          }
        } catch (e) {
          console.error("Error deleting document: ", e);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setExpenseToDelete(null);
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
        <main className="min-h-screen max-w-full">
            <div className="relative overflow-x-hidden mt-24 m-4 bg-white text-[#181028] p-8 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Loan Repayments Tracker</h2>
                <div className={`${isLoggedIn || (!isLoggedIn && !hasSignedUpBefore) ? '' : 'blur'}`}>

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
                        setFlashMessage={setFlashMessage}
                        expenses={expenses}
                        calculateRemainingAmount={calculateRemainingAmount}
                        openEditModal={openEditModal}
                        setExpenses={setExpenses}
                        deleteExpense={deleteExpense}
                        sortByDate={true}
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
                        expenseToDelete={expenseToDelete}
                    />
                </div>
                {!isLoggedIn && hasSignedUpBefore && (
                    <div className="alert-msg absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <p className="text-indigo-300 text-2xl font-bold">Please sign up/sign in to securely view or manage your data.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default RepaymentsTracker;