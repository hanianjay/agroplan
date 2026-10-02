/**
 * AgriTimeline SV IPB — Core Engine & Agronomic Database
 * Mobile-First Timeline & Cultivation Tracker
 */

// 1. DATABASE AGRONOMI LENGKAP (STANDAR VOKASI IPB)
const CROPS_DATABASE = {
  "cabai-rawit": {
    id: "cabai-rawit",
    name: "Cabai Rawit Merah",
    scientificName: "Capsicum frutescens",
    category: "Hortikultura",
    medium: "Polibag / Tanah",
    totalDays: 100,
    harvestWindow: "90 - 100 HST",
    iconName: "flame",
    summary: "Komoditas favorit praktikum PPP SV IPB. Memerlukan perhatian ekstra pada pemupukan fase generatif dan pengendalian trips.",
    phases: [
      {
        id: "phase-1",
        name: "Penyemaian & Pembibitan",
        startDay: 1,
        endDay: 15,
        statusLabel: "Fase Semai",
        description: "Biji dikecambahkan di tray semai dengan media cocopeat + arang sekam (1:1). Jaga kelembapan jangan sampai kering.",
        tasks: [
          { id: "cb-t1", day: 1, label: "Rendam benih dengan air hangat (50°C) selama 30 menit" },
          { id: "cb-t2", day: 2, label: "Tanam biji ke tray semai sedalam 0.5 cm dan tutup plastik hitam 2 hari" },
          { id: "cb-t3", day: 5, label: "Buka penutup setelah kecambah mulai muncul (sprout)" },
          { id: "cb-t4", day: 10, label: "Kenalkan bibit ke sinar matahari pagi (07.00 - 09.00)" }
        ]
      },
      {
        id: "phase-2",
        name: "Pindah Tanam (Transplanting)",
        startDay: 16,
        endDay: 25,
        statusLabel: "Aklimatisasi",
        description: "Bibit berdaun 4–5 helai siap dipindahkan ke polibag ukuran 35×35 cm berisi media tanah + pupuk kandang matang.",
        tasks: [
          { id: "cb-t5", day: 18, label: "Siapkan media polibag: tanah + kompos + sekam bakar (2:1:1)" },
          { id: "cb-t6", day: 20, label: "Pindah tanam bibit di sore hari agar tanaman tidak stres" },
          { id: "cb-t7", day: 22, label: "Siram secukupnya dan letakkan di tempat semi-teduh selama 3 hari" },
          { id: "cb-t8", day: 25, label: "Pindahkan polibag ke area bersinar matahari penuh" }
        ]
      },
      {
        id: "phase-3",
        name: "Vegetatif Aktif & Pasang Ajir",
        startDay: 26,
        endDay: 50,
        statusLabel: "Pertumbuhan Daun & Cabang",
        description: "Tanaman fokus membentuk cabang Y dan daun lebat. Wajib dipasang ajir bambu agar tidak roboh diterpa angin.",
        tasks: [
          { id: "cb-t9", day: 28, label: "Tancapkan ajir bambu mini (tinggi 1 meter) di samping batang utama" },
          { id: "cb-t10", day: 32, label: "Pruning/rempel tunas air di ketiak daun bawah cabang utama" },
          { id: "cb-t11", day: 38, label: "Kocor NPK 16-16-16 dosis 5 gram/liter air" },
          { id: "cb-t12", day: 45, label: "Semprot pestisida nabati pencegahan trips & kutu kebul" }
        ]
      },
      {
        id: "phase-4",
        name: "Fase Generatif (Berbunga & Berbuah)",
        startDay: 51,
        endDay: 80,
        statusLabel: "Pembungaan & Buah Muda",
        description: "Bunga putih mulai bermekaran di percabangan Y. Kurangi pupuk Nitrogen, tingkatkan Fosfat (P) dan Kalium (K).",
        tasks: [
          { id: "cb-t13", day: 55, label: "Aplikasi pupuk MKP / KCL untuk memperkuat bunga agar tidak rontok" },
          { id: "cb-t14", day: 62, label: "Ikat batang utama secara longgar ke ajir membentuk angka 8" },
          { id: "cb-t15", day: 70, label: "Semprot pupuk Kalsium Boron cegah penyakit patek (antraknosa)" },
          { id: "cb-t16", day: 75, label: "Cek bakal buah muda dari serangan lalat buah" }
        ]
      },
      {
        id: "phase-5",
        name: "Pematangan & Panen Perdana",
        startDay: 81,
        endDay: 100,
        statusLabel: "Panen Raya",
        description: "Buah cabai berubah warna dari hijau menjadi merah mengkilap. Petik bersama tangkainya saat pagi hari.",
        tasks: [
          { id: "cb-t17", day: 85, label: "Petik cabai yang sudah 80% merah (jangan ditarik paksa)" },
          { id: "cb-t18", day: 90, label: "Panen rutin tiap 3–4 hari sekali untuk merangsang tunas baru" },
          { id: "cb-t19", day: 95, label: "Beri pupuk susulan NPK cair ringan setelah pemetikan" },
          { id: "cb-t20", day: 100, label: "Catat rekap total bobot panen praktikum di logbook" }
        ]
      }
    ],
    watering: {
      frequency: "1x sehari (Pagi pukul 06.30 - 08.00)",
      volume: "250 - 400 ml per polibag",
      soilCheck: "Tusuk jari sedalam 2 cm. Jika tanah masih dingin dan lembap, tunda siram.",
      goldenRule: "Saat fase berbunga (HST 50-65), hindari menyiram langsung ke kelopak bunga agar serbuk sari tidak hanyut.",
      droughtSymptom: "Pucuk daun terkulai lemas di siang hari terik."
    },
    fertilization: [
      { hst: "HST 15", fertilizer: "Pupuk Dasar (Starter)", dose: "Kocor NPK 16-16-16 (2 gr/L air, 150 ml/tanaman)", note: "Mempercepat adaptasi akar pasca pindah tanam." },
      { hst: "HST 28", fertilizer: "Vegetatif I", dose: "Kocor NPK + POC Urin Kelinci / Daun Pepaya (5 gr/L)", note: "Mendorong pertumbuhan daun hijau dan cabang Y." },
      { hst: "HST 42", fertilizer: "Vegetatif II", dose: "Kocor NPK 16-16-16 (8 gr/L)", note: "Persiapan fase transisi menjelang munculnya kuncup bunga." },
      { hst: "HST 55", fertilizer: "Generatif Awal (Booster Bunga)", dose: "Kocor MKP (Mono Kalium Fosfat) 4 gr/L", note: "Mencegah bunga rontok dan memperbanyak bakal buah." },
      { hst: "HST 70", fertilizer: "Pengisian Buah & Daya Tahan", dose: "Semprot Kalsium Nitrat + Boron (2 gr/L)", note: "Mempertebal dinding sel buah cabai agar tahan patek." },
      { hst: "HST 85+", fertilizer: "Perawatan Pasca Petik", dose: "Kocor NPK ringan (3 gr/L) tiap 10 hari", note: "Menjaga tanaman tetap produktif hingga panen ke-10." }
    ],
    pests: [
      {
        name: "Thrips & Kutu Daun (Aphids)",
        category: "Hama Pengisap",
        severity: "Tinggi",
        symptoms: "Daun muda keriting melengkung ke atas seperti mangkuk, tepi daun berwarna keperakan.",
        prevention: "Pasang perangkap lekat kuning (Yellow Sticky Trap) setinggi tajuk tanaman.",
        organicRecipe: "Semprot larutan air rendaman bawang putih (2 siung geprek) + 1 sdt sabun cuci piring dalam 1 liter air sore hari."
      },
      {
        name: "Antraknosa / Patek (Colletotrichum spp.)",
        category: "Penyakit Jamur",
        severity: "Kritis",
        symptoms: "Bercak cokelat melingkar seperti luka bakar cekung pada buah cabai, buah cepat membusuk dan rontok.",
        prevention: "Jaga jarak tanam jangan terlalu rapat, sanitasi gulma, dan hindari media tanam terlalu becek.",
        organicRecipe: "Semprot bio-fungisida Trichoderma harzianum atau larutan baking soda tipis (1/2 sdt per liter air)."
      },
      {
        name: "Lalat Buah (Bactrocera dorsalis)",
        category: "Hama Penggerek",
        severity: "Sedang",
        symptoms: "Titik hitam kecil bekas sengatan ovipositor pada buah muda, buah menguning rontok dan berbelatung di dalam.",
        prevention: "Pasang perangkap botol bekas berumpan atraktan Metil Eugenol (Petrogenol) di tepi kebun.",
        organicRecipe: "Petik dan bakar segera buah yang jatuh busuk agar larva tidak menjadi pupa di dalam tanah."
      }
    ]
  },

  "tomat": {
    id: "tomat",
    name: "Tomat Ceri & Sayur",
    scientificName: "Solanum lycopersicum",
    category: "Hortikultura",
    medium: "Polibag / Bedengan",
    totalDays: 80,
    harvestWindow: "70 - 80 HST",
    iconName: "circle-dot",
    summary: "Tanaman berbatang lunak yang tumbuh pesat. Memerlukan penopang ajir kuat dan pemangkasan tunas air secara disiplin.",
    phases: [
      {
        id: "tm-p1",
        name: "Penyemaian Benih",
        startDay: 1,
        endDay: 18,
        statusLabel: "Semai",
        description: "Benih dikecambahkan pada media semai halus. Butuh kehangatan dan pencahayaan pagi bertahap.",
        tasks: [
          { id: "tm-t1", day: 1, label: "Rendam biji tomat di air hangat selama 15 menit" },
          { id: "tm-t2", day: 2, label: "Tanam pada tray semai dengan jarak 2 cm" },
          { id: "tm-t3", day: 6, label: "Kecambah muncul, pindahkan ke tempat terang berangin" },
          { id: "tm-t4", day: 14, label: "Siram tipis menggunakan sprayer halus setiap pagi" }
        ]
      },
      {
        id: "tm-p2",
        name: "Pindah Tanam & Ajir Pertama",
        startDay: 19,
        endDay: 35,
        statusLabel: "Vegetatif Awal",
        description: "Bibit dipindahkan ke wadah utama berdrainase baik. Pasang ajir bambu sedini mungkin sebelum akar melebar.",
        tasks: [
          { id: "tm-t5", day: 20, label: "Pindah tanam bibit berdaun sejati 4 helai ke polibag 40 cm" },
          { id: "tm-t6", day: 23, label: "Tancapkan ajir bambu setinggi 1.5 meter sedalam 20 cm" },
          { id: "tm-t7", day: 28, label: "Kocor pupuk NPK starter 3 gr/liter air" },
          { id: "tm-t8", day: 33, label: "Pangkas daun-daun paling bawah yang menyentuh tanah" }
        ]
      },
      {
        id: "tm-p3",
        name: "Pruning Tunas Air & Pembungaan",
        startDay: 36,
        endDay: 55,
        statusLabel: "Generatif & Pruning",
        description: "Bunga kuning mekar berkelompok. Lakukan pewiwitan (pruning) tunas liar agar nutrisi terfokus ke tandan buah.",
        tasks: [
          { id: "tm-t9", day: 38, label: "Pangkas tunas air (suckers) di ketiak daun secara rutin" },
          { id: "tm-t10", day: 44, label: "Ikat batang tanaman ke ajir dengan tali rafia longgar" },
          { id: "tm-t11", day: 50, label: "Beri pupuk Kalium & Kalsium untuk mencegah pantat buah hitam" },
          { id: "tm-t12", day: 54, label: "Goyangkan ajir perlahan pagi hari untuk membantu penyerbukan" }
        ]
      },
      {
        id: "tm-p4",
        name: "Pembesaran Buah & Panen",
        startDay: 56,
        endDay: 80,
        statusLabel: "Panen Segar",
        description: "Warna buah bergradasi dari hijau, oranye, hingga merah merekah siap dipanen.",
        tasks: [
          { id: "tm-t13", day: 60, label: "Seleksi tandan: buang buah yang kerdil atau cacat" },
          { id: "tm-t14", day: 68, label: "Kurangi debit siram sedikit agar kulit buah tidak retak (cracking)" },
          { id: "tm-t15", day: 72, label: "Panen buah tomat saat semburat oranye kemerahan 75%" },
          { id: "tm-t16", day: 80, label: "Timbang total panen dan catat indeks kemanisan / brix" }
        ]
      }
    ],
    watering: {
      frequency: "1–2x sehari (Pagi dan Sore jika panas terik)",
      volume: "350 - 500 ml per pohon",
      soilCheck: "Tomat sangat haus air tetapi benci genangan (akar rentan busuk).",
      goldenRule: "JANGAN siram daun tomat dari atas! Daun basah memicu jamur busuk daun Phytophthora.",
      droughtSymptom: "Batang lemas dan ujung daun menggulung ke bawah."
    },
    fertilization: [
      { hst: "HST 15", fertilizer: "Starter Organik", dose: "Kocor POC Daun Gamal/Limbah Sayur (1:10)", note: "Memacu perakaran dan pembentukan klorofil." },
      { hst: "HST 28", fertilizer: "Vegetatif", dose: "Kocor NPK 16-16-16 (5 gr/L)", note: "Menebalkan batang utama dan percabangan." },
      { hst: "HST 45", fertilizer: "Kalsium Booster", dose: "Semprot Pupuk Kalsium (Ca) 2 gr/L", note: "KRUSIAL: Mencegah Blossom End Rot (ujung buah busuk hitam)." },
      { hst: "HST 60", fertilizer: "Pematangan Buah", dose: "Kocor Kalium Nitrat / KCL (4 gr/L)", note: "Membuat daging buah tebal, manis, dan merah menyala." }
    ],
    pests: [
      {
        name: "Ulat Buah Tomat (Helicoverpa armigera)",
        category: "Hama Penggerek",
        severity: "Tinggi",
        symptoms: "Lubang bulat pada buah tomat muda/tua dengan kotoran hitam di sekitar lubang.",
        prevention: "Pemeriksaan visual rutin telur ulat di balik daun muda.",
        organicRecipe: "Semprot larutan biopestisida Bacillus thuringiensis (Bt) atau ekstensi daun mimba."
      },
      {
        name: "Busuk Daun Hawar (Phytophthora infestans)",
        category: "Penyakit Jamur",
        severity: "Kritis",
        symptoms: "Bercak basah cokelat kehitaman di tepi daun yang meluas cepat hingga daun mengering hangus.",
        prevention: "Jaga sirkulasi udara, pangkas daun bawah, dan jangan basahi daun saat menyiram.",
        organicRecipe: "Pangkas dan musnahkan daun sakit, semprot larutan tembaga fungisida organik atau Trichoderma."
      }
    ]
  },

  "selada-hidroponik": {
    id: "selada-hidroponik",
    name: "Selada Keriting Hidroponik",
    scientificName: "Lactuca sativa var. crispa",
    category: "Hidroponik",
    medium: "Rockwool / Netpot NFT / Wick",
    totalDays: 40,
    harvestWindow: "35 - 40 HSS",
    iconName: "leaf",
    summary: "Tanaman siklus cepat praktikum pertanian presisi SV IPB. Kunci keberhasilan ada pada kestabilan nilai PPM dan pH air nutrisi.",
    phases: [
      {
        id: "sld-p1",
        name: "Semai Rockwool",
        startDay: 1,
        endDay: 10,
        statusLabel: "Semai & Sprout",
        description: "Biji ditaruh di dadu rockwool basah. Dalam 24-48 jam biji akan pecah dan membutuhkan sinar matahari penuh.",
        tasks: [
          { id: "sld-t1", day: 1, label: "Basahi media rockwool dengan air baku (PPM < 100)" },
          { id: "sld-t2", day: 2, label: "Masukkan 1 benih per lubang rockwool sedalam 2-3 mm" },
          { id: "sld-t3", day: 4, label: "Jemur kecambah di sinar matahari penuh agar tidak etiolasi (kutilang)" },
          { id: "sld-t4", day: 8, label: "Beri nutrisi AB Mix encer (PPM 300 - 400)" }
        ]
      },
      {
        id: "sld-p2",
        name: "Pindah ke Meja Peremajaan",
        startDay: 11,
        endDay: 20,
        statusLabel: "Peremajaan",
        description: "Bibit berdaun 3 helai dipindahkan ke sistem netpot dengan nutrisi separuh konsentrasi.",
        tasks: [
          { id: "sld-t5", day: 11, label: "Pindahkan rockwool ke netpot dengan sumbu kain flanel" },
          { id: "sld-t6", day: 14, label: "Ukur PPM tandon nutrisi: target 500 - 600 PPM, pH 5.8 - 6.5" },
          { id: "sld-t7", day: 18, label: "Pastikan sirkulasi pompa air mengalir lancar 24 jam" }
        ]
      },
      {
        id: "sld-p3",
        name: "Fase Pembesaran & Panen",
        startDay: 21,
        endDay: 40,
        statusLabel: "Pembesaran & Panen",
        description: "Daun selada membesar merekah membentuk rumpun keriting segar. Jaga suhu air tandon tetap sejuk.",
        tasks: [
          { id: "sld-t8", day: 22, label: "Naikkan nutrisi ke PPM 800 - 1000 PPM" },
          { id: "sld-t9", day: 28, label: "Cek akar: harus berwarna putih bersih (bukan cokelat)" },
          { id: "sld-t10", day: 35, label: "Panen pagi hari saat selada renyah dan kadar air optimal" },
          { id: "sld-t11", day: 40, label: "Timbang bobot segar per netpot (target: 120-150 gram)" }
        ]
      }
    ],
    watering: {
      frequency: "Sirkulasi Otomatis (Pompa NFT) atau Cek Air Tandon Wick tiap 2 hari",
      volume: "Tandon 20-50 Liter bersirkulasi",
      soilCheck: "Tanpa media tanah. Ukur pH meter dan TDS meter.",
      goldenRule: "Suhu tandon nutrisi tidak boleh melebihi 28°C agar akar tidak kekurangan oksigen terlarut.",
      droughtSymptom: "Daun lunglai lemas saat tandon nutrisi surut menyisakan netpot kering."
    },
    fertilization: [
      { hst: "HSS 8", fertilizer: "Starter AB Mix", dose: "PPM 300 - 400 (EC 0.8)", note: "Nutrisi ringan daun fase semai." },
      { hst: "HSS 15", fertilizer: "Peremajaan", dose: "PPM 600 (EC 1.2)", note: "Mendorong perbanyakan helai daun baru." },
      { hst: "HSS 25", fertilizer: "Pembesaran Daun", dose: "PPM 800 - 1000 (EC 1.8)", note: "Memaksimalkan bobot dan kerenyahan selada." }
    ],
    pests: [
      {
        name: "Busuk Akar Pythium (Root Rot)",
        category: "Jamur Air",
        severity: "Kritis",
        symptoms: "Akar berwarna cokelat kehitaman, licin berbau apek, daun layu mendadak.",
        prevention: "Bersihkan tandon rutin, pasang aerator gelembung udara, kuras air jika suhu terlalu hangat.",
        organicRecipe: "Bilas akar dengan air bersih mengalir, ganti larutan nutrisi baru + sterilkan wadah."
      }
    ]
  },

  "pakcoy": {
    id: "pakcoy",
    name: "Pakcoy / Sawi Sendok",
    scientificName: "Brassica rapa subsp. chinensis",
    category: "Hortikultura / Hidroponik",
    medium: "Polibag / Wick / Bedengan",
    totalDays: 35,
    harvestWindow: "30 - 35 HST",
    iconName: "sprout",
    summary: "Tanaman favorit pemula dengan masa tanam super singkat. Batang tebal renyah dan sangat responsif terhadap pupuk nitrogen.",
    phases: [
      {
        id: "pk-p1",
        name: "Semai Cepat",
        startDay: 1,
        endDay: 10,
        statusLabel: "Semai",
        description: "Biji pakcoy berkecambah cepat dalam 24 jam. Jaga paparan sinar matahari agar batang tidak tinggi kurus.",
        tasks: [
          { id: "pk-t1", day: 1, label: "Sebar benih di tray semai atau media cocopeat" },
          { id: "pk-t2", day: 3, label: "Pastikan kecambah langsung mendapat sinar matahari pagi" },
          { id: "pk-t3", day: 8, label: "Seleksi bibit: pilih yang berbatang kokoh berdaun 3 helai" }
        ]
      },
      {
        id: "pk-p2",
        name: "Pindah Tanam & Pembesaran",
        startDay: 11,
        endDay: 25,
        statusLabel: "Pembesaran Batang",
        description: "Pindah ke polibag kecil atau netpot. Batang putih mulai menebal membentuk sendok.",
        tasks: [
          { id: "pk-t4", day: 12, label: "Pindah tanam ke polibag 20 cm atau netpot" },
          { id: "pk-t5", day: 16, label: "Beri pupuk NPK kocor 3 gr/liter atau AB Mix 700 PPM" },
          { id: "pk-t6", day: 22, label: "Cek daun dari ulat grayak atau kutu daun" }
        ]
      },
      {
        id: "pk-p3",
        name: "Panen Segar",
        startDay: 26,
        endDay: 35,
        statusLabel: "Panen Raya",
        description: "Batang padat dan daun hijau pekat. Jangan terlambat panen agar daun tidak terasa pahit.",
        tasks: [
          { id: "pk-t7", day: 28, label: "Panen dengan memotong pangkal akar atau mencabut utuh" },
          { id: "pk-t8", day: 35, label: "Cuci bersih pangkal batang dari sisa media dan timbang" }
        ]
      }
    ],
    watering: {
      frequency: "1x sehari pagi (atau 2x jika cuaca sangat terik)",
      volume: "200 ml per wadah",
      soilCheck: "Media harus gembur lembap tapi tidak tergenang.",
      goldenRule: "Kekurangan air 1 hari saja membuat daun pakcoy langsung lemas dan menguning kerdil.",
      droughtSymptom: "Daun terkulai layu mendatar di permukaan tanah."
    },
    fertilization: [
      { hst: "HST 12", fertilizer: "Starter Daun", dose: "NPK 16-16-16 (3 gr/L) atau POC Urin Sapi", note: "Mempercepat pembentukan helai daun." },
      { hst: "HST 22", fertilizer: "Penggemukan Batang", dose: "NPK Mutiara (5 gr/L)", note: "Membuat pelepah batang tebal, montok, dan berair." }
    ],
    pests: [
      {
        name: "Ulat Grayak / Ulat Daun (Spodoptera litura)",
        category: "Hama Pengunyah",
        severity: "Tinggi",
        symptoms: "Daun bolong-bolong berlubang besar, hanya tersisa tulang daun dalam semalam.",
        prevention: "Pasang jaring kasa serangga (insect net) di atas bedengan atau meja semai.",
        organicRecipe: "Kutip ulat secara manual di pagi hari atau semprot air daun pepaya pahit."
      }
    ]
  },

  "melon": {
    id: "melon",
    name: "Melon Golden Praktikum",
    scientificName: "Cucumis melo var. inodorus",
    category: "Hortikultura Unggulan",
    medium: "Polibag 40 cm / Fertigasi Drip",
    totalDays: 75,
    harvestWindow: "65 - 75 HST",
    iconName: "sun",
    summary: "Proyek prestisius praktikum melon greenhouse SV IPB. Memerlukan ketelitian polinasi manual, seleksi 1 buah per pohon, dan pengikatan buah.",
    phases: [
      {
        id: "ml-p1",
        name: "Semai & Pindah Tanam",
        startDay: 1,
        endDay: 15,
        statusLabel: "Semai & Aklimatisasi",
        description: "Biji melon dikikir sedikit ujungnya sebelum direndam. Pindah tanam saat daun sejati ke-2 terbuka.",
        tasks: [
          { id: "ml-t1", day: 1, label: "Rendam biji di air hangat 4 jam lalu peram di kain lembap" },
          { id: "ml-t2", day: 3, label: "Tanam biji bertunas ke polibag semai" },
          { id: "ml-t3", day: 10, label: "Pindah tanam ke polibag besar 40x40 cm dengan sistem fertigasi" }
        ]
      },
      {
        id: "ml-p2",
        name: "Lilit Batang & Polinasi Buah",
        startDay: 16,
        endDay: 40,
        statusLabel: "Polinasi Bunga",
        description: "Lilitkan sulur ke tali gantung. Lakukan penyerbukan buatan di ruas daun ke-9 sampai ke-12.",
        tasks: [
          { id: "ml-t4", day: 18, label: "Lilitkan batang melon ke tali rambatan vertikal (ajir gantung)" },
          { id: "ml-t5", day: 25, label: "Pruning semua tunas air di bawah ruas daun ke-8" },
          { id: "ml-t6", day: 30, label: "Polinasi manual: usapkan serbuk sari bunga jantan ke kepala putik bunga betina pukul 07.00 - 09.00 pagi" },
          { id: "ml-t7", day: 38, label: "Bakal buah mulai sebesar telur ayam" }
        ]
      },
      {
        id: "ml-p3",
        name: "Seleksi Buah & Pengikatan",
        startDay: 41,
        endDay: 60,
        statusLabel: "Pembesaran Buah",
        description: "Pilih hanya 1 buah terbaik per pohon yang bentuknya paling sempurna. Gantung tangkai buah dengan tali khusus.",
        tasks: [
          { id: "ml-t8", day: 42, label: "Seleksi 1 buah terbaik per pohon, pangkas buah lainnya" },
          { id: "ml-t9", day: 45, label: "Gantung buah dengan tali rafia agar tangkai pohon tidak patah menahan beban" },
          { id: "ml-t10", day: 52, label: "Topping: pangkas titik tumbuh pucuk utama pada daun ke-25" }
        ]
      },
      {
        id: "ml-p4",
        name: "Pematangan Net & Panen Manis",
        startDay: 61,
        endDay: 75,
        statusLabel: "Panen Golden",
        description: "Jaring net tebal merata di kulit buah, aroma harum menguar, dan sulur daun dekat tangkai mulai mengering.",
        tasks: [
          { id: "ml-t11", day: 65, label: "Kurangi debit siram 50% untuk menaikkan kadar gula (Brix)" },
          { id: "ml-t12", day: 70, label: "Cek aroma melon dan retakan cincin pada tangkai buah" },
          { id: "ml-t13", day: 75, label: "Panen dengan memotong tangkai membentuk huruf T. Ukur kadar brix (target > 12 Brix)" }
        ]
      }
    ],
    watering: {
      frequency: "2x sehari via irigasi tetes / siram pagi dan sore",
      volume: "600 - 800 ml per pohon saat pembesaran buah",
      soilCheck: "Gunakan media porous (cocopeat + sekam bakar 1:1).",
      goldenRule: "7 hari menjelang panen, kurangi air secara drastis agar rasa buah menjadi sangat manis dan tidak tawar.",
      droughtSymptom: "Daun melon terkulai layu mengering di siang bolong."
    },
    fertilization: [
      { hst: "HST 15", fertilizer: "Starter Fertigasi", dose: "AB Mix Buah (EC 1.5 / 750 PPM)", note: "Mendorong perambatan akar dan sulur." },
      { hst: "HST 30", fertilizer: "Fase Berbunga", dose: "AB Mix Buah (EC 2.0 / 1000 PPM)", note: "Memperkuat tangkai putik bunga betina." },
      { hst: "HST 45", fertilizer: "Pembesaran Buah", dose: "AB Mix Buah (EC 2.5 / 1250 PPM) + Kalium KCL", note: "Memacu pembentukan ukuran buah dan ketebalan jaring net." },
      { hst: "HST 62", fertilizer: "Pematangan Gula", dose: "Pupuk Kalium Sulfat (SOP)", note: "Menaikkan akumulasi sukrosa dan brix buah melon." }
    ],
    pests: [
      {
        name: "Lalat Buah Melon (Bactrocera cucurbitae)",
        category: "Hama Buah",
        severity: "Kritis",
        symptoms: "Bintik tusukan cokelat pada kulit buah melon muda, buah retak mengeluarkan getah lalu busuk.",
        prevention: "Bungkus buah dengan jaring buah (fruit net bag) segera setelah diseleksi.",
        organicRecipe: "Pasang lem serangga kuning dan perangkap beraroma selai/petrogenol di luar greenhouse."
      },
      {
        name: "Embun Tepung (Powdery Mildew)",
        category: "Penyakit Jamur",
        severity: "Sedang",
        symptoms: "Permukaan daun dipenuhi serbuk putih seperti bedak, daun menguning lalu kering kecokelatan.",
        prevention: "Jaga kelembapan udara greenhouse tidak terlalu lembap dan sirkulasi kipas aktif.",
        organicRecipe: "Semprot larutan susu sapi segar (1 bagian susu + 9 bagian air) di bawah sinar matahari pagi."
      }
    ]
  }
};

// 2. STATE APLIKASI
const STORAGE_PREFIX = "agritimeline_task_";
let currentCropId = "cabai-rawit";
let plantingDateStr = getTodayDateString();
let activeTab = "timeline"; // 'timeline' | 'tasks' | 'care' | 'pests'

// Helper: format YYYY-MM-DD
function getTodayDateString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 3. INISIALISASI
document.addEventListener("DOMContentLoaded", () => {
  // Set default date input
  const dateInput = document.getElementById("plantingDateInput");
  if (dateInput) {
    dateInput.value = plantingDateStr;
    dateInput.addEventListener("change", (e) => {
      plantingDateStr = e.target.value || getTodayDateString();
      renderAll();
    });
  }

  // Event crop selector
  const cropSelect = document.getElementById("cropSelector");
  if (cropSelect) {
    cropSelect.addEventListener("change", (e) => {
      currentCropId = e.target.value;
      renderAll();
    });
  }

  // Tab switching buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Render awal
  renderAll();
});

// 4. LOGIKA PERHITUNGAN HST & PROGRESS
function getDaysSincePlanting(startDateStr) {
  const start = new Date(startDateStr);
  const now = new Date();
  // reset hours to midnight
  start.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffTime = now - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // Hari 1 = hari tanam
  return diffDays < 1 ? 1 : diffDays;
}

function calculateTargetDate(startDateStr, dayOffset) {
  const d = new Date(startDateStr);
  d.setDate(d.getDate() + (dayOffset - 1));
  const options = { day: "numeric", month: "short", year: "numeric" };
  return d.toLocaleDateString("id-ID", options);
}

// 5. RENDER UTAMA
function renderAll() {
  const crop = CROPS_DATABASE[currentCropId];
  if (!crop) return;

  const currentHST = getDaysSincePlanting(plantingDateStr);
  const totalDays = crop.totalDays;
  const progressPct = Math.min(100, Math.max(0, Math.round((currentHST / totalDays) * 100)));
  const harvestDate = calculateTargetDate(plantingDateStr, totalDays);

  // Update Header Banner
  document.getElementById("cropTitle").innerText = crop.name;
  document.getElementById("cropScientific").innerText = `${crop.scientificName} • ${crop.medium}`;
  document.getElementById("statHST").innerText = `HST ${currentHST}`;
  document.getElementById("statTotalDays").innerText = `/ ${totalDays} Hari`;
  document.getElementById("statProgressPct").innerText = `${progressPct}%`;
  document.getElementById("statProgressBar").style.width = `${progressPct}%`;
  document.getElementById("statHarvestDate").innerText = harvestDate;
  document.getElementById("cropSummary").innerText = crop.summary;

  // Render masing-masing tab
  renderTimelineTab(crop, currentHST);
  renderTasksTab(crop, currentHST);
  renderCareTab(crop);
  renderPestsTab(crop);

  // Update Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 6. RENDER TAB 1: TIMELINE BUDIDAYA
function renderTimelineTab(crop, currentHST) {
  const container = document.getElementById("timelineContent");
  container.innerHTML = "";

  crop.phases.forEach((phase, index) => {
    const isPast = currentHST > phase.endDay;
    const isActive = currentHST >= phase.startDay && currentHST <= phase.endDay;
    const isFuture = currentHST < phase.startDay;

    const startDateStr = calculateTargetDate(plantingDateStr, phase.startDay);
    const endDateStr = calculateTargetDate(plantingDateStr, phase.endDay);

    // Status styling
    let ringClass = "border-zinc-700 bg-zinc-900 text-zinc-400";
    let cardClass = "border-zinc-800 bg-zinc-900/60";
    let statusBadge = `<span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">Mendatang</span>`;

    if (isActive) {
      ringClass = "border-emerald-500 bg-emerald-950 text-emerald-400 ring-4 ring-emerald-500/20";
      cardClass = "border-emerald-500/50 bg-gradient-to-b from-emerald-950/40 to-zinc-900 shadow-lg shadow-emerald-950/20";
      statusBadge = `<span class="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>Sedang Berlangsung</span>`;
    } else if (isPast) {
      ringClass = "border-zinc-600 bg-zinc-800 text-zinc-300";
      cardClass = "border-zinc-800/80 bg-zinc-900/40 opacity-75";
      statusBadge = `<span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400">Selesai</span>`;
    }

    const card = document.createElement("div");
    card.className = "relative pl-8 sm:pl-10 pb-8 last:pb-0";

    card.innerHTML = `
      <!-- Timeline Connector Line -->
      ${index < crop.phases.length - 1 ? `<div class="absolute left-3.5 sm:left-4 top-8 bottom-0 w-0.5 bg-zinc-800"></div>` : ""}
      
      <!-- Timeline Dot / Icon -->
      <div class="absolute left-1.5 sm:left-2 top-0.5 w-5 h-5 rounded-full border-2 ${ringClass} flex items-center justify-center text-[10px] font-bold">
        ${isPast ? "✓" : index + 1}
      </div>

      <!-- Phase Card Content -->
      <div class="rounded-2xl border ${cardClass} p-4 sm:p-5 transition hover:border-zinc-700">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-semibold text-emerald-400">HST ${phase.startDay} - ${phase.endDay}</span>
            <span class="text-xs text-zinc-500">•</span>
            <span class="text-xs text-zinc-400">${startDateStr} – ${endDateStr}</span>
          </div>
          ${statusBadge}
        </div>

        <h3 class="text-base sm:text-lg font-bold text-white mb-2">
          ${phase.name}
        </h3>

        <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
          ${phase.description}
        </p>

        <!-- Mini Tasks Inside Phase -->
        <div class="space-y-1.5 pt-3 border-t border-zinc-800/80">
          <span class="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-1">Aktivitas Utama:</span>
          ${phase.tasks.map(t => `
            <div class="flex items-start gap-2 text-xs text-zinc-300">
              <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0"></i>
              <span><b class="text-zinc-400 font-mono">Hari ${t.day}:</b> ${t.label}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// 7. RENDER TAB 2: PROGRESS TRACKER & CHECKLIST
function renderTasksTab(crop, currentHST) {
  const container = document.getElementById("tasksContent");
  container.innerHTML = "";

  // Flatten all tasks
  let allTasks = [];
  crop.phases.forEach(phase => {
    phase.tasks.forEach(t => {
      allTasks.push({
        ...t,
        phaseName: phase.name,
        targetDate: calculateTargetDate(plantingDateStr, t.day)
      });
    });
  });

  // Calculate task completion
  const storageKey = STORAGE_PREFIX + crop.id;
  let savedTasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

  const completedCount = allTasks.filter(t => savedTasks.includes(t.id)).length;
  const taskPct = Math.round((completedCount / allTasks.length) * 100);

  // Header Task Progress
  const headerCard = document.createElement("div");
  headerCard.className = "bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4";
  headerCard.innerHTML = `
    <div>
      <span class="text-xs font-mono uppercase text-emerald-400 tracking-wider font-semibold block mb-0.5">Logbook & Checklist Lapangan</span>
      <h3 class="text-lg font-bold text-white">Progress Kegiatan Budidaya</h3>
      <p class="text-xs text-zinc-400 mt-0.5">${completedCount} dari ${allTasks.length} tugas praktikum telah diselesaikan.</p>
    </div>
    <div class="w-full sm:w-48 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-center flex items-center justify-between sm:flex-col sm:justify-center">
      <span class="text-2xl font-bold font-mono text-emerald-400">${taskPct}%</span>
      <span class="text-[10px] text-zinc-400 uppercase tracking-wider">Tuntas</span>
    </div>
  `;
  container.appendChild(headerCard);

  // Task List Items
  const listContainer = document.createElement("div");
  listContainer.className = "space-y-2.5";

  allTasks.forEach(task => {
    const isDone = savedTasks.includes(task.id);
    const isDue = currentHST >= task.day;

    const row = document.createElement("div");
    row.className = `p-3.5 sm:p-4 rounded-xl border transition flex items-start gap-3.5 cursor-pointer ${
      isDone 
        ? "bg-zinc-900/40 border-zinc-800/60 opacity-60" 
        : isDue 
        ? "bg-zinc-900 border-zinc-700/80 hover:border-emerald-500/60" 
        : "bg-zinc-950/60 border-zinc-900 hover:border-zinc-800"
    }`;

    row.innerHTML = `
      <div class="mt-0.5">
        <input 
          type="checkbox" 
          id="${task.id}" 
          ${isDone ? "checked" : ""} 
          class="w-4 h-4 rounded border-zinc-700 text-emerald-600 focus:ring-emerald-500 bg-zinc-800 cursor-pointer pointer-events-none"
        />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
          <span class="text-xs font-mono font-bold ${isDone ? "line-through text-zinc-500" : isDue ? "text-emerald-400" : "text-zinc-500"}">
            Hari ke-${task.day} • ${task.targetDate}
          </span>
          <span class="text-[10px] text-zinc-500 truncate">${task.phaseName}</span>
        </div>
        <p class="text-xs sm:text-sm font-medium ${isDone ? "line-through text-zinc-500" : "text-zinc-200"}">
          ${task.label}
        </p>
      </div>
    `;

    row.addEventListener("click", () => {
      toggleTaskCompletion(crop.id, task.id);
    });

    listContainer.appendChild(row);
  });

  container.appendChild(listContainer);
}

function toggleTaskCompletion(cropId, taskId) {
  const storageKey = STORAGE_PREFIX + cropId;
  let savedTasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

  if (savedTasks.includes(taskId)) {
    savedTasks = savedTasks.filter(id => id !== taskId);
  } else {
    savedTasks.push(taskId);
  }

  localStorage.setItem(storageKey, JSON.stringify(savedTasks));
  const currentHST = getDaysSincePlanting(plantingDateStr);
  renderTasksTab(CROPS_DATABASE[cropId], currentHST);

  if (window.lucide) window.lucide.createIcons();
}

// 8. RENDER TAB 3: PENYIRAMAN & PEMUPUKAN
function renderCareTab(crop) {
  const container = document.getElementById("careContent");
  container.innerHTML = "";

  const w = crop.watering;

  const card = document.createElement("div");
  card.className = "space-y-6";

  card.innerHTML = `
    <!-- Card Jadwal Penyiraman -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div class="flex items-center gap-2.5 mb-4">
        <div class="p-2 rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-400">
          <i data-lucide="droplets" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-xs font-mono uppercase text-blue-400 tracking-wider">Manajemen Air</span>
          <h3 class="text-lg font-bold text-white">Protokol Penyiraman Presisi</h3>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          <span class="text-[11px] text-zinc-500 block mb-1">Frekuensi & Waktu Optimal:</span>
          <p class="text-sm font-semibold text-zinc-200">${w.frequency}</p>
        </div>
        <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
          <span class="text-[11px] text-zinc-500 block mb-1">Takaran / Volume Air:</span>
          <p class="text-sm font-semibold text-zinc-200">${w.volume}</p>
        </div>
      </div>

      <div class="space-y-2.5 text-xs text-zinc-300">
        <div class="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/50 flex items-start gap-2.5">
          <i data-lucide="info" class="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"></i>
          <div><b class="text-zinc-200">Uji Kelembapan Tanah:</b> ${w.soilCheck}</div>
        </div>
        <div class="p-3 bg-amber-950/20 rounded-xl border border-amber-500/30 flex items-start gap-2.5">
          <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0"></i>
          <div><b class="text-amber-300">Aturan Krusial:</b> ${w.goldenRule}</div>
        </div>
      </div>
    </div>

    <!-- Card Kebutuhan Pemupukan -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div class="flex items-center gap-2.5 mb-4">
        <div class="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
          <i data-lucide="flask-conical" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-xs font-mono uppercase text-emerald-400 tracking-wider">Nutrisi & Unsur Hara</span>
          <h3 class="text-lg font-bold text-white">Kalender Dosis Pemupukan</h3>
        </div>
      </div>

      <div class="space-y-3">
        ${crop.fertilization.map((f, idx) => `
          <div class="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono font-bold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 text-emerald-400">
                ${f.hst}
              </span>
              <div>
                <h4 class="text-sm font-bold text-zinc-100">${f.fertilizer}</h4>
                <p class="text-xs text-zinc-400 mt-0.5">${f.dose}</p>
              </div>
            </div>
            <div class="text-[11px] text-zinc-500 max-w-xs text-left sm:text-right">
              ${f.note}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  container.appendChild(card);
}

// 9. RENDER TAB 4: IDENTIFIKASI HAMA & PENYAKIT
function renderPestsTab(crop) {
  const container = document.getElementById("pestsContent");
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 md:grid-cols-2 gap-4";

  crop.pests.forEach(pest => {
    const card = document.createElement("div");
    card.className = "bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-zinc-700 transition";

    const badgeColor = pest.severity === "Kritis" 
      ? "bg-red-950/80 text-red-300 border-red-500/50" 
      : pest.severity === "Tinggi"
      ? "bg-amber-950/80 text-amber-300 border-amber-500/50"
      : "bg-blue-950/80 text-blue-300 border-blue-500/50";

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[11px] text-zinc-400 font-mono">${pest.category}</span>
          <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${badgeColor}">
            Tingkat Bahaya: ${pest.severity}
          </span>
        </div>

        <h3 class="text-base font-bold text-white mb-2">
          ${pest.name}
        </h3>

        <!-- Gejala -->
        <div class="mb-3.5">
          <span class="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Gejala Serangan:</span>
          <p class="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
            ${pest.symptoms}
          </p>
        </div>

        <!-- Pencegahan & Pengendalian Organik -->
        <div class="space-y-2 text-xs">
          <div>
            <span class="text-[11px] text-emerald-400 font-semibold block mb-0.5">Langkah Preventif:</span>
            <p class="text-zinc-400">${pest.prevention}</p>
          </div>
          <div class="pt-2 border-t border-zinc-800">
            <span class="text-[11px] text-amber-400 font-semibold block mb-0.5">Resep Ramah Lingkungan (PHT):</span>
            <p class="text-zinc-300">${pest.organicRecipe}</p>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// 10. SWITCH TAB INTERACTION
function switchTab(tabId) {
  activeTab = tabId;

  // Toggle Tab Buttons UI
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add("bg-zinc-800", "text-white", "border-zinc-700");
      btn.classList.remove("text-zinc-400", "border-transparent");
    } else {
      btn.classList.remove("bg-zinc-800", "text-white", "border-zinc-700");
      btn.classList.add("text-zinc-400", "border-transparent");
    }
  });

  // Toggle Content Panels
  const panels = ["timeline", "tasks", "care", "pests"];
  panels.forEach(p => {
    const el = document.getElementById(`${p}Tab`);
    if (el) {
      if (p === tabId) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  });

  if (window.lucide) window.lucide.createIcons();
}
