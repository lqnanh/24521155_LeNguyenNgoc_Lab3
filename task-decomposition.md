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

# TASK_DECOMPOSITION.md - Lab 3, Exercise 3

- [ ] T-00: Tạo project Vite + React 19, tạo project-rules.md
- [ ] T-01: Viết src/data/squads.js (3 đội CES, TE, GE)
- [ ] T-02: Viết src/api/fetchTelemetry.js (chờ 1,2s, lỗi 35%, hỗ trợ hủy bằng signal)
- [ ] T-04: Viết PubgMatchTelemetry.jsx với 1 state view và 4 trạng thái IDLE/LOADING/SUCCESS/ERROR
- [ ] T-06: Thêm AbortController + cleanup + bỏ qua AbortError
- [ ] T-07: Kiểm tra: bấm nhanh đổi đội, Network thấy (canceled), UI không nháy lỗi
- [ ] T-09: Viết PubgMatchTelemetry.module.css, skeleton cao 220px, aria-busy
- [ ] T-11: Thêm khung lỗi role="alert" + nút Reconnect Satellite (retryTick), không dùng alert()
- [ ] T-13: Viết TelemetryPanel.jsx (3 nút chọn đội, aria-pressed) và gắn vào App.jsx
- [ ] T-15: Hiển thị thông tin đội bằng <article> + <dl>/<dt>/<dd>, Fragment có key
- [ ] T-17: Chỉnh CSS 375px: không cuộn ngang, nút cao tối thiểu 44px, có viền focus
- [ ] T-18: Kiểm tra bằng grep (không còn div, alert, defaultProps) và Slow 3G (skeleton không giật)
- [ ] T-20: Ghi lại lỗi AI đã mắc vào AI_FAILURE_AUDIT.md (nếu có)
- [ ] T-21: git push lên GitHub

# TASK_DECOMPOSITION.md - Lab 3, Homework 1 (Studio Drum Kit)

- [ ] T-00: Tạo thư mục src/homeworks/DrumMachine/, chép 7 file âm thanh vào public/sounds/, bổ sung quy tắc HW1 vào project-rules.md
- [ ] T-01: Viết pads.js (7 miếng trống: mã, tên âm, phím tắt, file âm thanh)
- [ ] T-02: Viết DrumMachine.jsx hiển thị lưới 7 nút (button type="button", không dùng div)
- [ ] T-03: Viết DrumMachine.module.css (nền tối, dùng biến CSS, ở 375px các nút tự xuống hàng)
- [ ] T-05: Phát âm thanh khi bấm chuột vào miếng trống
- [ ] T-06: Viết hook useDrumKeyboard.js (bấm phím tắt thì đánh trống, có gỡ sự kiện khi tắt component)
- [ ] T-08: Thêm hiệu ứng sáng 150ms khi đánh và aria-pressed cho mỗi nút
- [ ] T-10: Thêm ô nhập "Tên bản thu" có nhãn (label) đi kèm
- [ ] T-11: Thêm lịch sử 8 nhịp gần nhất bằng <output aria-live="polite">
- [ ] T-12: Thêm thanh âm lượng nhảy lên theo nhịp rồi hạ dần
- [ ] T-14: Test bàn phím: bật UniKey và Caps Lock, giữ chặt một phím, gõ chữ trong ô "Tên bản thu", bấm thật nhanh một miếng trống
- [ ] T-16: Dùng phím Tab đi qua các nút: viền focus nhìn rõ, chữ đủ tương phản với nền
- [ ] T-17: Kiểm tra giao diện ở 375px (iPhone SE), không có thanh cuộn ngang
- [ ] T-18: Chạy Lighthouse đạt 100 điểm Accessibility, Console không có cảnh báo
- [ ] T-20: Viết AI_FAILURE_AUDIT.md 
- [ ] T-22: git push lên GitHub

# Homework 2

- [ ] T-00: Tạo thư mục src/homeworks/GrandPiano88/ và src/audio/, cập nhật project-rules.md với rule của HW2, commit "chore(hw2): init structure & rules"
- [ ] T-01: Viết hợp đồng (JSDoc) cho props của PianoKey, GrandPiano88 và API của PolyphonicSynth (noteOn, noteOff, releaseAll, dispose) trước khi viết code
- [ ] T-02: Viết keys.js: sinh 88 phím từ MIDI 21 đến 108 (midi, noteName, isBlack, freqHz)
- [ ] T-03: Kiểm tra bằng console.assert: đúng 88 phím, 52 trắng, 36 đen, A0 = 27.5 Hz, A4 = 440 Hz, C8 ≈ 4186 Hz
- [ ] T-05: Viết PolyphonicSynth.js: constructor, tạo AudioContext lười, noteOn (có chặn nốt trùng)
- [ ] T-06: Thêm noteOff với envelope giảm mượt 40ms (exponentialRampToValueAtTime) và ngắt kết nối node khi kết thúc
- [ ] T-07: Thêm FIFO voice stealing khi đủ 8 voice (lấy khóa đầu tiên của Map), thêm releaseAll() và dispose()
- [ ] T-08: Kiểm tra thủ công trong Console: giữ 9 nốt, nốt cũ nhất bị cướp, voices.size luôn ≤ 8, không có tiếng pop
- [ ] T-10: Viết PianoKey.jsx bọc React.memo (button, aria-pressed, aria-label, type="button", sự kiện pointer)
- [ ] T-11: Viết GrandPiano88.jsx: state các phím đang bấm (cập nhật bất biến), useCallback cho onNoteOn/onNoteOff, tính isPressed riêng cho từng phím
- [ ] T-12: Viết useEffect khởi tạo synth và dọn dẹp (dispose, abort) khi unmount
- [ ] T-13: Gắn GrandPiano88 vào App.jsx, chạy thử bấm phím có tiếng
- [ ] T-14: Mở React DevTools Profiler, bấm 1 phím, xác nhận chỉ 1 PianoKey render, chụp ảnh bằng chứng
- [ ] T-16: Thêm ghi âm: lưu { midi, freqHz, durationMs, deltaMs } vào hàng đợi FIFO bằng performance.now(), chỉ ghi khi ở chế độ Record
- [ ] T-17: Viết hàm sleep có hỗ trợ AbortSignal và hàm phát lại async duyệt hàng đợi theo thứ tự
- [ ] T-18: Thêm bộ chọn tốc độ 0.5x / 1.0x / 2.0x (chia deltaMs và durationMs cho speed)
- [ ] T-19: Thêm nút Record, Play, Stop Sequence: AbortController đặt trong useRef, bỏ qua AbortError, finally gọi releaseAll()
- [ ] T-20: Kiểm tra: Stop giữa chừng thì im tiếng ngay, unmount thì không còn timer hay nốt nào chạy tiếp, thời gian phát lại đúng ở 3 tốc độ
- [ ] T-22: Thêm <output aria-live="polite"> hiển thị trạng thái (số voice, đang ghi/phát) và <section role="alert"> cho lỗi, bỏ hoàn toàn alert()
- [ ] T-23: Viết GrandPiano88.module.css (biến CSS, phím trắng/đen, viền focus, nút cao tối thiểu 44px)
- [ ] T-24: Kiểm tra giao diện ở 375px, không có thanh cuộn ngang ở cấp trang
- [ ] T-26: Kiểm tra bằng grep: không còn <div, keyCode, alert(, defaultProps, style={{
- [ ] T-27: Chạy Lighthouse (Accessibility phải đạt 100), kiểm tra cây Accessibility trong DevTools
- [ ] T-28: Viết AI_FAILURE_AUDIT.md: ít nhất 3 lỗi AI (prompt, code AI, bằng chứng DevTools, commit sửa)
- [ ] T-30: Chụp đủ ảnh bằng chứng (Profiler, 52/36 phím, voice stealing, replay 3 tốc độ, Stop, Lighthouse, 375px, git log)
- [ ] T-31: git push lên GitHub

# Homework 3


- [ ] T-00: Tạo project Vite + React 19, viết project-rules.md và task-decomposition.md
- [ ] T-01: Làm khung trang trong src/homeworks/KraftonPubgVnArena/index.jsx (header, khu vé/thùng đồ, khu bảng xếp hạng), vừa 375px
- [ ] T-02: Viết src/data/pubgVnData.js (3 vé/thùng đồ có giá VND và số lượng, 4 đội TE, CES, Roy, AGG)
- [ ] T-03: Viết CrateCard.jsx và CrateDropList.jsx hiển thị dữ liệu tĩnh, giá định dạng bằng Intl vi-VN
- [ ] T-04: Viết SquadLeaderboard.jsx hiển thị bảng xếp hạng tĩnh (WWCD, điểm xếp hạng, điểm hạ gục), key theo squadId
- [ ] T-05: Viết LeaderboardControls.jsx (ô gõ tên đội, ô chọn kiểu sắp xếp), có label + useId()
- [ ] T-06: Viết AirdropPhaseBadge.jsx hiển thị 4 trạng thái WARMUP/AIRDROP_LIVE/LOOTED_OUT/EXPIRED, có aria-live
- [ ] T-07: Viết src/hooks/usePubgAirdropTimer.js (tính theo mốc giờ đích, cập nhật mỗi 200ms) và Countdown.jsx
- [ ] T-08: Thêm tính lại thời gian khi quay lại tab (visibilitychange), có dọn dẹp interval và listener
- [ ] T-09: Viết src/api/claimCrate.js (chờ 1s, đôi khi trả lỗi 409) và src/hooks/useCrateClaim.js (trừ số lượng ngay, khóa nút trong lúc chờ)
- [ ] T-10: Xử lý lỗi 409: trả số lượng về như cũ, hiện ClaimAlert.jsx với role="alert"
- [ ] T-11: Lọc và sắp xếp bảng xếp hạng ngay trong lúc render bằng filter + toSorted(), hiện số đội trong <output>
- [ ] T-12: Viết AI_FAILURE_AUDIT.md (ít nhất 3 lỗi AI, có prompt, code lỗi, bằng chứng DevTools, commit sửa)