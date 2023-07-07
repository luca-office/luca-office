# Luca

## Config und Credentials

In verschiedenen Dateien müssen einige Werte gesetzt werden. Diese können per Textsuche nach "CHANGE-ME" oder "change.me" gefunden werden.

## Scripts

- `start:backoffice` - Starts the backoffice dev server
- `start:player` - Starts the player dev server
- `test` - Runs tests for the backoffice, player and shared
- `test:backoffice` - Runs tests for the backoffice
- `test:player` - Runs tests for the player
- `test:shared` - Runs tests for shared
- `storybook:backoffice` - Starts the backoffice storybook
- `storybook:player` - Starts the player storybook
- `lint:backoffice` - Runs es-lint for the backoffice
- `lint:player` - Runs es-lint for the player
- `codegen:backoffice` - Fetches the graphql schema and generates types for the backoffice
- `codegen:player` - Fetches the graphql schema and generates types for the player
- `codegen:shared` - Fetches the graphql schema and generates types for shared
- `typecheck` - Checks all types for backoffice, player and shared
- `typecheck:backoffice` - Checks all types for backoffice
- `typecheck:player` - Checks all types for player
- `typecheck:shared` - Checks all types for shared

## Dependencies

### Install

This repo uses yarn workspaces. One can install all the dependencies
of the packages/workspaces by entering `yarn install` in their console.

### Add new dependency

When installing a new dependency one should check if it's needed in all
workspaces or just the selected.

If all workspaces require the new dependency make sure to install it via
`yarn add (--dev) <name>` from the root. Should the dependency only be
required for one workspace, one should make sure to navigate to the workspace
before installation.

## Storybook Conventions

- Please do not use shared alias, instead go for relative imports as alias do not work correctly atm.
