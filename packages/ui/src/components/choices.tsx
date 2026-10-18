import { forwardRef, useId, useState, type ButtonHTMLAttributes, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { Button, type ButtonProps } from './button';
import { Checkbox, Radio } from './forms';

export interface NavigationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 label: string; description?: string; selected?: boolean; leading?: ReactNode; trailing?: ReactNode;
}
/** A current destination, not a form value. Place secondary actions beside this button. */
export const NavigationItem = forwardRef<HTMLButtonElement, NavigationItemProps>(function NavigationItem({ label, description, selected, leading, trailing, className = '', type = 'button', ...props }, ref) {
 return <button type={type} aria-current={selected ? 'page' : undefined} {...props} ref={ref} className={`nezui-navigation-item ${className}`} data-selected={selected || undefined}>{leading && <span className="nezui-navigation-leading" aria-hidden="true">{leading}</span>}<span className="nezui-navigation-copy"><span>{label}</span>{description && <small>{description}</small>}</span>{trailing && <span className="nezui-navigation-trailing">{trailing}</span>}</button>;
});
export interface ChoiceOption { value: string; label: string; description?: string; icon?: ReactNode; disabled?: boolean }
interface ChoiceGroupBase extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange' | 'defaultValue'> { label: string; options: ChoiceOption[]; name?: string; layout?: 'list' | 'cards' | 'chips'; }
export type ChoiceGroupProps = ChoiceGroupBase & (
 { multiple?: false; value?: string; defaultValue?: string; onValueChange?: (value: string) => void } |
 { multiple: true; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void }
);
export const ChoiceGroup = forwardRef<HTMLFieldSetElement, ChoiceGroupProps>(function ChoiceGroup(props, ref) {
 const { label, options, name, layout = 'list', className = '', multiple, value, defaultValue, onValueChange, ...rest } = props;
 const id = useId(); const [internal, setInternal] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ''));
 const current = value ?? internal;
 const selected = (key: string) => Array.isArray(current) ? current.includes(key) : current === key;
 const choose = (key: string) => {
  if (props.multiple) { const previous = Array.isArray(current) ? current : []; const next = previous.includes(key) ? previous.filter(v => v !== key) : [...previous, key]; setInternal(next); props.onValueChange?.(next); }
  else { setInternal(key); props.onValueChange?.(key); }
 };
 return <fieldset {...rest} ref={ref} className={`nezui-choice-group ${className}`} data-layout={layout}><legend>{label}</legend><div className="nezui-choice-options">{options.map(option => {
 const content = <span className="nezui-choice-content">{option.icon && <span aria-hidden="true">{option.icon}</span>}<span><span>{option.label}</span>{option.description && <small>{option.description}</small>}</span></span>;
 const common = { name: name ?? id, value: option.value, checked: selected(option.value), disabled: option.disabled, onChange: () => choose(option.value), label: content };
 return <div className="nezui-choice-option" key={option.value} data-selected={selected(option.value)}>{multiple ? <Checkbox {...common} /> : <Radio {...common} />}</div>;
 })}</div></fieldset>;
});
export interface ToggleButtonProps extends Omit<ButtonProps, 'aria-pressed'> { pressed?: boolean; defaultPressed?: boolean; onPressedChange?: (pressed: boolean) => void }
export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(function ToggleButton({ pressed, defaultPressed = false, onPressedChange, onClick, variant = 'outline', className = '', ...props }, ref) {
 const [internal, setInternal] = useState(defaultPressed); const active = pressed ?? internal;
 return <Button {...props} ref={ref} variant={variant} className={`nezui-toggle-button ${className}`} aria-pressed={active} onClick={event => { onClick?.(event); if (event.defaultPrevented) return; setInternal(!active); onPressedChange?.(!active); }} />;
});
