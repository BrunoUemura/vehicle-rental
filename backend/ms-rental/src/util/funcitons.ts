import moment from 'moment';

export function calculateEstimatedKM(startDate: Date, endDate: Date): number {
  const dateOne = moment(startDate);
  const dateTwo = moment(endDate);
  const diff = dateTwo.diff(dateOne, 'days');
  return diff * Number(process.env.KM_CONSTANT);
}

export function calculateAmount(km: number): number {
  return km * Number(process.env.AMOUNT_CONSTANT);
}
