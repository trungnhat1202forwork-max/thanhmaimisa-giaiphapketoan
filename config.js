/**
 * AMIS aiMarketing lead integration.
 *
 * Sau khi có endpoint/API trung gian an toàn, điền URL bên dưới.
 * Không đặt access token/secret trực tiếp trong file frontend public này.
 * Nên dùng serverless proxy (Cloudflare Worker, Supabase Edge Function, v.v.)
 * để giữ bí mật thông tin xác thực rồi proxy dữ liệu sang AMIS aiMarketing.
 */
window.THANH_MAI_MISA_CONFIG = {
  leadEndpoint: "",
  consultant: "Thanh Mai MISA",
  phone: "0763517916",
  email: "htmai@misa.com.vn"
};
