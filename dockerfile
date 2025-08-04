# Stage 1: Install dependencies (includes devDependencies like TypeScript and Next)
FROM node:22.14.0-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Build the Next.js app using standalone mode
FROM node:22.14.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 🔧 Ensure next.config.ts and tsconfig.json are compiled during build
RUN npm run build

# Stage 3: Create lightweight production image
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the necessary files from standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# ✅ Optional: Copy .env.production if you need it inside the image (usually not needed if set via Azure App Service)
# COPY .env.production .env

EXPOSE 3000

CMD ["node", "server.js"]
