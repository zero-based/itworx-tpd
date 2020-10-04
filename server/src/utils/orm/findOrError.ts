import {
  BaseEntity,
  FindOneOptions,
  getRepository,
  ObjectID,
  ObjectType,
} from "typeorm";
import { FieldError } from "../../types/errors/FieldError";

/**
 * Validates that a `BaseEntity` exists,
 * returns [`BaseEntity`, `FieldError[]`].
 */
export const findOrError = async <T extends BaseEntity>(
  entityType: ObjectType<T>,
  fieldName: string,
  id?: string | number | Date | ObjectID,
  options?: FindOneOptions<T>
): Promise<[T | undefined, FieldError[] | undefined]> => {
  const repository = getRepository(entityType);
  const entity = id
    ? await repository.findOne(id)
    : await repository.findOne(options);

  return [
    entity,
    !entity
      ? [
          {
            field: fieldName,
            message: fieldName + " does not exist",
          }
        ]
      : undefined,
  ];
};
