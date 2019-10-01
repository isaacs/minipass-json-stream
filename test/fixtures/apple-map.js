exports.path = 'rows.$*..value'
exports.map = (data, actualPath) =>
  typeof data === 'string' ? data.toUpperCase() : null

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
      value: null,
      noValue: false
    },
    apples: {
      types: [
        { name: 'mcintosh', value: 'pies' },
        { name: 'honeycrisp', value: 'eating' },
        { name: 'eggs', value: {
          price: '$0.75',
          baking: 'adds protien',
          frying: 'adds eggy',
        }},
      ]
    }
  },
  foot: { toes: 5, count: 2 },
}
