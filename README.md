## Windows Explorer

Adalah aplikasi untuk proses Online Assessment untuk posisi Full Stack Developer.

### Apps

- `apps/backend`: sebuah project backend menggunakan Elysia
- `apps/frontend`: sebuah project frontend menggunakan Vuejs

### Config

Setting konfigurasi file `.env` dimasing masing modul

```
#backned
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=windows-explorer

-------------------------------------------

#frontend
VITE_API_URL=http://localhost:3000/api/v1
```

### Develop

Untuk menjalankan development aplikasi jalankan command:

```
bun install

turbo dev
```