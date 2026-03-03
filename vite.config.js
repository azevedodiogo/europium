// Importa a função que permite escrever a configuração do Vite com suporte de tipos.
import { defineConfig } from 'vite'
// Ativa o plugin oficial para compilar ficheiros `.vue`.
import vue from '@vitejs/plugin-vue'
// Converte URLs de módulo em caminhos absolutos usados no alias `@`.
import { fileURLToPath, URL } from 'node:url'

// Exporta a configuração usada pelo servidor de desenvolvimento e pelo build.
export default defineConfig({
  // Regista o plugin Vue para o Vite reconhecer componentes Vue.
  plugins: [vue()],

  // Configuração específica do servidor local de desenvolvimento.
  server: {
    // Encaminha pedidos do frontend para o json-server.
    proxy: {
      // Qualquer pedido começado por `/api` passa para a API local.
      '/api': {
        // Porta onde o json-server arranca com `npm run db:start`.
        target: 'http://127.0.0.1:3000',

        // Ajusta a origem do pedido para evitar problemas de CORS em desenvolvimento.
        changeOrigin: true,

        // Remove o prefixo `/api` para `/api/dashboard` chegar ao json-server como `/dashboard`.
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },

  // Configuração de resolução de imports.
  resolve: {
    // Alias usado para importar a partir de `src` sem caminhos relativos longos.
    alias: {
      // Faz `@/componentes/...` apontar para a pasta `src/componentes/...`.
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
