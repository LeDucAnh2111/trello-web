export const formatDate = (timestamp) => {
  // Tạo đối tượng Date từ timestamp
  const date = new Date(timestamp);

  // Lấy ngày, tháng, năm
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Định dạng ngày theo kiểu dd-MM-yyyy
  return `${day}-${month}-${year}`;
};
