FROM node:lts AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:lts

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Create .env file with the environment variables
RUN echo "PORT=5000" >> .env
RUN echo 'DATABASE_URL="postgresql://postgres:example@database:5432/postgres"' >> .env


EXPOSE 5000

CMD [  "npm", "run", "start:migrate:prod" ]
