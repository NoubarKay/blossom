"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

import { Loader2Icon } from "lucide-react";
import { columns } from "./_components/columns";
import { Separator } from "@/components/ui/separator";
import Role from "@/types/role";
import { Section } from "@/types/section";
import { Column, DataTable } from "@/components/DataTable/DataTable";
// Define Zod schema
const FormSchema = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  sections: z.array(z.number().int()),
});

export default function Page() {
  const { company_id } = useParams();
  const [sections, setSections] = useState<Section[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      sections: [], // Default as an empty array
    },
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    if (!token?.access_token) return;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/company/getbyid?id=${
          company_id ?? -1
        }`,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      setSections(response.data.additionalData.sections || []);
      form.reset({
        id: response.data.model.id || 0,
        title: response.data.model.title || "", // Set the title dynamically
        sections: response.data.model.sections || [], // Pre-fill the selected sections
      });
      setRoles(response.data.additionalData.roles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    if (!token?.access_token) return;

    console.log("Submitted Data:", data);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/company/save`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );

    console.log(response.data);
  };

  return (
    <>
      {loading && (
        <div className="absolute top-[50%] left-[50%]">
          <Loader2Icon className="animate-spin h-10 w-10" />
        </div>
      )}
      {!loading && (
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-semibold mb-24">Edit Company Details</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-4 gap-10 space-y-8"
            >
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator className="my-5" />
                <p className="my-2 font-semibold">Roles</p>
                <DataTable data={roles} showEditButton>
                  <Column title="Role" field="title" />
                </DataTable>
              </div>

              <div className="col-span-1 ">
                <FormField
                  control={form.control}
                  name="sections"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Sections</FormLabel>
                        <FormDescription>
                          Select the section the company has access to.
                        </FormDescription>
                      </div>
                      {sections.map((item: Section) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="sections"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.title}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-4">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
