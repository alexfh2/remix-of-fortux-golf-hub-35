export const SITE = {
  name: "Fortux",
  tagline: "Expertos en reparación, mantenimiento y soluciones para golfistas",
  whatsapp: "34600000000", // TODO: reemplazar con el número real
  phone: "+34 600 000 000",
  email: "info@fortux.com",
  circuitUrl: "https://fortux.fairwaystudio.ai/",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
  },
};

export const waLink = (msg = "Hola, me gustaría más información.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
