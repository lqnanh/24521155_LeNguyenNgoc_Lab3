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

## homework 2 
1. Chỉ viết component dạng hàm (function), không viết class cho component. Không dùng ReactDOM.render, defaultProps, keyCode, alert().
2. Giá trị mặc định đặt ngay trong dấu ngoặc của hàm (ví dụ maxVoices = 8, speed = 1), không dùng defaultProps.
3. 88 phím phải được sinh bằng thuật toán từ MIDI 21 (A0) đến MIDI 108 (C8). Cấm viết tay 88 thẻ. Kết quả phải đúng 52 phím trắng và 36 phím đen.
4. Tần số tính bằng công thức f = 440 × 2^((midi − 69) / 12). Phím đen xác định bằng midi % 12 thuộc tập {1, 3, 6, 8, 10}. Không hard-code bảng tần số.
5. Danh sách 88 phím là hằng số ở cấp module, tạo một lần. Không tạo lại trong lúc render.
6. PianoKey là component riêng, mỗi phím là một <button> có aria-pressed và aria-label gồm tên nốt (ví dụ "C4").
7. State các phím đang bấm cập nhật bất biến: tạo Set mới bằng callback của setState. Không sửa trực tiếp Set cũ.
8. Không đồng bộ state dẫn xuất bằng useEffect. Giá trị suy ra được (số voice đang hoạt động, danh sách phím trắng/đen, thời lượng replay) tính trực tiếp khi render.
9. Engine âm thanh nằm riêng trong class PolyphonicSynth ở src/audio (đây là lớp JS thuần, không phải React component). Component chỉ gọi noteOn, noteOff, releaseAll.
10. Voice đang hoạt động lưu trong ES6 Map (midi → { osc, gain }) để giữ thứ tự chèn FIFO. Không dùng mảng kèm shift().
11. Tối đa 8 voice cùng lúc. Khi Map đạt 8, lấy khóa đầu tiên (nốt cũ nhất) và gọi noteOff cho nó trước khi tạo voice mới. Nếu nốt đã đang kêu thì bỏ qua, không tạo trùng.
12. AudioContext chỉ tạo lười (lazy) trong lần noteOn đầu tiên, sau tương tác của người dùng. Nếu trạng thái là suspended thì gọi resume().
13. Ghi âm: mỗi sự kiện lưu { midi, freqHz, durationMs, deltaMs } vào hàng đợi FIFO theo đúng thứ tự phát sinh. Thời gian đo bằng performance.now(), cấm Date.now().
14. Chỉ ghi khi đang ở chế độ Record. Không ghi khi đang Play.
15. Phát lại bất đồng bộ bằng async/await, duyệt hàng đợi theo thứ tự FIFO. Tốc độ phát lại thuộc {0.5, 1.0, 2.0}.
16. Không dùng alert(). Lỗi hiện bằng <section role="alert">. Trạng thái hiển thị (số voice, đang ghi/phát) dùng <output aria-live="polite">.
17. Mọi nút phải có type="button". Hỗ trợ bàn phím (Tab, Space, Enter) và có viền khi focus.
18. Các form control (bộ chọn tốc độ, nút điều khiển) dùng <label htmlFor> ghép với useId().
19. Tuyệt đối không dùng thẻ <div> ở bất kỳ đâu. Thay bằng <main>, <section>, <header>, <ul>, <li>, <fieldset>, <output>, <span>. Phím đen đặt chồng lên phím trắng bằng CSS, không thêm thẻ bọc.
20. Khi lặp danh sách phím hoặc sự kiện đã ghi, dùng midi hoặc id ổn định làm key, không dùng chỉ số mảng.
21. Không viết style trực tiếp trong thẻ (không dùng style={{...}}). Mọi giao diện nằm trong file CSS Module.
22. Giao diện chạy tốt ở 375px: không cuộn ngang ở cấp trang. Nếu bàn phím rộng hơn màn hình, đặt trong một vùng cuộn ngang có kiểm soát và có nhãn. Nút điều khiển cao tối thiểu 44px.
23. Điểm Lighthouse Accessibility phải đạt 100.
24. Mã nguồn đặt trong src/homeworks/GrandPiano88/ và src/audio/PolyphonicSynth.js. Không dùng thư viện ngoài.
25. Quy trình làm việc: Chia nhỏ việc trong TASK_DECOMPOSITION.md và viết hợp đồng props/JSDoc trước khi nhờ AI. Không dán nguyên đề vào AI trong một lần.

## homework3
1. Chỉ viết component dạng hàm (function), không viết class cho component. Không dùng ReactDOM.render, defaultProps, keyCode, window.alert(), dangerouslySetInnerHTML.
2. Giá trị mặc định đặt ngay trong phần khai báo tham số của hàm, ví dụ `function CrateCard({ priceVnd = 0 })`.
3. Không dùng thẻ `<div>` ở bất kỳ đâu trong HW3. Dùng `<main>`, `<section aria-label="...">`, `<article>`, `<header>`, `<ul>`/`<li>`, `<dl>`/`<dt>`/`<dd>`, `<output>`, và `<Fragment>` khi chỉ cần nhóm phần tử.
4. Đếm ngược airdrop tính bằng `Math.max(0, targetEpochMs - (Date.now() + serverOffsetMs))`. Không trừ dần từng giây. Cập nhật mỗi 200ms và tính lại ngay khi tab hiện lại (`visibilitychange`).
5. Giá tiền VND hiển thị bằng `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
6. Nhận vé là optimistic: giảm số lượng ngay trên giao diện. Khóa chống bấm trùng (claimId đang chờ) lưu bằng `useRef`, không dùng `useState`.
7. Khi máy chủ trả về 409, khôi phục số lượng cũ và chuyển trạng thái sang `LOOTED_OUT`. Khi yêu cầu bị hủy (AbortError), không hoàn lại và không báo lỗi.
8. Dữ liệu dẫn xuất (danh sách đã lọc, đã sắp xếp, số lượng tìm được) tính ngay khi render, không lưu vào state và không dùng `useEffect` để đồng bộ.
9. Sắp xếp dùng `.toSorted()`, không dùng `.sort()`, vì `.sort()` làm thay đổi mảng gốc.
10. Mọi `useEffect` tạo timer, sự kiện hoặc yêu cầu mạng đều có hàm cleanup: `clearInterval`, `removeEventListener`, `controller.abort()`.
11. Mọi yêu cầu mạng dùng `AbortController`, truyền `signal` vào `fetch`.
12. Key trong danh sách là id của từng mục. Không dùng index làm key.
13. Mọi ô nhập và ô chọn có `<label htmlFor={id}>`, id lấy từ `useId()`.
14. Số kết quả tìm được hiển thị trong `<output role="status" aria-live="polite">`.
15. Lỗi mạng hiển thị trong `<section role="alert">`, kèm nút `type="button"` để thử lại.
16. Mọi ảnh và đường dẫn dùng HTTPS, có `alt`, có `width` và `height` cố định.
17. Giao diện đúng ở 375px, không cuộn ngang. CSS dùng file `.module.css`. Màu khai báo trong `:root` dưới dạng biến CSS.
18. Danh sách ảo (virtual list) từ Lab 2 HW3 được giữ lại, key theo id ổn định.
19. Lịch sử Git có 6 đến 8 commit nguyên tử, tên theo mẫu `feat(hw3): ...`, `style(hw3): ...`, `fix(hw3): ...`. Không commit `node_modules`.
20. `AI_FAILURE_AUDIT.md` ghi ít nhất 3 lỗi AI, mỗi lỗi có prompt, đoạn code sai, bằng chứng từ DevTools và cách sửa.
21. Các luật chung của dự án vẫn áp dụng.
