import { Column, DataTable } from "@/components/DataTable/DataTable";
import React from "react";

const Page = () => {
  const data = [
    { test: "Row 1", value: 100, key: "LMAO" },
    { test: "Row 2", value: 200 },
    { test: "Row 3", value: 300 },
  ];

  return (
    <DataTable
      showDeleteButton
      showEditButton
      data={data}
      url="api/company/getall"
    >
      <Column className="font-bold" title="Title" field="title" />
    </DataTable>
  );
};

export default Page;
