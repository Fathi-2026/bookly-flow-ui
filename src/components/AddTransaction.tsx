
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, Save } from "lucide-react";
import { Transaction, Category } from "../hooks/useTransactions";
import { toast } from "../hooks/use-toast";

interface AddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
  categories: Category[];
}

export const AddTransaction = ({ onAddTransaction, categories }: AddTransactionProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    category: "",
    type: "expense" as "income" | "expense",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error", 
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    onAddTransaction({
      title: formData.title,
      amount,
      date: formData.date,
      category: formData.category,
      type: formData.type,
      description: formData.description,
    });

    toast({
      title: "Success",
      description: "Transaction added successfully!",
    });

    navigate("/");
  };

  const filteredCategories = categories.filter(
    cat => cat.type === formData.type || cat.type === "both"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Transaction</h1>
          <p className="text-gray-600 mt-1">Record a new income or expense transaction.</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div>
              <Label className="text-base font-medium">Transaction Type</Label>
              <RadioGroup 
                value={formData.type} 
                onValueChange={(value: "income" | "expense") => 
                  setFormData({ ...formData, type: value, category: "" })
                }
                className="flex gap-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income" className="text-green-600 font-medium">Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense" className="text-red-600 font-medium">Expense</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter transaction title"
                className="mt-1"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="pl-7"
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1"
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description..."
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Transaction
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
