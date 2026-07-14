# DSDebug — Original Variable Tracer

The 2022 version of DSDebug converts exported DocuSign CLM workflow definitions
into an interactive graph so variables can be traced without manually reading
dense JSON.

**Project status:** complete and retained as the original professional
implementation. Active portfolio development moved to the expanded
[DSDebug 2023 workbench](https://github.com/timcisneros/dsdebug-2023), which
adds drag-and-drop authoring, workflow templates, and an inspection console.

[Live original](https://dsdebug.vercel.app/) ·
[Current workbench](https://dsdebug-prod.vercel.app/) ·
[Portfolio case study](https://timcis.com/projects/dsdebug)

## What this version demonstrates

- Parsing exported DocuSign CLM workflow JSON.
- Rendering workflow steps and connections as an interactive graph.
- Tracing variables through the activities that read or update them.
- Turning a manual debugging task that took an afternoon into minutes of visual
  inspection.

## Run locally

```sh
npm install
npm run dev
```

This historical version remains public to show the focused tool that preceded
the larger workbench; new evaluation should begin with `dsdebug-2023`.
