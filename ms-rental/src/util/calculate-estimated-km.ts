import moment from 'moment';

export default function calculateEstimatedKM(
  startDate: Date,
  endDate: Date,
): number {
  const dateOne = moment(startDate);
  const dateTwo = moment(endDate);
  const diff = dateTwo.diff(dateOne, 'days');
  return diff * Number(process.env.KM_CONSTANT);
}
