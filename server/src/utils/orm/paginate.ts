import { IPage } from "src/types/responses/RegularPaginatedResponse";
import {
  BaseEntity,
  FindManyOptions,
  getRepository,
  ObjectType,
} from "typeorm";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type FindManyNoTake<T> = Omit<FindManyOptions<T>, "take">;

export const paginate = async <T extends BaseEntity>(
  entityType: ObjectType<T>,
  limit: number,
  options: FindManyNoTake<T>
): Promise<IPage<T>> => {
  const MAX_LIMIT = 30;
  const requestLimit = Math.min(MAX_LIMIT, limit);
  const fetchLimit = requestLimit + 1;

  const repository = getRepository(entityType);
  const items = await repository.find({
    ...options,
    take: fetchLimit,
  });

  return {
    hasMore: items.length == fetchLimit,
    items: items.slice(0, requestLimit),
  };
};
