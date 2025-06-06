import clsx from 'clsx';

export type T_status_type = "overdue" | "pending" | "approved" | "rejected" | "in_validation";

interface T_props {
  status: T_status_type;
  children: React.ReactNode;
}

export default function Tag({ children, status }: T_props) {
  return (
    <div
      className={clsx(
        " text-white font-semibold rounded-sm py-1 px-6 inline-block",
        status === 'overdue' && "bg-black",
        status === 'pending' && "bg-blue-600",
        status === 'rejected' && "bg-red-700",
        status === 'approved' && "bg-green-500",
        status === 'in_validation' && "bg-yellow-500",
      )}
    >
      {children}
    </div>
  )
}
