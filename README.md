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

The `master` branch remains the Vercel production branch until v2 is approved. Work on v2 belongs on the `v2` branch; pushes to it may create Vercel preview deployments but do not replace production.

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
