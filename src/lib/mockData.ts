export const currency = (value: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
export type BudgetItem = { id: number; name: string; quantity: number; price: number };
export const budgetTotal = (items: BudgetItem[]) => items.reduce((sum, item) => sum + item.quantity * item.price, 0);
export const scoreTotal = (scores: number[]) => Math.round(scores.reduce((sum, score) => sum + Math.min(10, Math.max(1, score)), 0) / scores.length * 10);
export const cooperative = { name: 'Cooperativa Escolar Raíces Ltda.', school: 'Escuela N° 000', municipality: 'Oberá', project: 'Sembrando futuro: nuestra huerta escolar', awarded: 850000, file: 'CB-2027-0042' };
export const initialReceipts = [
  { id: 1, name: 'Semillas y plantines', date: '12/04/2027', amount: 125000, status: 'Aprobado', detail: 'Comprobante validado.' },
  { id: 2, name: 'Herramientas de huerta', date: '18/04/2027', amount: 180000, status: 'En revisión', detail: 'Pendiente de revisión del equipo evaluador.' },
  { id: 3, name: 'Materiales para canteros', date: '22/04/2027', amount: 95000, status: 'Observado', detail: 'La foto de la factura no es legible. Volvé a subirla.' },
];
export const remainingBalance = (awarded: number, receipts: {amount: number; status: string}[]) => awarded - receipts.filter(r => r.status === 'Aprobado').reduce((sum,r) => sum + r.amount, 0);
export const initialBudget: BudgetItem[] = [{ id: 1, name: 'Semillas y plantines', quantity: 10, price: 12500 }, { id: 2, name: 'Herramientas de huerta', quantity: 6, price: 30000 }];
export const criteria = ['Impacto educativo', 'Participación cooperativa', 'Viabilidad del proyecto', 'Sustentabilidad'];
export const projects = [
  { id: 1, name: 'Huerta que nos une', cooperative: 'Coop. Escolar Amanecer', municipality: 'Posadas', type: 'Huerta', amount: 950000, scores: [9,8,9,8] },
  { id: 2, name: 'Sembrando futuro', cooperative: 'Coop. Escolar Raíces', municipality: 'Oberá', type: 'Huerta', amount: 850000, scores: [9,9,8,9] },
  { id: 3, name: 'Un patio para todos', cooperative: 'Coop. Escolar Horizonte', municipality: 'Eldorado', type: 'Mejora edilicia', amount: 1200000, scores: [8,7,9,8] },
  { id: 4, name: 'Manos que acompañan', cooperative: 'Coop. Escolar Encuentro', municipality: 'Apóstoles', type: 'Solidario', amount: 600000, scores: [9,10,8,8] },
  { id: 5, name: 'Taller de ideas', cooperative: 'Coop. Escolar Unión', municipality: 'Leandro N. Alem', type: 'Productivo', amount: 780000, scores: [8,8,7,9] },
  { id: 6, name: 'Nuestra escuela crece', cooperative: 'Coop. Escolar El Ceibo', municipality: 'San Vicente', type: 'Mejora edilicia', amount: 1100000, scores: [7,8,8,8] },
  { id: 7, name: 'Reciclar para crear', cooperative: 'Coop. Escolar Yvyrá', municipality: 'Puerto Iguazú', type: 'Productivo', amount: 720000, scores: [9,8,9,10] },
  { id: 8, name: 'Red de solidaridad', cooperative: 'Coop. Escolar La Colmena', municipality: 'Jardín América', type: 'Solidario', amount: 650000, scores: [8,9,8,9] },
];
export const municipalities = [
  { name: 'Posadas', count: 24, projects: 18, lat: -27.367, lng: -55.896 },
  { name: 'Oberá', count: 18, projects: 14, lat: -27.487, lng: -55.12 },
  { name: 'Eldorado', count: 15, projects: 11, lat: -26.408, lng: -54.624 },
  { name: 'Apóstoles', count: 12, projects: 9, lat: -27.914, lng: -55.754 },
  { name: 'L. N. Alem', count: 14, projects: 10, lat: -27.603, lng: -55.325 },
  { name: 'San Vicente', count: 13, projects: 10, lat: -26.617, lng: -54.133 },
  { name: 'Puerto Iguazú', count: 16, projects: 12, lat: -25.599, lng: -54.574 },
  { name: 'Jardín América', count: 16, projects: 12, lat: -27.043, lng: -55.226 },
];
export const projectTypes = [{ name: 'Huerta', value: 32 }, { name: 'Productivo', value: 28 }, { name: 'Solidario', value: 20 }, { name: 'Mejora edilicia', value: 16 }];
export const monthlyAmounts = [{ month: 'Mar', adjudicado: 12, rendido: 2 }, { month: 'Abr', adjudicado: 24, rendido: 10 }, { month: 'May', adjudicado: 36, rendido: 21 }, { month: 'Jun', adjudicado: 48, rendido: 32 }, { month: 'Jul', adjudicado: 60, rendido: 41 }, { month: 'Ago', adjudicado: 68, rendido: 49 }];
export const dashboard = { registered: 128, presented: 96, awarded: 68000000, renderedPercent: 72 };
export const projectSteps = ['Datos del proyecto', 'Presupuesto', 'Cronograma', 'Confirmación'];
export const stages = ['Registro', 'Convocatoria', 'Presentación', 'Evaluación', 'Adjudicación', 'Ejecución', 'Rendición', 'Informe final'];