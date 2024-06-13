// Une fonction simulée pour imiter une requête asynchrone de données
export const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: amount }), 500),
  )
}
