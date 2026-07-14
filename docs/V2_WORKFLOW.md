# V2 development workflow

## Branch roles

- `master`: current Vercel production source.
- `v2`: integration branch for redesign work and preview deployments.
- `legacy/v1`: immutable branch at the final v1 production commit.
- `v1-production`: immutable tag at the same commit.

Create short-lived feature branches from `v2` when a design experiment should be isolated. Merge successful experiments back into `v2` and use Vercel's branch preview to review them.

## Release v2

1. Run `npm run build` and verify the output with `npm run preview`.
2. Confirm the responsive desktop, tablet, and mobile previews are the approved design.
3. Fast-forward or merge `v2` into `master` without rewriting history.
4. Push `master`; Vercel then builds the new production release.
5. Add a `v2-production` tag to the exact live release commit.

## Restore v1

The safest rollback is a pull request that restores the contents of the `v1-production` tag. For inspection or emergency deployment, create a branch directly from the tag:

```bash
git switch --create restore/v1 v1-production
```

The same source is also available under `legacy/v1/` on the v2 line of development and can be run with `npm run dev:legacy`.
