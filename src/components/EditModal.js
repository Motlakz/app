import React from "react";

const EditModal = ({
    newExpense,
    newInitialAmount,
    newAmountReduced,
    newDeductionDate,
    newAnnualInterestRate,
    handleInputChange,
    saveExpense,
    clearForm,
    isSaveDisabled,
    isClearDisabled,
    validation,
    cancelEdit,
}) => {
    
    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-content bg-white rounded-lg p-6">
                <button className="close float-right hover:text-purple-400 text-purple-600" onClick={cancelEdit}>
                    <i className="bi bi-x-square"></i>
                </button>
                <h2 className="mb-4 mt-4 text-lg font-bold">Edit Expense</h2>
                <form
                    onSubmit={saveExpense}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
                >
                    <input
                        type="text"
                        id="newExpense"
                        className={`border-2 rounded-md focus:outline-gray-300 animate__animated animate__bounceInLeft p-2 ${
                        !validation.expense ? "border-red-500" : ""
                        }`}
                        placeholder="Expense Type"
                        value={newExpense}
                        onChange={(e) => handleInputChange("expense", e.target.value)}
                    />
                    <input
                        type="number"
                        id="newInitialAmount"
                        className={`border-2 rounded-md focus:outline-gray-300 animate__animated animate__bounceInLeft p-2 ${
                        !validation.initialAmount ? "border-red-500" : ""
                        }`}
                        placeholder="Current Amount"
                        value={newInitialAmount}
                        onChange={(e) => handleInputChange("initialAmount", e.target.value)}
                    />
                    <input
                        type="number"
                        id="newAmountReduced"
                        className={`border-2 rounded-md focus:outline-gray-300 animate__animated animate__bounceInRight p-2 ${
                        !validation.amountReduced ? "border-red-500" : ""
                        }`}
                        placeholder="Amount Deducted Monthly"
                        value={newAmountReduced}
                        onChange={(e) => handleInputChange("amountReduced", e.target.value)}
                    />
                    <input
                        type="date"
                        id="newDeductionDate"
                        className={`border-2 rounded-md focus:outline-gray-300 animate__animated animate__bounceInRight text-gray-400 uppercase p-2 ${
                        !validation.deductionDate ? "border-red-500" : ""
                        }`}
                        placeholder="Deduction Date"
                        value={newDeductionDate}
                        onChange={(e) => handleInputChange("deductionDate", e.target.value)}
                    />
                    <input
                        type="number"
                        id="newAnnualInterestRate"
                        className={`border-2 rounded-md focus:outline-gray-300 animate__animated animate__backInUp  p-2 ${
                        !validation.annualInterestRate ? "border-red-500" : ""
                        }`}
                        placeholder="Annual Interest Rate (%)"
                        value={newAnnualInterestRate}
                        onChange={(e) =>
                        handleInputChange("annualInterestRate", e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className={`bg-purple-500 animate__animated animate__backInUp rounded-md hover:bg-purple-700 hover:text-purple-100 text-white px-4 py-2 ${
                        isSaveDisabled
                            ? "cursor-not-allowed opacity-50 hover:bg-purple-500 hover:text-purple-100 hover:bg-opacity-50"
                            : ""
                        }`}
                        disabled={isSaveDisabled}
                    >
                        Save Changes
                    </button>
                    <button
                        className={`bg-purple-200 rounded-md text-purple-600 animate__animated animate__backInUp hover:bg-purple-100 hover:text-purple-700 px-4 py-2 ${
                        isClearDisabled
                            ? "cursor-not-allowed opacity-50 hover:bg-purple-200 hover:text-purple-600 hover:bg-opacity-50"
                            : ""
                        }`}
                        onClick={clearForm}
                        disabled={isClearDisabled}
                    >
                        Clear Form
                    </button>
                    <button
                        type="button"
                        className="bg-gray-200 rounded-md text-gray-600 animate__animated animate__backInUp hover:bg-gray-100 hover:text-gray-700 px-4 py-2"
                        onClick={cancelEdit}
                    >
                    Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
