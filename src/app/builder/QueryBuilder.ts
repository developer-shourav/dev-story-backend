import { FilterQuery, Query } from 'mongoose';

/* ------- Search, Filter, Sort, Pagination and Field Filtering Using *Query Chaining Method*---------- */

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // ------Method For Searching ------
  search(searchAbleFields: string[]) {
    const search = this.query?.search as string;
    if (search) {
      // Search Logic
      this.queryModel = this.queryModel.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // ------Method For Filtering ------
  filter() {
    const queryObject = { ...this.query };
    const excludedFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields'];
    excludedFields.forEach((field) => delete queryObject[field]);
    // Filter Logic
    this.queryModel = this.queryModel.find(queryObject as FilterQuery<T>);

    return this;
  }

  // ------Method For Sorting ------
  sort() {
    const sortBy =
      (this.query?.sortBy as string)?.split(',').join(' ') || '-createdAt';
    this.queryModel = this.queryModel.sort(sortBy);

    return this;
  }

  // TODO: Search sortOrder

  // ------Method For Pagination and Limit ------
  pagination() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    // Pagination Logic
    this.queryModel = this.queryModel.skip(skip);
    // Limit Logic
    this.queryModel = this.queryModel.limit(limit);

    return this;
  }

  // ------Method For Field Filtering ------
  fieldFiltering() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';
    // Field Filtering Logic
    this.queryModel = this.queryModel.select(fields);

    return this;
  }
}

export default QueryBuilder;
