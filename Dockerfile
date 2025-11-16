FROM node:latest 
WORKDIR /app


# Étape 1: Importer les fichiers locaux 

COPY package*.json ./

# Étape 2: Installer les dependances
RUN npm install 

# Étape 3: Copier le reste des fichiers
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:prod"]