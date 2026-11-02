## excercise 2
- Lỗi:** AI khai báo `visible` nhưng dòng "Found X pioneers" vẫn dùng `people.length`, nên khi thêm bộ lọc thì số đếm sẽ lệch với danh sách đang hiển thị. Thẻ `<section>` không có `aria-label` nên trình đọc màn hình không nhận là landmark. Giao diện bỏ sót `age` dù dữ liệu có sẵn, và nút Delete dính liền chữ vì thiếu khoảng trắng

## excercise 3
1. Skeleton khó thấy trên nền tối

Lỗi: hiệu ứng chỉ đổi độ mờ, màu 
#1a1f2b hòa vào nền 
#0b0f17 nên không thấy nhấp nháy.
Cách sửa: đổi sang màu sáng hơn (
#2b3850) và nhấp nháy bằng background-color giữa hai sắc xanh xám.

2. Dùng :global trong CSS Module

Lỗi: PubgMatchTelemetry.module.css chứa kiểu của html, body, button, main, trái luật “mỗi component giữ kiểu của mình”.
Cách sửa: tách phần nền chung sang index.css, kiểu nút chọn đội sang TelemetryPanel.module.css, và xóa toàn bộ :global.

3. Khung lỗi thấp hơn skeleton

Lỗi: khung lỗi không có chiều cao tối thiểu nên layout nhảy khi chuyển từ skeleton sang lỗi.
Cách sửa: thêm class .alert với min-height: 220px, căn giữa nội dung.

4. error lưu cả object Error

Lỗi: state view.error lưu nguyên đối tượng Error, lệch với spec (chuỗi).
Cách sửa: đổi thành error: error.message và hiển thị {view.error}.

5. AI gửi file CSS thiếu class khi “gộp”

Lỗi: file CSS gộp bị mất .infoList, .term, .value (và trước đó mất .skeleton, .card), giao diện hỏng mà React không báo lỗi.
Cách sửa: so sánh file mới với file cũ trước khi chép, thêm lại các class thiếu.