import { config, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: { owner: 'deregital', name: 'planeta-nocturno-landing' },
    branchPrefix: 'keystatic/',
  },
  ui: {
    brand: { name: 'Planeta Nocturno CMS' },
  },
  singletons: {
    siteSettings: singleton({
      label: 'Configuración del sitio',
      path: 'content/site-settings',
      format: { data: 'yaml' },
      schema: {
        pageTitle: fields.text({ label: 'Título de página' }),
        metaDescription: fields.text({ label: 'Meta descripción', multiline: true }),
      },
    }),
    nav: singleton({
      label: 'Navegación',
      path: 'content/nav',
      format: { data: 'yaml' },
      schema: {
        logoPartA: fields.text({ label: 'Logo — parte 1 (blanca)' }),
        logoPartB: fields.text({ label: 'Logo — parte 2 (ámbar)' }),
        links: fields.array(
          fields.object({
            href: fields.text({ label: 'Enlace (href)' }),
            label: fields.text({ label: 'Texto del enlace' }),
          }),
          { label: 'Enlace', itemLabel: (props) => props.fields.label.value }
        ),
      },
    }),
    hero: singleton({
      label: 'Hero',
      path: 'content/hero',
      format: { data: 'yaml' },
      schema: {
        badge: fields.text({ label: 'Badge superior' }),
        headlineLine1: fields.text({ label: 'Título línea 1' }),
        headlineLine2: fields.text({ label: 'Título línea 2' }),
        headlineAccent: fields.text({ label: 'Título acento (ámbar)' }),
        description: fields.text({ label: 'Descripción', multiline: true }),
        ctaLabel: fields.text({ label: 'Botón — texto' }),
        ctaHref: fields.text({ label: 'Botón — enlace' }),
      },
    }),
    features: singleton({
      label: 'Funcionalidades',
      path: 'content/features',
      format: { data: 'yaml' },
      schema: {
        sectionLabel: fields.text({ label: 'Etiqueta de sección' }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Título' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
            bullets: fields.array(fields.text({ label: 'Punto' }), { label: 'Punto' }),
            imageAlt: fields.text({ label: 'Alt de imagen' }),
            reversed: fields.checkbox({ label: 'Imagen a la izquierda', defaultValue: false }),
            phoneFrame: fields.checkbox({ label: 'Frame de celular', defaultValue: false }),
          }),
          { label: 'Funcionalidad', itemLabel: (props) => props.fields.title.value }
        ),
      },
    }),
    paymentMethods: singleton({
      label: 'Medios de pago',
      path: 'content/payment-methods',
      format: { data: 'yaml' },
      schema: {
        sectionLabel: fields.text({ label: 'Etiqueta de sección' }),
        heading: fields.text({ label: 'Título' }),
        headingAccent: fields.text({ label: 'Título acento (ámbar)' }),
        description: fields.text({ label: 'Descripción', multiline: true }),
        methods: fields.array(
          fields.object({
            name: fields.text({ label: 'Nombre' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          { label: 'Medio de pago', itemLabel: (props) => props.fields.name.value }
        ),
      },
    }),
    organizerNetwork: singleton({
      label: 'Red de organizadores',
      path: 'content/organizer-network',
      format: { data: 'yaml' },
      schema: {
        sectionLabel: fields.text({ label: 'Etiqueta de sección' }),
        headingLine1: fields.text({ label: 'Título línea 1' }),
        headingLine2: fields.text({ label: 'Título línea 2' }),
        leftTitle: fields.text({ label: 'Subtítulo izquierda' }),
        leftDescription: fields.text({ label: 'Descripción izquierda', multiline: true }),
        roleCards: fields.array(
          fields.object({
            role: fields.text({ label: 'Rol' }),
            tagline: fields.text({ label: 'Tagline' }),
            features: fields.array(fields.text({ label: 'Feature' }), { label: 'Feature' }),
          }),
          { label: 'Rol', itemLabel: (props) => props.fields.role.value }
        ),
        highlights: fields.array(
          fields.object({
            title: fields.text({ label: 'Título' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          { label: 'Highlight', itemLabel: (props) => props.fields.title.value }
        ),
      },
    }),
    howItWorks: singleton({
      label: 'Cómo funciona',
      path: 'content/how-it-works',
      format: { data: 'yaml' },
      schema: {
        sectionLabel: fields.text({ label: 'Etiqueta de sección' }),
        heading: fields.text({ label: 'Título' }),
        steps: fields.array(
          fields.object({
            number: fields.text({ label: 'Número' }),
            title: fields.text({ label: 'Título' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          { label: 'Paso', itemLabel: (props) => props.fields.title.value }
        ),
      },
    }),
    stats: singleton({
      label: 'Estadísticas',
      path: 'content/stats',
      format: { data: 'yaml' },
      schema: {
        items: fields.array(
          fields.object({
            value: fields.number({ label: 'Valor' }),
            suffix: fields.text({ label: 'Sufijo (ej: + o %)' }),
            label: fields.text({ label: 'Etiqueta' }),
          }),
          { label: 'Estadística', itemLabel: (props) => props.fields.label.value }
        ),
      },
    }),
    cta: singleton({
      label: 'CTA — Contacto',
      path: 'content/cta',
      format: { data: 'yaml' },
      schema: {
        headingLine1: fields.text({ label: 'Título línea 1' }),
        headingAccent: fields.text({ label: 'Título acento (ámbar)' }),
        description: fields.text({ label: 'Descripción', multiline: true }),
        whatsappHref: fields.text({ label: 'Link WhatsApp' }),
        whatsappLabel: fields.text({ label: 'Botón WhatsApp — texto' }),
        emailHref: fields.text({ label: 'Link email (mailto:...)' }),
        emailLabel: fields.text({ label: 'Botón email — texto' }),
        footerNote: fields.text({ label: 'Nota inferior' }),
      },
    }),
    footer: singleton({
      label: 'Footer',
      path: 'content/footer',
      format: { data: 'yaml' },
      schema: {
        logoPartA: fields.text({ label: 'Logo — parte 1 (blanca)' }),
        logoPartB: fields.text({ label: 'Logo — parte 2 (ámbar)' }),
        brandDescription: fields.text({ label: 'Descripción de marca' }),
        copyrightName: fields.text({ label: 'Nombre en copyright' }),
      },
    }),
  },
});
