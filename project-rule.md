## excercise 1
1. Chỉ viết component dạng hàm (function), không viết class.
2. Giá trị mặc định đặt ngay trong dấu ngoặc của hàm, không dùng defaultProps.
3. Không dùng thẻ <div> ở bất kỳ đâu. Thay bằng các thẻ có ý nghĩa như <article>, <header>, <hgroup>, <dl>, <dt>, <dd>, <ul>, <li>, <span>.
4. Không viết style trực tiếp trong thẻ (không dùng style={{...}}). Mọi giao diện nằm trong file CSS Module.
5. Khi lặp danh sách, dùng id làm key, không dùng số thứ tự.
6. Link ảnh chỉ dùng https, không dùng http.
7. Không dùng thư viện ngoài.

## excercise 2
1. Chỉ viết component dạng hàm (function), không viết class.
2. Giá trị mặc định đặt ngay trong dấu ngoặc của hàm, không dùng defaultProps.
3. Không dùng useEffect cho việc tìm kiếm, lọc, sắp xếp. Danh sách hiển thị phải được tính ngay trong lúc render.
4. Không tạo state riêng cho danh sách đã lọc (không có state "filtered"). Chỉ lưu 4 state gốc: people, query, minIq, sortBy.
5. Khi sắp xếp dùng toSorted, không dùng sort vì sort làm thay đổi mảng gốc.
6. Mọi cập nhật danh sách phải tạo mảng mới (filter, map, dấu ba chấm), không dùng push, splice hay sửa trực tiếp.
7. Khi lặp danh sách, dùng id làm key, không dùng số thứ tự. Mỗi người trong SMART_PEOPLE phải có id riêng (dạng 'sp-1', 'sp-2'...).
8. Mỗi ô nhập (input, select) phải có <label> đi kèm, nối bằng useId và htmlFor. Không để ô nhập "mồ côi".
9. Ô nhập số IQ tối thiểu đọc bằng valueAsNumber (không dùng value vì nó là chữ). Nếu ô trống hoặc không hợp lệ thì coi như 0.
10. Tìm kiếm theo tên không phân biệt hoa/thường và bỏ khoảng trắng thừa ở đầu và cuối.
11. Các ô nhập đặt trong thẻ <form role='search'>, chặn form tự tải lại trang khi nhấn Enter.
12. Số kết quả hiển thị trong thẻ <output role='status' aria-live='polite'> để trình đọc màn hình tự thông báo.
13. Mọi nút bấm đều có type='button'.
14. Dùng thẻ có ý nghĩa như <section>, <form>, <output>, <ul>, <li>. Không dùng <div> nếu không cần thiết.
15. Không viết style trực tiếp trong thẻ (không dùng style={{...}}). Nếu cần giao diện thì dùng file CSS Module.
16. Không dùng window.alert và không dùng keyCode.
17. Không dùng thư viện ngoài.