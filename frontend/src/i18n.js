import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Sri Lanka",
      "explore": "Explore Paradise",
      "hotels": "Hotels",
      "destinations": "Destinations",
      "tickets": "Tickets & Attractions",
      "transport": "Transport",
      "bookings": "My Bookings",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "book_now": "Book Now",
      "view_details": "View Details",
      "search": "Search",
      "filter": "Filter"
    }
  },
  si: {
    translation: {
      "welcome": "ශ්‍රී ලංකාවට සාදරයෙන් පිළිගනිමු",
      "explore": "පාරාදීසය ගවේෂණය කරන්න",
      "hotels": "හෝටල්",
      "destinations": "ගමනාන්ත",
      "tickets": "ප්‍රවේශ පත්‍ර සහ ආකර්ෂණීය ස්ථාන",
      "transport": "ප්‍රවාහන",
      "bookings": "මගේ වෙන්කරවීම්",
      "login": "පුරන්න",
      "register": "ලියාපදිංචි වන්න",
      "logout": "ඉවත් වන්න",
      "book_now": "දැන් වෙන්කරවන්න",
      "view_details": "විස්තර බලන්න",
      "search": "සොයන්න",
      "filter": "පෙරහන්"
    }
  },
  ta: {
    translation: {
      "welcome": "இலங்கைக்கு வரவேற்கிறோம்",
      "explore": "சொர்க்கத்தை ஆராயுங்கள்",
      "hotels": "ஹோட்டல்கள்",
      "destinations": "இலக்குகள்",
      "tickets": "டிக்கெட்டுகள் மற்றும் ஈர்ப்புகள்",
      "transport": "போக்குவரத்து",
      "bookings": "எனது முன்பதிவுகள்",
      "login": "உள்நுழைய",
      "register": "பதிவு செய்க",
      "logout": "வெளியேறு",
      "book_now": "இப்போது முன்பதிவு செய்க",
      "view_details": "விவரங்களைக் காண்க",
      "search": "தேடு",
      "filter": "வடிகட்டி"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
