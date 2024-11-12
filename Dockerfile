FROM node:18 AS builder

WORKDIR /app

# Configurer npm pour utiliser un miroir alternatif
RUN npm config set registry https://registry.npmmirror.com && \
    npm config set fetch-timeout 300000

# S'assurer que le dossier /app appartient à node
RUN chown -R node:node /app

# Switcher vers l'utilisateur node
USER node

# Copier les fichiers avec les bonnes permissions
COPY --chown=node:node package*.json ./

RUN npm install

# Copier le reste des fichiers avec les bonnes permissions
COPY --chown=node:node . .

RUN npm run build

FROM node:18-slim AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]
