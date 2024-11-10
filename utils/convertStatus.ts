export const convertStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case "pending":
      return "Đang xử lí";
    case "deny":
      return "Bị từ chối";
    case "inactive":
      return "Được chấp nhận";
    default:
      return "Trạng thái không xác định";
  }
};
