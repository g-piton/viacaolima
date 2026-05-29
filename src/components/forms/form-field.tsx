import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-lima-black">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-2 block text-sm font-semibold text-red-700">
          {error}
        </span>
      )}
    </label>
  );
}
