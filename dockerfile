# Stage 1: Install dependencies
FROM node:22.14.0-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

   
FROM node:22.14.0-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js app (output: 'standalone' in next.config.js is required)
RUN npm run build

# Stage 3: Create production image
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files and directories
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Optional: Copy next.config.js if it exists
# This prevents error if next.config.js is missing
# Instead of failing, it simply skips copying
COPY --from=builder /app/next.config.ts ./next.config.ts 

EXPOSE 3000

CMD ["npm", "start"]  