# Step 1: Use Node 18 as the base image
FROM node:18

# Step 2: Set the working directory
WORKDIR /

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .
# COPY .env .env

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose the application's port (replace 3000 if your app uses a different port)
EXPOSE 3000

# Step 8: Define the command to run the application
CMD ["npm", "run", "start:prod"]
