"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import RolePermissions from "./_types/RolePermissions";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  const { id, company_id } = useParams<{ id: string; company_id: string }>();
  const [permissions, setPermissions] = useState<RolePermissions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found.");
      setLoading(false);
      return;
    }

    try {
      const parsedToken = JSON.parse(token);
      if (!parsedToken?.access_token) throw new Error("Invalid token.");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/company/GetCompanyRole?id=${company_id}&roleId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${parsedToken.access_token}`,
          },
        }
      );

      setPermissions(response.data.model || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch permissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (
    index: number,
    field: keyof RolePermissions
  ) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission, i) =>
        i === index
          ? {
              ...permission,
              [field]: !permission[field], // Toggle the checkbox value
            }
          : permission
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found.");
      return;
    }

    try {
      const parsedToken = JSON.parse(token);
      if (!parsedToken?.access_token) throw new Error("Invalid token.");

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/company/UpdateRolePermissions`,
        {
          roleId: id,
          companyId: company_id,
          permissions,
        },
        {
          headers: {
            Authorization: `Bearer ${parsedToken.access_token}`,
          },
        }
      );

      fetchData();
    } catch (err) {
      console.error("Error updating permissions:", err);
      setError("Failed to update permissions.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="w-100 flex flex-row items-center justify-between">
          <h1 className="text-xl font-semibold">Manage Role Permissions</h1>
          <Button type="submit" className="mt-4">
            Save Changes
          </Button>
        </div>

        <Separator className="my-5" />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <Table>
            <TableCaption>
              Manage role permissions for the company.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                <TableHead>Create</TableHead>
                <TableHead>Read</TableHead>
                <TableHead>Update</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission, index) => (
                <TableRow key={permission.title}>
                  <TableCell>{permission.title}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permission.canCreate}
                      onCheckedChange={() =>
                        handleCheckboxChange(index, "canCreate")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permission.canRead}
                      onCheckedChange={() =>
                        handleCheckboxChange(index, "canRead")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permission.canUpdate}
                      onCheckedChange={() =>
                        handleCheckboxChange(index, "canUpdate")
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permission.canDelete}
                      onCheckedChange={() =>
                        handleCheckboxChange(index, "canDelete")
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </form>
    </div>
  );
};

export default Page;
