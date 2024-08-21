import clsx from 'clsx';

interface ComponentProps {
  status: "overdue" | "pending" | "approved" | "rejected" | "in_validation";
  children: React.ReactNode;
}

export default function Tag({ children, status }: ComponentProps) {
  return (
    <div
      className={clsx(
        " text-white font-semibold rounded py-1 px-6 inline-block",
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
