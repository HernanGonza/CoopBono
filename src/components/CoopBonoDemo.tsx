import { lazy, Suspense, useState } from 'react';
import { Sprout, LayoutDashboard, School, ClipboardList, FileCheck2, Info, Plus, ArrowRight, ArrowLeft, Check, CheckCircle2, Upload, Trash2, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { cooperative, initialReceipts, initialBudget, projects, criteria, stages, projectSteps, currency, budgetTotal, scoreTotal, remainingBalance, dashboard, municipalities, projectTypes, monthlyAmounts } from '@/lib/mockData';

const MisionesMap = lazy(() => import('@/components/MisionesMap'));
const tabs = [{ name: 'Vista cooperativa', icon: School }, { name: 'Presentar proyecto', icon: ClipboardList }, { name: 'Evaluación', icon: FileCheck2 }, { name: 'Tablero del ministerio', icon: LayoutDashboard }];
const chartColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

export default function CoopBonoDemo() {
  const [tab, setTab] = useState(0);
  return <div className="demo-shell">
    <div className="demo-top"><div className="demo-brand"><Sprout size={19} /> CoopBono <span className="font-normal text-muted-foreground">2027</span></div><span className="demo-label"><Info size={12} /> Demo con datos ficticios</span></div>
    <div className="demo-tabs" role="tablist" aria-label="Vistas de la demo">{tabs.map((item,i) => <Button key={item.name} id={`demo-tab-${i}`} role="tab" aria-selected={tab === i} aria-controls={`demo-panel-${i}`} variant="ghost" className="demo-tab" data-active={tab === i} onClick={() => setTab(i)}><item.icon size={15} />{item.name}</Button>)}</div>
    <div className="demo-body" role="tabpanel" id={`demo-panel-${tab}`} aria-labelledby={`demo-tab-${tab}`}>
      <div hidden={tab !== 0}><CooperativeView /></div>
      <div hidden={tab !== 1}><ProjectForm /></div>
      <div hidden={tab !== 2}><EvaluationView /></div>
      {tab === 3 && <MinisterDashboard />}
    </div>
  </div>;
}

function CooperativeView() {
  const [receipts, setReceipts] = useState(initialReceipts);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<typeof initialReceipts[number] | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const balance = remainingBalance(cooperative.awarded, receipts);
  return <>
    <div className="demo-title-row"><div><h3 className="demo-title">Hola, cooperativa Raíces <span className="text-primary">☀</span></h3><p className="demo-subtitle">{cooperative.name} · {cooperative.school}, {cooperative.municipality}</p></div><span className="status"><CheckCircle2 size={12} /> Habilitada</span></div>
    <div className="demo-project"><div className="mini-label">TU PROYECTO · EXPEDIENTE {cooperative.file}</div><h4 className="demo-project-name">{cooperative.project}</h4><div className="demo-stage-track">{stages.filter((_,i) => i !== 1 && i !== 7).map((stage,i) => <div className="demo-stage" key={stage} data-done={i < 4} data-current={i === 4}><div className="demo-stage-line" /><span>{stage}</span></div>)}</div></div>
    <div className="demo-finances"><div><div className="mini-label">Monto adjudicado</div><div className="money-number">{currency(cooperative.awarded)}</div></div><div><div className="mini-label">Saldo por rendir</div><div className="money-number">{currency(balance)}</div></div></div>
    <div className="receipt-heading"><h4>Rendición de cuentas</h4><Button variant="outline" size="sm" onClick={() => { setUploaded(false); setOpen(true); }}><Plus /> Subir comprobante</Button></div>
    <div className="demo-table-wrapper"><table className="demo-table"><thead><tr><th>Comprobante</th><th>Fecha</th><th>Monto</th><th>Estado</th><th /></tr></thead><tbody>{receipts.map(r => <tr key={r.id}><td><span className="flex items-center gap-2"><FileText size={14} className="text-muted-foreground" />{r.name}</span></td><td className="text-muted-foreground">{r.date}</td><td>{currency(r.amount)}</td><td><span className={`status ${r.status === 'En revisión' ? 'status-review' : r.status === 'Observado' ? 'status-observed' : ''}`}>{r.status}</span></td><td><Button size="icon" variant="ghost" aria-label={`Ver ${r.name}`} title={`Ver ${r.name}`} onClick={() => setDetail(r)}><ArrowRight /></Button></td></tr>)}</tbody></table></div>
    <p className="demo-subtitle mt-3">El saldo se actualiza cuando los comprobantes son aprobados. Próximo vencimiento: 30/06/2027.</p>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>Subir comprobante</DialogTitle><DialogDescription>Rendición de ejemplo · Expediente {cooperative.file}</DialogDescription></DialogHeader>
      {uploaded ? <div className="success-state"><CheckCircle2 size={42} /><h3>Comprobante recibido</h3><p>Se agregó a la rendición y quedó en revisión.</p><Button onClick={() => setOpen(false)}>Volver al panel</Button></div> : <form className="grid gap-5" onSubmit={e => { e.preventDefault(); const data = new FormData(e.currentTarget); setReceipts(previous => [...previous, { id: Date.now(), name: String(data.get('name')), amount: Number(data.get('amount')), date: '24/04/2027', status: 'En revisión', detail: 'Comprobante de ejemplo pendiente de revisión.' }]); setUploaded(true); }}>
        <label className="field">Concepto<input name="name" required placeholder="Ej.: materiales para la huerta" /></label><label className="field">Monto (ARS)<input name="amount" type="number" min="1" required placeholder="0" /></label><label className="field">Foto o archivo de la factura<input name="file" type="file" accept="image/*,.pdf" required /></label><label className="field">Fotos del resultado del proyecto (opcional)<input type="file" accept="image/*" multiple /></label><p className="demo-subtitle">Los archivos no se envían ni se guardan fuera de esta demo.</p><Button type="submit"><Upload /> Enviar comprobante</Button>
      </form>}
    </DialogContent></Dialog>
    <Dialog open={detail !== null} onOpenChange={value => { if (!value) setDetail(null); }}><DialogContent><DialogHeader><DialogTitle>{detail?.name}</DialogTitle><DialogDescription>{detail?.date} · {currency(detail?.amount ?? 0)}</DialogDescription></DialogHeader><p className="text-sm">{detail?.detail}</p><Button onClick={() => { setDetail(null); setUploaded(false); setOpen(true); }}><Upload /> Subir otro comprobante</Button></DialogContent></Dialog>
  </>;
}

function ProjectForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [items, setItems] = useState(initialBudget);
  const [data, setData] = useState({ title: '', type: 'Huerta', objective: '', start: '', end: '', schedule: '', approval: false });
  const [approvalFile, setApprovalFile] = useState('');
  const total = budgetTotal(items);
  const update = (id: number, key: 'name' | 'quantity' | 'price', value: string) => setItems(previous => previous.map(item => item.id === id ? { ...item, [key]: key === 'name' ? value : Number(value) } : item));
  if (sent) return <div className="success-state"><CheckCircle2 size={52} /><h3>Proyecto enviado</h3><p>Tu presentación quedó registrada para la convocatoria CoopBono 2027.<br />Expediente ficticio: <strong>CB-2027-0097</strong></p><div className="mini-label">{data.title} · {currency(total)}</div><Button className="mt-5" variant="outline" onClick={() => { setSent(false); setStep(0); }}>Volver al proyecto</Button></div>;
  return <>
    <div className="demo-title-row"><div><h3 className="demo-title">Un nuevo proyecto, un nuevo comienzo</h3><p className="demo-subtitle">Convocatoria CoopBono 2027 · {cooperative.name}</p></div></div>
    <div className="form-stepper">{projectSteps.map((label,i) => <div key={label} className="form-step" data-active={i <= step}><b>{i < step ? <Check size={14} /> : i + 1}</b><span>{label}</span></div>)}</div>
    <form onSubmit={e => { e.preventDefault(); if (step < 3) setStep(step + 1); else setSent(true); }}>
      {step === 0 && <div className="form-grid"><label className="field">Nombre del proyecto<input required value={data.title} onChange={e => setData({...data,title:e.target.value})} placeholder="¿Cómo se llama su idea?" /></label><label className="field">Tipo de proyecto<select value={data.type} onChange={e => setData({...data,type:e.target.value})}>{projectTypes.map(t => <option key={t.name}>{t.name}</option>)}</select></label><label className="field md:col-span-2">Objetivo del proyecto<textarea required value={data.objective} onChange={e => setData({...data,objective:e.target.value})} placeholder="Contanos qué quieren lograr y a quiénes va a beneficiar." /></label></div>}
      {step === 1 && <><div className="demo-table-wrapper"><table className="demo-table"><thead><tr><th>Ítem</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th><th /></tr></thead><tbody>{items.map((item,i) => <tr key={item.id}><td><input className="budget-input" aria-label={`Ítem ${i+1}`} value={item.name} onChange={e => update(item.id,'name',e.target.value)} required /></td><td><input className="budget-input" aria-label={`Cantidad ${i+1}`} type="number" min="1" value={item.quantity} onChange={e => update(item.id,'quantity',e.target.value)} required /></td><td><input className="budget-input" aria-label={`Precio ${i+1}`} type="number" min="1" value={item.price} onChange={e => update(item.id,'price',e.target.value)} required /></td><td className="whitespace-nowrap">{currency(item.quantity*item.price)}</td><td><Button type="button" variant="ghost" size="icon" title="Eliminar ítem" aria-label={`Eliminar ítem ${i+1}`} disabled={items.length === 1} onClick={() => setItems(items.filter(row => row.id !== item.id))}><Trash2 /></Button></td></tr>)}</tbody></table></div><Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setItems([...items,{id:Date.now(),name:'',quantity:1,price:0}])}><Plus /> Agregar ítem</Button><div className="budget-total"><span>Total solicitado</span><span aria-live="polite" className="text-primary">{currency(total)}</span></div></>}
      {step === 2 && <div className="form-grid"><label className="field">Fecha de inicio<input required type="date" value={data.start} onChange={e => setData({...data,start:e.target.value})} /></label><label className="field">Fecha de finalización<input required type="date" min={data.start || undefined} value={data.end} onChange={e => setData({...data,end:e.target.value})} /></label><label className="field md:col-span-2">Actividades y cronograma<textarea required value={data.schedule} onChange={e => setData({...data,schedule:e.target.value})} placeholder="Detallá las actividades y cuándo van a realizarlas." /></label><label className="field md:col-span-2">Aval de la dirección (PDF o foto)<input type="file" accept="image/*,.pdf" required={!approvalFile} onChange={e => setApprovalFile(e.target.files?.[0]?.name ?? '')} />{approvalFile && <span className="demo-subtitle">{approvalFile}</span>}</label></div>}
      {step === 3 && <><h4 className="font-semibold mb-4">Revisá tu presentación</h4><dl className="grid gap-3 text-sm"><div><dt className="mini-label">Proyecto</dt><dd>{data.title} · {data.type}</dd></div><div><dt className="mini-label">Objetivo</dt><dd>{data.objective}</dd></div><div><dt className="mini-label">Presupuesto</dt><dd>{items.length} ítems · {currency(total)}</dd></div><div><dt className="mini-label">Cronograma</dt><dd>{data.start} al {data.end} · {data.schedule}</dd></div><div><dt className="mini-label">Aval de dirección</dt><dd>{approvalFile}</dd></div></dl><label className="flex items-start gap-3 text-xs mt-6"><input type="checkbox" required checked={data.approval} onChange={e => setData({...data,approval:e.target.checked})} />Confirmo que los datos del proyecto son correctos y que cuenta con el aval de la dirección.</label></>}
      <div className="form-footer"><Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep(step-1)}><ArrowLeft /> Anterior</Button><Button type="submit">{step === 3 ? 'Enviar proyecto' : 'Continuar'}<ArrowRight /></Button></div>
    </form>
  </>;
}

function EvaluationView() {
  const [rows,setRows] = useState(projects);
  const [selected,setSelected] = useState<number | null>(null);
  const [draft,setDraft] = useState<number[]>([]);
  const [saved,setSaved] = useState(false);
  const project = rows.find(row => row.id === selected);
  const ranked = [...rows].sort((a,b) => scoreTotal(b.scores)-scoreTotal(a.scores));
  const openProject = (row: typeof projects[number]) => { setSelected(row.id); setDraft([...row.scores]); setSaved(false); };
  return <>
    <div className="demo-title-row"><div><h3 className="demo-title">Proyectos para evaluar</h3><p className="demo-subtitle">Acción Cooperativa + Educación · Convocatoria 2027 · Orden de mérito</p></div><span className="status">8 proyectos</span></div>
    {saved && <p className="status mb-4" role="status"><CheckCircle2 size={13} /> Evaluación guardada. Orden de mérito actualizado.</p>}
    <div className="demo-table-wrapper"><table className="demo-table"><thead><tr><th>Orden</th><th>Proyecto / cooperativa</th><th>Municipio</th><th>Tipo</th><th>Monto solicitado</th><th>Puntaje</th><th /></tr></thead><tbody>{ranked.map((row,i) => <tr key={row.id} tabIndex={0} aria-label={`Evaluar ${row.name}`} onClick={() => openProject(row)} onKeyDown={e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(row); } }}><td className="text-muted-foreground">{String(i+1).padStart(2,'0')}</td><td><strong className="font-semibold">{row.name}</strong><div className="demo-subtitle">{row.cooperative}</div></td><td>{row.municipality}</td><td><span className="status">{row.type}</span></td><td className="whitespace-nowrap">{currency(row.amount)}</td><td><strong className="text-primary">{scoreTotal(row.scores)}</strong><span className="text-muted-foreground"> /100</span></td><td><ArrowRight size={14} /></td></tr>)}</tbody></table></div>
    <Sheet open={project !== undefined} onOpenChange={open => { if(!open) setSelected(null); }}><SheetContent className="overflow-y-auto"><SheetHeader><SheetTitle>{project?.name}</SheetTitle><SheetDescription>{project?.cooperative} · {project?.municipality}</SheetDescription></SheetHeader><p className="demo-subtitle mt-5">Rúbrica de ejemplo · 4 criterios con igual ponderación</p>{criteria.map((criterion,i) => <div className="rubric-row" key={criterion}><label className="rubric-label" htmlFor={`criterion-${i}`}><span>{criterion}</span><strong>{draft[i]} / 10</strong></label><input id={`criterion-${i}`} type="range" min="1" max="10" step="1" value={draft[i] ?? 1} onChange={e => setDraft(draft.map((value,index) => index === i ? Number(e.target.value) : value))} /></div>)}<div className="rubric-score" aria-live="polite">{draft.length ? scoreTotal(draft) : 0}<span className="text-sm font-normal"> / 100 puntos</span></div><Button className="w-full" onClick={() => { setRows(rows.map(row => row.id === selected ? {...row,scores:draft} : row)); setSelected(null); setSaved(true); }}><Check /> Guardar evaluación</Button></SheetContent></Sheet>
  </>;
}

function MinisterDashboard() {
  const exportCSV = () => {
    const csv = '\uFEFFMunicipio;Cooperativas;Proyectos\n' + municipalities.map(m => `${m.name};${m.count};${m.projects}`).join('\n');
    const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
    const link = document.createElement('a'); link.href=url; link.download='coopbono-demo-municipios.csv'; link.click(); URL.revokeObjectURL(url);
  };
  return <>
    <div className="demo-title-row"><div><h3 className="demo-title">Una mirada a toda la provincia</h3><p className="demo-subtitle">CoopBono 2027 · Corte de ejemplo: agosto 2027</p></div><Button size="sm" variant="outline" onClick={exportCSV} title="Exportar datos ficticios"><Download /> CSV</Button></div>
    <div className="kpi-grid">{[{ label:'Cooperativas registradas',value:dashboard.registered },{label:'Proyectos presentados',value:dashboard.presented},{label:'Monto adjudicado',value:currency(dashboard.awarded)},{label:'Monto rendido',value:`${dashboard.renderedPercent}%`}].map(kpi => <div key={kpi.label}><div className="mini-label">{kpi.label}</div><div className="kpi-value">{kpi.value}</div></div>)}</div>
    <div className="charts-grid">
      <div className="chart-block"><h4>Proyectos por municipio</h4><ResponsiveContainer width="100%" height={260}><BarChart data={municipalities} layout="vertical" margin={{left:0,right:15}}><CartesianGrid stroke="var(--border)" horizontal={false} /><XAxis type="number" tick={{fontSize:10,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false} /><YAxis type="category" dataKey="name" width={95} tick={{fontSize:9,fill:'var(--muted-foreground)'}} axisLine={false} tickLine={false} /><Tooltip /><Bar name="Proyectos" dataKey="projects" fill="var(--primary)" radius={[0,3,3,0]} barSize={14} /></BarChart></ResponsiveContainer></div>
      <div className="chart-block"><h4>Proyectos por tipo</h4><ResponsiveContainer width="100%" height={225}><PieChart><Pie data={projectTypes} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>{projectTypes.map((entry,i) => <Cell key={entry.name} fill={chartColors[i]} stroke="var(--card)" />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div className="chart-legend">{projectTypes.map((t,i) => <span key={t.name}><i className="legend-dot" data-color={i} />{t.name} ({t.value})</span>)}</div></div>
      <div className="chart-block"><h4>Monto adjudicado vs. rendido · millones de ARS</h4><ResponsiveContainer width="100%" height={260}><LineChart data={monthlyAmounts} margin={{left:-20,right:10,top:10}}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" /><XAxis dataKey="month" tick={{fontSize:10,fill:'var(--muted-foreground)'}} /><YAxis tick={{fontSize:10,fill:'var(--muted-foreground)'}} /><Tooltip formatter={value => `${value} millones ARS`} /><Line type="monotone" dataKey="adjudicado" name="Adjudicado" stroke="var(--primary)" strokeWidth={2} /><Line type="monotone" dataKey="rendido" name="Rendido" stroke="var(--earth)" strokeWidth={2} /></LineChart></ResponsiveContainer><div className="chart-legend"><span><i className="legend-dot" />Adjudicado</span><span><i className="legend-dot" data-color="1" />Rendido</span></div></div>
      <div className="chart-block"><h4>Presencia territorial · cooperativas por municipio</h4><Suspense fallback={<div className="misiones-map bg-muted" />}><MisionesMap /></Suspense></div>
    </div>
  </>;
}