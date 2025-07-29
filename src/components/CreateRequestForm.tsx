import { useState } from "react";
import { VeltoCard } from "./VeltoCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Euro } from "lucide-react";
import { CreateRequestFormProps } from "@/types";

export const CreateRequestForm = ({
  onSubmit,
  loading,
}: CreateRequestFormProps) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onSubmit?.({
      amount: parseFloat(amount),
      description,
    });
  };

  const isValid = amount && description && parseFloat(amount) > 0;

  return (
    <VeltoCard
      title="Create Payment Request"
      description="Fill in the details below to generate a payment link"
      hover={false}
      className="max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-semibold">
            Amount *
          </Label>
          <div className="relative">
            <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 text-lg font-semibold h-12 rounded-xl"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-semibold">
            Description *
          </Label>
          <Textarea
            id="description"
            placeholder="What is this payment for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none rounded-xl min-h-[100px]"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          disabled={!isValid || loading}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Creating...
            </>
          ) : (
            "Create Payment Link"
          )}
        </Button>
      </form>
    </VeltoCard>
  );
};
