# UI Tes Ecommerce

UI Tes Ecommerce adalah aplikasi antarmuka pengguna untuk platform e-commerce. Proyek ini menggunakan React dan Vite sebagai alat pengembangan front-end, dengan berbagai fitur termasuk manajemen produk, keranjang belanja, dan pagination.

## Fitur Utama

- **Pagination:** Navigasi produk dengan pagination yang diatur dengan baik.
- **Swiper:** Galeri gambar produk menggunakan Swiper.
- **Kategori Produk:** Filter produk berdasarkan kategori.
- **Currency Formatting:** Format mata uang dinamis berdasarkan pengaturan lingkungan.
- **Responsive Design:** Desain responsif yang dioptimalkan untuk berbagai perangkat.

## Instalasi

1. **Clone Repository**

    ```bash
    git clone https://github.com/AndikaRisky31/UI_Tes_Ecommerce.git
    ```

2. **Masuk ke Direktori Proyek**

    ```bash
    cd UI_Tes_Ecommerce
    ```

3. **Instal Dependensi**

    Pastikan Anda memiliki Node.js dan npm atau Yarn terinstal. Kemudian jalankan:

    ```bash
    npm install
    # atau
    yarn install
    ```

4. **Setup Variabel Lingkungan**

    Salin file `.env.example` ke `.env` dan sesuaikan dengan pengaturan Anda:

    ```bash
    cp .env.example .env
    ```

    Edit file `.env` untuk mengatur variabel seperti `VITE_CURRENCY` dan `VITE_LOCALE`.

## Menjalankan Aplikasi

Untuk menjalankan aplikasi dalam mode pengembangan, gunakan perintah berikut:

  ```bash
  npm run dev
  ```

Aplikasi akan tersedia di [http://localhost:5173](http://localhost:5173).

## Struktur Proyek

- `src/`
  - `components/` - Komponen UI untuk aplikasi.
  - `pages/` - Halaman utama dan tampilan aplikasi.
  - `services/` - Layanan API dan konfigurasi Axios.
  - `utils/` - Fungsi utilitas seperti `formatCurrency`.
  - `App.jsx` - Titik masuk utama aplikasi React.
  - `main.jsx` - Titik masuk utama Vite.

- `public/`
  - Berisi file statis seperti favicon dan gambar.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori dan kirim pull request dengan deskripsi yang jelas tentang perubahan yang Anda buat.

1. Fork repositori ini.

2. Buat branch baru:

    ```bash
    git checkout -b feature/your-feature
    ```

3. Lakukan perubahan dan commit:

    ```bash
    git commit -m "Add your message here"
    ```

4. Push branch ke repositori Anda:

    ```bash
    git push origin feature/your-feature
    ```

5. Buat pull request.

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

Terima kasih telah menggunakan UI Tes Ecommerce! Kami harap Anda menikmati aplikasi ini dan mendapatkan manfaat darinya.
```
