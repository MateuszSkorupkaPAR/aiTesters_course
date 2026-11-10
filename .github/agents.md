# Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<optional scope>): <description>`

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`, `revert`
- Write the description in lowercase, imperative mood, no trailing period, max 72 characters.
- Add a body (after a blank line) only when the "why" needs explaining.
- Mark breaking changes with `!` (e.g. `feat!: ...`) or a `BREAKING CHANGE:` footer.
- One logical change per commit.
- End AI-authored commits with: `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`

Examples:

```
feat(tests): add login validation scenarios
fix(playwright): correct base URL in config
chore: update VSCode settings
```
