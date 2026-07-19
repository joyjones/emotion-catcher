# Deployment Workflow

This project has two public environments:

- Production: https://joyjones.github.io/emotion-catcher/
- Staging: https://joyjones.github.io/emotion-catcher-staging/

## Branches

- `main` is production. Do not push feature work directly to `main`.
- `staging` is pre-release. New work should be tested here first.

## Release Flow

1. Do development work on `staging` or a feature branch based on `staging`.
2. Push the tested state to the staging Pages site.
3. Verify the staging URL in a browser.
4. Only after staging is accepted, merge `staging` into `main`.
5. Push `main` to update production.
6. Tag meaningful production releases with semantic versions.

## Current Baseline

- `v0.1.0` marks the production state before staging was introduced.
- The staging site was initialized from the same app state, with this deployment workflow added.
