# AI Agent Guidelines for CodeSutra

Welcome to the CodeSutra repository. When assisting with this project, you must strictly adhere to the following rules and workflows to ensure high-quality, reliable, and user-approved code changes.

## 1. Strict Approval Workflow (No Unapproved Pushes)
- **NEVER** push code directly to the remote repository (e.g., via `git push`) without explicit review and approval from the user.
- The standard Git workflow applies: create branches for features, commit changes locally, but await user confirmation before pushing or merging.

## 2. Planning and Design First
All significant tasks must follow this structured development workflow:
1. **Plan & Design:** Analyze the request, explore the codebase, and formulate a clear Implementation Plan.
2. **Review:** Present the Implementation Plan (using the `implementation_plan.md` artifact) to the user.
3. **Approval:** Wait for the user to explicitly approve the plan.
4. **Implementation:** Only begin writing code after approval.

## 3. Mandatory Localhost Testing
- All changes must be tested locally before they are considered complete.
- When you make changes, instruct the user to run the local dev server (e.g., `pnpm dev`) or use terminal commands to run the server in the background and verify that the application builds and functions correctly.
- Do not assume code works just because there are no syntax errors; verify the runtime behavior.

## 4. Technology Stack Context
To help you make the best decisions, here is the core technology stack used in this project:
- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS v3 (integrated into Next.js)
- **Styling:** Tailwind CSS 3
- **Package Manager:** `pnpm` (Always use `pnpm` for installing dependencies, e.g., `pnpm install <pkg>`)
- **Rich Text:** Lexical Editor (Payload CMS default)

## 5. Renovation & Re-Design
- The user intends to renovate and re-design this personal space. Prioritize modern, visually striking UI/UX decisions using Tailwind CSS.
- Keep components modular and follow existing structural patterns in `src/app`, `src/blocks`, and `src/components`.
