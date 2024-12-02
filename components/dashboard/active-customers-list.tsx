import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { ArrowRight, ArrowUpRightFromSquareIcon } from "lucide-react";
import { Button } from "../ui/button";

const ActiveCustomersList = () => {
  return (
    <Card className="border rounded-xl p-5 shadow-sm bg-white h-full max-h-[600px]">
      <CardTitle className="text-sm font-medium text-gray-600 flex flex-row items-center justify-between">
        <p>Best selling products</p>
        <Button variant={"ghost"}>
          <ArrowUpRightFromSquareIcon className="h-4 w-4" />
        </Button>
      </CardTitle>
      <p className="text-3xl my-5">Weevi</p>
      <Separator />

      <div className="mt-5">
        <div className="flex flex-row items-center justify-between text-sm mb-2">
          <p>Weevi</p>
          <p>60%</p>
        </div>
        <div className="h-2">
          <Progress value={60} className="h-2" color="bg-green-500" />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex flex-row items-center justify-between text-sm mb-2">
          <p>Weevi</p>
          <p>25%</p>
        </div>
        <div className="h-2">
          <Progress value={25} className="h-2" color="bg-red-500" />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex flex-row items-center justify-between text-sm mb-2">
          <p>Weevi</p>
          <p>15%</p>
        </div>
        <div className="h-2">
          <Progress value={15} className="h-2" color="bg-yellow-500" />
        </div>
      </div>
    </Card>
  );
};

export default ActiveCustomersList;
