# Phaistos Labs website

This repository keeps the deployed v1 site recoverable while the replacement is developed independently.

## Repository layout

```text
apps/v2/       New website and active redesign workspace
legacy/v1/     Complete snapshot of the original static website
docs/          Development and release notes
```

The production v1 source is also preserved in two Git references:

- Branch: `legacy/v1`
- Tag: `v1-production`

The `master` branch is the Vercel production branch. Approved releases are promoted there from `v2`; pushes to `v2` remain preview/integration work and do not replace production. The archived v1 source stays recoverable regardless of which release is live.

## Local development

Install dependencies once:

```bash
npm install
```

Run the v2 workspace:

```bash
npm run dev
```

Run the preserved v1 site:

```bash
npm run dev:legacy
```

Build and inspect the production output:

```bash
npm run build
npm run preview
```

See [docs/V2_WORKFLOW.md](docs/V2_WORKFLOW.md) for the release and rollback workflow.
