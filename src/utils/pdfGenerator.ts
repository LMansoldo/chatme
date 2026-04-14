import { downloadPdf } from '@xionkq/md-to-pdf'

export async function downloadCvPdf(
  markdown: string,
  filename = 'lucas-mansoldo-cv.pdf'
): Promise<void> {
  const pdfMakeModule = await import('pdfmake/build/pdfmake.js')
  const pdfMake = (pdfMakeModule as any).default ?? pdfMakeModule

  // Register Helvetica (standard PDF font, equivalent to Arial)
  pdfMake.fonts = {
    ...pdfMake.fonts,
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    },
  }

  const pdfMakeProxy = new Proxy(pdfMake, {
    get(target, prop) {
      if (prop === 'createPdf') {
        return (docDef: any, ...args: any[]) => {
          docDef.defaultStyle = {
            ...docDef.defaultStyle,
            font: 'Helvetica',
            fontSize: 12,
          }
          return target.createPdf(docDef, ...args)
        }
      }
      return target[prop]
    },
  })

  await downloadPdf(markdown, filename, {
    pageSize: 'A4',
    pageMargins: [48, 56, 48, 56],
    pdfMakeInstance: pdfMakeProxy,
  })
}
