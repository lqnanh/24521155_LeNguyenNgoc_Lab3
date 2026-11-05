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

## exercise 3
1. Chỉ viết component dạng hàm (function), không viết class.
2. Giá trị mặc định đặt ngay trong dấu ngoặc của hàm (ví dụ squadId = 'te'), không dùng defaultProps.
3. Chỉ dùng MỘT state tên view dạng { status, data, error }. status chỉ có 4 giá trị: IDLE, LOADING, SUCCESS, ERROR. Không dùng nhiều biến true/false như isLoading, isError.
4. Mỗi useEffect gọi dữ liệu phải tạo AbortController mới, truyền signal vào hàm fetch, và gọi controller.abort() trong phần dọn dẹp (return của effect).
5. Nếu lỗi có name là 'AbortError' thì bỏ qua, không chuyển sang ERROR.
6. Hàm giả lập fetch phải lắng nghe signal: bị hủy thì dừng bộ đếm giờ ngay và báo lỗi AbortError.
7. Không dùng alert(). Lỗi hiện bằng <section role="alert"> kèm nút "Reconnect Satellite".
8. Khi LOADING, hiện skeleton là <section aria-busy="true"> cao đúng 220px. Card kết quả cao tối thiểu 220px để giao diện không bị giật.
9. Nút thử lại dùng state retryTick (tăng 1 mỗi lần bấm) và đưa vào danh sách phụ thuộc của useEffect. Không gọi fetch thủ công.
10. Mọi nút phải có type="button". Nút chọn đội dùng aria-pressed.
11. Không dùng thẻ <div> ở bất kỳ đâu. Thay bằng <section>, <article>, <header>, <dl>, <dt>, <dd>, <ul>, <li>, <span>.
12. Hiển thị thông tin đội bằng <dl>/<dt>/<dd>, lặp bằng Object.entries kèm Fragment có key.
13. Khi lặp danh sách, dùng id làm key, không dùng số thứ tự.
14. Không viết style trực tiếp trong thẻ (không dùng style={{...}}). Mọi giao diện nằm trong file CSS Module.
15. Giao diện chạy tốt ở 375px: không cuộn ngang, nút cao tối thiểu 44px, có viền khi focus bằng bàn phím.
16. Không dùng thư viện ngoài.

## homework 1
1. Chỉ viết component dạng hàm (function), không viết class.
2. Giá trị mặc định đặt ngay trong dấu ngoặc của hàm (ví dụ isEnabled = true), không dùng defaultProps.
3. App khởi chạy bằng createRoot và bọc trong StrictMode.
4. Nhận diện phím bằng e.code (vị trí phím, ví dụ 'KeyW', 'KeyA'), không dùng keyCode, which hay sự kiện keypress. Phím tắt trong pads.js lưu theo dạng 'KeyW'.
5. Nếu e.repeat là true (người dùng đang giữ phím) thì bỏ qua, mỗi lần nhấn chỉ đánh trống một lần.
6. Khi người dùng đang gõ trong INPUT, TEXTAREA hoặc SELECT thì bỏ qua phím tắt.
7. Lắng nghe phím trên window bên trong useEffect, và phải gỡ listener trong phần dọn dẹp (return của effect). Danh sách phụ thuộc phải ghi đủ mọi giá trị dùng bên trong, không để [] cho xong.
8. Danh sách 7 pad là dữ liệu cố định, đặt ngoài component. Bảng tra phím → pad dùng Map.
9. Mỗi pad là một <button type="button">, ghi rõ tên âm và phím tắt, có aria-pressed đúng với trạng thái đang được đánh.
10. Đánh bằng chuột hay bằng bàn phím đều đi qua cùng một hàm, kết quả giống hệt nhau.
11. Lịch sử nhịp hiện trong <output aria-live="polite">, chỉ giữ 8 nhịp gần nhất. Cập nhật bằng cách tạo mảng mới (spread, slice), không dùng push.
12. Có thanh âm lượng nhảy theo nhịp để người không nghe được vẫn nhìn thấy. Không để thông tin chỉ truyền qua âm thanh.
13. Mọi bộ hẹn giờ (làm sáng pad, hạ thanh âm lượng) phải được hủy khi component tắt.
14. Mọi ô nhập phải có <label htmlFor> gắn với id tạo bằng useId(). Không dùng placeholder thay cho label.
15. Không dùng thẻ <div> ở bất kỳ đâu. Thay bằng <main>, <section>, <header>, <ul>, <li>, <output>, <span>.
16. Khi lặp danh sách, dùng id làm key, không dùng số thứ tự.
17. Không dùng alert(). Không viết style trực tiếp trong thẻ (không dùng style={{...}}). Mọi giao diện nằm trong file CSS Module, màu sắc khai báo bằng biến CSS.
18. Giao diện chạy tốt ở 375px: không cuộn ngang, nút cao tối thiểu 44px, chữ đủ tương phản với nền tối.
19. Không được xoá viền focus (outline). Nút đang được chọn bằng phím Tab phải nhìn thấy rõ.
20. File âm thanh đặt trong public/sounds và gọi bằng đường dẫn nội bộ, không dùng link http://.
21. Không dùng thư viện ngoài.