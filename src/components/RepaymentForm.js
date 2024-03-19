import React from "react";
import Select from 'react-select';

const Form = ({
  newInitialAmount,
  newAmountReduced,
  newDeductionDate,
  newAnnualInterestRate,
  handleInputChange,
  addExpense,
  clearForm,
  isClearDisabled,
  isAddExpenseDisabled,
  validation,
  handleSubmit,
}) => {
  const loanTypes = [
    { value: 'Home Loan', label: 'Home Loan' },
    { value: 'Phone Loan', label: 'Phone Loan' },
    { value: 'Car Loan', label: 'Car Loan' },
    { value: 'Business Loan', label: 'Business Loan'},
    { value: 'Personal Loan', label: 'Personal Loan'}
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: `1px solid ${state.isFocused ? '#a5b4fc' : '#d7d7d7'}`,
      borderRadius: '0.375rem',
      padding: '0.5rem',
      animation: 'bounceInLeft 1s',
      boxShadow: state.isFocused ? '0 0 0 0.8px #a5b4fc' : 'none',
    }),
  };

  const inputClassName = (isValid) => `border rounded-md focus:outline-indigo-300 animate__animated animate__bounceInLeft p-2 ${isValid ? '' : 'border-red-500'}`;

  const handleInputNumberChange = (field, value) => {
    const numericValue = parseFloat(value) || '';
    handleInputChange(field, numericValue);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <Select
        placeholder="Select Loan Type"
        options={loanTypes}
        styles={customStyles}
        onChange={(selectedOption) => handleInputChange("expense", selectedOption.value)}
      />
      <input
        type="number"
        className={inputClassName(validation.initialAmount)}
        placeholder="Current Amount"
        value={newInitialAmount}
        onChange={(e) => handleInputNumberChange("initialAmount", e.target.value)}
      />
      <input
        type="number"
        className={inputClassName(validation.amountReduced)}
        placeholder="Amount Deducted Monthly"
        value={newAmountReduced}
        onChange={(e) => handleInputNumberChange("amountReduced", e.target.value)}
      />
      <input
        type="date"
        className={`border rounded-md focus:outline-indigo-300 animate__animated animate__bounceInRight text-gray-400 uppercase p-2 ${!validation.deductionDate ? "border-red-500" : ""}`}
        placeholder="Deduction Date"
        value={newDeductionDate}
        onChange={(e) => handleInputChange("deductionDate", e.target.value)}
      />
      <input
        type="number"
        className={`border rounded-md focus:outline-indigo-300 animate__animated animate__bounceInLeft  p-3 ${!validation.annualInterestRate ? "border-red-500" : ""}`}
        placeholder="Annual Interest Rate (%)"
        value={newAnnualInterestRate}
        onChange={(e) => handleInputNumberChange("annualInterestRate", e.target.value)}
      />
      <button
        className={`bg-indigo-500 animate__animated animate__backInUp rounded-md hover:bg-indigo-700 hover:text-indigo-100 text-white px-4 py-3 ${isAddExpenseDisabled ? "cursor-not-allowed opacity-50 hover:bg-indigo-500 hover:text-indigo-100 hover:bg-opacity-50" : ""}`}
        onClick={addExpense}
        disabled={isAddExpenseDisabled}
      >
        Add Expense
      </button>
      <button
        className={`bg-indigo-200 rounded-md text-indigo-600 animate__animated animate__backInUp hover:bg-indigo-100 hover:text-indigo-700 px-4 py-3 ${isClearDisabled ? "cursor-not-allowed opacity-50 hover:bg-indigo-200 hover:text-indigo-600 hover:bg-opacity-50" : ""}`}
        onClick={clearForm}
        disabled={isClearDisabled}
      >
        Clear Form
      </button>
    </form>
  );
};

export default Form;
