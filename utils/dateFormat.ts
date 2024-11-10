import moment from "moment";

export const formatDateToDDMMYY = (date: Date | string): string => {
  return moment(date).format("DD-MM-YYYY");
};
