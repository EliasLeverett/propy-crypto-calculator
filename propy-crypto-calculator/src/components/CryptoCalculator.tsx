import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CryptoCalculator = () => {
  const [transactionAmount, setTransactionAmount] = useState("");
  const [cryptoType, setCryptoType] = useState("BTC");
  const [escrowFee, setEscrowFee] = useState(0);
  const [networkFee, setNetworkFee] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const calculateFees = (amount: string) => {
    const parsedAmount = parseFloat(amount) || 0;
    const baseEscrowFee = parsedAmount * 0.01;
    const networkFeeRates: { [key: string]: number } = {
      "BTC": 0.0005,
      "ETH": 0.001,
      "USDT": 0.002,
      "USDC": 0.001
    };
    
    const calculatedNetworkFee = parsedAmount * networkFeeRates[cryptoType];
    const minEscrowFee = 50;
    const minNetworkFee = 10;
    
    const finalEscrowFee = Math.max(baseEscrowFee, minEscrowFee);
    const finalNetworkFee = Math.max(calculatedNetworkFee, minNetworkFee);
    
    setEscrowFee(finalEscrowFee);
    setNetworkFee(finalNetworkFee);
    setTotalCost(finalEscrowFee + finalNetworkFee);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTransactionAmount(value);
    calculateFees(value);
  };

  const handleCryptoTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCryptoType(e.target.value);
    calculateFees(transactionAmount);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
        <CardHeader className="bg-[#0055FF] p-6">
          <CardTitle className="text-3xl font-extrabold text-blue-100 text-center tracking-tight">
            Crypto Conversion Cost Calculator
          </CardTitle>
          <p className="text-blue-50 text-center mt-2">
            Calculate conversion and network fees for your transaction
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-800">
                Transaction Amount (USD)
              </label>
              <input
                type="number"
                value={transactionAmount}
                onChange={handleAmountChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0055FF] focus:ring-1 focus:ring-[#0055FF] transition-all duration-200"
                placeholder="Enter amount"
                min="0"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-800">
                Select Cryptocurrency
              </label>
              <select
                value={cryptoType}
                onChange={handleCryptoTypeChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0055FF] focus:ring-1 focus:ring-[#0055FF] transition-all duration-200 bg-white"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="USDC">USD Coin (USDC)</option>
              </select>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversion Fee</span>
                <span className="font-medium text-gray-900">{formatCurrency(escrowFee)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Network Fee</span>
                <span className="font-medium text-gray-900">{formatCurrency(networkFee)}</span>
              </div>
              <div className="border-t border-blue-100 pt-4 flex justify-between items-center">
                <span className="font-semibold text-gray-800">Total Cost</span>
                <span className="font-bold text-lg text-[#0055FF]">{formatCurrency(totalCost)}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Fee Information</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-[#0055FF] mr-2">•</span>
                  Base conversion fee is 1% of the transaction amount (minimum $50)
                </li>
                <li className="flex items-start">
                  <span className="text-[#0055FF] mr-2">•</span>
                  Network fees vary by cryptocurrency (minimum $10)
                </li>
                <li className="flex items-start">
                  <span className="text-[#0055FF] mr-2">•</span>
                  Final network fees depend on current blockchain conditions
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoCalculator;
