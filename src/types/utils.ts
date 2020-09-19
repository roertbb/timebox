export type PaginationParams = { skip: number; take: number };

export enum ErrorCode {
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}
