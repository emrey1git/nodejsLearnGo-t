// Sayıları parse etme fonksiyonu
// Amaç: string gelenleri integer'a çevirme
// Geçersiz değer (null, undefined, boş string vb.) geldiğinde default değeri döndürme

const parseNumber = (number, defaultValue) => {
    // Gelen değerin string olup olmadığını kontrol et
    const isString = typeof number === "string";

    // String değilse (ör. null, undefined, number) → default değeri döndür
    if (!isString) return defaultValue;

    // String ise integer'a çevir
    const parsedNumber = parseInt(number);

    // Çevirme işlemi başarısız olursa (NaN dönerse) → default değeri döndür
    if (Number.isNaN(parsedNumber)) {
        return defaultValue;
    }

    // Başarılıysa, çevrilmiş sayıyı döndür
    return parsedNumber;
};

// Sayfalama parametrelerini parse eden fonksiyon
// Örnek sorgu: http://localhost:3000/users?page=1&perPage=3

export const parsePaginationParams = (query) => {
    // API'den gelen sayfa ve sayfa başına veri bilgilerini al
    const { page, perPage } = query;

    // page değeri varsa parse et, yoksa 1. sayfayı döndür
    const parsedPage = parseNumber(page, 1);

    // perPage değeri varsa parse et, yoksa her sayfada 10 tane veri döndür
    const parsedPerPage = parseNumber(perPage, 10);

    // Parse edilmiş değerleri döndür
    return {
        page: parsedPage,
        perPage: parsedPerPage
    };
};
