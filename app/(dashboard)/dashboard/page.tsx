"use client";
import ActiveCustomersList from "@/components/dashboard/active-customers-list";
import AnalyticsBox from "@/components/dashboard/analytics-box";
import HomeChart from "@/components/dashboard/home-chart";
import HasPermission, { Permissions } from "@/hooks/has-permission";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const sectionCombo = { section: "company", permission: Permissions.DELETE };
    const hasPermission = HasPermission(sectionCombo);

    if (!hasPermission) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div>
      <p className="font-bold text-3xl">Welcome back, Noubar!</p>
      <p className="font-normal text-sm mb-8 text-muted-foreground">
        This is your dashboard where you can see a general overview of
        everything!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Analytics Boxes */}
        <div className="md:col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <AnalyticsBox />
            <AnalyticsBox />
            <AnalyticsBox />
            <AnalyticsBox />
          </div>
        </div>

        {/* Chart Section */}
        <div className="md:col-span-3">
          <HomeChart />
        </div>
        <div className="md:col-span-1">
          <ActiveCustomersList />
        </div>
      </div>
    </div>
  );
};

export default Page;
