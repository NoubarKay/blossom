import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const AnalyticsBox = () => {
  const change = Math.random(); // Randomly determine growth or decline for demo
  const isPositive = change > 0.5;

  return (
    <Card className="border rounded-xl p-5 shadow-sm bg-white">
      <CardTitle className="text-sm font-medium text-gray-600">
        Active Sales
      </CardTitle>
      <CardContent className="p-0 pt-4">
        <p className="text-4xl font-bold text-gray-800">$32,837</p>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-sm text-gray-500">vs last month</p>
          <p
            className={`flex items-center px-2 py-1 text-xs font-medium rounded-md ${
              isPositive
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isPositive ? (
              <>
                <ChevronUp className="h-4 w-4" />
                10%
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                10%
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsBox;
