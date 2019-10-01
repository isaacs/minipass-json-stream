exports.path = 'rows..value.'
exports.data = {
  title: 'hello world',
  header: { eyes: 2, mouth: 1, nose: 'more than enough' },
  rows: {
    value: [1, 2, 3],
    corn: {
      value: 'high',
      color: {
        value: 'yellow'
      },
    },
    beans: {
      noValue: false
    },
    apples: {
      value: 'crunchysweet',
      types: [
        { name: 'mcintosh', value: 'pies' },
        { name: 'honeycrisp', value: 'eating' },
        { name: 'eggs', value: {
          price: '$0.75',
          baking: 'adds protien',
          frying: 'adds eggy',
        }},
        { name: 'peas', value: { boiling: 'makes greeny' }},
      ]
    }
  },
  foot: { toes: 5, count: 2 },
}
