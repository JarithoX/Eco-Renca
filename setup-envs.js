const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src', 'environments');
const envPath = path.join(envDir, 'environment.ts');
const envProdPath = path.join(envDir, 'environment.prod.ts');
const examplePath = path.join(envDir, 'environment.example.ts');

// Asegurar que exista la carpeta src/environments
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Leer API Key desde las variables de entorno del servidor (ej. Vercel)
const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';

// Si no existe environment.ts localmente, generarlo a partir de la plantilla
if (!fs.existsSync(envPath)) {
  console.log('environment.ts no encontrado. Generando desde la plantilla...');
  if (fs.existsSync(examplePath)) {
    let content = fs.readFileSync(examplePath, 'utf8');
    content = content.replace('TU_API_KEY_DE_GOOGLE_MAPS_AQUI', apiKey);
    fs.writeFileSync(envPath, content);
  } else {
    // Si no está el ejemplo, crear un archivo por defecto
    const defaultContent = `export const environment = {
  production: false,
  googleMapsApiKey: '${apiKey}'
};
`;
    fs.writeFileSync(envPath, defaultContent);
  }
} else {
  console.log('environment.ts ya existe. Omitiendo generación.');
}

// Si no existe environment.prod.ts (necesario para la compilación en Vercel), crearlo
if (!fs.existsSync(envProdPath)) {
  console.log('environment.prod.ts no encontrado. Generando para Vercel...');
  const prodContent = `export const environment = {
  production: true,
  googleMapsApiKey: '${apiKey}'
};
`;
  fs.writeFileSync(envProdPath, prodContent);
} else {
  console.log('environment.prod.ts ya existe. Omitiendo generación.');
}

console.log('Configuración de entornos finalizada exitosamente.');
