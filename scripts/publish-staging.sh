#!/usr/bin/env bash
set -euo pipefail

current_branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$current_branch" != "staging" ]; then
  echo "Error: publish staging from the staging branch only."
  echo "Current branch: $current_branch"
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Error: working tree is not clean. Commit or stash changes first."
  git status --short
  exit 1
fi

git push origin staging
git push staging-pages staging:main

echo "Staging published:"
echo "https://joyjones.github.io/emotion-catcher-staging/"
