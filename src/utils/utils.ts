export function parseRAWInput (input: string): string {
  let newInput = input

  if (newInput.includes('[]')) {
    newInput = newInput.replaceAll(
      '[]',
      '<span class="inline-flex rounded w-4 -mb-1 min-w-[20px] min-h-[20px] bg-check_box-bg border-2 border-check_box-border"></span>'
    )
  }
  if (newInput.includes('[x]')) {
    newInput = newInput.replaceAll(
      '[x]',
      '<span class="inline-flex rounded w-4 -mb-1 min-w-[20px] min-h-[20px] bg-check_box-bg border-2 border-check_box-border"> <img src="/check.svg"/></span>'
    )
  }
  if (newInput.includes('- ')) newInput = newInput.replaceAll('- ', '<li>')
  if (newInput.includes('---')) newInput = newInput.replaceAll('---', '<hr class="mb-4 text-text_area">')
  if (newInput.includes('\n')) newInput = newInput.replaceAll('\n', "<h5 class='mt-2'>")
  if (newInput.includes('#')) newInput = newInput.replaceAll('#', "<h1 class='text-3xl font-semibold tracking-wide'>")

  return newInput
}

export function parseDate (date: string): string {
  const getDate = new Date(date).toLocaleString()
  return getDate
}

export const defaultContent = `# Frontend Roadmap 
Pasos a seguir para ser frontend developer en 2023 🤘 
---
[x] Aprender HTML & CSS
[x] Aprender Javascript
[] Aprender Testing
[] Aprender Reactjs
[] Construir proyectos 🚨`
