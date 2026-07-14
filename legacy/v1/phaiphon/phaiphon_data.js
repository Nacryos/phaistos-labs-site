// PhaiPhon Visualization Data
// Auto-generated from ProjectPhaistos research outputs
// Linear A decipherment candidate analysis

window.PHAIPHON_DATA = {

  // ================================================================
  // LINEAR A SYLLABARY (34 signs + 1 special = 35 total)
  // ================================================================
  signs: [
    { id: "a", ipa: "a", display: "A", cls: "vowel" },
    { id: "e", ipa: "e", display: "E", cls: "vowel" },
    { id: "i", ipa: "i", display: "I", cls: "vowel" },
    { id: "u", ipa: "u", display: "U", cls: "vowel" },
    { id: "da", ipa: "da", display: "DA", cls: "cv" },
    { id: "di", ipa: "di", display: "DI", cls: "cv" },
    { id: "ja", ipa: "ja", display: "JA", cls: "cv" },
    { id: "ka", ipa: "ka", display: "KA", cls: "cv" },
    { id: "ke", ipa: "ke", display: "KE", cls: "cv" },
    { id: "ki", ipa: "ki", display: "KI", cls: "cv" },
    { id: "ma", ipa: "ma", display: "MA", cls: "cv" },
    { id: "me", ipa: "me", display: "ME", cls: "cv" },
    { id: "na", ipa: "na", display: "NA", cls: "cv" },
    { id: "ni", ipa: "ni", display: "NI", cls: "cv" },
    { id: "nu", ipa: "nu", display: "NU", cls: "cv" },
    { id: "nwa", ipa: "nwa", display: "NWA", cls: "cv" },
    { id: "pi", ipa: "pi", display: "PI", cls: "cv" },
    { id: "ra", ipa: "ra", display: "RA", cls: "cv" },
    { id: "re", ipa: "re", display: "RE", cls: "cv" },
    { id: "ri", ipa: "ri", display: "RI", cls: "cv" },
    { id: "ru", ipa: "ru", display: "RU", cls: "cv" },
    { id: "sa", ipa: "sa", display: "SA", cls: "cv" },
    { id: "se", ipa: "se", display: "SE", cls: "cv" },
    { id: "si", ipa: "si", display: "SI", cls: "cv" },
    { id: "ta", ipa: "ta", display: "TA", cls: "cv" },
    { id: "te", ipa: "te", display: "TE", cls: "cv" },
    { id: "ti", ipa: "ti", display: "TI", cls: "cv" },
    { id: "to", ipa: "to", display: "TO", cls: "cv" },
    { id: "tu", ipa: "tu", display: "TU", cls: "cv" },
    { id: "wa", ipa: "wa", display: "WA", cls: "cv" },
    { id: "wi", ipa: "wi", display: "WI", cls: "cv" },
    { id: "za", ipa: "za", display: "ZA", cls: "cv" },
    { id: "*301", ipa: "\u0398", display: "*301 (\u0398)", cls: "undeciphered" },
    { id: "*56", ipa: "\u03a6", display: "PA\u2083 (\u03a6)", cls: "undeciphered" },
  ],

  // ================================================================
  // LINEAR A VOCABULARY (73 unique words from Za-category inscriptions)
  // signs[] lists constituent sign IDs for decomposition edges
  // ================================================================
  words: [
    { id: "a_w", display: "A", ipa: "a", signs: ["a"], freq: 3 },
    { id: "adikite", display: "A-DI-KI-TE", ipa: "adikite", signs: ["a","di","ki","te"], freq: 1 },
    { id: "adikitete", display: "A-DI-KI-TE-TE", ipa: "adikitete", signs: ["a","di","ki","te"], freq: 1 },
    { id: "aja", display: "A-JA", ipa: "aja", signs: ["a","ja"], freq: 1 },
    { id: "anatiTwaja", display: "A-NA-TI-*301-WA-JA", ipa: "anati\u0398waja", signs: ["a","na","ti","*301","wa","ja"], freq: 1 },
    { id: "asasara", display: "A-SA-SA-RA", ipa: "asasara", signs: ["a","sa","ra"], freq: 1 },
    { id: "ataiTwae", display: "A-TA-I-*301-WA-E", ipa: "atai\u0398wae", signs: ["a","ta","i","*301","wa","e"], freq: 1 },
    { id: "ataiTwaja", display: "A-TA-I-*301-WA-JA", ipa: "atai\u0398waja", signs: ["a","ta","i","*301","wa","ja"], freq: 12 },
    { id: "dada", display: "DA-DA", ipa: "dada", signs: ["da"], freq: 2 },
    { id: "damate", display: "DA-MA-TE", ipa: "damate", signs: ["da","ma","te"], freq: 1 },
    { id: "daserate", display: "DA-SE-RA-TE", ipa: "daserate", signs: ["da","se","ra","te"], freq: 1 },
    { id: "dawa", display: "DA-WA", ipa: "dawa", signs: ["da","wa"], freq: 1 },
    { id: "di_w", display: "DI", ipa: "di", signs: ["di"], freq: 1 },
    { id: "i_w", display: "I", ipa: "i", signs: ["i"], freq: 3 },
    { id: "ida", display: "I-DA", ipa: "ida", signs: ["i","da"], freq: 3 },
    { id: "idaa", display: "I-DA-A", ipa: "idaa", signs: ["i","da","a"], freq: 1 },
    { id: "idi", display: "I-DI", ipa: "idi", signs: ["i","di"], freq: 1 },
    { id: "ija", display: "I-JA", ipa: "ija", signs: ["i","ja"], freq: 1 },
    { id: "ijaredija", display: "I-JA-RE-DI-JA", ipa: "ijaredija", signs: ["i","ja","re","di"], freq: 1 },
    { id: "inaida", display: "I-NA-I-DA", ipa: "inaida", signs: ["i","na","da"], freq: 2 },
    { id: "inajareta", display: "I-NA-JA-RE-TA", ipa: "inajareta", signs: ["i","na","ja","re","ta"], freq: 1 },
    { id: "ipi", display: "I-PI", ipa: "ipi", signs: ["i","pi"], freq: 1 },
    { id: "ipinama", display: "I-PI-NA-MA", ipa: "ipinama", signs: ["i","pi","na","ma"], freq: 6 },
    { id: "iti", display: "I-TI", ipa: "iti", signs: ["i","ti"], freq: 1 },
    { id: "ja_w", display: "JA", ipa: "ja", signs: ["ja"], freq: 3 },
    { id: "jadikitu", display: "JA-DI-KI-TU", ipa: "jadikitu", signs: ["ja","di","ki","tu"], freq: 1 },
    { id: "jainwaza", display: "JA-I-NWA-ZA", ipa: "jainwaza", signs: ["ja","i","nwa","za"], freq: 1 },
    { id: "jaja", display: "JA-JA", ipa: "jaja", signs: ["ja"], freq: 2 },
    { id: "jasa", display: "JA-SA", ipa: "jasa", signs: ["ja","sa"], freq: 1 },
    { id: "jasasa", display: "JA-SA-SA", ipa: "jasasa", signs: ["ja","sa"], freq: 1 },
    { id: "jasasara", display: "JA-SA-SA-RA", ipa: "jasasara", signs: ["ja","sa","ra"], freq: 2 },
    { id: "jasasarama", display: "JA-SA-SA-RA-MA", ipa: "jasasarama", signs: ["ja","sa","ra","ma"], freq: 1 },
    { id: "jasasarame", display: "JA-SA-SA-RA-ME", ipa: "jasasarame", signs: ["ja","sa","ra","me"], freq: 7 },
    { id: "jasaunakanasi", display: "JA-SA-U-NA-KA-NA-SI", ipa: "jasaunakanasi", signs: ["ja","sa","u","na","ka","si"], freq: 1 },
    { id: "jataiTuja", display: "JA-TA-I-*301-U-JA", ipa: "jatai\u0398uja", signs: ["ja","ta","i","*301","u"], freq: 1 },
    { id: "jawa", display: "JA-WA", ipa: "jawa", signs: ["ja","wa"], freq: 1 },
    { id: "jawaP", display: "JA-WA-PA\u2083", ipa: "jawa\u03a6", signs: ["ja","wa","*56"], freq: 1 },
    { id: "mai", display: "MA-I", ipa: "mai", signs: ["ma","i"], freq: 1 },
    { id: "me_w", display: "ME", ipa: "me", signs: ["me"], freq: 2 },
    { id: "na_w", display: "NA", ipa: "na", signs: ["na"], freq: 2 },
    { id: "nasi", display: "NA-SI", ipa: "nasi", signs: ["na","si"], freq: 1 },
    { id: "nu_w", display: "NU", ipa: "nu", signs: ["nu"], freq: 1 },
    { id: "piteri", display: "PI-TE-RI", ipa: "piteri", signs: ["pi","te","ri"], freq: 1 },
    { id: "rame", display: "RA-ME", ipa: "rame", signs: ["ra","me"], freq: 1 },
    { id: "re_w", display: "RE", ipa: "re", signs: ["re"], freq: 1 },
    { id: "reike", display: "RE-I-KE", ipa: "reike", signs: ["re","i","ke"], freq: 1 },
    { id: "reja", display: "RE-JA", ipa: "reja", signs: ["re","ja"], freq: 1 },
    { id: "ridau", display: "RI-DA-U", ipa: "ridau", signs: ["ri","da","u"], freq: 1 },
    { id: "sarame", display: "SA-RA-ME", ipa: "sarame", signs: ["sa","ra","me"], freq: 2 },
    { id: "sasarame", display: "SA-SA-RA-ME", ipa: "sasarame", signs: ["sa","ra","me"], freq: 1 },
    { id: "sekanasi", display: "SE-KA-NA-SI", ipa: "sekanasi", signs: ["se","ka","na","si"], freq: 1 },
    { id: "setoija", display: "SE-TO-I-JA", ipa: "setoija", signs: ["se","to","i","ja"], freq: 1 },
    { id: "si_w", display: "SI", ipa: "si", signs: ["si"], freq: 2 },
    { id: "siru", display: "SI-RU", ipa: "siru", signs: ["si","ru"], freq: 1 },
    { id: "sirute", display: "SI-RU-TE", ipa: "sirute", signs: ["si","ru","te"], freq: 7 },
    { id: "tanaiTti", display: "TA-NA-I-*301-TI", ipa: "tanai\u0398ti", signs: ["ta","na","i","*301","ti"], freq: 1 },
    { id: "tanaiTutinu", display: "TA-NA-I-*301-U-TI-NU", ipa: "tanai\u0398utinu", signs: ["ta","na","i","*301","u","ti","nu"], freq: 1 },
    { id: "tanarateutinu", display: "TA-NA-RA-TE-U-TI-NU", ipa: "tanarateutinu", signs: ["ta","na","ra","te","u","ti","nu"], freq: 1 },
    { id: "te_w", display: "TE", ipa: "te", signs: ["te"], freq: 1 },
    { id: "tosa", display: "TO-SA", ipa: "tosa", signs: ["to","sa"], freq: 1 },
    { id: "tume", display: "TU-ME", ipa: "tume", signs: ["tu","me"], freq: 1 },
    { id: "tumei", display: "TU-ME-I", ipa: "tumei", signs: ["tu","me","i"], freq: 1 },
    { id: "turusa", display: "TU-RU-SA", ipa: "turusa", signs: ["tu","ru","sa"], freq: 1 },
    { id: "unaka", display: "U-NA-KA", ipa: "unaka", signs: ["u","na","ka"], freq: 1 },
    { id: "unakana", display: "U-NA-KA-NA", ipa: "unakana", signs: ["u","na","ka"], freq: 1 },
    { id: "unakanasi", display: "U-NA-KA-NA-SI", ipa: "unakanasi", signs: ["u","na","ka","si"], freq: 5 },
    { id: "unarukajasi", display: "U-NA-RU-KA-JA-SI", ipa: "unarukajasi", signs: ["u","na","ru","ka","ja","si"], freq: 1 },
    { id: "unarukanasi", display: "U-NA-RU-KA-NA-SI", ipa: "unarukanasi", signs: ["u","na","ru","ka","na","si"], freq: 2 },
    { id: "unarukanati", display: "U-NA-RU-KA-NA-TI", ipa: "unarukanati", signs: ["u","na","ru","ka","ti"], freq: 1 },
    { id: "utinu", display: "U-TI-NU", ipa: "utinu", signs: ["u","ti","nu"], freq: 2 },
    { id: "Twa", display: "*301-WA", ipa: "\u0398wa", signs: ["*301","wa"], freq: 1 },
    { id: "Pe", display: "PA\u2083-E", ipa: "\u03a6e", signs: ["*56","e"], freq: 1 },
    { id: "Pniwi", display: "PA\u2083-NI-WI", ipa: "\u03a6niwi", signs: ["*56","ni","wi"], freq: 1 },
  ],

  // ================================================================
  // INSCRIPTIONS (48 Za-category texts)
  // ================================================================
  inscriptions: [
    { id: "za01", words: ["jataiTuja"], text: "jatai\u0398uja" },
    { id: "za02", words: ["nasi","ipinama","inajareta"], text: "nasi ipinama inajareta" },
    { id: "za03", words: ["na_w","dada","utinu","inaida","jasa","sarame","iti","mai","sirute","idi","ipinama","sirute","jasasara","me_w","unarukanasi"], text: "na dada utinu inaida jasa sarame iti mai sirute idi ipinama sirute jasasara me unarukanasi" },
    { id: "za04", words: ["ataiTwaja","jadikitu","jasasarame","unakanasi","ipinama","sirute","tanarateutinu","i_w"], text: "atai\u0398waja jadikitu jasasarame unakanasi ipinama sirute tanarateutinu i" },
    { id: "za05", words: ["ataiTwaja"], text: "atai\u0398waja" },
    { id: "za06", words: ["Twa"], text: "\u0398wa" },
    { id: "za07", words: ["ijaredija"], text: "ijaredija" },
    { id: "za08", words: ["tanaiTutinu","jasasarame"], text: "tanai\u0398utinu jasasarame" },
    { id: "za09", words: ["ataiTwaja"], text: "atai\u0398waja" },
    { id: "za10", words: ["anatiTwaja"], text: "anati\u0398waja" },
    { id: "za11", words: ["jasasarame","unakanasi"], text: "jasasarame unakanasi" },
    { id: "za12", words: ["na_w","dada","utinu","inaida"], text: "na dada utinu inaida" },
    { id: "za13", words: ["jasa","sarame","iti"], text: "jasa sarame iti" },
    { id: "za14", words: ["mai"], text: "mai" },
    { id: "za15", words: ["sirute","idi"], text: "sirute idi" },
    { id: "za16", words: ["ipinama","sirute"], text: "ipinama sirute" },
    { id: "za17", words: ["jasasara","me_w","unarukanasi"], text: "jasasara me unarukanasi" },
    { id: "za18", words: ["a_w","i_w"], text: "a i" },
    { id: "za19", words: ["jasasarama","na_w","dawa","ija"], text: "jasasarama na dawa ija" },
    { id: "za20", words: ["ja_w","ja_w","jawa"], text: "ja ja jawa" },
    { id: "za21", words: ["ataiTwaja","turusa","idaa","unakanasi","ipinama","sirute"], text: "atai\u0398waja turusa idaa unakanasi ipinama sirute" },
    { id: "za22", words: ["damate"], text: "damate" },
    { id: "za23", words: ["ridau"], text: "ridau" },
    { id: "za24", words: ["ida"], text: "ida" },
    { id: "za25", words: ["asasara"], text: "asasara" },
    { id: "za26", words: ["nu_w","Pe","tumei","jasaunakanasi","ipi"], text: "nu \u03a6e tumei jasaunakanasi ipi" },
    { id: "za27", words: ["di_w"], text: "di" },
    { id: "za28", words: ["si_w","si_w"], text: "si si" },
    { id: "za29", words: ["ataiTwae","adikitete","re_w","piteri","a_w","sasarame","unarukanati","siru"], text: "atai\u0398wae adikitete re piteri a sasarame unarukanati siru" },
    { id: "za30", words: ["ataiTwaja","adikite","si_w","rame","unarukajasi","ja_w"], text: "atai\u0398waja adikite si rame unarukajasi ja" },
    { id: "za31", words: ["tume","i_w","jasasa"], text: "tume i jasasa" },
    { id: "za32", words: ["tosa","reja"], text: "tosa reja" },
    { id: "za33", words: ["ida"], text: "ida" },
    { id: "za34", words: ["te_w","ida","jaja"], text: "te ida jaja" },
    { id: "za35", words: ["unaka"], text: "unaka" },
    { id: "za36", words: ["jasasarame","unakanasi"], text: "jasasarame unakanasi" },
    { id: "za37", words: ["setoija"], text: "setoija" },
    { id: "za38", words: ["reike","tanaiTti","jasasarame"], text: "reike tanai\u0398ti jasasarame" },
    { id: "za39", words: ["ataiTwaja","ja_w","a_w"], text: "atai\u0398waja ja a" },
    { id: "za40", words: ["ataiTwaja","aja"], text: "atai\u0398waja aja" },
    { id: "za41", words: ["ataiTwaja","sekanasi","sirute"], text: "atai\u0398waja sekanasi sirute" },
    { id: "za42", words: ["ataiTwaja","jainwaza","Pniwi"], text: "atai\u0398waja jainwaza \u03a6niwi" },
    { id: "za43", words: ["jawaP"], text: "jawa\u03a6" },
    { id: "za44", words: ["daserate"], text: "daserate" },
    { id: "za45", words: ["ataiTwaja","jaja"], text: "atai\u0398waja jaja" },
    { id: "za46", words: ["a_w"], text: "a" },
    { id: "za47", words: ["ataiTwaja","jasasarame","unakana","ipinama","sirute"], text: "atai\u0398waja jasasarame unakana ipinama sirute" },
    { id: "za48", words: ["ipinama","sirute"], text: "ipinama sirute" },
  ],

  // ================================================================
  // CANDIDATE LANGUAGES (16 total, all from 3000-step production run)
  //
  // CRITICAL CAVEAT: All z-scores and Bayes factors below use a PLACEHOLDER
  // null distribution (mu=0.05, sigma=0.03) that is far too tight. This
  // causes ALL candidates — including obvious negatives like Turkish and
  // Finnish — to show "Strong" or "Decisive" evidence. Preliminary
  // recalibration with 4 Tier-3 negatives (mu=0.253, sigma=0.040) found
  // NO candidate reaches significance after Bonferroni correction.
  // The raw closeness scores are from a converged 3000-step run and are
  // valid relative to each other, but their statistical significance
  // CANNOT be assessed until proper null calibration is completed.
  // ================================================================
  candidates: [
    // Tier 1: Bronze Age contemporaries
    {
      id: "AncientGreek", family: "indo_european", branch: "hellenic", tier: 1,
      phyloNodeId: "lang_ancient_greek",
      closeness: 0.139, z_score_uncalibrated: 2.98, p_value_uncalibrated: 1.44e-3,
      phylo_plausibility: 0.854, regularity: 0.514,
      bayes_factor_uncalibrated: 3.70, composite_score_uncalibrated: 1.31,
      interpretation: "Lowest closeness of all 16 candidates; below null with preliminary recalibration (z=-2.82)",
      displayColor: [0.10, 0.85, 0.65],
    },
    {
      id: "Akkadian", family: "semitic", branch: "east_semitic", tier: 1,
      phyloNodeId: "lang_akkadian",
      closeness: 0.270, z_score_uncalibrated: 7.34, p_value_uncalibrated: 1.07e-13,
      phylo_plausibility: 0.929, regularity: 0.763,
      bayes_factor_uncalibrated: 181.18, composite_score_uncalibrated: 5.20,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.06, 0.82, 0.55],
    },
    {
      id: "Egyptian", family: "afroasiatic", branch: "egyptian", tier: 1,
      phyloNodeId: "lang_ancient_egyptian",
      closeness: 0.287, z_score_uncalibrated: 7.89, p_value_uncalibrated: 1.53e-15,
      phylo_plausibility: 0.813, regularity: 0.709,
      bayes_factor_uncalibrated: 94.22, composite_score_uncalibrated: 4.55,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.08, 0.78, 0.50],
    },
    {
      id: "Hebrew", family: "semitic", branch: "west_semitic", tier: 1,
      phyloNodeId: "lang_biblical_hebrew",
      closeness: 0.249, z_score_uncalibrated: 6.63, p_value_uncalibrated: 1.65e-11,
      phylo_plausibility: 0.860, regularity: 0.532,
      bayes_factor_uncalibrated: 20.79, composite_score_uncalibrated: 3.03,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.04, 0.90, 0.50],
    },
    {
      id: "Coptic", family: "afroasiatic", branch: "egyptian", tier: 1,
      phyloNodeId: "lang_coptic",
      closeness: 0.335, z_score_uncalibrated: 9.49, p_value_uncalibrated: 1.20e-21,
      phylo_plausibility: 0.760, regularity: 0.533,
      bayes_factor_uncalibrated: 46.45, composite_score_uncalibrated: 3.84,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.07, 0.75, 0.48],
    },
    // Tier 2: Mediterranean / Near Eastern
    {
      id: "Arabic", family: "semitic", branch: "central_semitic", tier: 2,
      phyloNodeId: "lang_classical_arabic",
      closeness: 0.288, z_score_uncalibrated: 7.93, p_value_uncalibrated: 1.06e-15,
      phylo_plausibility: 0.926, regularity: 0.753,
      bayes_factor_uncalibrated: 252.11, composite_score_uncalibrated: 5.53,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.05, 0.85, 0.52],
    },
    {
      id: "Aramaic", family: "semitic", branch: "nw_semitic", tier: 2,
      phyloNodeId: "lang_old_aramaic",
      closeness: 0.339, z_score_uncalibrated: 9.65, p_value_uncalibrated: 2.55e-22,
      phylo_plausibility: 0.920, regularity: 0.732,
      bayes_factor_uncalibrated: 663.22, composite_score_uncalibrated: 6.50,
      interpretation: "Highest composite (uncalibrated); with preliminary recalibration z=+2.14 (not significant after Bonferroni)",
      displayColor: [0.05, 0.80, 0.50],
    },
    {
      id: "Latin", family: "indo_european", branch: "italic", tier: 2,
      phyloNodeId: "lang_latin",
      closeness: 0.320, z_score_uncalibrated: 8.98, p_value_uncalibrated: 1.31e-19,
      phylo_plausibility: 0.884, regularity: 0.615,
      bayes_factor_uncalibrated: 132.28, composite_score_uncalibrated: 4.88,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.00, 0.85, 0.55],
    },
    {
      id: "Sanskrit", family: "indo_european", branch: "indo_iranian", tier: 2,
      phyloNodeId: "lang_classical_sanskrit",
      closeness: 0.281, z_score_uncalibrated: 7.71, p_value_uncalibrated: 6.52e-15,
      phylo_plausibility: 0.858, regularity: 0.527,
      bayes_factor_uncalibrated: 32.50, composite_score_uncalibrated: 3.48,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.02, 0.82, 0.52],
    },
    // Tier 3: Typological controls (expected negatives)
    {
      id: "Basque", family: "isolate", branch: null, tier: 3,
      phyloNodeId: "lang_basque",
      closeness: 0.239, z_score_uncalibrated: 6.31, p_value_uncalibrated: 1.37e-10,
      phylo_plausibility: 0.781, regularity: 0.604,
      bayes_factor_uncalibrated: 19.63, composite_score_uncalibrated: 2.98,
      interpretation: "Tier-3 control; overlaps with expected positives — metric cannot discriminate",
      displayColor: [0.12, 0.88, 0.58],
    },
    {
      id: "Georgian", family: "kartvelian", branch: "karto_zan", tier: 3,
      phyloNodeId: "lang_georgian",
      closeness: 0.243, z_score_uncalibrated: 6.45, p_value_uncalibrated: 5.60e-11,
      phylo_plausibility: 0.819, regularity: 0.731,
      bayes_factor_uncalibrated: 47.54, composite_score_uncalibrated: 3.86,
      interpretation: "Tier-3 control; scores above several expected positives",
      displayColor: [0.95, 0.75, 0.55],
    },
    {
      id: "Finnish", family: "uralic", branch: "finnic", tier: 3,
      phyloNodeId: "lang_finnish",
      closeness: 0.218, z_score_uncalibrated: 5.61, p_value_uncalibrated: 1.04e-8,
      phylo_plausibility: 0.708, regularity: 0.694,
      bayes_factor_uncalibrated: 15.73, composite_score_uncalibrated: 2.76,
      interpretation: "Tier-3 control; scores above Hebrew and Basque",
      displayColor: [0.96, 0.72, 0.55],
    },
    {
      id: "Turkish", family: "turkic", branch: "oghuz", tier: 3,
      phyloNodeId: "lang_turkish",
      closeness: 0.311, z_score_uncalibrated: 8.71, p_value_uncalibrated: 1.52e-18,
      phylo_plausibility: 0.630, regularity: 0.434,
      bayes_factor_uncalibrated: 10.86, composite_score_uncalibrated: 2.39,
      interpretation: "Tier-3 control; closeness overlaps with Latin and Hungarian",
      displayColor: [0.08, 0.82, 0.45],
    },
    {
      id: "Hungarian", family: "uralic", branch: "ugric", tier: 3,
      phyloNodeId: "lang_hungarian",
      closeness: 0.311, z_score_uncalibrated: 8.71, p_value_uncalibrated: 1.52e-18,
      phylo_plausibility: 0.730, regularity: 0.767,
      bayes_factor_uncalibrated: 131.23, composite_score_uncalibrated: 4.88,
      interpretation: "Tier-3 control; scores above Egyptian and Hebrew",
      displayColor: [0.94, 0.70, 0.52],
    },
    {
      id: "Gothic", family: "indo_european", branch: "germanic", tier: 3,
      phyloNodeId: "lang_gothic",
      closeness: 0.245, z_score_uncalibrated: 6.50, p_value_uncalibrated: 4.14e-11,
      phylo_plausibility: 0.907, regularity: 0.690,
      bayes_factor_uncalibrated: 58.34, composite_score_uncalibrated: 4.07,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.0, 0.80, 0.50],
    },
    {
      id: "ModernGreek", family: "indo_european", branch: "hellenic", tier: 3,
      phyloNodeId: "lang_modern_greek",
      closeness: 0.328, z_score_uncalibrated: 9.28, p_value_uncalibrated: 8.41e-21,
      phylo_plausibility: 0.855, regularity: 0.516,
      bayes_factor_uncalibrated: 59.92, composite_score_uncalibrated: 4.09,
      interpretation: "Uncalibrated — significance unknown",
      displayColor: [0.11, 0.83, 0.60],
    },
  ],

  // ================================================================
  // VOWEL HARMONY ANALYSIS
  // ================================================================
  vowelHarmony: {
    chi2: 50.204,
    p_value: 2.127e-5,
    cramers_v: 0.210,
    dof: 16,
    n_words: 106,
    n_observations: 284,
    vowels: ["a", "e", "i", "o", "u"],
    interpretation: "Moderate evidence for vowel harmony"
  },

  // ================================================================
  // NATURAL SOUND CHANGES (for IPA overlay edges)
  // ================================================================
  naturalChanges: [
    // Voicing pairs (score 1.0)
    { from: "p", to: "b", type: "voicing", score: 1.0 },
    { from: "t", to: "d", type: "voicing", score: 1.0 },
    { from: "k", to: "g", type: "voicing", score: 1.0 },
    { from: "f", to: "v", type: "voicing", score: 1.0 },
    { from: "s", to: "z", type: "voicing", score: 1.0 },
    // Place shifts (score 0.7)
    { from: "p", to: "t", type: "place", score: 0.7 },
    { from: "t", to: "k", type: "place", score: 0.7 },
    { from: "m", to: "n", type: "place", score: 0.7 },
    { from: "f", to: "s", type: "place", score: 0.7 },
    // Manner shifts (score 0.5)
    { from: "p", to: "f", type: "manner", score: 0.5 },
    { from: "t", to: "s", type: "manner", score: 0.5 },
    { from: "k", to: "x", type: "manner", score: 0.5 },
    { from: "b", to: "v", type: "manner", score: 0.5 },
    { from: "d", to: "z", type: "manner", score: 0.5 },
    { from: "n", to: "l", type: "manner", score: 0.5 },
    { from: "l", to: "r", type: "manner", score: 0.5 },
    { from: "r", to: "j", type: "manner", score: 0.5 },
  ],

  // ================================================================
  // HYPOTHESIS VERDICTS
  //
  // NOTE: All closeness-based hypotheses (H1-H3) are INCONCLUSIVE because
  // the null distribution has not been properly calibrated. Preliminary
  // recalibration (n=4 negatives) showed no candidate reaches significance.
  // Only H4 (vowel harmony) is based on an independent statistical test
  // that does not depend on null calibration.
  // ================================================================
  hypotheses: [
    {
      id: "H1", name: "Language Isolate",
      verdict: "INCONCLUSIVE",
      detail: "Cannot assess \u2014 null distribution uncalibrated; negative controls overlap with candidates in closeness range",
      color: "#ff8844",
      candidateIds: ["Basque"],
    },
    {
      id: "H2", name: "Semitic Affiliation",
      verdict: "INCONCLUSIVE",
      detail: "Semitic languages cluster at top by composite score (Aramaic #1, Arabic #2, Akkadian #3) but negatives also score high \u2014 cannot distinguish signal from noise",
      color: "#ffaa44",
      candidateIds: ["Hebrew", "Akkadian", "Arabic", "Aramaic"],
    },
    {
      id: "H3", name: "Indo-European",
      verdict: "INCONCLUSIVE",
      detail: "AncientGreek scores LOWEST of all 16 candidates (closeness=0.139); Latin and ModernGreek score higher but overlap with negatives",
      color: "#44ccff",
      candidateIds: ["AncientGreek", "Latin", "Sanskrit", "Gothic", "ModernGreek"],
    },
    {
      id: "H4", name: "Agglutinative / Hurrian-like",
      verdict: "TENTATIVE",
      detail: "Vowel harmony chi-squared test: p=0.000021, Cram\u00e9r's V=0.210 \u2014 statistically significant but moderate effect size; corpus is only 48 inscriptions",
      color: "#88dd66",
      candidateIds: ["Finnish", "Turkish", "Hungarian", "Georgian"],
    },
  ],

  // ================================================================
  // FAMILY COLOR MAP (matches main site palette for phylogenetic overlay)
  // ================================================================
  familyColors: {
    "indo_european": [0.0, 0.85, 0.55],
    "semitic": [0.06, 0.82, 0.55],
    "afroasiatic": [0.06, 0.82, 0.55],
    "isolate": [0.12, 0.88, 0.50],
    "kartvelian": [0.95, 0.75, 0.55],
    "uralic": [0.96, 0.72, 0.55],
    "turkic": [0.08, 0.82, 0.45],
  },

  // ================================================================
  // STATISTICS SUMMARY
  // ================================================================
  stats: {
    totalSigns: 34,
    totalWords: 73,
    totalInscriptions: 48,
    totalCandidates: 16,
    candidatesWithResults: 16,
    trainingSteps: 3000,
    restarts: 1,
    nullMu: 0.05,
    nullSigma: 0.03,
    nullCalibrated: false,
    prelimRecalMu: 0.253,
    prelimRecalSigma: 0.040,
    prelimRecalN: 4,
    bonferroniAlpha: 0.003125,
    note: "3000-step production run (1 restart). NULL DISTRIBUTION NOT CALIBRATED: placeholder null (mu=0.05, sigma=0.03) is too tight — all 16 candidates show significance. Preliminary recalibration from 4 Tier-3 negatives (mu=0.253, sigma=0.040) finds NO candidate significant after Bonferroni correction. Full 12-language calibration was launched but did not complete. All z-scores and Bayes factors in this dataset are computed against the uncalibrated placeholder and should NOT be interpreted as evidence for or against any hypothesis.",
  },
};
