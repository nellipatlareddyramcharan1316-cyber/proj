# Production Dockerfile for DevOps Sample Web Application
FROM node:18-alpine

WORKDIR /usr/src/app

# Non-root user for security
USER node

# Copy application files
COPY --chown=node:node app/ ./

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
