import { forwardRef, useId, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, description, error, id, className, ...props }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;
  const describedBy = [description ? descriptionId : undefined, error ? errorId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className={["nezui-field", className].filter(Boolean).join(" ")}>
      <label className="nezui-label" htmlFor={inputId}>{label}</label>
      <input
        {...props}
        ref={ref}
        id={inputId}
        className="nezui-input"
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={describedBy ?? props["aria-describedby"]}
      />
      {description && <div className="nezui-field__description" id={descriptionId}>{description}</div>}
      {error && <div className="nezui-field__error" id={errorId}>{error}</div>}
    </div>
  );
});
