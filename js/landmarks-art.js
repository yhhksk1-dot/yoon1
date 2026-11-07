/**
 * Generate beautifully styled, 100% standalone SVG artwork for Andong landmarks.
 * Guarantees zero 403 hotlink errors, zero broken images, works offline & on any mobile device.
 */

function generateLandmarkSVG(id) {
  const artworks = {
    'hahoe-village': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="sky_hahoe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1a365d" />
            <stop offset="60%" stop-color="#2b6cb0" />
            <stop offset="100%" stop-color="#e2e8f0" />
          </linearGradient>
          <linearGradient id="cliff" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4a5568" />
            <stop offset="100%" stop-color="#1a202c" />
          </linearGradient>
          <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#63b3ed" />
            <stop offset="50%" stop-color="#3182ce" />
            <stop offset="100%" stop-color="#2b6cb0" />
          </linearGradient>
        </defs>
        <!-- Sky -->
        <rect width="800" height="500" fill="url(#sky_hahoe)" />
        <circle cx="140" cy="110" r="45" fill="#fbd38d" opacity="0.9" />
        <!-- Buyongdae Cliff in background -->
        <path d="M 0,280 L 120,180 L 280,220 L 420,160 L 580,210 L 800,190 L 800,400 L 0,400 Z" fill="url(#cliff)" opacity="0.85" />
        <!-- Pine Forest (Mansongjeong) -->
        <path d="M 50,330 Q 80,270 110,330 Q 140,260 170,330 Q 210,250 250,330 Q 300,270 350,330 L 400,340 L 0,340 Z" fill="#22543d" />
        <!-- S-Shaped Nakdong River -->
        <path d="M 0,380 C 250,340 280,450 550,380 C 680,340 750,360 800,350 L 800,500 L 0,500 Z" fill="url(#river)" />
        <!-- Traditional Hanok Tile Roofs & Thatched Cottages -->
        <g transform="translate(420, 260)">
          <!-- Main Tile Head House (Yangjindang) -->
          <polygon points="120,40 10,75 230,75" fill="#2d3748" />
          <path d="M 0,75 Q 120,55 240,75 L 230,85 Q 120,68 10,85 Z" fill="#1a202c" />
          <rect x="35" y="85" width="170" height="50" fill="#eed9b7" />
          <rect x="55" y="95" width="30" height="40" fill="#744210" />
          <rect x="110" y="95" width="35" height="25" fill="#744210" />
          <rect x="165" y="95" width="25" height="40" fill="#744210" />
          <!-- Pillars -->
          <rect x="35" y="85" width="8" height="50" fill="#5c3818" />
          <rect x="100" y="85" width="8" height="50" fill="#5c3818" />
          <rect x="155" y="85" width="8" height="50" fill="#5c3818" />
          <rect x="200" y="85" width="8" height="50" fill="#5c3818" />
          <!-- Nearby Thatched Cottage (Choga) -->
          <ellipse cx="-40" cy="90" rx="65" ry="32" fill="#d69e2e" />
          <rect x="-80" y="95" width="80" height="40" fill="#e2d2b5" />
          <rect x="-60" y="105" width="22" height="30" fill="#744210" />
        </g>
        <!-- Overlay Badge Title -->
        <rect x="30" y="30" width="320" height="64" rx="8" fill="rgba(26, 32, 44, 0.85)" stroke="#ecc94b" stroke-width="1.5" />
        <text x="45" y="56" fill="#ecc94b" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">UNESCO WORLD HERITAGE</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">안동 하회마을 (Hahoe Village)</text>
      </svg>
    `,

    'byeongsan-seowon': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="sky_bs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2c5282" />
            <stop offset="100%" stop-color="#ebf8ff" />
          </linearGradient>
          <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#975a16" />
            <stop offset="100%" stop-color="#5c3818" />
          </linearGradient>
        </defs>
        <!-- Sky -->
        <rect width="800" height="500" fill="url(#sky_bs)" />
        <!-- Byeongsan Folding-screen Cliff in distance -->
        <path d="M 0,220 Q 200,120 400,190 Q 600,130 800,210 L 800,380 L 0,380 Z" fill="#4a5568" opacity="0.7" />
        <path d="M 0,250 C 250,220 550,280 800,240 L 800,390 L 0,390 Z" fill="#cbd5e0" />
        <!-- Famous 7-bay Mandaeru Pavilion (만대루) Framing -->
        <rect x="0" y="320" width="800" height="180" fill="#ecc94b" opacity="0.25" />
        <!-- Roof of Mandaeru -->
        <polygon points="400,25 20,110 780,110" fill="#1a202c" />
        <path d="M 0,110 Q 400,85 800,110 L 780,125 Q 400,100 20,125 Z" fill="#2d3748" />
        <!-- Wooden Floor Platform -->
        <rect x="40" y="330" width="720" height="30" fill="url(#wood)" />
        <!-- 7 Grand Natural Wooden Pillars framing nature -->
        <rect x="60" y="110" width="22" height="350" fill="url(#wood)" rx="4" />
        <rect x="170" y="110" width="20" height="350" fill="url(#wood)" rx="4" />
        <rect x="280" y="110" width="24" height="350" fill="url(#wood)" rx="4" />
        <rect x="390" y="110" width="20" height="350" fill="url(#wood)" rx="4" />
        <rect x="500" y="110" width="22" height="350" fill="url(#wood)" rx="4" />
        <rect x="610" y="110" width="20" height="350" fill="url(#wood)" rx="4" />
        <rect x="720" y="110" width="24" height="350" fill="url(#wood)" rx="4" />
        <!-- Vibrant Pink Crape Myrtle (Baegilhong 배롱나무꽃) in Bloom -->
        <circle cx="120" cy="220" r="45" fill="#ed64a6" opacity="0.85" />
        <circle cx="150" cy="200" r="35" fill="#f687b3" opacity="0.9" />
        <circle cx="670" cy="210" r="50" fill="#ed64a6" opacity="0.85" />
        <circle cx="640" cy="190" r="38" fill="#f687b3" opacity="0.9" />
        <!-- Badge -->
        <rect x="30" y="30" width="340" height="64" rx="8" fill="rgba(26, 32, 44, 0.85)" stroke="#ecc94b" stroke-width="1.5" />
        <text x="45" y="56" fill="#ecc94b" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">NATIONAL CONFUCIAN ACADEMY</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">병산서원 만대루 (Byeongsan Seowon)</text>
      </svg>
    `,

    'woryeonggyo-bridge': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="night_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0d1b2a" />
            <stop offset="60%" stop-color="#1b263b" />
            <stop offset="100%" stop-color="#415a77" />
          </linearGradient>
          <linearGradient id="bridge_glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#f6ad55" />
            <stop offset="50%" stop-color="#e53e3e" />
            <stop offset="100%" stop-color="#805ad5" />
          </linearGradient>
        </defs>
        <!-- Night Sky -->
        <rect width="800" height="500" fill="url(#night_sky)" />
        <!-- Moon -->
        <circle cx="680" cy="90" r="40" fill="#fefcbf" />
        <circle cx="680" cy="90" r="60" fill="#fefcbf" opacity="0.2" />
        <!-- Mountains Silhouette -->
        <path d="M 0,260 Q 200,180 450,240 Q 650,170 800,230 L 800,340 L 0,340 Z" fill="#0d1b2a" opacity="0.8" />
        <!-- Lake Water Reflection -->
        <rect x="0" y="320" width="800" height="180" fill="#0b132b" />
        <!-- Bridge Piers -->
        <g stroke="#1a202c" stroke-width="8">
          <line x1="80" y1="310" x2="80" y2="420" />
          <line x1="160" y1="300" x2="160" y2="420" />
          <line x1="240" y1="290" x2="240" y2="420" />
          <line x1="320" y1="285" x2="320" y2="420" />
          <line x1="480" y1="285" x2="480" y2="420" />
          <line x1="560" y1="290" x2="560" y2="420" />
          <line x1="640" y1="300" x2="640" y2="420" />
          <line x1="720" y1="310" x2="720" y2="420" />
        </g>
        <!-- Arched Wooden Footbridge Body -->
        <path d="M 0,340 Q 400,270 800,340" fill="none" stroke="#2d3748" stroke-width="14" />
        <path d="M 0,336 Q 400,266 800,336" fill="none" stroke="url(#bridge_glow)" stroke-width="6" />
        <!-- Center Pavilion: Yeongnakjeong (영락정) -->
        <g transform="translate(360, 205)">
          <polygon points="40,0 -15,40 95,40" fill="#2d3748" />
          <path d="M -25,40 Q 40,26 105,40 L 95,48 Q 40,34 -15,48 Z" fill="#e53e3e" />
          <rect x="0" y="48" width="80" height="35" fill="none" stroke="#ecc94b" stroke-width="3" />
          <line x1="10" y1="48" x2="10" y2="83" stroke="#975a16" stroke-width="5" />
          <line x1="70" y1="48" x2="70" y2="83" stroke="#975a16" stroke-width="5" />
          <circle cx="40" cy="62" r="12" fill="#ecc94b" opacity="0.9" />
        </g>
        <!-- Glowing Moon Boats (문보트) on the lake -->
        <g transform="translate(180, 390)">
          <path d="M 0,20 Q 25,-5 50,20 Z" fill="#ecc94b" />
          <ellipse cx="25" cy="28" rx="20" ry="4" fill="#ecc94b" opacity="0.4" />
        </g>
        <g transform="translate(560, 410)">
          <path d="M 0,16 Q 20,-4 40,16 Z" fill="#fc8181" />
          <ellipse cx="20" cy="22" rx="16" ry="4" fill="#fc8181" opacity="0.4" />
        </g>
        <!-- Badge -->
        <rect x="30" y="30" width="340" height="64" rx="8" fill="rgba(13, 27, 42, 0.85)" stroke="#63b3ed" stroke-width="1.5" />
        <text x="45" y="56" fill="#63b3ed" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">KOREA'S LONGEST WOODEN BRIDGE</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">월영교 달빛 야경 (Woryeonggyo)</text>
      </svg>
    `,

    'dosan-seowon': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="sky_ds" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1c4532" />
            <stop offset="60%" stop-color="#276749" />
            <stop offset="100%" stop-color="#9ae6b4" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#sky_ds)" />
        <!-- Pine Mountain Slopes -->
        <path d="M 0,180 L 160,110 L 320,160 L 520,90 L 800,170 L 800,420 L 0,420 Z" fill="#22543d" opacity="0.9" />
        <path d="M 0,350 C 300,320 500,380 800,340 L 800,500 L 0,500 Z" fill="#2c5282" />
        <!-- Scholar Yi Hwang's Humble Dosan Seodang Hall -->
        <g transform="translate(180, 240)">
          <polygon points="180,20 10,70 350,70" fill="#2d3748" />
          <rect x="40" y="70" width="280" height="90" fill="#eed9b7" />
          <!-- Hanok Windows & Paper Doors -->
          <rect x="70" y="85" width="60" height="60" fill="#fffaf0" stroke="#744210" stroke-width="3" />
          <rect x="150" y="85" width="60" height="60" fill="#fffaf0" stroke="#744210" stroke-width="3" />
          <rect x="230" y="85" width="60" height="60" fill="#fffaf0" stroke="#744210" stroke-width="3" />
          <!-- Wooden Pillars -->
          <rect x="40" y="70" width="12" height="90" fill="#5c3818" />
          <rect x="135" y="70" width="10" height="90" fill="#5c3818" />
          <rect x="215" y="70" width="10" height="90" fill="#5c3818" />
          <rect x="308" y="70" width="12" height="90" fill="#5c3818" />
        </g>
        <!-- Sisadan (Royal Exam Island) rising from lake -->
        <g transform="translate(580, 310)">
          <ellipse cx="60" cy="50" rx="70" ry="20" fill="#744210" />
          <polygon points="60,0 20,30 100,30" fill="#1a202c" />
          <rect x="35" y="30" width="50" height="20" fill="#e2d2b5" />
        </g>
        <!-- Badge -->
        <rect x="30" y="30" width="340" height="64" rx="8" fill="rgba(26, 32, 44, 0.85)" stroke="#68d391" stroke-width="1.5" />
        <text x="45" y="56" fill="#68d391" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">SANCTUARY OF SAGE YI HWANG (1,000 KRW)</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">도산서원 (Dosan Seowon)</text>
      </svg>
    `,

    'bongjeongsa-temple': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="temple_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4a5568" />
            <stop offset="60%" stop-color="#718096" />
            <stop offset="100%" stop-color="#edf2f7" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#temple_bg)" />
        <!-- Mount Cheondeung -->
        <path d="M 0,220 Q 250,90 500,160 Q 680,120 800,200 L 800,450 L 0,450 Z" fill="#2d3748" opacity="0.8" />
        <!-- Geungnakjeon Hall (Oldest Wooden Structure in Korea) -->
        <g transform="translate(180, 200)">
          <!-- Curved Roof -->
          <polygon points="220,10 10,75 430,75" fill="#1a202c" />
          <path d="M 0,75 Q 220,50 440,75 L 420,88 Q 220,65 20,88 Z" fill="#c53030" />
          <rect x="40" y="88" width="360" height="130" fill="#d69e2e" opacity="0.85" />
          <!-- Ancient Column Entasis (배흘림기둥) -->
          <ellipse cx="60" cy="150" rx="14" ry="60" fill="#744210" />
          <ellipse cx="170" cy="150" rx="14" ry="60" fill="#744210" />
          <ellipse cx="270" cy="150" rx="14" ry="60" fill="#744210" />
          <ellipse cx="380" cy="150" rx="14" ry="60" fill="#744210" />
          <!-- Temple Lattice Doors -->
          <rect x="90" y="110" width="60" height="85" fill="#fffaf0" stroke="#744210" stroke-width="3" />
          <rect x="195" y="110" width="60" height="85" fill="#fffaf0" stroke="#744210" stroke-width="3" />
          <rect x="300" y="110" width="60" height="85" fill="#fffaf0" stroke="#744210" stroke-width="3" />
        </g>
        <!-- Badge -->
        <rect x="30" y="30" width="340" height="64" rx="8" fill="rgba(26, 32, 44, 0.85)" stroke="#ecc94b" stroke-width="1.5" />
        <text x="45" y="56" fill="#ecc94b" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">OLDEST TIMBER BUILDING IN KOREA</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">봉정사 극락전 (Bongjeongsa Temple)</text>
      </svg>
    `,

    'andong-gu-market': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="jjimdak_bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2d1b00" />
            <stop offset="50%" stop-color="#742a2a" />
            <stop offset="100%" stop-color="#1a1005" />
          </linearGradient>
          <radialGradient id="pan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#744210" />
            <stop offset="70%" stop-color="#4a2808" />
            <stop offset="100%" stop-color="#1a202c" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#jjimdak_bg)" />
        <!-- Big Sizzling Cast Iron Wok (무쇠 솥) -->
        <circle cx="400" cy="270" r="190" fill="url(#pan)" stroke="#2d3748" stroke-width="16" />
        <!-- Steaming Glass Noodles (당면) -->
        <path d="M 280,260 Q 340,210 420,270 Q 480,310 520,240" stroke="#fbd38d" stroke-width="8" fill="none" opacity="0.8" />
        <path d="M 300,290 Q 390,320 450,250 Q 500,220 510,290" stroke="#fbd38d" stroke-width="7" fill="none" opacity="0.8" />
        <!-- Tender Braised Chicken Pieces -->
        <ellipse cx="340" cy="240" rx="36" ry="24" fill="#9c4221" />
        <ellipse cx="450" cy="250" rx="42" ry="26" fill="#9c4221" />
        <ellipse cx="380" cy="300" rx="38" ry="25" fill="#7b341e" />
        <!-- Hearty Potatoes & Carrots -->
        <circle cx="320" cy="300" r="22" fill="#d69e2e" />
        <circle cx="470" cy="290" r="24" fill="#dd6b20" />
        <!-- Sliced Dried Red Chili Peppers (안동 건고추) -->
        <rect x="360" y="220" width="28" height="9" rx="4" fill="#e53e3e" transform="rotate(25, 360, 220)" />
        <rect x="420" y="280" width="30" height="9" rx="4" fill="#e53e3e" transform="rotate(-30, 420, 280)" />
        <rect x="390" y="260" width="25" height="8" rx="4" fill="#38a169" transform="rotate(45, 390, 260)" />
        <!-- Sizzling Steam Waves -->
        <path d="M 360,160 Q 370,120 360,80" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.4" />
        <path d="M 400,150 Q 415,110 400,70" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.5" />
        <path d="M 440,160 Q 430,120 440,80" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.4" />
        <!-- Badge -->
        <rect x="30" y="30" width="340" height="64" rx="8" fill="rgba(26, 32, 44, 0.85)" stroke="#dd6b20" stroke-width="1.5" />
        <text x="45" y="56" fill="#fbd38d" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">AUTHENTIC LOCAL DELICACY</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">안동 구시장 찜닭골목 (Jjimdak)</text>
      </svg>
    `,

    'hahoe-mask-museum': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="mask_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#742a2a" />
            <stop offset="100%" stop-color="#1a202c" />
          </linearGradient>
          <linearGradient id="mask_wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ecc94b" />
            <stop offset="100%" stop-color="#b7791f" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#mask_bg)" />
        <!-- The Laughing Aristocrat Mask (Yangban-tal 양반탈) -->
        <g transform="translate(400, 240)">
          <!-- Black Joseon Hat (Gat 갓) -->
          <ellipse cx="0" cy="-110" rx="140" ry="25" fill="#1a202c" />
          <rect x="-50" y="-170" width="100" height="70" fill="#1a202c" rx="4" />
          <!-- Carved Wooden Face -->
          <ellipse cx="0" cy="0" rx="95" ry="115" fill="url(#mask_wood)" stroke="#744210" stroke-width="4" />
          <!-- Eyebrows & Wrinkles of Laughter -->
          <path d="M -60,-35 Q -30,-55 0,-35 Q 30,-55 60,-35" stroke="#5c3818" stroke-width="6" fill="none" stroke-linecap="round" />
          <!-- Smiling Crescent Eyes (실눈) -->
          <path d="M -55,-15 Q -30,5 -5,-15" stroke="#1a202c" stroke-width="7" fill="none" stroke-linecap="round" />
          <path d="M 5,-15 Q 30,5 55,-15" stroke="#1a202c" stroke-width="7" fill="none" stroke-linecap="round" />
          <!-- Broad Nose -->
          <path d="M -15,10 Q 0,-5 15,10 Q 0,25 -15,10 Z" fill="#975a16" />
          <!-- Wide Open Laughing Jaw (분리된 턱) -->
          <path d="M -45,45 Q 0,105 45,45 Z" fill="#1a202c" />
          <path d="M -40,48 Q 0,65 40,48" stroke="#ffffff" stroke-width="8" stroke-linecap="round" fill="none" />
        </g>
        <!-- Badge -->
        <rect x="30" y="30" width="340" height="64" rx="8" fill="rgba(26, 32, 44, 0.85)" stroke="#ecc94b" stroke-width="1.5" />
        <text x="45" y="56" fill="#ecc94b" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">NATIONAL INTANGIBLE TREASURE</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">하회세계탈박물관 (Hahoe Mask)</text>
      </svg>
    `,

    'nakgang-mulgil-park': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
        <defs>
          <linearGradient id="forest_sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#234e52" />
            <stop offset="60%" stop-color="#285e61" />
            <stop offset="100%" stop-color="#b2f5ea" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#forest_sky)" />
        <!-- Towering Metasequoia Trees -->
        <g fill="#234e52">
          <polygon points="120,50 80,360 160,360" />
          <polygon points="220,30 180,360 260,360" fill="#285e61" />
          <polygon points="320,60 280,360 360,360" />
          <polygon points="560,40 520,360 600,360" fill="#285e61" />
          <polygon points="660,70 620,360 700,360" />
        </g>
        <!-- Mirror Pond Reflection (Korea's Monet Garden) -->
        <rect x="0" y="340" width="800" height="160" fill="#1d4044" />
        <!-- Stepping Stones across Pond (징검다리) -->
        <ellipse cx="260" cy="410" rx="30" ry="14" fill="#a0aec0" stroke="#718096" stroke-width="3" />
        <ellipse cx="340" cy="395" rx="32" ry="15" fill="#cbd5e0" stroke="#718096" stroke-width="3" />
        <ellipse cx="420" cy="405" rx="34" ry="16" fill="#e2e8f0" stroke="#718096" stroke-width="3" />
        <ellipse cx="500" cy="390" rx="30" ry="14" fill="#cbd5e0" stroke="#718096" stroke-width="3" />
        <!-- Water Fountain Powered by Dam Pressure -->
        <path d="M 400,340 Q 380,220 370,160 Q 400,240 400,340 Q 420,230 430,170 Q 410,250 400,340" fill="#e6fffa" opacity="0.75" />
        <!-- Badge -->
        <rect x="30" y="30" width="340" height="64" rx="8" fill="rgba(26, 32, 44, 0.85)" stroke="#81e6d9" stroke-width="1.5" />
        <text x="45" y="56" fill="#81e6d9" font-size="13" font-weight="bold" font-family="sans-serif" letter-spacing="1.5">SECRET FOREST & MONET GARDEN</text>
        <text x="45" y="80" fill="#ffffff" font-size="18" font-weight="900" font-family="sans-serif">낙강물길공원 (Nakgang Mulgil)</text>
      </svg>
    `
  };

  const svg = artworks[id];
  if (!svg) return '';
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg.trim());
}

