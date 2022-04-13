import { Vehicle } from '@prisma/client';

export default interface RequestResponse {
  status: number;
  body: Vehicle[];
}
