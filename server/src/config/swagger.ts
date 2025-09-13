import { Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'));

const setupSwagger = (app: Express) => {
  app.get('/{api}', (req, res) => {
    res.redirect('/api-docs');
  });

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};

export default setupSwagger;
