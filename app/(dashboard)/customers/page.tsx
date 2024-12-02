import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CrownIcon } from "lucide-react";
import Image from "next/image";

const Tag = ({ color, children }) => (
  <span
    className={`text-xs px-2 py-1 rounded-full font-medium bg-${color}-500/20 text-${color}-500`}
  >
    {children}
  </span>
);

const InfoRow = ({ label, value, isLink }) => (
  <div className="flex justify-between items-center py-2">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p
      className={`text-sm font-medium ${
        isLink ? "text-lime-600 hover:underline cursor-pointer" : ""
      }`}
    >
      {value}
    </p>
  </div>
);

const Page = () => {
  const user = {
    name: "Noubar Kassabian",
    email: "noubark24@gmail.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    phone: "+961 70 120 654",
    altPhone: "+961 04 406 389",
    location: "Beirut, Lebanon",
    timezone: "UTC+3:00",
    status: "Pending",
    tags: ["Weevi", "Late Payer", "Moray"],
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Overview</Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-lg p-6 sm:min-w-[800px]">
        {/* Header */}
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">
              Customer Overview
            </SheetTitle>
            <Button variant="outline" size="sm">
              View Full Details
            </Button>
          </div>
        </SheetHeader>

        {/* Profile Section */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-[70px] w-[70px] rounded-full overflow-hidden relative">
            <Image
              src={user.image}
              alt="Profile"
              style={{ objectFit: "cover" }}
              fill
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-semibold">{user.name}</p>
              <CrownIcon className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Separator className="my-4" />
        {/* Details Section */}
        <div className="mt-8 space-y-6">
          {/* Customer Details */}
          <div>
            <p className="text-lg font-semibold mb-4">Customer Details</p>
            <div className="space-y-2">
              <InfoRow label="Source" value="Website" />
              <InfoRow label="Mobile" value={user.phone} isLink />
              <InfoRow label="Phone" value={user.altPhone} isLink />
              <InfoRow label="Email" value={user.email} isLink />
            </div>
          </div>

          <Separator />

          {/* Additional Details */}
          <div>
            <p className="text-lg font-semibold mb-4">Additional Information</p>
            <div className="space-y-2">
              <InfoRow label="Location" value={user.location} />
              <InfoRow label="Timezone" value={user.timezone} />
              <InfoRow
                label="Status"
                value={<Tag color="yellow">{user.status}</Tag>}
              />
              <div>
                <p className="text-sm text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-2 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Page;
