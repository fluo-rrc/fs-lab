import DepartmentComponent from "../components/employees/Department";
import EmployeeForm from "../components/employees/EmployeeForm";
import { employeeService } from "../services/employeeService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function EmployeesPage() {
  const queryClient = useQueryClient();

  // TanStack Query handles fetching, caching, loading, and error states
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => employeeService.getDepartments(),
  });

  const handleAddSuccess = () => {
    // Tells TanStack Query the current cache is stale and needs to be refetched
    queryClient.invalidateQueries({ queryKey: ["departments"] });
  };

  // Optional: Clean loading and error states handled automatically
  if (isLoading) {
    return <div className="p-8 text-center text-gray-600">Loading data...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">Failed to load data.</div>
    );
  }

  return (
    <main className="container mx-auto p-8 max-w-7xl">
      <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b-2 border-blue-900 pb-2">
        Organization & Employees
      </h2>

      <div className="space-y-8">
        {data.map((dept, index) => (
          <DepartmentComponent key={index} department={dept} />
        ))}
      </div>

      <EmployeeForm
        departments={data.map((d) => d.name)}
        onAddSuccess={handleAddSuccess}
      />
    </main>
  );
}
