export function shuffleArray(array) {
  const _arr = [...array]
  for (let i = _arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[_arr[i], _arr[j]] = [_arr[j], _arr[i]]
  }
  return _arr
}

const colors = ['accent-1', 'accent-2', 'accent-3', 'accent-4', 'brand']
export function getRandomAccentColor(n = 5) {
  return colors[parseInt(Math.random() * n)]
}
