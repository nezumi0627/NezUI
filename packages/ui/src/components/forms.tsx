import { forwardRef, useId, useEffect, useRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { label: string; description?: string; error?: string }
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ label, description, error, id, className = "", ...props }, ref) {
  const uid = useId(); const fieldId = id ?? uid;
  return <div className="nezui-field"><label className="nezui-label" htmlFor={fieldId}>{label}</label><textarea {...props} ref={ref} id={fieldId} className={`nezui-input nezui-textarea ${className}`} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={[props['aria-describedby'], description && `${fieldId}-hint`, error && `${fieldId}-error`].filter(Boolean).join(' ') || undefined} />{description && <span id={`${fieldId}-hint`} className="nezui-field__description">{description}</span>}{error && <span id={`${fieldId}-error`} className="nezui-field__error">{error}</span>}</div>;
});
export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> { label: string }
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(function NativeSelect({ label, id, className = "", children, ...props }, ref) {
  const uid = useId(); return <div className="nezui-field"><label className="nezui-label" htmlFor={id ?? uid}>{label}</label><select {...props} ref={ref} id={id ?? uid} className={`nezui-input ${className}`}>{children}</select></div>;
});
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> { label: ReactNode; indeterminate?: boolean }
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, indeterminate = false, className = "", ...props }, ref) {
  const internal = useRef<HTMLInputElement | null>(null);
  useEffect(() => { if (internal.current) internal.current.indeterminate = indeterminate; }, [indeterminate]);
  return <label className={`nezui-choice ${className}`}><input {...props} type="checkbox" ref={node => { internal.current = node; if (typeof ref === 'function') return ref(node); if (ref) ref.current = node; }} /> <span>{label}</span></label>;
});
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> { label: ReactNode }
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ label, className = "", ...props }, ref) { return <label className={`nezui-choice ${className}`}><input {...props} ref={ref} type="radio" /><span>{label}</span></label>; });
export const Switch = forwardRef<HTMLInputElement, RadioProps>(function Switch({ label, className = "", ...props }, ref) { return <label className={`nezui-choice nezui-switch ${className}`}><input {...props} ref={ref} type="checkbox" role="switch" /><span className="nezui-switch-track" aria-hidden="true" /><span>{label}</span></label>; });
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> { label: string }
export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider({ label, id, className = "", ...props }, ref) { const uid = useId(); return <div className={`nezui-field ${className}`}><label className="nezui-label" htmlFor={id ?? uid}>{label}</label><input {...props} id={id ?? uid} ref={ref} type="range" className="nezui-slider" /></div>; });
