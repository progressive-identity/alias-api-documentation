const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Alias API Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  base: "/alias-api-documentation/",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Getting started',
        link: '/getting-started/introduction',
      }
    ],
    sidebar: {
      '/getting-started/': [
        {
          title: 'Getting started',
          collapsable: false,
          children: [
            'introduction',
            'steps',
            'entering-processing-records',
            'declaring-locations',
            'matching-locations-datatypes',
            'setup-events',
            'setup-events-dev'
          ]
        },
        {
          title: 'Alias for developers',
          path: '/developers/event-system',
          collapsable: false,
          children: [
            '/developers/sanitizing-data-history',
            '/developers/unit-test-for-law'
          ]
        },
        {
          title: 'Alias for DPO',
          collapsable: false,
          path: '/dpo/events',
          children: [
            '/dpo/events',
            '/dpo/processing-records'
          ]
        }
      ],
      '/developers/': [
        {
          title: 'Alias for developers',
          collapsable: false,
          children: [
            'sanitizing-data-history',
            'unit-test-for-law'
          ]
        }
      ],
      '/dpo/': [
        {
          title: 'Alias for DPO',
          collapsable: false,
          children: [
            'events',
            'processing-records'
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
