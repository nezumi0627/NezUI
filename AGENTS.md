# NezUI Agent Instructions

## Source of truth

- Treat [`docs/MASTER_SPECIFICATION.md`](docs/MASTER_SPECIFICATION.md) as the single source of truth for NezUI's product, design, architecture, quality, and release requirements.
- Keep implementation, examples, and documentation consistent with that specification. Update the specification when an approved project decision changes it.
- Use the name **NezUI** in code, documentation, and distribution. `Auvryn UI` is a historical name only.

## Engineering rules

- Use React and strict TypeScript. Preserve precise public types and avoid `any` and unnecessary casts.
- Use Vanilla CSS and CSS Custom Properties. Prefix global CSS classes with `nezui-`; do not introduce CSS Modules, Tailwind, or CSS-in-JS as the implementation base.
- Keep runtime dependencies small. React is a peer dependency for the UI package.
- Design accessibility, keyboard behavior, focus handling, reduced motion, and SSR compatibility alongside component behavior.
- Prefer semantic native HTML when appropriate. Do not rely on color alone to convey state.
- Avoid decorative effects that do not improve meaning or interaction. Respect `prefers-reduced-motion`.
- Keep component APIs idiomatic for React and consistent across the library. Support `className`, `style`, refs, and applicable native attributes.
- Do not present mock behavior as complete functionality. Keep published components and documentation examples aligned.
- Measure before making performance claims or optimizations.

## Working agreements

- Inspect existing patterns before changing code; make the smallest complete change that fits the project.
- Do not claim behavior is verified unless it was actually checked. Report changed files, checks performed, and known gaps at the end of work.
- Follow the repository's package manager and scripts once established; do not add dependencies without a concrete need.
