import React, { useState, useRef } from 'react';

function Tracker() {
  const [transactionType, setTransactionType] = useState("Food");
  const [transactionCategory, setTransactionCategory] = useState("Select Category");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);

  const incomeCategories = ["g", "Drink", "Supplement"];
  const expenseCategories = ["Food", "Drink", "Supplement"];
  const categories = transactionType === "Income" ? incomeCategories : expenseCategories;

  function handleTransactionChange(e) {
    setTransactionAmount(e.target.value);
  }

  function addTransaction() {
    const transactionObject = {
      type: transactionType,
      category: transactionCategory,
      amount: transactionAmount
    };

    const savedTransactions = JSON.parse(localStorage.getItem('transactionObject')) || [];
    localStorage.setItem('transactionObject', JSON.stringify([...savedTransactions, transactionObject]));
    window.location.reload();
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 text-black" data-testid="cypress-add-transaction">
      <div className="flex items-center space-x-2">
        {/* Transaction Type Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100"
          >
            {transactionType}
          </button>
          {showTypeDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  setTransactionType("Income");
                  setTransactionCategory("Select Category");
                  setShowTypeDropdown(false);
                }}
              >
                Income
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  setTransactionType("Expense");
                  setTransactionCategory("Select Category");
                  setShowTypeDropdown(false);
                }}
              >
                Expense
              </button>
            </div>
          )}
        </div>

        {/* Amount Input */}
        <input
          type="number"
          value={transactionAmount}
          onChange={handleTransactionChange}
          placeholder="Enter Amount"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-right"
        />

        {/* Category Dropdown */}
        <div className="relative" ref={categoryDropdownRef}>
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100"
          >
            {transactionCategory}
          </button>
          {showCategoryDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-48 overflow-auto">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setTransactionCategory(category);
                    setShowCategoryDropdown(false);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5">
        <button
          onClick={addTransaction}
          className="w-full py-3 text-white text-lg bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
}

export default Tracker;