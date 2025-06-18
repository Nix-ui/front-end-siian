// generate-env.js
const fs = require('fs');
const path = require('path');

// Contenido del archivo environment.ts
// Usamos process.env para acceder a las variables de entorno de Vercel.
// VERCEL_ENV es una variable de Vercel que indica el entorno (production, preview, development).
const envFileContent = `
export const environment = {
  production: ${process.env.VERCEL_ENV === 'production' ? 'true' : 'false'},
  API_URL: '${process.env.API_URL}',
  USER_ENDPOINT: '${process.env.USER_ENDPOINT}',
  LOGIN_ENDPOINT: '${process.env.LOGIN_ENDPOINT}',
  TOKEN_KEY: '${process.env.TOKEN_KEY}',
  LOGOUT_ENDPOINT: '${process.env.LOGOUT_ENDPOINT}',
  DEPARTMENTS_ENDPOINT: '${process.env.DEPARTMENTS_ENDPOINT}',
  PROVINCES_ENDPOINT: '${process.env.PROVINCES_ENDPOINT}',
  ADMIN_PATH: '${process.env.ADMIN_PATH}',
};
`;

// Ruta donde se creará el archivo environment.ts
// Asumiendo que tu archivo está en src/environments/environment.ts
const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// Escribir el contenido en el archivo
fs.writeFileSync(envFilePath, envFileContent.trim());
console.log(`✅ Archivo de entorno generado: ${envFilePath}`);