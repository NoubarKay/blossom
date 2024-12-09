export enum Permissions {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export default function HasPermission({
  section,
  permission,
}: {
  section: string;
  permission: Permissions;
}) {
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");

  // Check if the required permission exists for the section
  const hasPermission = permissions.some(
    (p: string) => p === `${section}:${permission}` // Use the permission directly
  );

  return hasPermission;
}
