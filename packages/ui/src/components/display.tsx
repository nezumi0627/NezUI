import { Button, type ButtonProps } from './button';
import { Icon } from './icon';
import { forwardRef, type HTMLAttributes, type ButtonHTMLAttributes, type DetailsHTMLAttributes, type ReactNode } from "react";
export type Tone = 'neutral' | 'success' | 'warning' | 'error';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: Tone }
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ tone = 'neutral', className = '', ...props }, ref) { return <span {...props} ref={ref} className={`nezui-badge nezui-tone-${tone} ${className}`} />; });
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card({ className = '', ...props }, ref) { return <div {...props} ref={ref} className={`nezui-card ${className}`} />; });
export interface AlertProps extends HTMLAttributes<HTMLDivElement> { tone?: Tone; title: string }
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert({ tone = 'neutral', title, children, className = '', ...props }, ref) { return <div role={tone === 'error' ? 'alert' : 'status'} {...props} ref={ref} className={`nezui-alert nezui-tone-${tone} ${className}`}><strong>{title}</strong><div>{children}</div></div>; });
export const Separator = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement>>(function Separator({ className = '', ...props }, ref) { return <hr {...props} ref={ref} className={`nezui-separator ${className}`} />; });
export interface IconButtonProps extends ButtonProps { 'aria-label': string; shape?: 'rounded' | 'circle' }
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ className = '', type = 'button', shape = 'rounded', variant = 'ghost', ...props }, ref) { return <Button {...props} type={type} variant={variant} ref={ref} data-shape={shape} className={`nezui-icon-button ${className}`} />; });
export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> { name: string }
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar({ name, className = '', ...props }, ref) { return <span {...props} role="img" aria-label={name} ref={ref} className={`nezui-avatar ${className}`}>{name.trim().split(/\s+/).map(part => Array.from(part)[0]).slice(0, 2).join('')}</span>; });
export interface ProgressProps extends HTMLAttributes<HTMLDivElement> { value?: number; label: string }
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress({ value, label, className = '', ...props }, ref) { return <div {...props} ref={ref} className={`nezui-progress-field ${className}`}><div className="nezui-progress-label"><span>{label}</span>{value !== undefined && <span>{Math.round(Math.max(0, Math.min(100, value)))}%</span>}</div><progress aria-label={label} max={100} value={value} className="nezui-progress" /></div>; });
export const Spinner = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Spinner({ className = '', ...props }, ref) { return <span role="status" aria-label="読み込み中" {...props} ref={ref} className={`nezui-spinner nezui-standalone-spinner ${className}`} />; });
export const Skeleton = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Skeleton({ className = '', ...props }, ref) { return <div aria-hidden="true" {...props} ref={ref} className={`nezui-skeleton ${className}`} />; });
export interface AccordionProps extends DetailsHTMLAttributes<HTMLDetailsElement> { title: string }
export const Accordion = forwardRef<HTMLDetailsElement, AccordionProps>(function Accordion({ title, children, className = '', ...props }, ref) { return <details {...props} ref={ref} className={`nezui-accordion ${className}`}><summary>{title}<span aria-hidden="true">+</span></summary><div>{children}</div></details>; });
export const ScrollArea = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function ScrollArea({ className = '', ...props }, ref) { return <div tabIndex={0} role="region" {...props} ref={ref} className={`nezui-scroll-area ${className}`} />; });
export interface ToastProps extends HTMLAttributes<HTMLDivElement> { title: string; onDismiss: () => void; children?: ReactNode }
export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast({ title, onDismiss, children, className = '', ...props }, ref) { return <div {...props} ref={ref} className={`nezui-toast ${className}`}><div role="status"><strong>{title}</strong>{children && <p>{children}</p>}</div><IconButton aria-label="通知を閉じる" onClick={onDismiss}><Icon name="close" size={18} /></IconButton></div>; });


