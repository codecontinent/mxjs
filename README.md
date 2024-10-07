# mxjs

Mx.js - Lightweight Node.js type-safe backend based framework

### common build & other tools

- release-it
- tsup
- copyfiles

### Samples

```json
"release-it": {
    "git": {
      "requireCleanWorkingDir": true,
      "requireUpstream": true,
      "commitMessage": "chore(release): ${version}",
      "tagAnnotation": "v${version}",
      "push": true,
      "tagName": "v${version}"
    },
    "github": {
      "release": true
    },
    "npm": {
      "publish": true,
      "skipChecks": true
    },
    "plugins": {
      "@release-it/conventional-changelog": {
        "preset": {
          "name": "angular"
        }
      }
    }
  },
```

**Tsup**

```json
"tsup": {
    "entry": [
      "./index.ts",
      "./src/types.ts",
      "./src/helpers.ts",
      "./src/plugins/vite.ts",
      "./services/inertia.ts",
      "./src/inertia_middleware.ts",
      "./providers/inertia_provider.ts",
      "./src/plugins/edge/plugin.ts",
      "./src/plugins/japa/api_client.ts"
    ],
    "outDir": "./build",
    "clean": true,
    "format": "esm",
    "dts": true,
    "target": "esnext"
  }
```
