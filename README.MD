# 🚀 Template NodeJS - MVCS Architecture

![Node.js](https://img.shields.io/badge/Node.js-22.14.0-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express.js-5.1.0-lightgrey?logo=express)

---

## 📖 Giới thiệu

Dự án này là một template NodeJS sử dụng kiến trúc **MVCS** (_Model – View – Controller – Service_), giúp tách biệt rõ ràng các tầng xử lý, dễ dàng bảo trì, mở rộng và kiểm thử. Dự án phù hợp để phát triển các **RESTful API** hiện đại, bảo mật và dễ mở rộng.

---

## 🗂️ Kiến trúc thư mục

```text
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

## 🛠️ Công nghệ sử dụng

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express.js](https://expressjs.com/)
- [Nodemon](https://nodemon.io/) (dev)
- [Joi](https://joi.dev/) (validation)
- [dotenv](https://github.com/motdotla/dotenv) (env config)
- ...và các thư viện hữu ích khác

---

## ⚡ Hướng dẫn cài đặt & chạy dự án

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

- **Chạy ở chế độ phát triển (hot reload):**

  ```bash
  npm run dev
  ```

- **Build & chạy production:**

  ```bash
  npm run build
  npm start
  ```

---

## 💡 Một số lệnh npm hữu ích

| Lệnh              | Chức năng                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Chạy server ở chế độ phát triển (dùng nodemon) |
| `npm run build`   | Biên dịch TypeScript sang JavaScript           |
| `npm start`       | Chạy server ở chế độ production                |
| `npm run migrate` | Chạy migration database (nếu có)               |

---

## 🤝 Đóng góp

### Mọi đóng góp, issue hoặc pull request đều rất được chào đón!

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/ten-tinh-nang`)
3. Commit thay đổi (`git commit -m 'Add new feature'`)
4. Push lên branch (`git push origin feature/ten-tinh-nang`)
5. Tạo Pull Request

---

> **Liên hệ:** Nếu có thắc mắc hoặc cần hỗ trợ, vui lòng tạo issue hoặc liên hệ trực tiếp qua email.
