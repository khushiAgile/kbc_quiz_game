export abstract class MockModel<T> {
  protected abstract entityStub: T;

  findOne(): T | null {
    return this.entityStub || null;
  }
  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async create(): Promise<T> {
    return this.entityStub;
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async update(): Promise<T> {
    return this.entityStub;
  }

  async delete(): Promise<T> {
    return this.entityStub;
  }

  findOneBy(): T | null {
    return this.entityStub || null;
  }

  // Additional functions for mocking query builder
  createQueryBuilder() {
    return this;
  }
  leftJoinAndSelect() {
    return this;
  }

  loadRelationCountAndMap() {
    return this;
  }
  getMany() {
    return [this.entityStub];
  }
  getCount() {
    return 0;
  }

  select() {
    return this;
  }
  where() {
    return this;
  }
  orWhere() {
    return this;
  }
  andWhere() {
    return this;
  }
  getOne() {
    return null;
  }
  orderBy() {
    return this;
  }
  addOrderBy() {
    return this;
  }
  take() {
    return this;
  }
  skip() {
    return this;
  }
  getManyAndCount() {
    // Example:
  }

  getRawMany() {
    return this;
  }

  moveFile() {
    return null;
  }

  sendMailCommFunc() {
    return null;
  }

  deleteFileGCStorage() {
    return null;
  }

  generateRandomNumber() {
    return Number;
  }

  having() {
    return this;
  }

  offset() {
    return this;
  }

  limit() {
    return this;
  }

  set() {
    return this;
  }

  distinct() {
    return this;
  }

  getRawOne() {
    return this;
  }

  groupBy() {
    return this;
  }

  returning() {
    return [];
  }

  updateEntity() {
    return this;
  }

  execute() {
    return this;
  }

  leftJoin() {
    return this;
  }

  localeCompare() {
    return this;
  }

  findTaskById() {
    return this;
  }

  findUserByID() {
    return this;
  }
}
