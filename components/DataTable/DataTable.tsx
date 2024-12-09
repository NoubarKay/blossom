"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { Edit2Icon, EditIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

interface ColumnProps {
  title: string;
  field: string;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  children: ReactNode;
  pageSize?: number;
  url?: string;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
}

export const DataTable = <T,>({
  data,
  children,
  url,
  pageSize = 13,
  showEditButton,
  showDeleteButton,
}: DataTableProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const [gridData, setGridData] = useState(data);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  // Calculate pagination details
  const totalPages = Math.ceil(totalRows / pageSize);

  const handleEdit = (row: T) => {
    console.log("Editing row:", row);
    // Navigate or open a modal to edit the row
    // For example:
    router.push(`${pathname}/edit/${row.id}`); // Assuming each row has an `id` field
  };

  const handleDelete = (row: T) => {
    console.log("Deleting row:", row);
    // Implement deletion logic here
    // You could open a confirmation dialog or call an API to delete the row
  };

  useEffect(() => {
    if (url) {
      let filters = {
        page: currentPage,
        pageSize,
      };
      setLoading(true);

      const queryString = new URLSearchParams(filters).toString();
      console.log(queryString);

      const token = JSON.parse(localStorage.getItem("token") || "{}");
      if (!token?.access_token) return;

      try {
        axios
          .get(`${process.env.NEXT_PUBLIC_BASE_URL}${url}?${queryString}`, {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          })
          .then((response) => {
            setGridData(response.data.Data);
            setTotalRows(response.data.Total);
            setLoading(false);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setTotalRows(gridData.length);
    }
  }, [currentPage, pageSize, url]);

  return (
    <>
      <Table className="border rounded-xl">
        <TableHeader>
          <TableRow>
            {React.Children.map(children, (child) =>
              React.isValidElement<ColumnProps>(child) ? (
                <TableHead>{child.props.title}</TableHead>
              ) : null
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow className="flex flex-row items-center justify-center">
              <TableCell>
                <Loader2 className=" animate-spin h-8 w-8 m-4" />
              </TableCell>
            </TableRow>
          )}
          {!loading &&
            gridData.map((row, index) => (
              <TableRow key={index}>
                {React.Children.map(children, (child) => {
                  if (React.isValidElement<ColumnProps>(child)) {
                    const value = row[child.props.field as keyof T];
                    return (
                      <TableCell className={child.props.className}>
                        {String(value)}
                      </TableCell>
                    ); // Ensure it's a string or ReactNode
                  }
                  return null;
                })}
                <TableCell className="w-10">
                  <div className="flex flex-row items-center gap-2">
                    {showEditButton && (
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className=" w-5 h-5 rounded-sm p-2"
                        onClick={() => handleEdit(row)}
                      >
                        <EditIcon className="h-2 w-2" />
                      </Button>
                    )}
                    {showDeleteButton && (
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className=" w-5 h-5 rounded-sm p-2"
                      >
                        <Trash2 className="h-2 w-2" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <div className="w-full flex flex-row items-center justify-center">
                <p className="flex-1 text-muted-foreground text-xs">
                  Showing {gridData.length} of {totalRows} entries.
                </p>
                {/* <PaginationE
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                ></PaginationE> */}
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export const Column: React.FC<ColumnProps> = () => {
  // This component acts as a placeholder and does not render anything directly
  return null;
};

// const PaginationE = ({ totalPages, currentPage, onPageChange }) => {
//   const getPages = () => {
//     // Calculate the start and end of the range
//     const start = Math.max(1, currentPage - 2);
//     const end = Math.min(totalPages, currentPage + 2);

//     // Generate the page numbers
//     const pages = [];
//     for (let page = start; page <= end; page++) {
//       pages.push(page);
//     }

//     return pages;
//   };

//   return (
//     <div className="pagination">
//       <Pagination>
//         <PaginationContent>
//           <PaginationItem>
//             <PaginationPrevious />
//           </PaginationItem>
//           {getPages().map((page) => (
//             <PaginationItem
//               key={page}
//               onClick={() => onPageChange(page)}

//               //className={page === currentPage ? "active" : ""}
//             >
//               <PaginationLink
//                 isActive={page === currentPage}
//                 // href={`?page=${page}`}
//               >
//                 {page}
//               </PaginationLink>
//             </PaginationItem>
//           ))}
//           <PaginationItem>
//             <PaginationNext />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
//     </div>
//   );
// };
