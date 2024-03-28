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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setShowSignUpPrompt(false);
            } else {
                if (dataEntryCount >= 3) {
                    setShowSignUpPrompt(true);
                }
            }
            console.log('isLoggedIn:', isLoggedIn);
            console.log('dataEntryCount:', dataEntryCount);
        });
    
        return () => {
            unsubscribe();
        };
    }, [dataEntryCount, isLoggedIn, setShowSignUpPrompt]);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "expenses"));
                const fetchedExpenses = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setExpenses(fetchedExpenses);
                setDataEntryCount(fetchedExpenses.length);
            } catch (error) {
                console.error("Error fetching expenses: ", error);
            }
        };
        fetchExpenses();
    }, [setDataEntryCount]);

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
        };

        try {
            const docRef = await addDoc(collection(db, "expenses"), newExpenseData);
            console.log("Document written with ID: ", docRef.id);
            setExpenses((prevExpenses) => [
                ...prevExpenses,
                { ...newExpenseData, id: docRef.id },
            ]);
            clearForm();
            setFlashMessage({ type: 'success', message: 'Expense added successfully.' });
            setTimeout(() => {
                setFlashMessage(null);
            }, 1500);
            // Increment the data entry counter
            setDataEntryCount((prevCount) => prevCount + 1);
        } catch (e) {
            console.error("Error adding document: ", e);
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
              const expenseRef = doc(db, "expenses", expenses[editIndex].id);
              await updateDoc(expenseRef, updatedExpenseData);
      
              // Fetch the updated expenses from the database
              const querySnapshot = await getDocs(collection(db, "expenses"));
              const fetchedExpenses = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
      
              setExpenses(fetchedExpenses);
              setFlashMessage({ type: 'info', message: 'Changes saved successfully.' });
              setTimeout(() => {
                setFlashMessage(null);
              }, 1500);
              clearForm();
            } else {
              // If it's a new expense (not an edit), add it to the database
              const docRef = await addDoc(collection(db, "expenses"), updatedExpenseData);
              const newExpense = { ...updatedExpenseData, id: docRef.id };
      
              setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
              setFlashMessage({ type: 'success', message: 'Expense added successfully.' });
              setTimeout(() => {
                setFlashMessage(null);
              }, 1500);
              clearForm();
            }
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
      
    const deleteExpense = (index) => {
        setExpenseToDelete(expenses[index]);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            if (expenseToDelete) {
                const expenseRef = doc(db, "expenses", expenseToDelete.id);
                await deleteDoc(expenseRef);
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
                <div className={`${!isLoggedIn && dataEntryCount >= 3 ? 'blur' : ''}`}>

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
                {!isLoggedIn && dataEntryCount >= 3 && (
                    <div className="alert-msg absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <p className="text-indigo-300 text-2xl font-bold">Please sign up/sign in to view or manage your data.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default RepaymentsTracker;