# TASK_DECOMPOSITION.md - Lab 3, Exercise 1

- [ ] T-00: Tạo project Vite + React 19, tạo project-rules.md và TASK_DECOMPOSITION.md, commit "chore: init react19 vite & rules"
- [ ] T-01: Viết SkillBadge.jsx
- [ ] T-02: Viết DeveloperCard.jsx (chỉ phần cấu trúc, không dùng div)
- [ ] T-03: Gắn DeveloperCard vào App.jsx và chạy thử
- [ ] T-04: Thêm chữ cái đầu khi ảnh bị lỗi
- [ ] T-05: Kiểm tra bằng grep (không còn div, không còn http://)
- [ ] T-06: Commit 1 "feat(ex1): implement semantic DeveloperCard and SkillBadge"
- [ ] T-07: Viết DeveloperCard.module.css (dùng biến CSS)
- [ ] T-08: Kiểm tra giao diện ở 375px, không có thanh cuộn ngang
- [ ] T-09: Commit 2 "style(ex1): add responsive 375px CSS module"
- [ ] T-10: Kiểm tra cây Accessibility trong DevTools
- [ ] T-11: git push lên GitHub


# TASK_DECOMPOSITION.md - Lab 3, Exercise 2

## Giai đoạn A: Dữ liệu và khung component (Commit 1)

- [ ] T-12: Tạo file src/components/ScientistDirectory.jsx
- [ ] T-13: Khai báo mảng SMART_PEOPLE gồm 6 người, mỗi người có id, name, age, iq (id dạng 'sp-1', 'sp-2'...)
- [ ] T-14: Viết component ScientistDirectory nhận prop initialData (mặc định là SMART_PEOPLE)
- [ ] T-15: Tạm thời hiển thị tên + IQ trong thẻ ul, dùng id làm key (không dùng số thứ tự)
- [ ] T-16: Gắn ScientistDirectory vào App.jsx và chạy thử trên trình duyệt
- [ ] T-17: Kiểm tra bằng grep: không có useEffect, không có key={index}

- [ ] T-18: Khai báo 4 state gốc: people, query, minIq (mặc định 160), sortBy (mặc định 'iq-desc')
- [ ] T-19: Thêm ô tìm kiếm theo tên (không phân biệt hoa/thường, bỏ khoảng trắng thừa)
- [ ] T-20: Thêm ô nhập số "IQ tối thiểu", đọc bằng valueAsNumber, nếu ô trống thì coi như 0
- [ ] T-21: Thêm danh sách chọn "Sắp xếp theo" (IQ giảm dần / Tuổi tăng dần)
- [ ] T-22: Tính danh sách hiển thị (visible) ngay trong lúc render bằng filter + toSorted
- [ ] T-23: Gắn mỗi ô nhập với label bằng useId + htmlFor
- [ ] T-24: Đặt các ô nhập trong form role='search', chặn form tự tải lại khi nhấn Enter
- [ ] T-25: Kiểm tra bằng grep: vẫn không có useEffect, không có state "filtered"
- [ ] T-26: Chạy thử: gõ tên, đổi IQ, đổi kiểu sắp xếp, kiểm tra kết quả đúng

- [ ] T-27: Thêm nút "Delete" mỗi dòng, dùng filter để tạo danh sách mới
- [ ] T-28: Thêm nút "Reset" khôi phục lại initialData
- [ ] T-29: Thêm dòng "Found X pioneers" trong thẻ output role='status' aria-live='polite'
- [ ] T-30: Kiểm tra mọi nút đều có type='button'
- [ ] T-31: Chạy thử: xoá 1 người, kiểm tra các dòng còn lại không bị nhảy hay mất focus
- [ ] T-32: Chạy thử Reset sau khi xoá nhiều người, danh sách trở lại đủ 6 người

- [ ] T-33: Mở React DevTools Profiler, gõ 1 ký tự vào ô tìm kiếm, xác nhận chỉ có 1 lần render
- [ ] T-34: Kiểm tra cây Accessibility: mỗi ô nhập có tên (label) đúng
- [ ] T-35: Kiểm tra giao diện ở 375px, không có thanh cuộn ngang
- [ ] T-36: Kiểm tra Console không có cảnh báo (warning) hay lỗi
- [ ] T-37: Nếu AI lỡ sinh ra useEffect hoặc state "filtered", ghi lại vào AI_FAILURE_AUDIT.md kèm bằng chứng và cách sửa
- [ ] T-41: git push lên GitHub
