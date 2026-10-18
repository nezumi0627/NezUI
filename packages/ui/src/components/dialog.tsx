import { Icon } from './icon';
import { forwardRef, useEffect, useImperativeHandle, useId, useRef, type DialogHTMLAttributes, type ReactNode } from "react";

export interface DialogProps extends Omit<DialogHTMLAttributes<HTMLDialogElement>, "open" | "onClose"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(function Dialog({ open, onOpenChange, title, children, actions, className, ...props }, forwardedRef) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useImperativeHandle(forwardedRef, () => dialogRef.current!, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      {...props}
      ref={dialogRef}
      className={["nezui-dialog", className].filter(Boolean).join(" ")}
      aria-labelledby={titleId}
      onClose={() => onOpenChange(false)}
    >
      <div className="nezui-dialog__header">
        <h2 className="nezui-dialog__title" id={titleId}>{title}</h2>
        <button
          className="nezui-icon-button"
          type="button"
          aria-label="閉じる"
          onClick={() => onOpenChange(false)}
        >
          <Icon name="close" size={20} />
        </button>
      </div>
      <div className="nezui-dialog__content">{children}</div>
      {actions && <div className="nezui-dialog__actions">{actions}</div>}
    </dialog>
  );
});

