import { useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Music,
  Palette,
  Phone,
  User,
  X,
} from "lucide-react";

type Language = "EN" | "ES";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  gallery: string[];
  technologies: string[];
  achievements: string[];
  type: "work" | "education" | "project";
}

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  gallery: string[];
  technologies: string[];
  link: string;
  github: string;
}

const ACCENT = "#0004FF";

const translations: Record<Language, Record<string, Record<string, string | Record<string, string>>>> = {
  EN: {
    nav: {
      home: "home",
      about: "about",
      experience: "experience",
      portfolio: "portfolio",
      skills: "skills",
      contact: "contact",
    },
    hero: {
      role: "UX/UI DESIGNER",
      title1: "DAVID",
      title2: "FERRUSCA",
      description:
        "Creating user-centered experiences through research, wireframing, and pixel-perfect design. I turn complex flows into clear, accessible interfaces.",
      viewWork: "VIEW WORK",
      contactMe: "CONTACT ME",
      scroll: "Scroll",
      focus: "Focus",
      strength: "Strength",
      method: "Method",
      deliverables: "Deliverables",
      handoff: "Handoff",
    },
    about: {
      title: "ABOUT ME",
      p1: "I'm a UX/UI Designer focused on research-driven product design. I work across discovery, wireframes, prototyping, and design systems to deliver measurable outcomes.",
      p2: "I collaborate closely with product and engineering, validate decisions with testing, and ship designs that scale.",
      downloadResume: "Download Resume",
      stats: {
        years: "Years Experience",
        projects: "Projects",
        clients: "Teams Supported",
        techs: "Tools",
      },
    },
    experience: {
      title: "EXPERIENCE",
      seeMore: "See More",
      seeMoreJobs: "SEE MORE JOBS",
      loadedAll: "All jobs loaded",
    },
    portfolio: {
      title: "PORTFOLIO",
      view: "View",
      gallery: "View Gallery",
      swipe: "Swipe to see more",
    },
    skills: {
      title: "SKILLS",
    },
    contact: {
      title: "CONTACT",
      description:
        "Want to collaborate? Send a message and I'll get back to you.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      send: "SEND MESSAGE",
    },
    modal: {
      techTitle: "TOOLS USED",
      achievementsTitle: "KEY HIGHLIGHTS",
      close: "Close",
      viewProject: "View Live Project",
    },
    footer: {
      rights: "©2026 Binec. All rights reserved.",
    },
    a11y: {
      openJob: "Open job details",
      next: "Next",
      prev: "Previous",
    },
    language: {
      toEnglish: "EN",
      toSpanish: "ES",
      english: "ENGLISH",
      spanish: "ESPAÑOL",
    },
  },
  ES: {
    nav: {
      home: "inicio",
      about: "sobre mí",
      experience: "experiencia",
      portfolio: "portafolio",
      skills: "habilidades",
      contact: "contacto",
    },
    hero: {
      role: "DISEÑADOR UX/UI",
      title1: "DAVID",
      title2: "FERRUSCA",
      description:
        "Creo experiencias centradas en el usuario mediante investigación, wireframes y diseño al detalle. Convierto flujos complejos en interfaces claras y accesibles.",
      viewWork: "VER TRABAJO",
      contactMe: "CONTÁCTAME",
      scroll: "Desliza",
      focus: "Enfoque",
      strength: "Fuerte",
      method: "Método",
      deliverables: "Entregables",
      handoff: "Entrega",
    },
    about: {
      title: "SOBRE MÍ",
      p1: "Soy Diseñador UX/UI con enfoque en diseño de producto basado en investigación. Trabajo desde discovery hasta prototipos, diseño visual y sistemas de diseño.",
      p2: "Colaboro con producto e ingeniería, valido decisiones con tests y diseño soluciones que escalan.",
      downloadResume: "Descargar CV",
      stats: {
        years: "Años de experiencia",
        projects: "Proyectos",
        clients: "Equipos apoyados",
        techs: "Herramientas",
      },
    },
    experience: {
      title: "EXPERIENCIA",
      seeMore: "Ver Más",
      seeMoreJobs: "VER MÁS EMPLEOS",
      loadedAll: "Todos los empleos cargados",
    },
    portfolio: {
      title: "PORTAFOLIO",
      view: "Ver",
      gallery: "Ver Galería",
      swipe: "Desliza para ver más",
    },
    skills: {
      title: "HABILIDADES",
    },
    contact: {
      title: "CONTACTO",
      description:
        "¿Quieres colaborar? Envíame un mensaje y te respondo pronto.",
      namePlaceholder: "Tu Nombre",
      emailPlaceholder: "Tu Email",
      messagePlaceholder: "Tu Mensaje",
      send: "ENVIAR MENSAJE",
    },
    modal: {
      techTitle: "HERRAMIENTAS UTILIZADAS",
      achievementsTitle: "PUNTOS CLAVE",
      close: "Cerrar",
      viewProject: "Ver Proyecto en Vivo",
    },
    footer: {
      rights: "©2026 Binec. Todos los derechos reservados.",
    },
    a11y: {
      openJob: "Abrir detalles del empleo",
      next: "Siguiente",
      prev: "Anterior",
    },
    language: {
      toEnglish: "EN",
      toSpanish: "ES",
      english: "ENGLISH",
      spanish: "ESPAÑOL",
    },
  },
};

const timelineItemsData: Record<Language, TimelineItem[]> = {
  EN: [
    {
      id: 1,
      year: "2025 - 26",
      title: "Senior UX Designer",
      company: "BINEC",
      location: "Monterrey, NL - CDMX, MX",
      shortDescription:
        "Personal Project in which I have designed digital platforms for different types of clients.",
      fullDescription:
        "Personal Project in which I have designed digital platforms for different types of clients such as education, technology, security, culture, finance, among others, always focused on creating the best user experience. These projects include informational websites, web and native applications, landing pages, 3D websites, Virtual and Augmented Reality, CRMs, dashboards, and many other specialized and customized solutions",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/159ec7153620301.63331a4e88d14.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/4f41bc153620301.63e2f4c320f8f.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/19e9d4153620301.63e2f4c31f7c6.jpg",
      ],
      technologies: ["Ai", "Blender", "React", "Design Systems", "User Testing"],
      achievements: [
        "Improved task success by 24% in usability testing",
        "Shipped v2 design system with 60+ components",
        "Standardized accessibility checks across squads",
      ],
      type: "work",
    },
    {
      id: 2,
      year: "2024",
      title: "Lead UI/UX Designer",
      company: "AI27",
      location: "CDMX, MX",
      shortDescription:
        "B2B Product with AI Integration: Designed a solution to monitor and predict route risks.",
      fullDescription:
        "B2B Product with AI Integration: Designed a solution to monitor and predict route risks for clients through web and native apps. Served as Art Director and led a team of 2 UX designers. LINK: https://www.ai27.com/",
      gallery: [
        "https://binec.github.io/landing-clientes/assets/projects/project-2/image2.jpg",
        "https://www.ai27.com/static/media/newslatter_movil.c4221de9b712a655bd51.png",
        "https://binec.github.io/landing-clientes/assets/projects/project-2/image6.jpg",
      ],
      technologies: ["Figma", "Prototyping", "A/B Testing", "Analytics"],
      achievements: [
        "Reduced onboarding time by 35%",
        "Achieved 92% task completion in testing",
        "Improved NPS by +12 points",
      ],
      type: "work",
    },
    {
      id: 3,
      year: "2022 - 23",
      title: "UX Designer - Product Manager",
      company: "Phinder",
      location: "CDMX, MX",
      shortDescription:
        "Telecommunications Client Product Design: Designed admin platforms and dashboards, building and implementing design systems using Atomic Design.",
      fullDescription:
        "Telecommunications Client Product Design: Designed admin platforms and dashboards, building and implementing design systems using Atomic Design methodology. Led a team of 7, including UX designers, testers, technical writers, and developers, under SCRUM.",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop",
        "https://dapencentroestudios.com/wp-content/uploads/2025/07/dashboards-en-power-bi-1080x675.png.webp",
      ],
      technologies: ["Figma", "SCRUM", "GA4", "User Interviews"],
      achievements: [
        "Increased conversion by 18% across experiments",
        "Reduced checkout errors by 40%",
        "Improved accessibility contrast issues",
      ],
      type: "work",
    },
    {
      id: 4,
      year: "2021",
      title: "UX Designer - Product Manager",
      company: "Cautiva",
      location: "CDMX, MX",
      shortDescription:
        "Virtual Classroom & VR Website: Designed a digital schools virtual classroom and VR-enabled website.",
      fullDescription:
        "Virtual Classroom & VR Website: Designed a digital schools virtual classroom and VR-enabled website. Led a team of 6 (graphic/industrial designers, front- and back-end developers) applying SCRUM methodology.",
      gallery: [
        "https://instagram.fntr10-1.fna.fbcdn.net/v/t39.30808-6/486603021_1240217167504314_7452059143433176234_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzIxNzk1MjQ4NzY4ODMwMjIyOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjIwNDh4MjA0OC5zZHIuQzMifQ%3D%3D&_nc_ohc=1ZROIW8VdgkQ7kNvwGkfIzq&_nc_oc=Adk75pocXJi0F_3fpxt-eb3bs8ZLtbXxYzEt1Ymfrhy79UDbUS-gbbWcesB_47HZjdldkFnoZbYDJiEw222SG5yM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fntr10-1.fna&_nc_gid=bLJQVePU3H3_WnZlaX5URg&oh=00_Afu0mR47_sESMkSxlcBNjt9MMIcdVL8EaE6vKatJmhvcxQ&oe=698B2928",
        "https://cautiva.com.mx/wp-content/uploads/2023/05/photo-1561489396-888724a1543d.jpeg",
        "https://imagenes.elpais.com/resizer/v2/TBSHRKOOUZEV5OAPYZSWQMJGFQ.jpg?auth=c3a4408bf08f9a31de071132161caa47096ab13b2e954f1900e06e194f5a8e1c&width=1200",
      ],
      technologies: ["Figma", "Wireframing", "SCRUM", "WCAG"],
      achievements: [
        "Launched MVP in 12 weeks",
        "Introduced design QA checklist",
        "Improved appointment booking completion",
      ],
      type: "work",
    },
    {
      id: 5,
      year: "2019 - 21",
      title: "UX/UI Designer",
      company: "Virket",
      location: "CDMX, MX",
      shortDescription:
        "Created websites, landing pages, and B2B platforms for leading financial clients in Mexico and LATAM.",
      fullDescription:
        "Created websites, landing pages, and B2B platforms for leading financial clients in Mexico and LATAM. Researched and applied Virtual and Augmented Reality technologies as innovative solutions for client products. Applied Agile methodologies (SCRUM) in design and development processes.",
      gallery: [
        "https://binec.github.io/3D/assets/visaopenbank.png",
        "https://images.unsplash.com/photo-1588079427326-09626752e3a9?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1616464028929-ecd0afe15b44?w=1200&h=800&fit=crop",
      ],
      technologies: ["Adobe XD", "Illustrator", "Design Sprints", "Zeplin"],
      achievements: [
        "Client satisfaction",
        "Cut design-to-dev handoff time by 20%",
        "Established reusable UI patterns",
      ],
      type: "work",
    },
    {
      id: 6,
      year: "2018",
      title: "Graphic Designer",
      company: "Perfekblue",
      location: "CDMX, MX",
      shortDescription:
        "Designed multimedia content for social media, including video, photography, 3D modeling, and animations.",
      fullDescription:
        "Designed multimedia content for social media, including video, photography, 3D modeling, and animations. Developed informative and e-commerce websites using WordPress.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/7bc73e70147769.5b997a5bd1f23.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/0d031270147769.5b997a5bd2305.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/f5705270147769.5b997a5bd18ef.jpg",
      ],
      technologies: ["Wordpress", "Adobe CC S", "Documentation"],
      achievements: [
        "Published pattern documentation",
        "Presented findings to design leads",
        "Improved component clarity in specs",
      ],
      type: "work",
    },
    {
      id: 7,
      year: "2017 - 18",
      title: "Graphic Designer",
      company: "Industria Social",
      location: "CDMX, MX",
      shortDescription:
        "Directed creative projects for Le Pain Quotidien and Costco Mexico.",
      fullDescription:
        "Directed creative projects for Le Pain Quotidien and Costco Mexico, from photo and video production for social media to the creation of ATL and BTL campaigns.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/8fe69e64294183.5acd93a1d564b.jpg",
        "https://www.datocms-assets.com/138964/1728639209-guillaumezha_lpq_newinteriordansaert-11.jpeg?auto=format&fit=max&w=3840&q=75",
        "https://muchosnegociosrentables.com/wp-content/uploads/2023/07/franquicia-Le-Pain-Quotidien.jpg",
      ],
      technologies: ["Typography", "Visual Systems", "Usability"],
      achievements: [
        "1st Creative Agency",
        "Capstone featured in annual show",
        "Peer mentor for design studios",
      ],
      type: "work",
    },
  ],
  ES: [
    {
      id: 1,
      year: "2025 - 26",
      title: "Diseñador UX Senior",
      company: "BINEC",
      location: "Monterrey, NL - CDMX, MX",
      shortDescription:
        "Proyecto personal en el que he diseñado plataformas digitales para diferentes tipos de clientes.",
      fullDescription:
        "Proyecto personal en el que he diseñado plataformas digitales para diferentes tipos de clientes como educación, tecnología, seguridad, cultura, finanzas, entre otros, siempre enfocado en crear la mejor experiencia de usuario. Estos proyectos incluyen sitios web informativos, aplicaciones web y nativas, landing pages, sitios web 3D, Realidad Virtual y Aumentada, CRMs, dashboards y muchas otras soluciones especializadas y personalizadas.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/159ec7153620301.63331a4e88d14.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/4f41bc153620301.63e2f4c320f8f.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/19e9d4153620301.63e2f4c31f7c6.jpg",
      ],
      technologies: ["Ai", "Blender", "React", "Sistemas de Diseño", "Pruebas de Usuario"],
      achievements: [
        "Mejoré el éxito de tareas en 24% en pruebas de usabilidad",
        "Lancé sistema de diseño v2 con 60+ componentes",
        "Estandaricé revisiones de accesibilidad en equipos",
      ],
      type: "work",
    },
    {
      id: 2,
      year: "2024",
      title: "Diseñador UI/UX Líder",
      company: "AI27",
      location: "CDMX, MX",
      shortDescription:
        "Producto B2B con Integración de IA: Diseñé una solución para monitorear y predecir riesgos en rutas.",
      fullDescription:
        "Producto B2B con Integración de IA: Diseñé una solución para monitorear y predecir riesgos en rutas para clientes a través de aplicaciones web y nativas. Fungí como Director de Arte y lideré un equipo de 2 diseñadores UX.",
      gallery: [
        "https://binec.github.io/landing-clientes/assets/projects/project-2/image2.jpg",
        "https://www.ai27.com/static/media/newslatter_movil.c4221de9b712a655bd51.png",
        "https://binec.github.io/landing-clientes/assets/projects/project-2/image6.jpg",
      ],
      technologies: ["Figma", "Prototipado", "A/B Testing", "Analítica"],
      achievements: [
        "Reduje el tiempo de onboarding en 35%",
        "Logré 92% de tareas completadas en pruebas",
        "Mejoré el NPS en +12 puntos",
      ],
      type: "work",
    },
    {
      id: 3,
      year: "2022 - 23",
      title: "Diseñador UX - Product Manager",
      company: "Phinder",
      location: "CDMX, MX",
      shortDescription:
        "Diseño de producto para cliente de telecomunicaciones: Diseñé plataformas de administración y dashboards, construyendo e implementando sistemas de diseño con Atomic Design.",
      fullDescription:
        "Diseño de producto para cliente de telecomunicaciones: Diseñé plataformas de administración y dashboards, construyendo e implementando sistemas de diseño con metodología Atomic Design. Lideré un equipo de 7 personas, incluyendo diseñadores UX, testers, redactores técnicos y desarrolladores, bajo SCRUM.",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop",
        "https://dapencentroestudios.com/wp-content/uploads/2025/07/dashboards-en-power-bi-1080x675.png.webp",
      ],
      technologies: ["Figma", "SCRUM", "GA4", "Entrevistas de Usuario"],
      achievements: [
        "Aumenté la conversión en 18% en experimentos",
        "Reduje errores de checkout en 40%",
        "Mejoré problemas de contraste y accesibilidad",
      ],
      type: "work",
    },
    {
      id: 4,
      year: "2021",
      title: "Diseñador UX - Product Manager",
      company: "Cautiva",
      location: "CDMX, MX",
      shortDescription:
        "Aula Virtual y Sitio Web VR: Diseñé el aula virtual y el sitio web con VR de una escuela digital.",
      fullDescription:
        "Aula Virtual y Sitio Web VR: Diseñé el aula virtual y el sitio web con Realidad Virtual de una escuela digital. Lideré un equipo de 6 personas (diseñadores gráficos/industriales, desarrolladores front-end y back-end) aplicando metodología SCRUM.",
      gallery: [
        "https://instagram.fntr10-1.fna.fbcdn.net/v/t39.30808-6/486603021_1240217167504314_7452059143433176234_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzIxNzk1MjQ4NzY4ODMwMjIyOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjIwNDh4MjA0OC5zZHIuQzMifQ%3D%3D&_nc_ohc=1ZROIW8VdgkQ7kNvwGkfIzq&_nc_oc=Adk75pocXJi0F_3fpxt-eb3bs8ZLtbXxYzEt1Ymfrhy79UDbUS-gbbWcesB_47HZjdldkFnoZbYDJiEw222SG5yM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fntr10-1.fna&_nc_gid=bLJQVePU3H3_WnZlaX5URg&oh=00_Afu0mR47_sESMkSxlcBNjt9MMIcdVL8EaE6vKatJmhvcxQ&oe=698B2928",
        "https://cautiva.com.mx/wp-content/uploads/2023/05/photo-1561489396-888724a1543d.jpeg",
        "https://imagenes.elpais.com/resizer/v2/TBSHRKOOUZEV5OAPYZSWQMJGFQ.jpg?auth=c3a4408bf08f9a31de071132161caa47096ab13b2e954f1900e06e194f5a8e1c&width=1200",
      ],
      technologies: ["Figma", "Wireframing", "SCRUM", "WCAG"],
      achievements: [
        "Lancé el MVP en 12 semanas",
        "Introduje checklist de QA de diseño",
        "Mejoré la finalización de reservas de citas",
      ],
      type: "work",
    },
    {
      id: 5,
      year: "2019 - 21",
      title: "Diseñador UX/UI",
      company: "Virket",
      location: "CDMX, MX",
      shortDescription:
        "Creé sitios web, landing pages y plataformas B2B para clientes financieros líderes en México y LATAM.",
      fullDescription:
        "Creé sitios web, landing pages y plataformas B2B para clientes financieros líderes en México y LATAM. Investigué y apliqué tecnologías de Realidad Virtual y Aumentada como soluciones innovadoras para productos de clientes. Apliqué metodologías ágiles (SCRUM) en procesos de diseño y desarrollo.",
      gallery: [
         "https://binec.github.io/3D/assets/visaopenbank.png",
        "https://images.unsplash.com/photo-1588079427326-09626752e3a9?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1616464028929-ecd0afe15b44?w=1200&h=800&fit=crop",
      ],
      technologies: ["Adobe XD", "Illustrator", "Design Sprints", "Zeplin"],
      achievements: [
        "Satisfacción del cliente",
        "Reduje el tiempo de handoff diseño-desarrollo en 20%",
        "Establecí patrones UI reutilizables",
      ],
      type: "work",
    },
    {
      id: 6,
      year: "2018",
      title: "Diseñador Gráfico",
      company: "Perfekblue",
      location: "CDMX, MX",
      shortDescription:
        "Diseño de contenido para redes sociales. Desde producción de video, fotografía, hasta modelado y animaciones 3D. Creación de páginas web informativas e e-commerce con Wordpress.",
      fullDescription:
        "Diseñé contenido multimedia para redes sociales, incluyendo video, fotografía, modelado 3D y animaciones. Desarrollé sitios web informativos y de e-commerce usando WordPress.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/7bc73e70147769.5b997a5bd1f23.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/0d031270147769.5b997a5bd2305.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/f5705270147769.5b997a5bd18ef.jpg",
      ],
      technologies: ["Wordpress", "Adobe CC S", "Documentación"],
      achievements: [
        "Publiqué documentación de patrones",
        "Presenté hallazgos a líderes de diseño",
        "Mejoré la claridad de componentes en especificaciones",
      ],
      type: "work",
    },
    {
      id: 7,
      year: "2017 - 18",
      title: "Diseñador Gráfico",
      company: "Industria Social",
      location: "CDMX, MX",
      shortDescription:
        "Dirigí proyectos creativos para Le Pain Quotidien y Costco México.",
      fullDescription:
        "Dirigí proyectos creativos para Le Pain Quotidien y Costco México, desde producción de foto y video para redes sociales hasta la creación de campañas ATL y BTL.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/8fe69e64294183.5acd93a1d564b.jpg",
        "https://www.datocms-assets.com/138964/1728639209-guillaumezha_lpq_newinteriordansaert-11.jpeg?auto=format&fit=max&w=3840&q=75",
        "https://muchosnegociosrentables.com/wp-content/uploads/2023/07/franquicia-Le-Pain-Quotidien.jpg",
      ],
      technologies: ["Tipografía", "Sistemas Visuales", "Usabilidad"],
      achievements: [
        "1ra Agencia Creativa",
        "Proyecto final exhibido en muestra anual",
        "Mentor de pares en estudios de diseño",
      ],
      type: "work",
    },
  ],
};

const projectsData: Record<Language, Project[]> = {
  EN: [
    {
      id: 1,
      title: "3D Catalogue - Landing page",
      category: "Medical - 3D Web App",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/38d8a9243632817.6985672aa45d2.png",
      description:
        "3D catalogue as a landing page for lead capture, Innovating way to show their products.",
      fullDescription:
        "A tool for B2C and B2B for improve their sales and lead capture, it can also generate a database of the products uploaded and an innovating way to show their 3D products.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/38d8a9243632817.6985672aa45d2.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/59a3df243632817.6985672aa7e96.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/c08281243632817.6985672aa5aec.png",
      ],
      technologies: ["AI", "REACT", "Figma", "DB Mongo", "iOS/Android"],
      link: "https://binec.github.io/13dcat/",
      github: "#",
    },
    {
      id: 2,
      title: "Management Platform",
      category: "Logistics - Web App",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fd1cdf243632817.6985672aa6e02.png",
      description:
        "Web app for manage teams, locations and tasks. Made 100% with AI",
      fullDescription:
        "Web app for manage teams, locations and tasks, The user can see all their assigned tasks and complete them.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fd1cdf243632817.6985672aa6e02.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5b2122243632817.6985672aa7539.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/f40941243632817.6985672aa5488.png",
      ],
      technologies: ["User Flows", "A/B Testing", "Analytics", "Tailwind CSS", "Figma"],
      link: "https://019be727-5993-734c-9e63-ead0743217a9.arena.site/",
      github: "#",
    },
    {
      id: 3,
      title: "Pilares - Assistance Group",
      category: "Education - Web App",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5c24e2243632817.6985672aa3769.jpg",
      description:
        "Web application to create groups, students and attendance passes.",
      fullDescription:
        "We created this platform for the Pilares social program in Mexico City. I led two teams: four UX designers and three developers who were responsible for producing the web application.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5c24e2243632817.6985672aa3769.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/518dc0243632817.6985672aa4f70.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/43ca7f243632817.6985672aa4ac1.jpg",
      ],
      technologies: ["Tokens", "Components", "Documentation", "Figma", "Storybook"],
      link: "#",
      github: "#",
    },
    {
      id: 4,
      title: "AI27",
      category: "Logistics and Security - Web App",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a4987a243632817.69856b4552744.png",
      description:
        "Web App for create shipments and monitor them in live with AI risk predictions",
      fullDescription:
        "Created from scratch this product to implement an AI to predict the client's shipment and monitor them in real time for better security with an AI named SofIA to copilot the navigation of the users.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a4987a243632817.69856b4552744.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d99263243632817.69856b4551948.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/4aec80243632817.69856b4552243.png",
      ],
      technologies: ["IA", "Visual Design", "Prototyping", "Data Visualization", "Healthcare"],
      link: "https://www.ai27.com/",
      github: "#",
    },
    {
      id: 5,
      title: "Visa Open Bank",
      category: "Web App",
      image:
        "https://binec.github.io/3D/assets/visaopenbank.png",
      description:
        "A digital platform offering video and telephone support for medical, psychological, ...",
      fullDescription:
        "A digital platform offering video and telephone support for medical, psychological, educational, and other services. Users log in to the platform with their password and can access and purchase additional support services.",
      gallery: [
        "https://binec.github.io/3D/assets/visaopenbank.png",
        "https://binec.github.io/3D/assets/visaopenbank.png",
        "https://binec.github.io/3D/assets/visaopenbank.png",
      ],
      technologies: ["Design Systems", "Specs", "QA", "Permissions", "Enterprise UX"],
      link: "https://www.behance.net/gallery/127795965/UX-UI",
      github: "#",
    },
    {
      id: 6,
      title: "HAKO",
      category: "Branding - Design",
      image:
        "https://binec.github.io/landing-clientes/assets/projects/project-1/cover.jpg",
      description:
        "Visual identity and marketing assets for creators. Web design and all digital products.",
      fullDescription:
        "Complete brand identity design and corporate website with a modern and minimalist approach.",
      gallery: [
        "https://binec.github.io/landing-clientes/assets/projects/project-1/cover.jpg",
        "https://binec.github.io/landing-clientes/assets/projects/project-1/image1.jpg",
        "https://binec.github.io/landing-clientes/assets/projects/project-1/image2.jpg",
      ],
      technologies: ["Illustrator", "Photoshop", "Brand Guidelines", "Typography", "Print"],
      link: "#",
      github: "#",
    },
  ],
  ES: [
    {
      id: 1,
      title: "Catálogo 3D - Landing page",
      category: "Médico - App Web 3D",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/38d8a9243632817.6985672aa45d2.png",
      description:
        "Catálogo 3D como landing page para captura de leads, una forma innovadora de mostrar sus productos.",
      fullDescription:
        "Una herramienta para B2C y B2B para mejorar sus ventas y captura de leads, también puede generar una base de datos de los productos cargados y una forma innovadora de mostrar sus productos en 3D.",
      gallery: [
       "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/38d8a9243632817.6985672aa45d2.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/59a3df243632817.6985672aa7e96.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/c08281243632817.6985672aa5aec.png",
      ],
      technologies: ["AI", "REACT", "Figma", "DB Mongo", "iOS/Android"],
      link: "https://binec.github.io/13dcat/",
      github: "#",
    },
    {
      id: 2,
      title: "Plataforma de Gestión",
      category: "Logística - App Web",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fd1cdf243632817.6985672aa6e02.png",
      description:
        "App web para gestionar equipos, ubicaciones y tareas. Hecha 100% con IA.",
      fullDescription:
        "App web para gestionar equipos, ubicaciones y tareas. El usuario puede ver todas sus tareas asignadas y completarlas.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fd1cdf243632817.6985672aa6e02.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5b2122243632817.6985672aa7539.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/f40941243632817.6985672aa5488.png"
      ],
      technologies: ["Flujos de Usuario", "A/B Testing", "Analítica", "Tailwind CSS", "Figma"],
      link: "https://019be727-5993-734c-9e63-ead0743217a9.arena.site/",
      github: "#",
    },
    {
      id: 3,
      title: "Pilares - Grupo de Asistencia",
      category: "Educación - App Web",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5c24e2243632817.6985672aa3769.jpg",
      description:
        "Aplicación web para crear grupos, estudiantes y pases de asistencia.",
      fullDescription:
        "Creamos esta plataforma para el programa social Pilares en la Ciudad de México. Lideré dos equipos: cuatro diseñadores UX y tres desarrolladores responsables de producir la aplicación web.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5c24e2243632817.6985672aa3769.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/518dc0243632817.6985672aa4f70.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/43ca7f243632817.6985672aa4ac1.jpg",
      ],
      technologies: ["Tokens", "Componentes", "Documentación", "Figma", "Storybook"],
      link: "#",
      github: "#",
    },
    {
      id: 4,
      title: "AI27",
      category: "Logística y Seguridad - App Web",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a4987a243632817.69856b4552744.png",
      description:
        "App Web para crear envíos y monitorearlos en vivo con predicciones de riesgo con IA.",
      fullDescription:
        "Creado desde cero, este producto implementa una IA para predecir los envíos del cliente y monitorearlos en tiempo real para mayor seguridad, con una IA llamada SofIA que copilotea la navegación de los usuarios.",
      gallery: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/a4987a243632817.69856b4552744.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d99263243632817.69856b4551948.png",
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/4aec80243632817.69856b4552243.png",
      ],
      technologies: ["IA", "Diseño Visual", "Prototipado", "Visualización de Datos", "Salud"],
      link: "https://www.ai27.com/",
      github: "#",
    },
    {
      id: 5,
      title: "Visa Open Bank",
      category: "App Web",
      image:
        "https://binec.github.io/3D/assets/visaopenbank.png",
      description:
        "Una plataforma digital que ofrece soporte por video y teléfono para servicios médicos, psicológicos, ...",
      fullDescription:
        "Una plataforma digital que ofrece soporte por video y teléfono para servicios médicos, psicológicos, educativos y otros. Los usuarios inician sesión con su contraseña y pueden acceder y comprar servicios de soporte adicionales.",
      gallery: [
        "https://binec.github.io/3D/assets/visaopenbank.png",
        "https://binec.github.io/3D/assets/visaopenbank.png",
        "https://binec.github.io/3D/assets/visaopenbank.png",
      ],
      technologies: ["Sistemas de Diseño", "Specs", "QA", "Permisos", "UX Empresarial"],
      link: "https://www.behance.net/gallery/127795965/UX-UI",
      github: "#",
    },
    {
      id: 6,
      title: "HAKO",
      category: "Branding - Diseño",
      image:
        "https://binec.github.io/landing-clientes/assets/projects/project-1/cover.jpg",
      description:
        "Identidad visual y assets de marketing para creadores. Diseño web y todos los productos digitales.",
      fullDescription:
        "Diseño completo de identidad de marca y sitio web corporativo con un enfoque moderno y minimalista.",
      gallery: [
        "https://binec.github.io/landing-clientes/assets/projects/project-1/cover.jpg",
        "https://binec.github.io/landing-clientes/assets/projects/project-1/image1.jpg",
        "https://binec.github.io/landing-clientes/assets/projects/project-1/image2.jpg",
      ],
      technologies: ["Illustrator", "Photoshop", "Guías de Marca", "Tipografía", "Print"],
      link: "#",
      github: "#",
    },
  ],
};

const skillsData: Record<Language, { category: string; items: string[] }[]> = {
  EN: [
    { category: "UX Research", items: ["Interviews", "Usability Testing", "Surveys", "Heuristics"] },
    { category: "Interaction Design", items: ["User Flows", "IA", "Wireframes", "Prototyping"] },
    { category: "UI & Systems", items: ["Design Systems", "Components", "Tokens", "Accessibility"] },
    {
      category: "Tools / Languages",
      items: ["Figma", "Blender", "Jira", "Notion", "Adobe CC", "REACT", "JS", "Tailwind"],
    },
  ],
  ES: [
    {
      category: "Investigación UX",
      items: ["Entrevistas", "Pruebas de Usabilidad", "Encuestas", "Heurísticas"],
    },
    {
      category: "Diseño de Interacción",
      items: ["Flujos de Usuario", "IA", "Wireframes", "Prototipado"],
    },
    {
      category: "UI y Sistemas",
      items: ["Sistemas de Diseño", "Componentes", "Tokens", "Accesibilidad"],
    },
    {
      category: "Herramientas / Lenguajes",
      items: ["Figma", "Blender", "Jira", "Notion", "Adobe CC", "REACT", "JS", "Tailwind"],
    },
  ],
};

function FlagCircle({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-flex h-6 w-6 overflow-hidden rounded-full border border-white/15">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </span>
  );
}

function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOut = () => setIsVisible(false);
    const handleMouseOver = () => setIsVisible(true);

    window.addEventListener("mousemove", moveMouse);
    document.body.addEventListener("mouseleave", handleMouseOut);
    document.body.addEventListener("mouseenter", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      document.body.removeEventListener("mouseleave", handleMouseOut);
      document.body.removeEventListener("mouseenter", handleMouseOver);
    };
  }, [isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference opacity-50 blur-2xl"
      style={{
        left: position.x,
        top: position.y,
        willChange: "transform, left, top",
        background:
          "radial-gradient(circle, rgba(255,140,0,0.22) 0%, rgba(255,77,0,0.14) 38%, rgba(255,77,0,0) 72%)",
        transition: "transform 0.08s ease-out",
      }}
    />
  );
}

export function App() {
  const [lang, setLang] = useState<Language>("EN");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const count = window.innerWidth < 768 ? 3 : 6;
    setVisibleCount(count);
  }, []);

  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectGalleryIndex, setProjectGalleryIndex] = useState(0);

  const t = translations[lang];

  const timeline = timelineItemsData[lang];
  const projects = projectsData[lang];
  const skills = skillsData[lang];

  const timelineRef = useRef<HTMLDivElement | null>(null);

  const shownTimeline = useMemo(
    () => timeline.slice(0, visibleCount),
    [timeline, visibleCount]
  );

  useEffect(() => {
    const onScroll = () => {
      const ids = ["home", "about", "experience", "portfolio", "skills", "contact"];
      const offsets = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return { id, top: Number.POSITIVE_INFINITY };
          const rect = el.getBoundingClientRect();
          return { id, top: Math.abs(rect.top - 96) };
        })
        .sort((a, b) => a.top - b.top);
      setActiveSection(offsets[0]?.id ?? "home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-timeline-item]"));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "true";
          }
        }
      },
      { threshold: 0.4, rootMargin: "0px" }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [lang, visibleCount]);

  useEffect(() => {
    if (!selectedItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowRight")
        setGalleryIndex((i) => (i + 1) % selectedItem.gallery.length);
      if (e.key === "ArrowLeft")
        setGalleryIndex(
          (i) => (i - 1 + selectedItem.gallery.length) % selectedItem.gallery.length
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
      if (e.key === "ArrowRight")
        setProjectGalleryIndex((i) => (i + 1) % selectedProject.gallery.length);
      if (e.key === "ArrowLeft")
        setProjectGalleryIndex(
          (i) =>
            (i - 1 + selectedProject.gallery.length) % selectedProject.gallery.length
        );
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedItem) return;
    setGalleryIndex(0);
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedProject) return;
    setProjectGalleryIndex(0);
  }, [selectedProject]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const canLoadMore = visibleCount < timeline.length;

  const languageToggle = () => setLang((l) => (l === "EN" ? "ES" : "EN"));
  const showSpanish = lang === "EN";

  const flagSrc = showSpanish
    ? "https://flagcdn.com/w80/es.png"
    : "https://flagcdn.com/w80/us.png";
  const flagAlt = showSpanish ? "Spanish" : "English";

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <MouseFollower />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollTo("home")}
            className="group flex items-baseline gap-2 font-mono text-sm tracking-widest"
          >
            <span className="text-white">JD</span>
            <span
              className="text-white/40 group-hover:text-white"
              style={{ transition: "color 200ms" }}
            >
              UX
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {(
              [
                { id: "home", label: t.nav.home },
                { id: "about", label: t.nav.about },
                { id: "experience", label: t.nav.experience },
                { id: "portfolio", label: t.nav.portfolio },
                { id: "skills", label: t.nav.skills },
                { id: "contact", label: t.nav.contact },
              ] as { id: string; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white"
              >
                {item.label}
                {activeSection === item.id && (
                  <span
                    className="absolute -bottom-2 left-0 h-px w-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={languageToggle}
              className="hidden items-center gap-2 rounded-full border border-white/20 px-3 py-2 font-mono text-xs uppercase tracking-widest text-white/80 hover:border-white/60 hover:text-white md:inline-flex"
              title={showSpanish ? "Español" : "English"}
            >
              <FlagCircle src={flagSrc} alt={flagAlt} />
              <span>
                {showSpanish
                  ? (t.language as Record<string, string>).toSpanish
                  : (t.language as Record<string, string>).toEnglish}
              </span>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-white/60 hover:text-white md:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-black/90 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
              <button
                onClick={languageToggle}
                className="flex items-center justify-between rounded-lg border border-white/15 px-3 py-3 font-mono text-xs uppercase tracking-widest text-white/80 hover:border-white/50 hover:text-white"
              >
                <span>
                  {showSpanish
                    ? (t.language as Record<string, string>).spanish
                    : (t.language as Record<string, string>).english}
                </span>
                <FlagCircle src={flagSrc} alt={flagAlt} />
              </button>
              {(
                [
                  { id: "home", label: t.nav.home },
                  { id: "about", label: t.nav.about },
                  { id: "experience", label: t.nav.experience },
                  { id: "portfolio", label: t.nav.portfolio },
                  { id: "skills", label: t.nav.skills },
                  { id: "contact", label: t.nav.contact },
                ] as { id: string; label: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="rounded-lg border border-white/10 px-3 py-3 text-left font-mono text-xs uppercase tracking-widest text-white/70 hover:border-white/50 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative pt-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.20]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-8">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 font-mono text-xs uppercase tracking-widest text-white/70">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                {t.hero.role as string}
              </div>

              <h1 className="mt-6 font-mono text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
                <span className="block text-white">{t.hero.title1 as string}</span>
                <span
                  className="block text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
                >
                  {t.hero.title2 as string}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-white/70">{t.hero.description as string}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo("portfolio")}
                  className="rounded-full border border-white/25 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/90 hover:border-white"
                  style={{ transition: "all 200ms" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
                    (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.25)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.9)";
                  }}
                >
                  {t.hero.viewWork as string}
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-full border border-white/25 bg-white/0 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/90 hover:border-white"
                  style={{ transition: "all 200ms" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = ACCENT;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
                    (e.currentTarget as HTMLButtonElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "rgba(255,255,255,0)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.25)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "rgba(255,255,255,0.9)";
                  }}
                >
                  {t.hero.contactMe as string}
                </button>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="rounded-2xl border border-white/15 bg-white/0 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white/60 text-xs font-mono uppercase tracking-widest">
                      {t.hero.focus as string}
                    </div>
                    <div className="mt-2 text-lg">UX Research • UI Systems • Product</div>
                  </div>
                  <Award size={18} className="text-white/60" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-white/10 p-3">
                    <div className="text-white/50">{t.hero.strength as string}</div>
                    <div className="mt-1 font-mono">Flow Design</div>
                  </div>
                  <div className="rounded-xl border border-white/10 p-3">
                    <div className="text-white/50">{t.hero.method as string}</div>
                    <div className="mt-1 font-mono">Testing</div>
                  </div>
                  <div className="rounded-xl border border-white/10 p-3">
                    <div className="text-white/50">{t.hero.deliverables as string}</div>
                    <div className="mt-1 font-mono">Figma</div>
                  </div>
                  <div className="rounded-xl border border-white/10 p-3">
                    <div className="text-white/50">{t.hero.handoff as string}</div>
                    <div className="mt-1 font-mono">Specs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center">
            <button
              onClick={() => scrollTo("about")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-mono text-xs uppercase tracking-widest text-white/70 hover:border-white/50 hover:text-white"
            >
              {t.hero.scroll as string}
              <ChevronDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <User className="text-white/60" size={18} />
                <h2 className="font-mono text-sm uppercase tracking-widest text-white/70">
                  {t.about.title as string}
                </h2>
              </div>
              <p className="mt-6 text-white/70">{t.about.p1 as string}</p>
              <p className="mt-4 text-white/70">{t.about.p2 as string}</p>

              <a
                href="https://binec.github.io/3D/assets/David-Ferrusca-%20UX-Designer.pdf"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/80 hover:border-white/60 hover:text-white"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = ACCENT;
                  (e.currentTarget as HTMLAnchorElement).style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,0.8)";
                }}
              >
                <ExternalLink size={16} />
                {t.about.downloadResume as string}
              </a>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: "8+",
                    label: (t.about.stats as Record<string, string>).years,
                  },
                  {
                    value: "25+",
                    label: (t.about.stats as Record<string, string>).projects,
                  },
                  {
                    value: "8+",
                    label: (t.about.stats as Record<string, string>).clients,
                  },
                  {
                    value: "16+",
                    label: (t.about.stats as Record<string, string>).techs,
                  },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/15 p-6">
                    <div className="font-mono text-3xl" style={{ color: ACCENT }}>
                      {s.value}
                    </div>
                    <div className="mt-2 text-white/60 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/15 p-6">
                <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Mail size={16} /> ferruscarea30@gmail.com
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Phone size={16} /> +52 33313935
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} /> Remote / Monterrey - CDMX MX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3">
            <Briefcase className="text-white/60" size={18} />
            <h2 className="font-mono text-sm uppercase tracking-widest text-white/70">
              {t.experience.title as string}
            </h2>
          </div>

          <div className="mt-10" ref={timelineRef}>
            <div className="relative">
              <div className="pointer-events-none absolute left-4 top-0 h-full w-px bg-white/15 md:left-1/2" />

              <div className="space-y-16">
                {shownTimeline.map((item, idx) => {
                  const left = idx % 2 === 0;
                  return (
                    <div
                      key={item.id}
                      data-timeline-item
                      data-visible="false"
                      className="relative grid gap-4 md:grid-cols-2"
                      style={{
                        opacity: 0,
                        transform: "translateY(16px)",
                        transition: "opacity 500ms ease, transform 500ms ease",
                      }}
                      ref={(node) => {
                        if (!node) return;
                        const isVisible =
                          (node as HTMLElement).dataset.visible === "true";
                        if (isVisible) {
                          (node as HTMLElement).style.opacity = "1";
                          (node as HTMLElement).style.transform = "translateY(0)";
                        }
                      }}
                    >
                      <div
                        className={
                          "md:flex " +
                          (left
                            ? "md:justify-end md:pr-10"
                            : "md:order-2 md:justify-start md:pl-10")
                        }
                      >
                        <div className="w-full max-w-xl rounded-2xl border border-white/15 p-6">
                          <div className="flex items-center justify-between gap-3">
                            <div className="inline-flex items-center gap-2 text-white/60 text-xs font-mono uppercase tracking-widest">
                              <Calendar size={14} /> {item.year}
                            </div>
                            <span
                              className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
                              style={{ textTransform: "uppercase" }}
                            >
                              {item.type}
                            </span>
                          </div>
                          <div className="mt-3 text-lg">{item.title}</div>
                          <div className="mt-1 text-white/60">{item.company}</div>
                          <div className="mt-1 inline-flex items-center gap-2 text-white/50 text-sm">
                            <MapPin size={14} /> {item.location}
                          </div>
                          <p className="mt-4 text-white/70 line-clamp-3">
                            {item.shortDescription}
                          </p>

                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <button
                              onClick={() => setSelectedItem(item)}
                              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 hover:border-white/60 hover:text-white"
                              aria-label={t.a11y.openJob as string}
                              onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.borderColor =
                                  ACCENT;
                                (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                              }}
                              onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.borderColor =
                                  "rgba(255,255,255,0.2)";
                                (e.currentTarget as HTMLButtonElement).style.color =
                                  "rgba(255,255,255,0.8)";
                              }}
                            >
                              {t.experience.seeMore as string}
                              <ExternalLink size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          "hidden md:block " +
                          (left ? "md:order-2" : "md:order-1")
                        }
                      />

                      <div
                        className="absolute left-4 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black md:left-1/2"
                        style={{
                          boxShadow: `0 0 0 4px rgba(0,4,255,0.15)`,
                          borderColor: ACCENT,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center justify-center">
                {canLoadMore ? (
                  <button
                    onClick={() =>
                      setVisibleCount((c) => Math.min(c + 6, timeline.length))
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/80 hover:border-white/60 hover:text-white"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
                      (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(255,255,255,0.2)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(255,255,255,0.8)";
                    }}
                  >
                    {t.experience.seeMoreJobs as string}
                  </button>
                ) : (
                  <div className="text-white/50 text-sm">
                    {t.experience.loadedAll as string}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3">
            <Award className="text-white/60" size={18} />
            <h2 className="font-mono text-sm uppercase tracking-widest text-white/70">
              {t.portfolio.title as string}
            </h2>
          </div>

          {/* Desktop/Tablet grid */}
          <div className="mt-10 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-white/15"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: "rgba(0,4,255,0.18)" }}
                  />
                </div>
                <div className="p-6">
                  <div className="text-white/60 text-xs font-mono uppercase tracking-widest">
                    {p.category}
                  </div>
                  <div className="mt-2 text-lg">{p.title}</div>
                  <p className="mt-3 text-white/70 text-sm">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 hover:border-white/60 hover:text-white"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
                        (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          "rgba(255,255,255,0.2)";
                        (e.currentTarget as HTMLButtonElement).style.color =
                          "rgba(255,255,255,0.8)";
                      }}
                    >
                      {t.portfolio.gallery as string}
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 2-col grid + horizontal slider */}
          <div className="mt-10 md:hidden">
            <div
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {Array.from({ length: Math.ceil(projects.length / 2) }).map(
                (_, pageIndex) => {
                  const page = projects.slice(pageIndex * 2, pageIndex * 2 + 2);
                  return (
                    <div key={pageIndex} className="w-full flex-none snap-center">
                      <div className="grid grid-cols-2 gap-4">
                        {page.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedProject(p)}
                            className="group overflow-hidden rounded-2xl border border-white/15 text-left"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <img
                                src={p.image}
                                alt={p.title}
                                className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                              />
                              <div
                                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                style={{ backgroundColor: "rgba(0,4,255,0.18)" }}
                              />
                            </div>
                            <div className="p-3">
                              <div className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                                {p.category}
                              </div>
                              <div className="mt-1 text-sm leading-snug">{p.title}</div>
                            </div>
                          </button>
                        ))}
                        {page.length === 1 && (
                          <div className="rounded-2xl border border-dashed border-white/10" />
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="mt-2 text-center text-xs text-white/50">
              {t.portfolio.swipe as string}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3">
            <Award className="text-white/60" size={18} />
            <h2 className="font-mono text-sm uppercase tracking-widest text-white/70">
              {t.skills.title as string}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {skills.map((s) => (
              <div key={s.category} className="rounded-2xl border border-white/15 p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-white/60">
                  {s.category}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-white/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3">
            <Phone className="text-white/60" size={18} />
            <h2 className="font-mono text-sm uppercase tracking-widest text-white/70">
              {t.contact.title as string}
            </h2>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-white/70">{t.contact.description as string}</p>
              <div className="mt-6 space-y-3 text-white/70">
                <a
                  href="mailto:ferruscarea30@gmail.com"
                  className="flex items-center gap-3 hover:text-white"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.7)")
                  }
                >
                  <Mail size={18} /> <span>ferruscarea30@gmail.com</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 hover:text-white"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.7)")
                  }
                >
                  <Linkedin size={18} />{" "}
                  <span>linkedin.com/in/david-ferrusca-a0800a104</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 hover:text-white"
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.7)")
                  }
                >
                  <Github size={18} /> <span>github.com/binec</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-7">
              <form
                action="https://formspree.io/f/mlgbwpzp"
                method="POST"
                className="rounded-2xl border border-white/15 p-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    name="name"
                    required
                    placeholder={t.contact.namePlaceholder as string}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-white placeholder:text-white/35 focus:outline-none"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t.contact.emailPlaceholder as string}
                    className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-white placeholder:text-white/35 focus:outline-none"
                  />
                </div>
                <textarea
                  name="message"
                  required
                  placeholder={t.contact.messagePlaceholder as string}
                  rows={6}
                  className="mt-4 w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/90 hover:border-white/60"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = ACCENT;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.2)";
                  }}
                >
                  {t.contact.send as string}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-white/50 text-sm">{t.footer.rights as string}</div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/60 hover:text-white"
              style={{ transition: "color 200ms" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.6)")
              }
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white"
              style={{ transition: "color 200ms" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.6)")
              }
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white"
              style={{ transition: "color 200ms" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.6)")
              }
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white"
              style={{ transition: "color 200ms" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.6)")
              }
              aria-label="Behance"
              title="Behance"
            >
              <Palette size={20} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white"
              style={{ transition: "color 200ms" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.6)")
              }
              aria-label="SoundCloud"
              title="SoundCloud"
            >
              <Music size={20} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white"
              style={{ transition: "color 200ms" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ACCENT)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.6)")
              }
              aria-label="Instagram"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* Timeline Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur" />
          <div className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-black">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <div className="text-white/60 text-xs font-mono uppercase tracking-widest">
                  {selectedItem.year} • {selectedItem.company}
                </div>
                <div className="mt-1 text-lg">{selectedItem.title}</div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-white/60 hover:text-white"
                aria-label={t.modal.close as string}
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 md:border-b-0 md:border-r md:border-white/10">
                  <img
                    src={selectedItem.gallery[galleryIndex]}
                    alt="Gallery"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setGalleryIndex(
                        (i) =>
                          (i - 1 + selectedItem.gallery.length) %
                          selectedItem.gallery.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white/80 hover:border-white/60"
                    aria-label={t.a11y.prev as string}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(255,255,255,0.2)")
                    }
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setGalleryIndex(
                        (i) => (i + 1) % selectedItem.gallery.length
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white/80 hover:border-white/60"
                    aria-label={t.a11y.next as string}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(255,255,255,0.2)")
                    }
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                    {selectedItem.gallery.map((_, i) => (
                      <button
                        key={i}
                        className="h-2 w-2 rounded-full border border-white/40"
                        style={{
                          backgroundColor:
                            i === galleryIndex ? ACCENT : "transparent",
                          borderColor:
                            i === galleryIndex ? ACCENT : "rgba(255,255,255,0.4)",
                        }}
                        onClick={() => setGalleryIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 md:border-b-0 md:border-r md:border-white/10">
                  {selectedItem.gallery.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setGalleryIndex(i)}
                      className="relative h-16 w-24 flex-none overflow-hidden rounded-lg border border-white/15"
                      style={{
                        borderColor:
                          i === galleryIndex ? ACCENT : "rgba(255,255,255,0.15)",
                      }}
                      aria-label={`Thumbnail ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt="Thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="p-6">
                  <div className="text-white/50 text-sm">{selectedItem.location}</div>
                  <p className="mt-4 text-white/75">{selectedItem.fullDescription}</p>

                  <div className="mt-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-white/60">
                      {t.modal.techTitle as string}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedItem.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-white/60">
                      {t.modal.achievementsTitle as string}
                    </div>
                    <ul className="mt-3 space-y-2 text-white/75 text-sm">
                      {selectedItem.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2">
                          <span
                            className="mt-2 h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: ACCENT }}
                          />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur" />
          <div className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-black">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <div className="text-white/60 text-xs font-mono uppercase tracking-widest">
                  {selectedProject.category}
                </div>
                <div className="mt-1 text-lg">{selectedProject.title}</div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-white/60 hover:text-white"
                aria-label={t.modal.close as string}
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-0 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 md:border-b-0 md:border-r md:border-white/10">
                  <img
                    src={selectedProject.gallery[projectGalleryIndex]}
                    alt="Gallery"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setProjectGalleryIndex(
                        (i) =>
                          (i - 1 + selectedProject.gallery.length) %
                          selectedProject.gallery.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white/80 hover:border-white/60"
                    aria-label={t.a11y.prev as string}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(255,255,255,0.2)")
                    }
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setProjectGalleryIndex(
                        (i) => (i + 1) % selectedProject.gallery.length
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2 text-white/80 hover:border-white/60"
                    aria-label={t.a11y.next as string}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(255,255,255,0.2)")
                    }
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                    {selectedProject.gallery.map((_, i) => (
                      <button
                        key={i}
                        className="h-2 w-2 rounded-full border border-white/40"
                        style={{
                          backgroundColor:
                            i === projectGalleryIndex ? ACCENT : "transparent",
                          borderColor:
                            i === projectGalleryIndex
                              ? ACCENT
                              : "rgba(255,255,255,0.4)",
                        }}
                        onClick={() => setProjectGalleryIndex(i)}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 md:border-b-0 md:border-r md:border-white/10">
                  {selectedProject.gallery.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setProjectGalleryIndex(i)}
                      className="relative h-16 w-24 flex-none overflow-hidden rounded-lg border border-white/15"
                      style={{
                        borderColor:
                          i === projectGalleryIndex
                            ? ACCENT
                            : "rgba(255,255,255,0.15)",
                      }}
                      aria-label={`Thumbnail ${i + 1}`}
                    >
                      <img
                        src={src}
                        alt="Thumbnail"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="p-6">
                  <div className="text-white/50 text-sm">
                    {selectedProject.description}
                  </div>
                  <p className="mt-4 text-white/75">
                    {selectedProject.fullDescription}
                  </p>

                  <div className="mt-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-white/60">
                      {t.modal.techTitle as string}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href={selectedProject.link}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/90 hover:border-white/60"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                          ACCENT;
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = ACCENT;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                          "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor =
                          "rgba(255,255,255,0.2)";
                      }}
                    >
                      <ExternalLink size={16} />
                      {t.modal.viewProject as string}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
