import { Icon } from './icon';
import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode, type KeyboardEvent, type CSSProperties } from 'react';
import { Input, type InputProps } from './input';
import { Button } from './button';

export function SearchField(props: Omit<InputProps, 'type'>) { return <Input {...props} type="search" />; }
export interface SelectOption { value: string; label: string; description?: string; disabled?: boolean }
export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> { label: string; options: SelectOption[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; disabled?: boolean; name?: string }
function positionPopup(trigger: HTMLElement, popup: HTMLElement) {
 const rect = trigger.getBoundingClientRect();
 const width = Math.min(Math.max(rect.width, 220), window.innerWidth - 24);
 popup.style.width = `${width}px`;
 const available = Math.max(80, window.innerHeight - 24);
 popup.style.maxHeight = `${Math.min(280, available)}px`;
 const height = popup.getBoundingClientRect().height;
 const top = rect.bottom + height + 8 < window.innerHeight ? rect.bottom + 6 : Math.max(12, rect.top - height - 6);
 popup.style.top = `${top}px`;
 popup.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`;
}
export function Select({ label, options, value, defaultValue, onValueChange, disabled, name, className = '', ...props }: SelectProps) {
 const id = useId(); const [internal, setInternal] = useState(defaultValue ?? options.find(o => !o.disabled)?.value ?? ''); const selected = value ?? internal; const [open, setOpen] = useState(false); const [active, setActive] = useState(0); const trigger = useRef<HTMLButtonElement>(null); const popup = useRef<HTMLDivElement>(null); const search = useRef({ value: '', time: 0 });
 const enabled = options.map((o, i) => o.disabled ? -1 : i).filter(i => i >= 0);
 const close = () => { popup.current?.hidePopover(); setOpen(false); trigger.current?.focus(); };
 const choose = (index: number) => { const option = options[index]; if (!option || option.disabled) return; setInternal(option.value); onValueChange?.(option.value); close(); };
 const show = () => { if (disabled || !popup.current || !trigger.current || !enabled.length) return; const index = options.findIndex(o => o.value === selected && !o.disabled); setActive(index >= 0 ? index : enabled[0]); popup.current.showPopover(); positionPopup(trigger.current, popup.current); setOpen(true); popup.current.focus(); };
 useEffect(() => { if (!open) return; const update = () => { if (trigger.current && popup.current) positionPopup(trigger.current, popup.current); }; window.addEventListener('resize', update); window.addEventListener('scroll', update, true); return () => { window.removeEventListener('resize', update); window.removeEventListener('scroll', update, true); }; }, [open]);
 useEffect(() => { if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' }); }, [active, open, id]);
 const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
   if (event.key === 'Escape') { event.preventDefault(); close(); return; }
   if (event.key === 'Tab') { popup.current?.hidePopover(); setOpen(false); trigger.current?.focus(); return; }
   if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(active); return; }
   if (['ArrowDown','ArrowUp','Home','End'].includes(event.key)) { event.preventDefault(); const pos = enabled.indexOf(active); const next = event.key === 'Home' ? enabled[0] : event.key === 'End' ? enabled[enabled.length - 1] : enabled[(pos + (event.key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length]; if (next !== undefined) setActive(next); }
   else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) { const now = Date.now(); search.current.value = (now - search.current.time > 700 ? '' : search.current.value) + event.key.toLowerCase(); search.current.time = now; const next = options.findIndex(o => !o.disabled && o.label.toLowerCase().startsWith(search.current.value)); if (next >= 0) setActive(next); }
 };
 return <div {...props} className={`nezui-field ${className}`}><span id={`${id}-label`} className="nezui-label">{label}</span>{name && <input type="hidden" name={name} value={selected} disabled={disabled} />}<button type="button" ref={trigger} className="nezui-select-trigger" disabled={disabled} aria-labelledby={`${id}-label ${id}-value`} aria-haspopup="listbox" aria-controls={`${id}-list`} aria-expanded={open} onClick={() => open ? close() : show()} onKeyDown={e => { if (['ArrowDown', 'ArrowUp'].includes(e.key)) { e.preventDefault(); show(); } }}><span id={`${id}-value`}>{options.find(o => o.value === selected)?.label ?? '選択してください'}</span><Icon name="chevron" size={16} /></button><div id={`${id}-list`} ref={popup} popover="auto" role="listbox" aria-labelledby={`${id}-label`} aria-activedescendant={`${id}-option-${active}`} tabIndex={-1} className="nezui-option-popup" onToggle={e => setOpen(e.newState === 'open')} onKeyDown={navigate}>{options.map((option, i) => <div key={option.value} id={`${id}-option-${i}`} role="option" aria-selected={selected === option.value} aria-disabled={option.disabled || undefined} data-active={active === i} onPointerMove={() => { if (!option.disabled) setActive(i); }} onClick={() => choose(i)} className="nezui-option"><span className="nezui-option-copy">{option.label}{option.description && <small>{option.description}</small>}</span>{selected === option.value && <Icon name="check" size={18} />}</div>)}</div></div>;
}

export interface MenuItem { label: string; onSelect: () => void; disabled?: boolean; destructive?: boolean }
export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> { label: string; items: MenuItem[] }
export function DropdownMenu({ label, items, className = '', ...props }: DropdownMenuProps) { return <Menu {...props} label={label} items={items} className={className} />; }
export interface ContextMenuProps extends DropdownMenuProps { children: ReactNode }
export function ContextMenu(props: ContextMenuProps) { return <Menu {...props} context />; }
function Menu({ label, items, children, context, className = '', ...props }: DropdownMenuProps & { context?: boolean; children?: ReactNode }) {
 const id = useId(); const panel = useRef<HTMLDivElement>(null); const trigger = useRef<HTMLButtonElement>(null); const origin = useRef<HTMLElement | null>(null); const [open, setOpen] = useState(false); const [active, setActive] = useState(0);
 const enabled = items.map((item, i) => item.disabled ? -1 : i).filter(i => i >= 0);
 const close = () => { panel.current?.hidePopover(); setOpen(false); origin.current?.focus(); };
 const show = (source: HTMLElement, point?: { x: number; y: number }) => { if (!panel.current || !enabled.length) return; origin.current = source; panel.current.showPopover(); positionPopup(source, panel.current); if (point) { const rect = panel.current.getBoundingClientRect(); panel.current.style.left = `${Math.max(12, Math.min(point.x, innerWidth - rect.width - 12))}px`; panel.current.style.top = `${Math.max(12, Math.min(point.y, innerHeight - rect.height - 12))}px`; } setOpen(true); setActive(enabled[0]); panel.current.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')[enabled[0]]?.focus(); };
 useEffect(() => { if (!open) return; const dismiss = () => { panel.current?.hidePopover(); setOpen(false); }; window.addEventListener('resize', dismiss); return () => window.removeEventListener('resize', dismiss); }, [open]);
 return <div {...props} className={className}>{context ? <div className="nezui-context-target" tabIndex={0} aria-label={label} aria-haspopup="menu" aria-controls={id} aria-expanded={open} onContextMenu={e => { e.preventDefault(); e.currentTarget.focus(); show(e.currentTarget, { x: e.clientX, y: e.clientY }); }} onKeyDown={e => { if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10') || e.key === 'Enter') { e.preventDefault(); show(e.currentTarget); } }}>{children}<Button variant="ghost" size="sm" onClick={e => show(e.currentTarget)}>メニューを開く</Button></div> : <Button ref={trigger} variant="secondary" aria-haspopup="menu" aria-controls={id} aria-expanded={open} onClick={e => show(e.currentTarget)}>{label} <Icon name="chevron" size={16} /></Button>}<div ref={panel} id={id} popover="auto" role="menu" aria-label={label} className="nezui-option-popup" onToggle={e => setOpen(e.newState === 'open')} onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); close(); } else if (e.key === 'Tab') { close(); } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const index = enabled.indexOf(active); const next = e.key === 'Home' ? enabled[0] : e.key === 'End' ? enabled[enabled.length - 1] : enabled[(index + (e.key === 'ArrowDown' ? 1 : -1) + enabled.length) % enabled.length]; if (next !== undefined) { setActive(next); panel.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]')[next]?.focus(); } } }}>{items.map((item, i) => <button type="button" key={item.label} role="menuitem" tabIndex={active === i ? 0 : -1} disabled={item.disabled} className="nezui-option" data-destructive={item.destructive} onFocus={() => setActive(i)} onClick={() => { close(); item.onSelect(); }}>{item.label}</button>)}</div></div>;
}


