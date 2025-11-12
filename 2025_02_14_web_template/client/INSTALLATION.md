# install vite

npm create vite@latest 2025_02_14_vite_experiments

# install preetier

https://prettier.io/docs/install

npm install --save-dev --save-exact prettier

node --eval "fs.writeFileSync('.prettierrc','{}\n')"

node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

# tailwindcss

https://tailwindcss.com/docs/installation/using-vite

# absolute path and change port

tsconfig.app.json

```
{
    "compilerOptions": {
        ...

        "baseUrl": ".",
        "paths": {
            "src/*": ["./src/*"]
        }
    },
    "include": ["src"]
}

```

vite.config.ts

```
...
import { resolve } from 'path';

dotenv.config();

const port = parseInt(process.env.VITE_PORT || '3100');

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: port,
    },
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
});
```

# GUIDE:

Front-End Services
3000-3999: Commonly used for front-end development servers.

Back-End Services
4000-4999: Suitable for back-end servers or APIs.

Database and Middleware
5000-5999: Ideal for databases, middleware, and other internal services.

Testing and Staging
6000-6999: Great for testing and staging environments.

Miscellaneous and Custom Services
7000-7999: Use for miscellaneous or custom services that don't fit into the above categories.
