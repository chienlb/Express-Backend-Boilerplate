# Template NodeJS - MVCS Architecture

## Giới thiệu

Dự án này là một template NodeJS sử dụng kiến trúc **MVCS** (_Model – View – Controller – Service_), giúp tách biệt rõ ràng các tầng xử lý, dễ dàng bảo trì, mở rộng và kiểm thử. Dự án phù hợp để phát triển các RESTful API hiện đại, bảo mật và dễ mở rộng.

---

## Kiến trúc thư mục

```
src/
  ├── configs/         # Cấu hình (database, env, email, CORS, ...)
  ├── controllers/     # Xử lý request, gọi service, trả response
  ├── middlewares/     # Các middleware cho Express (auth, logger, error, ...)
  ├── migrations/      # Script migrate database
  ├── models/          # Định nghĩa schema/model cho database
  ├── routes/          # Định nghĩa các route của API
  ├── services/        # Xử lý logic nghiệp vụ, giao tiếp với model
  ├── types/           # Định nghĩa type, interface mở rộng cho project
  ├── utils/           # Các hàm tiện ích dùng chung
  ├── validations/     # Validate dữ liệu đầu vào
  ├── app.ts           # Khởi tạo app Express
  └── server.ts        # Điểm bắt đầu chạy server
```

---

## Hướng dẫn cài đặt & chạy dự án

### 1. Clone dự án & cài đặt dependencies

```bash
git clone <repo-url>
cd Template-NodeJS
npm install
```

### 2. Tạo file cấu hình môi trường

Tạo file `.env` từ file mẫu:

```bash
cp .env.example .env
```

Sau đó cập nhật các biến môi trường phù hợp trong file `.env`.

### 3. Chạy migration (nếu có)

```bash
npm run migrate
```

### 4. Khởi chạy dự án

Chạy ở chế độ phát triển (hot reload):

```bash
npm run dev
```

Hoặc build & chạy production:

```bash
npm run build
npm start
```

---

## Một số lệnh npm hữu ích

- `npm run dev` : Chạy server ở chế độ phát triển (dùng nodemon)
- `npm run build` : Biên dịch TypeScript sang JavaScript
- `npm start` : Chạy server ở chế độ production
- `npm run migrate` : Chạy migration database (nếu có)

---

## Đóng góp

Mọi đóng góp, issue hoặc pull request đều được hoan nghênh!

---
