# Mx.js

**Mx.js** - Lightweight Node.js type-safe backend based framework


<br />
<br />
<br />






__These are just like a clip board for now__
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
      //.... more
    ],
    "outDir": "./build",
    "clean": true,
    "format": "esm",
    "dts": true,
    "target": "esnext"
  }
```
