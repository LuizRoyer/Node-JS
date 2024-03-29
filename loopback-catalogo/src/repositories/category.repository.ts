import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TesteDataSource} from '../datasources';
import {Category, CategoryRelations} from '../models';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
  constructor(
    @inject('db') dataSource: TesteDataSource,
  ) {
    super(Category, dataSource);
  }
}
