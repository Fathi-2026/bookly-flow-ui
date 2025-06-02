
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { MobileNav } from "../components/MobileNav";
import { Dashboard } from "../components/Dashboard";
import { AddTransaction } from "../components/AddTransaction";
import { TransactionsTable } from "../components/TransactionsTable";
import { Reports } from "../components/Reports";
import { useTransactions } from "../hooks/useTransactions";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { transactions, addTransaction, deleteTransaction, categories } = useTransactions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex" />
        
        {/* Mobile Navigation */}
        <MobileNav 
          isOpen={isMobileMenuOpen} 
          onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <main className="p-4 lg:p-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    transactions={transactions} 
                    categories={categories}
                  />
                } 
              />
              <Route 
                path="/add-transaction" 
                element={
                  <AddTransaction 
                    onAddTransaction={addTransaction}
                    categories={categories}
                  />
                } 
              />
              <Route 
                path="/transactions" 
                element={
                  <TransactionsTable 
                    transactions={transactions}
                    onDeleteTransaction={deleteTransaction}
                    categories={categories}
                  />
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <Reports 
                    transactions={transactions}
                    categories={categories}
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
