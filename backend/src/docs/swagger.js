const path = require('path');
const YAML = require('yamljs');

const openApiPath = path.resolve(__dirname, '..', '..', '..', 'openapi.yaml');

let swaggerDocument;

try {
  swaggerDocument = YAML.load(openApiPath);
} catch (error) {
  console.error(`Failed to load OpenAPI document from ${openApiPath}`, error);
  throw error;
}

const localPort = process.env.PORT || 8080;
const localServerUrl = `http://localhost:${localPort}/v1`;
const hasLocalServer = Array.isArray(swaggerDocument.servers)
  && swaggerDocument.servers.some((server) => server.url === localServerUrl);

if (!hasLocalServer) {
  swaggerDocument.servers = [
    ...(swaggerDocument.servers || []),
    { url: localServerUrl, description: 'Local development' },
  ];
}

const swaggerUiOptions = {
  customSiteTitle: 'Manage User TODOs API Docs',
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    displayRequestDuration: true,
  },
};

module.exports = {
  swaggerDocument,
  swaggerUiOptions,
};
