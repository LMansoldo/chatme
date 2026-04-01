import { downloadPdf } from '@xionkq/md-to-pdf'

export async function downloadCvPdf(
  markdown: string,
  filename = 'lucas-mansoldo-cv.pdf'
): Promise<void> {
  await downloadPdf(markdown, filename, {
    pageSize: 'A4',
    pageMargins: [48, 56, 48, 56],
  })
}
