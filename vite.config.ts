import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// En développement, exécute la fonction serveur Vercel api/contact.ts directement dans Vite
// (en production, c'est Vercel qui l'exécute). La clé RESEND_API_KEY est lue depuis .env.
const localApiPlugin = (): Plugin => ({
  name: "local-vercel-api",
  configureServer(server) {
    server.middlewares.use("/api/contact", async (req, res) => {
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) {
          if (typeof value === "string") headers.set(key, value);
        }
        const request = new Request(`http://${req.headers.host}/api/contact`, {
          method: req.method,
          headers,
          body: req.method === "POST" ? Buffer.concat(chunks) : undefined,
        });
        const mod = await server.ssrLoadModule("/api/contact.ts");
        const response: Response =
          req.method === "POST" ? await mod.POST(request) : new Response(null, { status: 405 });
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(await response.text());
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const localKey = loadEnv(mode, process.cwd(), "").RESEND_API_KEY;
  if (localKey && !process.env.RESEND_API_KEY) process.env.RESEND_API_KEY = localKey;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      localApiPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["lucide-react", "react-router-dom", "@tanstack/react-query", "zod", "clsx", "tailwind-merge"],
    },
    build: {
      target: "esnext",
      minify: "esbuild",
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            radix: [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-tooltip",
              "@radix-ui/react-toast",
              "@radix-ui/react-select",
              "@radix-ui/react-accordion"
            ],
            icons: ["lucide-react"],
          },
        },
      },
    },
  };
});
