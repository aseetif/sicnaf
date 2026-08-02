// lib/pdf.ts
'use client'

export async function generateFacturePDF(facture: any) {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  // Colors
  const primaryBlue = [30, 58, 95]
  const accentGold = [245, 158, 11]
  const lightGray = [248, 250, 252]

  // Header background
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.rect(0, 0, pageWidth, 45, 'F')

  // Company name
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('SICNAF', 15, 22)

  // Tagline
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(accentGold[0], accentGold[1], accentGold[2])
  doc.text('Solutions Industrielles & Interventions', 15, 30)

  // Contact info header right
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.text('+213 550 59 56 30', pageWidth - 15, 18, { align: 'right' })
  doc.text('contact@sicnaf.com', pageWidth - 15, 24, { align: 'right' })
  doc.text('Beni Tamou, Zaouia, Blida 09000, Algerie', pageWidth - 15, 30, { align: 'right' })

  // Gold accent line
  doc.setFillColor(accentGold[0], accentGold[1], accentGold[2])
  doc.rect(0, 45, pageWidth, 2, 'F')

  // FACTURE title
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('FACTURE', pageWidth - 15, 60, { align: 'right' })

  // Facture number
  doc.setFontSize(11)
  doc.setTextColor(100, 116, 139)
  doc.text(`N° ${facture.numero}`, pageWidth - 15, 68, { align: 'right' })

  // Dates
  doc.setFontSize(9)
  doc.text(`Emission : ${new Date(facture.dateEmission || facture.createdAt).toLocaleDateString('fr-FR')}`, pageWidth - 15, 76, { align: 'right' })
  if (facture.dateEcheance) {
    doc.text(`Echeance : ${new Date(facture.dateEcheance).toLocaleDateString('fr-FR')}`, pageWidth - 15, 82, { align: 'right' })
  }

  // Client section
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.roundedRect(12, 55, 85, 70, 3, 3, 'F')

  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('FACTURE A', 18, 64)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(50, 50, 50)
  doc.setFontSize(10)
  const client = facture.intervention?.client
  if (client) {
    doc.setFont('helvetica', 'bold')
    doc.text(`${client.prenom} ${client.nom}`, 18, 72)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    if (client.societe) doc.text(client.societe, 18, 79)
    if (client.adresse) doc.text(client.adresse, 18, 86)
    if (client.telephone) doc.text(client.telephone, 18, 93)
    if (client.nis) doc.text(`NIS: ${client.nis}`, 18, 100)
    if (client.nif) doc.text(`NIF: ${client.nif}`, 18, 107)
    if (client.rc) doc.text(`RC: ${client.rc}`, 18, 114)
    if (client.rib) doc.text(`RIB: ${client.rib}`, 18, 121)
    if (client.nArt) doc.text(`N° Art: ${client.nArt}`, 18, 128)
  }

  // Intervention info
  doc.setFontSize(9)
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFont('helvetica', 'bold')
  doc.text("OBJET DE L'INTERVENTION", 15, 140)

  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setLineWidth(0.5)
  doc.line(15, 142, pageWidth - 15, 142)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(50, 50, 50)
  doc.setFontSize(9)
  doc.text(facture.intervention?.description || '', 15, 149, { maxWidth: pageWidth - 30 })

  // Lignes table
  const lignes = facture.intervention?.lignes || []
  const pieces = lignes.filter((l: any) => l.type === 'PIECE')
  const mainOeuvre = lignes.filter((l: any) => l.type === 'MAIN_OEUVRE')

  const tableData: any[] = []

  if (pieces.length > 0) {
    tableData.push([{ content: 'PIECES & MATERIAUX', colSpan: 5, styles: { fillColor: [30, 58, 95], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 } }])
    pieces.forEach((p: any) => {
      tableData.push([p.description, 'Piece', p.quantite, `${p.prixUnitaire.toFixed(2)} DA`, `${p.total.toFixed(2)} DA`])
    })
  }

  if (mainOeuvre.length > 0) {
    tableData.push([{ content: "MAIN D'OEUVRE", colSpan: 5, styles: { fillColor: [30, 58, 95], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 } }])
    mainOeuvre.forEach((m: any) => {
      tableData.push([m.description, 'M.O.', m.quantite, `${m.prixUnitaire.toFixed(2)} DA`, `${m.total.toFixed(2)} DA`])
    })
  }

  autoTable(doc, {
    startY: 157,
    head: [['Description', 'Type', 'Qte', 'P.U. HT', 'Total HT']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [245, 158, 11],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [50, 50, 50],
    },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 75 },
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 25, halign: 'right' },
    },
    margin: { left: 15, right: 15 },
  })

  const finalY = (doc as any).lastAutoTable.finalY + 8

  // Totals box
  const boxX = pageWidth - 80
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.roundedRect(boxX - 5, finalY - 3, 70, 35, 3, 3, 'F')

  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.text('Sous-total HT :', boxX, finalY + 5)
  doc.setTextColor(50, 50, 50)
  doc.text(`${facture.sousTotal.toFixed(2)} DA`, pageWidth - 15, finalY + 5, { align: 'right' })

  doc.setTextColor(100, 116, 139)
  doc.text(`TVA (${facture.tva}%) :`, boxX, finalY + 13)
  doc.setTextColor(50, 50, 50)
  doc.text(`${(facture.total - facture.sousTotal).toFixed(2)} DA`, pageWidth - 15, finalY + 13, { align: 'right' })

  // Total line
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.roundedRect(boxX - 5, finalY + 17, 70, 12, 2, 2, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('TOTAL TTC :', boxX, finalY + 25)
  doc.text(`${facture.total.toFixed(2)} DA`, pageWidth - 15, finalY + 25, { align: 'right' })

  // Notes
  if (facture.notes) {
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139)
    doc.setFontSize(8)
    doc.text('Notes : ' + facture.notes, 15, finalY + 40, { maxWidth: pageWidth - 30 })
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 30
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.rect(0, footerY - 5, pageWidth, 35, 'F')
  doc.setFillColor(accentGold[0], accentGold[1], accentGold[2])
  doc.rect(0, footerY - 7, pageWidth, 2, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'normal')
  doc.text('Capital Social: 19 200 000 DA  |  N° Article: 09230500153  |  R.C N° 09/00-0803817 B02', pageWidth / 2, footerY + 2, { align: 'center' })
  doc.text('NIF: 000209080381744  |  NIS: 0002 0923 00562 61', pageWidth / 2, footerY + 8, { align: 'center' })
  doc.text('CCP Bancaire BEA: 3900.20.63  |  Compte BEA N° 091 22 00487/87', pageWidth / 2, footerY + 14, { align: 'center' })
  doc.text('RIB: 002 000 910 9122 00487 87  |  Agence: Ouled Yaiche 091', pageWidth / 2, footerY + 20, { align: 'center' })
  doc.text('SICNAF — www.sicnaf.com — contact@sicnaf.com', pageWidth / 2, footerY + 26, { align: 'center' })

  doc.save(`facture-${facture.numero}.pdf`)
}

export async function generateDevisPDF(devis: any) {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()

  const primaryBlue = [30, 58, 95]
  const accentGold = [245, 158, 11]
  const lightGray = [248, 250, 252]

  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.rect(0, 0, pageWidth, 45, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('SICNAF', 15, 22)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(accentGold[0], accentGold[1], accentGold[2])
  doc.text('Solutions Industrielles & Interventions', 15, 30)

  // Contact info header right
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.text('+213 550 59 56 30', pageWidth - 15, 18, { align: 'right' })
  doc.text('contact@sicnaf.com', pageWidth - 15, 24, { align: 'right' })
  doc.text('Beni Tamou, Zaouia, Blida 09000, Algerie', pageWidth - 15, 30, { align: 'right' })

  doc.setFillColor(accentGold[0], accentGold[1], accentGold[2])
  doc.rect(0, 45, pageWidth, 2, 'F')

  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('DEVIS', pageWidth - 15, 60, { align: 'right' })

  doc.setFontSize(11)
  doc.setTextColor(100, 116, 139)
  doc.text(`N° ${devis.numero}`, pageWidth - 15, 68, { align: 'right' })

  doc.setFontSize(9)
  doc.text(`Date : ${new Date(devis.createdAt).toLocaleDateString('fr-FR')}`, pageWidth - 15, 76, { align: 'right' })
  doc.text('Valable 30 jours', pageWidth - 15, 82, { align: 'right' })

  // Client
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.roundedRect(12, 55, 85, 70, 3, 3, 'F')
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('CLIENT', 18, 64)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(50, 50, 50)
  doc.setFontSize(10)
  const client = devis.client
  if (client) {
    doc.setFont('helvetica', 'bold')
    doc.text(`${client.prenom} ${client.nom}`, 18, 72)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    if (client.societe) doc.text(client.societe, 18, 79)
    if (client.telephone) doc.text(client.telephone, 18, 86)
    if (client.nis) doc.text(`NIS: ${client.nis}`, 18, 93)
    if (client.nif) doc.text(`NIF: ${client.nif}`, 18, 100)
    if (client.rc) doc.text(`RC: ${client.rc}`, 18, 107)
    if (client.rib) doc.text(`RIB: ${client.rib}`, 18, 114)
    if (client.nArt) doc.text(`N° Art: ${client.nArt}`, 18, 121)
  }

  // Description
  doc.setFontSize(9)
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setFont('helvetica', 'bold')
  doc.text('DESCRIPTION DES TRAVAUX', 15, 138)
  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.line(15, 140, pageWidth - 15, 140)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(50, 50, 50)
  doc.text(devis.description, 15, 147, { maxWidth: pageWidth - 30 })

  const lignes = devis.lignes || []
  const tableData = lignes.map((l: any) => [
    l.description,
    l.type === 'PIECE' ? 'Piece' : 'M.O.',
    l.quantite,
    `${l.prixUnitaire.toFixed(2)} DA`,
    `${l.total.toFixed(2)} DA`,
  ])

  autoTable(doc, {
    startY: 155,
    head: [['Description', 'Type', 'Qte', 'P.U. HT', 'Total HT']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [245, 158, 11], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9, textColor: [50, 50, 50] },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 75 },
      1: { cellWidth: 25, halign: 'center' },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 25, halign: 'right' },
    },
    margin: { left: 15, right: 15 },
  })

  const finalY = (doc as any).lastAutoTable.finalY + 8
  const boxX = pageWidth - 80
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.roundedRect(boxX - 5, finalY - 3, 70, 35, 3, 3, 'F')

  doc.setFontSize(9)
  doc.setTextColor(100, 116, 139)
  doc.text('Sous-total HT :', boxX, finalY + 5)
  doc.setTextColor(50, 50, 50)
  doc.text(`${devis.sousTotal.toFixed(2)} DA`, pageWidth - 15, finalY + 5, { align: 'right' })
  doc.setTextColor(100, 116, 139)
  doc.text(`TVA (${devis.tva}%) :`, boxX, finalY + 13)
  doc.setTextColor(50, 50, 50)
  doc.text(`${(devis.total - devis.sousTotal).toFixed(2)} DA`, pageWidth - 15, finalY + 13, { align: 'right' })

  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.roundedRect(boxX - 5, finalY + 17, 70, 12, 2, 2, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('TOTAL TTC :', boxX, finalY + 25)
  doc.text(`${devis.total.toFixed(2)} DA`, pageWidth - 15, finalY + 25, { align: 'right' })

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 30
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.rect(0, footerY - 5, pageWidth, 35, 'F')
  doc.setFillColor(accentGold[0], accentGold[1], accentGold[2])
  doc.rect(0, footerY - 7, pageWidth, 2, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(6.5)
  doc.setFont('helvetica', 'normal')
  doc.text('Capital Social: 19 200 000 DA  |  N° Article: 09230500153  |  R.C N° 09/00-0803817 B02', pageWidth / 2, footerY + 2, { align: 'center' })
  doc.text('NIF: 000209080381744  |  NIS: 0002 0923 00562 61', pageWidth / 2, footerY + 8, { align: 'center' })
  doc.text('CCP Bancaire BEA: 3900.20.63  |  Compte BEA N° 091 22 00487/87', pageWidth / 2, footerY + 14, { align: 'center' })
  doc.text('RIB: 002 000 910 9122 00487 87  |  Agence: Ouled Yaiche 091', pageWidth / 2, footerY + 20, { align: 'center' })
  doc.text('SICNAF — www.sicnaf.com — contact@sicnaf.com', pageWidth / 2, footerY + 26, { align: 'center' })

  doc.save(`devis-${devis.numero}.pdf`)
}