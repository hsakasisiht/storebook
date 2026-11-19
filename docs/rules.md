# Workspace Rules

**Status:** Mandatory project rules  
**Applies to:** Every AI agent, assistant, automation, and contributor working on this project  
**Authority:** These rules remain in force unless the user explicitly changes them.

## 1. Workspace Boundary

1. Work only inside the exact workspace/folder explicitly provided by the user.
2. Do not create, edit, move, rename, delete, or inspect project files outside that workspace.
3. Do not access other folders, drives, repositories, accounts, machines, or external services as part of the project unless the user gives explicit permission for the specific action.
4. Do not run commands that may modify files or settings outside the workspace.
5. Do not install software, packages, extensions, services, or dependencies globally. Ask first. Prefer workspace-local installation when appropriate and permitted.
6. Do not upload, publish, deploy, push, commit, or share project content externally without explicit permission.
7. If the workspace path is missing, unclear, inaccessible, or appears different from the one provided, stop and ask the user. Never guess the path.

## 2. No Assumptions

1. Never invent requirements, features, workflows, credentials, configuration values, file paths, APIs, dependencies, or design decisions.
2. Do not treat a likely interpretation as confirmed.
3. If any required detail is missing, ambiguous, contradictory, or technically uncertain, pause the affected task and ask the user a clear question.
4. Ask only for the information needed to proceed, and explain briefly why it is needed.
5. Do not silently choose defaults. A default may be used only if the user has approved it or the project documentation explicitly defines it.
6. Do not claim that a feature, test, command, or task succeeded unless it was actually performed and its result was checked.

## 3. Permission Before Actions

Obtain the user's explicit approval before:
- Accessing anything outside the designated workspace.
- Making destructive or irreversible changes.
- Deleting, overwriting, or bulk-renaming files.
- Installing or upgrading dependencies or tools.
- Changing system, network, environment, account, or security settings.
- Connecting to external services, APIs, databases, or cloud resources.
- Sending data outside the workspace, publishing, deploying, or sharing.
- Running commands whose effects are unclear or may extend beyond the workspace.

A request to work on the project is not blanket permission for these actions.

## 4. Safe File and Code Changes

1. Inspect relevant workspace files before editing them.
2. Preserve existing project structure and conventions unless the user approves a change.
3. Make the smallest change that satisfies the confirmed requirement.
4. Do not replace working code with placeholders, stubs, mock implementations, or incomplete examples unless requested.
5. Do not overwrite user work without approval. If a conflict or possible data loss is detected, stop and ask.
6. Keep generated files, temporary files, logs, and dependencies inside the workspace, unless the user explicitly authorizes another location.
7. Do not expose secrets, tokens, passwords, private keys, or personal data in logs, reports, or source control.

## 5. Execution and Testing

1. Before running a command, understand what it does and confirm it stays within the permitted workspace.
2. Do not execute untrusted scripts or binaries without explaining the risk and obtaining approval.
3. Run only tests relevant to the task and permitted by the user.
4. Report the exact checks performed and their outcomes.
5. Clearly distinguish verified results from untested assumptions or recommendations.
6. If a command fails, report the failure accurately; do not conceal it or mark the task complete.

## 6. Communication and Clarification

1. Keep the user informed when a decision or permission is required.
2. Ask before making any choice that changes scope, architecture, behavior, dependencies, data, or security posture.
3. Do not proceed with unrelated tasks merely because they appear useful.
4. If instructions conflict, stop and ask the user which instruction takes priority.
5. Use the user's requested language, format, and level of detail where practical.

## 7. Phase and Change Tracking Is Mandatory (`progress.md` & `memory.md`)

1. Two mandatory tracking files must be maintained throughout the project:
   - **`progress.md` (Phase Tracker):** Tracks **all project phases** from start to finish. Every phase of the project, its objectives, current status, milestones, deliverables, and phase-level history must be updated in `progress.md`.
   - **`memory.md` (Granular Change Log):** Tracks **every single change** made during the project. Every file creation, code edit, configuration update, rule modification, command execution, or confirmed decision must be logged immediately in `memory.md`.
2. Update `memory.md` immediately after **every individual change or action**, and update `progress.md` whenever a phase is defined, started, updated, blocked, or completed.
3. Each entry in both `progress.md` and `memory.md` must include the actual date, time, and timezone. Use `Asia/Kolkata (IST, UTC+05:30)` unless the user specifies another timezone.
4. In `progress.md`, maintain an up-to-date list of all phases alongside a chronological log of phase updates, checks performed, outcomes, and blockers.
5. In `memory.md`, record the exact file(s) changed, what was added/modified/removed, why the change was made, verification performed, and the resulting state.
6. Never fabricate timestamps, work, changes, test results, or completion status in either file.
7. If work is interrupted before an update can be written, record the interruption in the next available update and identify the time as approximate only if the exact time cannot be verified.
8. Keep all older entries in both `progress.md` and `memory.md`. Do not erase history to make logs appear cleaner.
9. Mark a phase or task **Complete** only when the requested work is done and the relevant result has been verified. Otherwise use **In progress**, **Blocked**, or **Not started**.

## 8. Completion Report

At the end of each task or phase update, provide a concise report containing:
- What was completed.
- Files created or changed.
- Confirmation that `memory.md` (for all changes) and `progress.md` (for phase status) have been updated.
- Tests/checks run and their results.
- Any limitations, risks, or unresolved questions.
- Any user approval needed for the next step.

## 9. Rule Changes

Only the user may authorize an exception or change to these rules. Any exception must be explicit and limited to the action or scope the user approved. Do not interpret silence as consent.

---

**Final rule:** If an action is outside the designated workspace, requires an unapproved assumption, or lacks required permission, do not perform it. Stop and ask the user.