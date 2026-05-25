# 경진대회 제출 자료: "AI & 자동화를 통한 업무 개선"
# TÀI LIỆU DỰ THI: "CẢI TIẾN CÔNG VIỆC BẰNG AI & TỰ ĐỘNG HÓA"

## 프로젝트: 광학 설계 및 하드웨어 선정 디지털 어시스턴트 시스템 (VISION SYSTEM CALCULATOR & SIMULATOR)
## DỰ ÁN: HỆ THỐNG TRỢ LÝ SỐ THIẾT KẾ QUANG HỌC VÀ LỰA CHỌN PHẦN CỨNG (VISION SYSTEM CALCULATOR & SIMULATOR)

---

## 📄 제1부: 1페이지 요약 (1-PAGE SUMMARY)
## 📄 PHẦN 1: BẢN TẮT 1 TRANG (1-PAGE SUMMARY)

### 1. 프로젝트명 및 핵심 아이디어 / Tên Dự án & Ý tưởng Cốt lõi
*   **솔루션명 / Tên giải pháp:** **Vision System Calculator & Recommendation Assistant**
*   **목표 / Mục tiêu:** 머신 비전(Machine Vision) 산업용 이미지 처리 시스템 설계 시, 복잡한 광학 계산, 시뮬레이션 및 하드웨어(카메라, 렌즈, 조명) 선정 프로세스의 완전 자동화.
    *   *Tự động hóa hoàn toàn quy trình tính toán, giả lập quang học và lựa chọn thiết bị (Camera, Lenses, Lighting) trong thiết kế hệ thống xử lý ảnh công nghiệp (Machine Vision).*
*   **적용 기술 / Công nghệ ứng dụng:** 최적 하드웨어 자동 추천 알고리즘(Smart Matching Algorithm), 광학 연구실 환경을 모사한 디지털 이미지 처리 기술(Lighting & Mono Conversion Simulator).
    *   *Thuật toán đề xuất phần cứng tối ưu tự động (Smart Matching Algorithm), Kỹ thuật xử lý ảnh số giả lập môi trường phòng Lab quang học (Lighting & Mono Conversion Simulator).*

### 2. 기업의 문제점 (Pain Points) / Vấn đề của Doanh nghiệp (Pain Points)
*   **시간 낭비 / Tốn thời gian:** 엔지니어가 제조사(HIKrobot, Basler, Cognex 등)의 수백 개 기술 문서(Datasheet)를 일일이 찾아 적합한 카메라와 렌즈를 조합해야 함. 구성당 **4~8시간 소요**.
    *   *Kỹ sư phải tra cứu thủ công hàng trăm tài liệu kỹ thuật (datasheet) của các hãng (HIKrobot, Basler, Cognex) để tìm camera và ống kính phù hợp. Mỗi cấu hình mất từ **4 - 8 giờ làm việc**.*
*   **광학 오류 리스크 / Rủi ro sai sót quang học:** 장비 간 오조합 리스크 존재 (예: 고해상도 12MP~25MP 카메라에 낮은 화소 6MP 이하 렌즈 조합, 혹은 센서 크기가 렌즈 유효 영역보다 큰 경우 등). 이는 **실제 설치 단계에서 광학 오차 유발 (전체 프로젝트의 12% 차지)**.
    *   *Dễ ghép sai thiết bị (ví dụ: Camera độ phân giải cao 12MP-25MP đi với ống kính chất lượng thấp 6MP, hoặc kích thước cảm biến camera lớn hơn vùng khả dụng của ống kính), dẫn đến **sai lệch quang học khi lắp đặt thực tế (chiếm 12% dự án)***.
*   **실제 테스트 비용 / Chi phí thử nghiệm thực tế:** 다양한 조명 방향(Coaxial, Darkfield, Backlight) 및 흑백 모드(Monochrome)의 매칭 확인을 위해 직접 광학 Lab실에서 샘플을 두고 수작업 테스트를 거쳐야 하므로, 고가의 테스트 장비 구매 비용이 발생하고 프로젝트 검증 기간이 **3~7일**로 연장됨.
    *   *Việc giả lập ánh sáng (Coaxial, Darkfield, Backlight) và chế độ đơn sắc (Monochrome) phải thực hiện thủ công trong phòng Lab, tốn chi phí mua thiết bị thử nghiệm và kéo dài thời gian kiểm thử dự án từ **3 - 7 ngày**.*

### 3. 혁신적인 해결책 및 특징 / Giải pháp & Tính năng Đột phá
*   **5초 이내 하드웨어 자동 추천 / Đề xuất phần cứng tự động trong 5 giây:** FOV(시야각), WD(작동 거리), Accuracy(요구 정밀도)의 3가지 변수만 입력하면 시스템이 초점 거리(Focal Length) 자동 계산 및 적합한 광학 해상도 매칭 필터링을 수행하여 **최적의 카메라 & 렌즈 TOP 2 구성을 일치도 점수(Match Score)와 함께 실시간 추천**.
    *   *Nhập 3 thông số đầu vào (FOV, Khoảng cách làm việc WD, Độ chính xác Accuracy). Hệ thống tự động tính tiêu cự, lọc độ phân giải quang học phù hợp và đưa ra **Top 2 cấu hình Camera & Lens tối ưu nhất kèm điểm tương thích (Match Score)**.*
*   **스마트 호환성 등급 매칭 / Phân bậc tương thích thông minh:** 카메라 해상도(≤5MP, 12MP, ≥25MP, 65MP)에 따른 렌즈 필터링 및 이미지 센서 크기 자동 검증을 통해 **부품 오조합 리스크 100% 제거**.
    *   *Hệ thống phân loại ống kính tự động (≤5MP, 12MP, ≥25MP, 65MP) và đối chiếu chính xác kích thước cảm biến vật lý giúp **loại bỏ 100% rủi ro ghép sai linh kiện**.*
*   **가상 광학 연구실 (Vision Lab Simulator) / Phòng Lab quang học ảo (Vision Lab Simulator):** 웹 브라우저 상에서 샘플 이미지의 조명 방향(Dome, Ring, Darkfield) 및 흑백 색상 필터(RGB, HSI, 강도) 변환 시뮬레이션을 즉시 수행하여 오프라인 1차 Lab 테스트 단계 완전 대체.
    *   *Giả lập tức thì các hướng chiếu sáng và bộ lọc đơn sắc (RGB, HSI, Intensity) trên ảnh mẫu ngay trên Web, thay thế cho bước thử nghiệm Lab sơ bộ.*
*   **스마트 관리자 패널 (Admin Panel) / Quản trị thông minh (Admin Panel):** 관리자(Admin) 권한을 통해 신규 장비 추가/삭제뿐만 아니라 사양 정보 직접 수정 지원 및 단 1번의 클릭으로 시스템 데이터베이스(JSON) 백업/복원 기능 제공.
    *   *Cấp quyền Admin để cập nhật nhanh, nhập/xuất cơ sở dữ liệu hệ thống (JSON) chỉ với 1 click.*

### 4. 정량적 성과 및 비즈니스 가치 / Kết quả Đo lường & Giá trị Doanh nghiệp
*   **설계 시간 단축 / Thời gian thiết kế cấu hình:** 기존 **6시간**에서 **5분 미만**으로 감소 (**98.6% 업무 효율성 증가**).
    *   *Giảm từ **6 giờ** xuống còn **dưới 5 phút** (Hiệu suất tăng **98.6%**).*
*   **하드웨어 발주 오류율 / Tỷ lệ sai sót đặt hàng phần cứng:** 기존 **12%**에서 **0%**로 감소.
    *   *Giảm từ **12%** về **0%**.*
*   **사전 테스트 비용 절감 / Chi phí thử nghiệm sơ bộ:** 타당성 검토(Feasibility study) 단계에서 발생하던 **오프라인 물리적 Lab 구축 비용 100% 절감**.
    *   *Tiết kiệm **100% chi phí phòng Lab vật lý** trong giai đoạn tiền khả thi (Feasibility study).*

---

## 📊 제2부: 직관적 측정 데이터 (BEFORE / AFTER MEASUREMENT DATA)
## 📊 PHẦN 2: DỮ LIỆU ĐO LƯỜNG TRỰC QUAN (BEFORE / AFTER MEASUREMENT DATA)

**Vision System App** 도입 전후의 상세 성능 비교 데이터입니다.
*Dưới đây là bảng so sánh chi tiết hiệu quả công việc trước và sau khi áp dụng ứng dụng **Vision System App**:*

| 측정 지표 (KPIs) / Chỉ số Đo lường | 도입 전 (Before) / Trước khi áp dụng | 도입 후 (After) / Sau khi áp dụng | 개선율 및 비즈니스 효과 / Tỷ lệ Cải tiến & Hiệu quả |
| :--- | :--- | :--- | :--- |
| **광학 구성 계산 및 자재 검색 시간**<br>*(Thời gian tính toán & tra cứu cấu hình)* | **프로젝트당 240 ~ 480분**<br>*(도면 검토, 제조사별 Datasheet 수작업 대조, 엑셀 계산)*<br><br>**240 - 480 phút / dự án**<br>*(Tra cứu datasheet các hãng, tính toán Excel thủ công)* | **프로젝트당 1분 미만**<br>*(3개 필수 파라미터 입력 즉시 자동 추천)*<br><br>**< 1 phút / dự án**<br>*(Nhập 3 thông số đầu vào, tự động đề xuất tức thì)* | **업무 속도 300배 향상**<br>*(시간 **99.6%** 감소)*<br><br>**Tăng tốc độ gấp 300 lần**<br>*(Giảm **99.6%** thời gian thực hiện)* |
| **광학 부품 오발주율**<br>*(Tỷ lệ đặt sai thiết bị quang học)* | **12% ~ 15%**<br>*(카메라 센서 크기 초과, 메가픽셀 불일치 조합 오차)*<br><br>**12% - 15%**<br>*(Lỗi ghép cảm biến camera quá cỡ, lệch độ phân giải Megapixel)* | **0%**<br>*(시스템 사전 호환성 잠금 알고리즘 작동)*<br><br>**0%**<br>*(Hệ thống tự động lọc và khóa linh kiện không tương thích)* | **오류 완벽 차단 (100% 제거)**<br>*(오발주 비용 연간 수천 달러 절감)*<br><br>**Triệt tiêu hoàn toàn sai sót (100%)**<br>*(Tiết kiệm hàng ngàn USD chi phí đặt sai linh kiện hàng năm)* |
| **조명 시뮬레이션 및 필터 테스트 시간**<br>*(Thời gian thử nghiệm ánh sáng & lọc màu)* | **3 ~ 5일**<br>*(실제 랩실 세팅, 워킹 디스턴스 조절, 오프라인 검증)*<br><br>**3 - 5 ngày**<br>*(Cài đặt phòng Lab vật lý, điều chỉnh khoảng cách WD, kiểm tra thủ công)* | **5초**<br>*(고객 샘플 이미지를 웹에 업로드해 소프트웨어 가상 변환)*<br><br>**5 giây**<br>*(Tải ảnh thực tế lên Web để giả lập ánh sáng ảo tức thì)* | **사전 검증 시간 99.9% 단축**<br>*(초기 레이아웃 기획 시간 단축)*<br><br>**Giảm 99.9% thời gian kiểm chứng sơ bộ**<br>*(Rút ngắn thời gian lập phương án ban đầu)* |
| **기술 부서 프로젝트 처리 능력**<br>*(Năng lực xử lý dự án của phòng Kỹ thuật)* | **엔지니어 1인당 주 2 ~ 3건 제한**<br><br>**Tối đa 2 - 3 dự án / kỹ sư / tuần** | **무제한**<br>*(비기술직인 기술 영업사원(Sales)도 자체 견적 구성 가능)*<br><br>**Không giới hạn**<br>*(Kỹ sư kinh doanh - Sales Engineer cũng tự lên cấu hình được)* | **영업 경쟁력 비약적 향상**<br>*(현장에서 고객 요구에 실시간 대응)*<br><br>**Nâng cao vượt trội năng lực kinh doanh**<br>*(Đáp ứng yêu cầu khách hàng trực tiếp tại cuộc họp)* |
| **고객 경험 (Customer Experience)**<br>*(Trải nghiệm khách hàng)* | **카메라 광학 제안서 수령까지 1 ~ 2일 대기**<br><br>**Khách hàng phải chờ 1 - 2 ngày** để nhận đề xuất cấu hình camera | **첫 미팅 현장에서 정확한 사양과 시뮬레이션 확인 제안**<br><br>**Nhận đề xuất tối ưu và giả lập trực quan** ngay trong cuộc họp đầu tiên | **최상의 전문성 포지셔닝**<br>*(프로젝트 수주율 극대화)*<br><br>**Khẳng định sự chuyên nghiệp tuyệt đối**<br>*(Nâng cao tối đa tỷ lệ chốt dự án)* |

---

## 🎬 PHẦN 3: KỊCH BẢN VIDEO DEMO CHI TIẾT (DEMO VIDEO SCRIPT)
*   **Thời lượng tối ưu:** 2 - 3 phút
*   **Mục tiêu:** Trình diễn trực quan tính năng, giao diện premium và tốc độ xử lý vượt trội của hệ thống.

### Phân cảnh 1: Đặt vấn đề & Khởi động (0:00 - 0:30)
*   **Hình ảnh:** Màn hình quay kỹ sư đang ngập trong đống datasheet camera PDF hoặc bảng tính Excel phức tạp.
*   **Lời thoại (Voiceover):** *"Trong thiết kế hệ thống Machine Vision, việc chọn đúng camera và ống kính luôn là một thách thức lớn. Kỹ sư phải tốn hàng giờ tra cứu hàng trăm dòng camera HIK, Basler, ống kính FA/Telecentric và tự tính toán FOV trên Excel. Một sai sót nhỏ về kích thước cảm biến hoặc độ tương thích Megapixel sẽ làm hỏng cả hệ thống khi lắp đặt. Nhưng nay, mọi thứ đã thay đổi với **Vision System Recommendation Assistant**."*

### Phân cảnh 2: Trình diễn tính năng Đề xuất tự động (0:30 - 1:15)
*   **Hình ảnh:** Quay màn hình giao diện ứng dụng với thiết kế tối (Dark Mode) cực kỳ hiện đại. 
    *   Thao tác nhập thông số vào phần **"Hardware Recommendation Algorithm"**:
        *   Nhập FOV Width: `100 mm`
        *   Nhập Working Distance: `300 mm`
        *   Nhập Độ chính xác mong muốn: `0.05 mm`
    *   Nhấn nút **"Find Optimal Hardware"**.
    *   Màn hình hiển thị ngay lập tức **Top 2 cấu hình tối ưu** (Option 1, Option 2) kèm thông số chi tiết của Camera, Ống kính tương thích, tiêu cự thực tế, độ chính xác thực tế, và Điểm khớp (Match Score) phần trăm.
*   **Lời thoại (Voiceover):** *"Chỉ với 3 thông số đầu vào cơ bản: FOV, khoảng cách làm việc và độ chính xác yêu cầu, trợ lý số của chúng tôi sẽ duyệt qua hàng trăm thiết bị trong tích tắc. Hệ thống tự động ghép đôi thiết bị theo các tiêu chuẩn quang học nghiêm ngặt nhất, đề xuất ngay lập tức 2 phương án tốt nhất kèm điểm số tương thích."*

### Phân cảnh 3: Khám phá Thư viện & Quyền quản trị (1:15 - 1:45)
*   **Hình ảnh:** 
    *   Xem danh sách Camera và Ống kính FA mới được cập nhật (bao gồm các dòng camera độ phân giải cao Cognex 8500, HIK CH-series, và 21 ống kính MVL-AF/LF).
    *   Kích hoạt tài khoản **Admin** và chọn một dòng sản phẩm, nhấn nút **Sửa (biểu tượng ✏️)** để thay đổi thông số trực tiếp và lưu lại.
*   **Lời thoại (Voiceover):** *"Ứng dụng tích hợp sẵn cơ sở dữ liệu khổng lồ với hơn 100 dòng Camera và Lens FA, Telecentric cao cấp nhất trên thị trường. Với quyền quản trị thông minh, quản trị viên dễ dàng thêm mới, chỉnh sửa thông số linh kiện trực tiếp hoặc xuất/nhập file dữ liệu hệ thống chỉ bằng một chạm."*

### Phân cảnh 4: Giả lập ảo Phòng Lab quang học (1:45 - 2:30)
*   **Hình ảnh:**
    *   Kỹ sư tải lên một bức ảnh sản phẩm lỗi.
    *   Nhấp chọn lần lượt các chế độ sáng: **Darkfield** (vết xước nổi bật lên), **Backlight** (biên dạng viền sắc nét), **Dome** (giảm chói bóng loáng).
    *   Chuyển sang tab **Image Converter** để chọn các kênh màu Monochrome (Red, Green, Blue, HSI) để xem độ tương phản tốt nhất cho thuật toán nhận diện.
*   **Lời thoại (Voiceover):** *"Không dừng lại ở đó, công cụ Vision Lab Simulator tích hợp sẵn cho phép kỹ sư thử nghiệm ánh sáng ảo (Dome, Ring, Darkfield) và lọc kênh màu Monochrome tức thì trên Web. Bước đột phá này giúp loại bỏ hoàn toàn các thử nghiệm vật lý tốn kém ở giai đoạn khảo sát ban đầu."*

### Phân cảnh 5: Kết luận & Kêu gọi hành động (2:30 - 3:00)
*   **Hình ảnh:** Hiển thị biểu đồ cột Before/After trực quan, kết thúc bằng logo của phòng ban hoặc công ty cùng slogan ấn tượng.
*   **Lời thoại (Voiceover):** *"Giải pháp mang lại hiệu suất tăng 300 lần, triệt tiêu hoàn toàn sai sót quang học và tiết kiệm hàng ngàn giờ công lao động của doanh nghiệp mỗi năm. Đây là minh chứng rõ nét cho việc ứng dụng AI và Tự động hóa để tạo nên bước nhảy vọt về năng suất làm việc. Cảm ơn hội đồng giám khảo đã theo dõi!"*
