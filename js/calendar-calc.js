/**
 * Calendar and Prayer Time Calculation Engine
 * Location: Kasaragod, Kerala, India (12.5102° N, 74.9852° E)
 * Supports:
 * - Gregorian Date & Day in English, Malayalam, Arabic
 * - Malayalam Solar Calendar (Kolla Varsham)
 * - Hijri Islamic Calendar (Umm al-Qura + Moon Sighting Offset)
 * - Accurate Kasaragod Prayer Times (Subah, Thulu', Dhuhr, Asr, Maghrib, Isha)
 */

const CalendarCalc = {
  // Day names in English, Malayalam, Arabic
  DAYS: [
    { en: 'Sunday', ml: 'ഞായർ', ar: 'يوم الأحد' },
    { en: 'Monday', ml: 'തിങ്കൾ', ar: 'يوم الإثنين' },
    { en: 'Tuesday', ml: 'ചൊവ്വ', ar: 'يوم الثلاثاء' },
    { en: 'Wednesday', ml: 'ബുധൻ', ar: 'يوم الأربعاء' },
    { en: 'Thursday', ml: 'വ്യാഴം', ar: 'يوم الخميس' },
    { en: 'Friday', ml: 'വെള്ളി', ar: 'يوم الجمعة' },
    { en: 'Saturday', ml: 'ശനി', ar: 'يوم السبت' }
  ],

  // Gregorian Month Names
  GREG_MONTHS_EN: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],

  // Malayalam Solar Months (Kolla Varsham)
  MALAYALAM_MONTHS: [
    { name: 'ചിങ്ങം', en: 'Chingam', approxStartMonth: 7, approxStartDay: 17 },     // Aug 17
    { name: 'കന്നി', en: 'Kanni', approxStartMonth: 8, approxStartDay: 17 },        // Sep 17
    { name: 'തുലാം', en: 'Thulam', approxStartMonth: 9, approxStartDay: 18 },       // Oct 18
    { name: 'വൃശ്ചികം', en: 'Vrischikam', approxStartMonth: 10, approxStartDay: 17 }, // Nov 17
    { name: 'ധനു', en: 'Dhanu', approxStartMonth: 11, approxStartDay: 16 },         // Dec 16
    { name: 'മകരം', en: 'Makaram', approxStartMonth: 0, approxStartDay: 15 },       // Jan 15
    { name: 'കുംഭം', en: 'Kumbham', approxStartMonth: 1, approxStartDay: 14 },       // Feb 14
    { name: 'മീനം', en: 'Meenam', approxStartMonth: 2, approxStartDay: 15 },        // Mar 15
    { name: 'മേടം', en: 'Medam', approxStartMonth: 3, approxStartDay: 14 },         // Apr 14
    { name: 'ഇടവം', en: 'Edavam', approxStartMonth: 4, approxStartDay: 15 },        // May 15
    { name: 'മിഥുനം', en: 'Mithunam', approxStartMonth: 5, approxStartDay: 15 },     // Jun 15
    { name: 'കർക്കടകം', en: 'Karkkidakam', approxStartMonth: 6, approxStartDay: 17 } // Jul 17
  ],

  // Hijri Months in Arabic
  HIJRI_MONTHS_AR: [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الاخر',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة'
  ],

  /**
   * Get Day of Week data
   */
  getDayData(date) {
    const dayIdx = date.getDay();
    return this.DAYS[dayIdx];
  },

  /**
   * Format Gregorian Date
   */
  getGregorianData(date) {
    const day = date.getDate();
    const dayStr = day < 10 ? '0' + day : '' + day;
    const monthStr = this.GREG_MONTHS_EN[date.getMonth()];
    const yearStr = '' + date.getFullYear();
    return { day: dayStr, month: monthStr, year: yearStr };
  },

  /**
   * Calculate Malayalam Date (Kollam Era)
   * Kolla Varsham Year: Chingam 1 is the start of the year.
   * If on or after Aug 17, Year = Gregorian Year - 824. Else Year = Gregorian Year - 825.
   */
  getMalayalamData(date) {
    const gYear = date.getFullYear();
    const gMonth = date.getMonth(); // 0-11
    const gDay = date.getDate();

    // Standard Sankranti dates for Kolla Varsham transition (approximate solar ingress)
    // Month boundaries in Gregorian calendar:
    // Jan 15: Makaram 1
    // Feb 14: Kumbham 1
    // Mar 15: Meenam 1
    // Apr 14: Medam 1 (Vishu)
    // May 15: Edavam 1
    // Jun 15: Mithunam 1
    // Jul 17: Karkkidakam 1
    // Aug 17: Chingam 1 (New Kollam Year)
    // Sep 17: Kanni 1
    // Oct 18: Thulam 1
    // Nov 17: Vrischikam 1
    // Dec 16: Dhanu 1

    const transitions = [
      { mIndex: 5, name: 'മകരം', gM: 0, gD: 15 },
      { mIndex: 6, name: 'കുംഭം', gM: 1, gD: 14 },
      { mIndex: 7, name: 'മീനം', gM: 2, gD: 15 },
      { mIndex: 8, name: 'മേടം', gM: 3, gD: 14 },
      { mIndex: 9, name: 'ഇടവം', gM: 4, gD: 15 },
      { mIndex: 10, name: 'മിഥുനം', gM: 5, gD: 15 },
      { mIndex: 11, name: 'കർക്കടകം', gM: 6, gD: 17 },
      { mIndex: 0, name: 'ചിങ്ങം', gM: 7, gD: 17 },
      { mIndex: 1, name: 'കന്നി', gM: 8, gD: 17 },
      { mIndex: 2, name: 'തുലാം', gM: 9, gD: 18 },
      { mIndex: 3, name: 'വൃശ്ചികം', gM: 10, gD: 17 },
      { mIndex: 4, name: 'ധനു', gM: 11, gD: 16 }
    ];

    let chosen = transitions[transitions.length - 1]; // default Dhanu
    let startGYear = gYear;

    // Check from latest to earliest transition
    for (let i = transitions.length - 1; i >= 0; i--) {
      const t = transitions[i];
      if (gMonth > t.gM || (gMonth === t.gM && gDay >= t.gD)) {
        chosen = t;
        break;
      }
    }

    // If before Jan 15, it's Dhanu of previous year's transition (Dec 16)
    if (gMonth === 0 && gDay < 15) {
      chosen = { mIndex: 4, name: 'ധനു', gM: 11, gD: 16 };
      startGYear = gYear - 1;
    }

    const startDate = new Date(startGYear, chosen.gM, chosen.gD);
    const diffTime = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const mDay = diffTime + 1;

    // Kolla Varsham Year
    const isNewYear = (gMonth > 7 || (gMonth === 7 && gDay >= 17));
    const kYear = isNewYear ? gYear - 824 : gYear - 825;

    const dayStr = mDay < 10 ? '0' + mDay : '' + mDay;
    return {
      day: dayStr,
      month: chosen.name,
      year: '' + kYear
    };
  },

  /**
   * Calculate Hijri Date (with offset)
   */
  getHijriData(date, offsetDays = 0) {
    const targetDate = new Date(date);
    if (offsetDays !== 0) {
      targetDate.setDate(targetDate.getDate() + offsetDays);
    }

    try {
      // Use Intl.DateTimeFormat with islamic-umalqura
      const formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      const parts = formatter.formatToParts(targetDate);
      let hDay = 1;
      let hMonth = 1;
      let hYear = 1448;

      parts.forEach(p => {
        if (p.type === 'day') hDay = parseInt(p.value, 10);
        if (p.type === 'month') hMonth = parseInt(p.value, 10);
        if (p.type === 'year') hYear = parseInt(p.value, 10);
      });

      const monthName = this.HIJRI_MONTHS_AR[(hMonth - 1 + 12) % 12] || 'ربيع الاخر';
      const dayStr = hDay < 10 ? '0' + hDay : '' + hDay;

      return {
        day: dayStr,
        month: monthName,
        year: '' + hYear
      };
    } catch (e) {
      // Fallback algorithmic calculation (Kuwaiti algorithm / Julian Day)
      return this.kuwaitiHijri(targetDate);
    }
  },

  /**
   * Fallback Kuwaiti Hijri calculation
   */
  kuwaitiHijri(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let m = month + 1;
    let y = year;
    if (m < 3) {
      y -= 1;
      m += 12;
    }

    let a = Math.floor(y / 100);
    let b = 2 - a + Math.floor(a / 4);
    if (y < 1583) b = 0;
    if (y === 1582) {
      if (m > 10) b = -10;
      if (m === 10) {
        b = 0;
        if (day > 4) b = -10;
      }
    }

    let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
    b = 0;
    if (jd > 2299160) {
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4);
    }
    let bb = jd + b + 1524;
    let cc = Math.floor((bb - 122.1) / 365.25);
    let dd = Math.floor(365.25 * cc);
    let ee = Math.floor((bb - dd) / 30.6001);
    day = bb - dd - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;

    let wd = (jd + 1) % 7;
    let iyear = 10631 / 30;
    let epochastro = 1948084;
    let shift1 = 8.01 / 60;

    let z = jd - epochastro;
    let cyc = Math.floor(z / 10631);
    z = z - 10631 * cyc;
    let j = Math.floor((z - shift1) / iyear);
    let iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    let im = Math.floor((z + 28.5001) / 29.5);
    if (im === 13) im = 12;
    let id = z - Math.floor(29.5001 * im - 29);

    const hDayStr = id < 10 ? '0' + id : '' + id;
    const hMonthName = this.HIJRI_MONTHS_AR[im - 1] || 'ربيع الاخر';
    return {
      day: hDayStr,
      month: hMonthName,
      year: '' + iy
    };
  },

  /**
   * Kasaragod Prayer Times Calculation
   * Latitude: 12.5102° N, Longitude: 74.9852° E
   * Timezone: UTC +5.5 (IST)
   * Method: Shafi'i (Asr shadow factor = 1), Fajr 18°, Isha 18°
   */
  getKasaragodPrayerTimes(date) {
    const lat = 12.5102;
    const lon = 74.9852;
    const timezone = 5.5; // India Standard Time

    // Day of Year
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Astronomical calculations
    const rad = deg => deg * (Math.PI / 180);
    const deg = rad => rad * (180 / Math.PI);

    // Approximate solar declination & equation of time
    const b = (2 * Math.PI * (dayOfYear - 81)) / 365;
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); // minutes
    const declination = deg(Math.asin(Math.sin(rad(23.45)) * Math.sin(b))); // degrees

    // Solar noon (Dhuhr) in local standard time
    // Solar noon = 12:00 - (lon / 15) + timezone - (eot / 60)
    const solarNoon = 12 - (lon / 15) + timezone - (eot / 60);

    // Helper for hour angle
    const hourAngle = (angle) => {
      const cosH = (Math.sin(rad(angle)) - Math.sin(rad(lat)) * Math.sin(rad(declination))) /
                   (Math.cos(rad(lat)) * Math.cos(rad(declination)));
      if (cosH > 1 || cosH < -1) return null;
      return deg(Math.acos(cosH)) / 15; // in hours
    };

    // Subah (Fajr) at 18 degrees below horizon
    const fajrHA = hourAngle(-18.0);
    const subahHour = solarNoon - (fajrHA !== null ? fajrHA : 1.7);

    // Thulu' (Sunrise) at -0.833 degrees
    const sunriseHA = hourAngle(-0.833);
    const thuluHour = solarNoon - (sunriseHA !== null ? sunriseHA : 1.5);

    // Dhuhr: solar noon + 2 min buffer
    const dhuhrHour = solarNoon + (2 / 60);

    // Asr: Shafi'i method (shadow factor 1)
    // angle = acot(1 + tan|lat - declination|)
    const phi = Math.abs(lat - declination);
    const asrAngle = deg(Math.atan(1 / (1 + Math.tan(rad(phi)))));
    const asrHA = hourAngle(asrAngle);
    const asrHour = solarNoon + (asrHA !== null ? asrHA : 1.6);

    // Maghrib (Sunset) at -0.833 degrees + 2 min buffer
    const maghribHour = solarNoon + (sunriseHA !== null ? sunriseHA : 1.5) + (2 / 60);

    // Isha at 18 degrees below horizon + 1 min buffer
    const ishaHour = solarNoon + (fajrHA !== null ? fajrHA : 1.7) + (1 / 60);

    // Format hours to 12-hour hh:mm string
    const formatTime = (decimalHour) => {
      let totalMinutes = Math.round(decimalHour * 60);
      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;

      // 12-hour format with leading zeros
      let displayHours = hours % 12;
      if (displayHours === 0) displayHours = 12;

      const hh = displayHours < 10 ? '0' + displayHours : '' + displayHours;
      const mm = minutes < 10 ? '0' + minutes : '' + minutes;
      return `${hh}:${mm}`;
    };

    return {
      subah: formatTime(subahHour),
      thulu: formatTime(thuluHour),
      dhuhr: formatTime(dhuhrHour),
      asr: formatTime(asrHour),
      maghrib: formatTime(maghribHour),
      isha: formatTime(ishaHour)
    };
  }
};

if (typeof module !== 'undefined') {
  module.exports = CalendarCalc;
}
