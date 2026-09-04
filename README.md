# Thanh Mai MISA — Landing page tư vấn kế toán doanh nghiệp

Landing page cá nhân dành cho **Thanh Mai MISA — Chuyên viên tư vấn giải pháp kế toán doanh nghiệp**.

## Thông tin liên hệ

- Hotline: **0763 517 916**
- Email: **htmai@misa.com.vn**
- Địa chỉ: **Số 188, Đường 30/4, TP Đà Nẵng**
- Đối tượng tư vấn: **Doanh nghiệp**

## Cấu trúc trang

- Hero nhận diện Thanh Mai MISA
- Bộ giải pháp kế toán doanh nghiệp
- AMIS Kế toán & AI
- Hệ sinh thái MISA AMIS
- Khu vực ưu đãi
- Video demo
- Quy trình tư vấn
- Form thu lead doanh nghiệp
- QR Zalo + hotline
- FAQ, SEO, responsive desktop/mobile

## Kết nối form với AMIS aiMarketing

Trang đã chuẩn bị sẵn cơ chế gửi JSON đến endpoint trong `config.js`.

```js
window.THANH_MAI_MISA_CONFIG = {
  leadEndpoint: "https://YOUR-SAFE-BACKEND-ENDPOINT",
  consultant: "Thanh Mai MISA",
  phone: "0763517916",
  email: "htmai@misa.com.vn"
};
```

**Không đặt API key / access token của AMIS trực tiếp trong `config.js`** vì repo và website là public. Nên dùng một backend/serverless proxy (ví dụ Cloudflare Worker, Supabase Edge Function, Vercel/Netlify Function) rồi endpoint đó mới gọi API AMIS aiMarketing.

Payload gửi từ form:

```json
{
  "source": "landing-page-thanh-mai-misa",
  "fullName": "...",
  "phone": "...",
  "email": "...",
  "role": "...",
  "taxCode": "...",
  "city": "...",
  "interest": "...",
  "businessType": "Doanh nghiệp",
  "consent": true
}
```

Khi chưa cấu hình endpoint, trang **không giả vờ gửi thành công**: lead được lưu tạm trên trình duyệt và khách được hướng dẫn gọi/Zalo.

## GitHub Pages

Workflow `.github/workflows/pages.yml` đã được thêm sẵn. Nếu Pages chưa tự bật:

1. Vào **Settings → Pages** của repository.
2. Ở **Build and deployment → Source**, chọn **GitHub Actions**.
3. Mở tab **Actions** và chạy workflow `Deploy Thanh Mai MISA landing page` nếu cần.

URL dự kiến:

`https://trungnhat1202forwork-max.github.io/thanhmaimisa-giaiphapketoan/`

## Chỉnh ưu đãi

Ảnh ưu đãi nằm trong `assets/`. Các chương trình có thể thay đổi theo thời điểm, vì vậy phần copy trên landing page luôn nhắc khách xác nhận điều kiện với Thanh Mai trước khi đăng ký.

## Chạy thử trên máy

Không cần build. Chỉ cần mở bằng HTTP server, ví dụ:

```bash
python -m http.server 8080
```

sau đó truy cập `http://localhost:8080`.
