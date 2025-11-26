import type { AccordionPreFillProps } from "../components/review-section/Review-section";

export const reviewSectionData: Record<string, AccordionPreFillProps[]> = {
  'Bygning / Inventar': [
    {
      whatToCheck: 'Porte',
      lawInspection: 'Ja.',
      internalControl: 'Nej.',
      howToCheck: 'Virker nødstop osv. Tjek datoen på mærkat',
      responsible:
        'Stationen står selv for service og små reperationer. Portene efterses af ekstern leverandør',
    },
    {
      whatToCheck: 'Rumudsugning',
      lawInspection: 'Ja.',
      internalControl: 'Nej.',
      howToCheck: 'Tjek datoen på mærkat',
      responsible:
        'Stationen står selv for service og små reperationer. Ventilationsanlæg efterses af ekstern leverandør',
    },
  ],
  'Kontorarbejdspladser': [
    {
      whatToCheck: 'Ergonomisk indretning',
      lawInspection: 'Ja.',
      internalControl: 'Ja.',
      howToCheck: 'Tjek bord- og stolhøjde, skærmplacering',
      responsible: 'Lokal sikkerhedsrepræsentant',
    },
    {
      whatToCheck: 'Belysning',
      lawInspection: 'Ja.',
      internalControl: 'Nej.',
      howToCheck: 'Kontroller lysstyrke og placering af lamper',
      responsible: 'Stationen',
    },
  ],
  'Beredskab og førstehjælp': [
    {
      whatToCheck: 'Førstehjælpskasser',
      lawInspection: 'Ja.',
      internalControl: 'Ja.',
      howToCheck: 'Tjek udløbsdatoer og komplethed',
      responsible: 'Arbejdsmiljørepræsentant',
    },
    {
      whatToCheck: 'Nødudgange',
      lawInspection: 'Ja.',
      internalControl: 'Ja.',
      howToCheck: 'Kontroller frie flugtveje og skiltning',
      responsible: 'Stationen',
    },
  ],
  'Kemikalier': [
    {
      whatToCheck: 'Opbevaring',
      lawInspection: 'Ja.',
      internalControl: 'Ja.',
      howToCheck: 'Tjek kemikalieskab og mærkning',
      responsible: 'Kemikalieansvarlig',
    },
    {
      whatToCheck: 'Sikkerhedsdatablade',
      lawInspection: 'Ja.',
      internalControl: 'Nej.',
      howToCheck: 'Kontroller tilgængelighed og opdatering',
      responsible: 'Kemikalieansvarlig',
    },
  ],
  'Udeområde, Brandgårde, Øvelsesareal': [
    {
      whatToCheck: 'Stiger',
      lawInspection: 'Ja.',
      internalControl: 'Ja.',
      howToCheck:
        'Alle stiger skal tjekkes af særligt uddannet. Tjek datoen på stigerne',
      responsible:
        '12m stiger bliver efterset af værksted og påsætter mærkat. Stationen kontrollere selv stigen er efter ved bytning af køretøj osv.',
    },
    {
      whatToCheck: 'El-værktøj',
      lawInspection: 'Ja.',
      internalControl: 'Ja.',
      howToCheck: 'Alt el-værktøj skal tjekkes af særligt uddannet.',
      responsible: 'Værksted',
    },
  ],
};