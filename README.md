Class Metal & Hurdacılık — Karabük

Bu küçük statik landing sayfası, Karabük merkezli Class Metal & Hurdacılık şirketi için hazırlanmıştır.

Yerel olarak çalıştırmak için:

```bash
cd /Users/mc/class/web
python3 -m http.server 8000
# sonra tarayıcıda http://localhost:8000
```

Dosyalar:
- `index.html` — Ana sayfa
- `css/styles.css` — Stil dosyası

İstediğiniz değişiklikleri söyleyin: logo, gerçek iletişim bilgileri, resimler, renkler veya başka dil versiyonu ekleyebilirim.

Optimizasyon & SEO notları
- Lütfen `index.html` içinde `https://example.com` geçen yerleri canlı domaininizle değiştirin (canonical, OG, JSON-LD ve sitemap).
- Görseller için `assets/images` içindeki büyük fotoğrafları sıkıştırmak (JPEG/WEBP) ve uygun çözünürlükte yeniden boyutlandırmak sayfa yüklenmesini hızlandırır.
- Sunucu tarafında gzip veya brotli sıkıştırma ve uygun Cache-Control başlıkları kullanın.
- `robots.txt` ve `sitemap.xml` dosyaları eklendi; sitemap içine daha fazla sayfa ekleyin gerektikçe.
- SEO kontrolü için Lighthouse veya Google Search Console ile test edin; meta açıklamalar ve OG etiketleri eklendi.

Hızlı kontrol listesi
- Görselleri optimize et (imagemagick / Squoosh / imgproxy).
- Sayfayı canlı domaine taşı ve sitemap/robots dosyalarını root'a koy.
- Google Search Console'a siteyi ekle ve sitemap.xml gönder.

Yardım ister misiniz? Görselleri otomatik olarak optimize edip `assets/optimized/` altına koyabilirim veya form gönderimini bir serverless endpoint'e bağlayabilirim.