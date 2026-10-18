import { forwardRef, type SVGProps } from 'react';
const paths = {
 check: 'M5 12l4 4L19 6', plus: 'M12 5v14M5 12h14', close: 'M6 6l12 12M18 6L6 18', send: 'M12 19V5M5 12l7-7 7 7', stop: 'M6 6h12v12H6z',
 microphone: 'M9 5a3 3 0 016 0v7a3 3 0 01-6 0V5M5 10v2a7 7 0 0014 0v-2M12 19v3M9 22h6',
 attach: 'M8 12l7-7a4 4 0 015.7 5.7l-9 9a6 6 0 01-8.5-8.5l9-9M7 14l8-8a1.5 1.5 0 012.1 2.1l-8 8',
 chevron: 'M7 10l5 5 5-5', search: 'M21 21l-5-5M18 10a8 8 0 11-16 0 8 8 0 0116 0',
 settings: 'M4 7h16M4 17h16M8 4v6M16 14v6', edit: 'M14 5l5 5M4 20l5-1L20 8a3.5 3.5 0 00-5-5L4 14v6',
 chat: 'M5 4h14a2 2 0 012 2v11a2 2 0 01-2 2H8l-5 3V6a2 2 0 012-2',
 more: 'M5 12h.01M12 12h.01M19 12h.01', copy: 'M9 9h11v12H9zM15 9V3H3v12h6',
 retry: 'M3 10a9 9 0 111 8M3 4v6h6', file: 'M14 2H5v20h14V7l-5-5M14 2v5h5M8 12h8M8 16h5',
 terminal: 'M4 6l6 6-6 6M13 18h7', shield: 'M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4M8 11l3 3 5-5',
 spark: 'M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3',
 folder: 'M3 5h7l2 3h9v12H3V5', arrow: 'M5 12h14M13 6l6 6-6 6', download: 'M12 3v12M7 10l5 5 5-5M4 17v4h16v-4',
 clock: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0M12 7v5l3 2', warning: 'M12 3L2 21h20L12 3M12 9v5M12 18h.01',
 pin: 'M8 3h8l-1 6 4 4H5l4-4-1-6M12 13v8', trash: 'M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7',
} as const;
export type IconName = keyof typeof paths;
export interface IconProps extends SVGProps<SVGSVGElement> { name: IconName; size?: number }
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon({ name, size = 20, ...props }, ref) { return <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={paths[name]} /></svg>; });
