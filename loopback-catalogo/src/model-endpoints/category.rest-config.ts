import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Category} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Category,
  pattern: 'CrudRest',
  dataSource: 'teste',
  basePath: '/categories',
};
module.exports = config;
