const CAT_ENDPOINT_RANDOM_FACT =  `https://catfact.ninja/fact`

export const getRandomFact = async () => {
  let res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
  let data = await res.json()
  const { fact } = data
  return fact
}