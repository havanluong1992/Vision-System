# Vision System App (Vision System Architect)

### 💡 Trợ lý Số Thiết kế Hệ thống Quang học & Lựa chọn Phần cứng
### 💡 광학 설계 및 하드웨어 선정 디지털 어시스턴트

*Ứng dụng Web chuyên nghiệp dành cho Kỹ sư Machine Vision giúp nhanh chóng tra cứu thiết bị và tính toán cấu hình quang học.*
*머신 비전(Machine Vision) 엔지니어가 부품을 신속히 검색하고 광학 구성 파라미터를 계산할 수 있도록 설계된 전문 웹 애플리케이션입니다.*

---

## 🚀 Tính năng / 주요 기능

### 1. Tra cứu & Tìm kiếm Thiết bị Tập trung / 통합 검색 및 부품 라이브러리
*   **Thư viện Thiết bị Đầy đủ / 종합 라이브러리**: Tìm kiếm cực nhanh qua các danh mục **Camera Công nghiệp (Industrial Cameras)**, **Ống kính thường (FA Lenses)**, và **Ống kính viễn tâm (Telecentric Lenses)**.
    *   *산업용 카메라, 일반 FA 렌즈 및 텔레센트릭 렌즈 카테고리를 통한 신속한 검색 지원.*
*   **Bộ lọc Đa danh mục / 교차 카테고리 필터링**: Hệ thống tìm kiếm toàn cầu giúp lọc dữ liệu sản phẩm trên tất cả các cơ sở dữ liệu cùng một lúc.
    *   *모든 부품 데이터베이스를 동시에 필터링하는 글로벌 검색 시스템.*
*   **Thông số Kỹ thuật Chi tiết / 상세 사양 조회**: Xem nhanh Độ phân giải, Kích thước cảm biến, Tiêu cự, và Khoảng cách làm việc (WD).
    *   *해상도, 센서 크기, 초점 거리, 작동 거리(WD) 등을 한눈에 확인.*

### 2. Bộ công cụ Tính toán Quang học Tiên tiến / 고급 광학 계산기
*   **Bộ tính toán Ống kính FA / FA 렌즈 계산기**:
    *   **Tính toán Hai chiều / 양방향 계산**: Tính kích thước trường nhìn (FOV) từ khoảng cách làm việc (WD) hoặc ngược lại.
        *   *작동 거리(WD)로 FOV를 계산하거나 그 반대도 지원.*
    *   **Chế độ Tiêu chuẩn / 표준 모드**: Sử dụng các công thức quang học xấp xỉ chính xác cao cho các tác vụ Vision thông thường.
        *   *일반 비전 검사를 위해 정밀한 광학 근사 공식 적용.*
    *   **Chế độ Vòng đệm (Adapter Ring) / 어댑터 링 모드**: Tuân thủ nghiêm ngặt bảng dữ liệu thực nghiệm **Extension Tube Chart của HIKrobot** cho các ứng dụng chụp cận cảnh (Macro).
        *   *매크로 어플리케이션을 위해 HIKrobot 접사링 실측 데이터를 철저히 반영.*
    *   **Tự động Khớp thông số / 파라미터 자동 매칭**: Tự động liên kết Chiều dài vòng đệm và Khoảng cách làm việc dựa trên kết quả kiểm nghiệm thực tế của HIKrobot.
        *   *실측 데이터 기반으로 접사링 길이와 작동 거리(WD)를 자동 매칭.*
*   **Bộ tính toán Ống kính Viễn tâm / 텔레센트릭 렌즈 계산기**: Công cụ chuyên dụng cho các cấu hình viễn tâm độ chính xác cao.
    *   *고정밀 텔레센트릭 설정을 위한 전용 계산 도구.*
*   **Độ chính xác Thời gian thực / 실시간 정밀도 산출**: Tự động tính toán **Kích thước điểm ảnh (Pixel Size - mm/px)** và **Độ chính xác thực tế của hệ thống (Vision Accuracy)** cho từng cấu hình.
    *   *매 설정마다 화소 크기(mm/px) 및 실제 검사 정밀도(Vision Accuracy)를 실시간 자동 계산.*

### 3. Trải nghiệm Người dùng Đẳng cấp / 프리미엄 사용자 경험 (UX)
*   **Tự động hoàn thành tìm kiếm (Autocomplete) / 검색형 셀렉트 박스**: Ô nhập tự động hoàn thành hiệu năng cao thay thế cho menu thả xuống truyền thống, cho phép chọn linh kiện nhanh bằng cách nhập một phần tên model (ví dụ: "050" hoặc "25").
    *   *기존 드롭다운 대신 모델명 일부(예: "050", "25") 입력 시 신속히 장비를 매칭하는 오토 컴플리트 기능.*
*   **Giao diện Glassmorphism / 글래스모피즘 UI**: Giao diện chế độ tối (Dark Mode) cực kỳ hiện đại với hiệu ứng kính mờ nghệ thuật và chuyển động mượt mà.
    *   *반투명 유리 효과와 부드러운 애니메이션이 적용된 현대적인 다크 모드 인터페이스.*
*   **Hỗ trợ Đa thiết bị / 완벽한 반응형 레이아웃**: Tối ưu hóa cho cả máy tính để bàn và thiết bị di động, bao gồm các tinh chỉnh đặc biệt dành riêng cho **iPhone 16 Pro Max**.
    *   *데스크톱 및 모바일 기기에 최적화되었으며, iPhone 16 Pro Max 화면 비율 맞춤 개선 반영.*

---

## 🛠 Công nghệ Sử dụng / 기술 스택

*   **Cấu trúc / 구조**: HTML5 ngữ nghĩa (Semantic HTML5)
*   **Giao diện / 스타일**: Vanilla CSS3 (Hệ thống thiết kế Custom Glassmorphism)
*   **Logic / 로직**: Vanilla JavaScript (ES6+)
*   **Biểu tượng / 아이콘**: Lucide Icons
*   **Triển khai / 배포**: Không phụ thuộc thư viện ngoài (Zero-dependency); chạy trực tiếp trên mọi trình duyệt web hiện đại.

---

## 📂 Cấu trúc Thư mục / 프로젝트 구조

*   `index.html`: Giao diện chính và bố cục của ứng dụng.
    *   *메인 애플리케이션 화면 구성 및 레이아웃.*
*   `app.js`: Logic xử lý chính, cơ sở dữ liệu linh kiện và bộ công cụ tính toán quang học.
    *   *애플리케이션 핵심 로직, 제품 데이터베이스 및 광학 계산 엔진.*
*   `style.css`: Hệ thống thiết kế đồng bộ, hoạt họa và bố cục phản hồi đa thiết bị.
    *   *디자인 시스템 토큰, 애니메이션 효과 및 반응형 스타일시트.*

---

## 📖 Hướng dẫn Sử dụng / 사용 방법

1.  **Tải hoặc Clone kho lưu trữ này về máy tính.**
    *   *소프트웨어를 다운로드하거나 저장소를 클론합니다.*
2.  **Mở tệp `index.html` bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Safari, Edge, hoặc Firefox).**
    *   *웹 브라우저(Chrome, Safari, Edge, Firefox 등)에서 `index.html` 파일을 엽니다.*
3.  **Đăng nhập với quyền Admin (Tài khoản: `Admin`, Mật khẩu: `dkvina1234`) để truy cập quyền quản trị dữ liệu sản phẩm.**
    *   *관리자 계정(ID: `Admin`, PW: `dkvina1234`)으로 로그인하여 관리자 패널 사양 편집 권한을 획득합니다.*
4.  **Sử dụng thanh điều hướng bên để chuyển đổi giữa các danh sách sản phẩm và các bộ tính toán.**
    *   *사이드바 메뉴를 통해 장비 데이터베이스 검색창과 광학 계산기 탭을 자유롭게 전환합니다.*

---

*Thiết kế vì độ chính xác. Đồng hành cùng kỹ sư.*
*정밀함을 위한 설계. 엔지니어를 위한 솔루션.*
