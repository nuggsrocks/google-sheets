export async function fetchSheetJson(url: string) {
  const res = await fetch(url)

  const text = await res.text()

  const json = JSON.parse(
    text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1),
  )

  return json
}
