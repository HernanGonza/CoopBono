import { useState } from 'react';
import { ArrowRight, Play, Menu, X, MapPin, FileStack, Route as RouteIcon, ScanSearch, School, ClipboardList, FileCheck2, Wallet, ReceiptText, ChartNoAxesCombined, Check, Server, Download, ShieldCheck, Smartphone, DatabaseBackup, Handshake, Mail, Globe, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CoopBonoDemo from '@/components/CoopBonoDemo';
import schoolImage from '@/assets/coopbono-escuela.jpg';
import markUrl from '@/assets/tacuara-mark-bn-96.webp';
import { stages } from '@/lib/mockData';

const SITE_URL = 'https://www.tacuara.com.ar';
const SITE_LABEL = 'www.tacuara.com.ar';
const EMAIL = 'hola@tacuara.com.ar';
const MAIL_SUBJECT = 'Reuni%C3%B3n%20sobre%20Plataforma%20CoopBono%202027';

const navigation = [{label:'Solución',id:'solucion'},{label:'Demo',id:'demo'},{label:'Implementación',id:'implementacion'}];
const challenges = [
  { icon:FileStack, title:'Un registro disperso', text:'Datos en papel o en distintas planillas. Información difícil de actualizar y una mirada provincial que cuesta construir.' },
  { icon:RouteIcon, title:'La distancia es una barrera', text:'Escuelas del interior que tienen que trasladarse para hacer trámites. Tiempo y recursos que podrían quedarse en el aula.' },
  { icon:ScanSearch, title:'Trazabilidad limitada', text:'Seguir en qué se usó cada peso del bono y controlar las rendiciones requiere reunir información de muchas fuentes.' },
];
const modules = [
  { icon:School, title:'Registro provincial digital', text:'Escuela, CUE, docente asesor, consejo, padrón de socios, estatuto y actas escaneadas. Un legajo actualizado con estados: En trámite, Registrada y Habilitada para el bono.' },
  { icon:ClipboardList, title:'Presentación de proyectos', text:'Una convocatoria y un formulario guiado: objetivo, presupuesto por ítem, cronograma y aval de dirección. Pensado para completar desde el celular.' },
  { icon:FileCheck2, title:'Evaluación transparente', text:'Rúbrica configurable y múltiples evaluadores de Acción Cooperativa y Educación. Puntaje y orden de mérito calculados automáticamente.' },
  { icon:Wallet, title:'Adjudicación y pagos', text:'Monto asignado, cuotas, fechas y comprobantes en un solo lugar. Cada cooperativa puede seguir el estado de su financiamiento.' },
  { icon:ReceiptText, title:'Rendición de cuentas', text:'Fotos de facturas y del resultado del proyecto. Saldo por rendir calculado automáticamente y avisos para llegar a tiempo a cada vencimiento.' },
  { icon:ChartNoAxesCombined, title:'Tablero del ministerio', text:'Cobertura por municipio, proyectos por tipo y montos ejecutados versus rendidos. Información clara para acompañar y tomar decisiones.' },
];
const technologies = [
  {icon:Server,title:'Alojamiento a elección',text:'Servidor provincial o infraestructura propia, según los requisitos acordados.'},
  {icon:Download,title:'Datos abiertos y exportables',text:'Exportaciones Excel y CSV. La información sigue siendo del ministerio.'},
  {icon:ShieldCheck,title:'Roles y permisos',text:'Accesos diferenciados para cooperativas, evaluadores y equipos ministeriales.'},
  {icon:Smartphone,title:'Desde cualquier dispositivo',text:'Una experiencia clara en celulares, tablets y computadoras.'},
  {icon:DatabaseBackup,title:'Copias de seguridad',text:'Respaldos periódicos y un plan de recuperación de la información.'},
  {icon:Handshake,title:'Soporte local en Misiones',text:'Acompañamiento cercano y capacitación para los equipos.'},
];

export default function App() {
  const [menu,setMenu] = useState(false);
  const links = [...navigation,{id:'contacto',label:'Contacto'}];
  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header">
      <div className="site-container header-inner">
        <a className="brand" href="#inicio" aria-label="Tacuara · Propuesta Plataforma CoopBono">
          <img className="brand-mark" src={markUrl} alt="" width={40} height={40} />
          <span className="brand-word">tacuara</span>
          <span className="brand-sub">Propuesta<br />CoopBono 2027</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
          <Button asChild size="sm" className="ml-2"><a href="#contacto" className="nav-cta">Conversemos <ArrowRight /></a></Button>
        </nav>
        <Button className="mobile-menu-button" variant="ghost" size="icon" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button>
      </div>
      {menu && <nav className="mobile-nav" aria-label="Navegación móvil">{links.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setMenu(false)}>{n.label}</a>)}</nav>}
    </header>
    <main id="contenido">
      <section className="hero" id="inicio">
        <div className="site-container hero-grid">
          <div className="reveal">
            <div className="eyebrow">Cooperativismo escolar · Misiones</div>
            <h1>CoopBono 2027, de la inscripción a la rendición, <em>en un solo lugar.</em></h1>
            <p className="hero-copy">Una plataforma para que las cooperativas escolares de toda la provincia se registren, presenten sus proyectos y rindan cuentas sin viajar a Posadas.</p>
            <div className="hero-actions">
              <Button asChild variant="default" size="proposal"><a href="#demo"><Play size={16} /> Ver la demo</a></Button>
              <Button asChild variant="heroOutline" size="proposal"><a href="#implementacion">Ver propuesta <ArrowRight /></a></Button>
            </div>
            <p className="hero-note"><MapPin size={14} /> Pensada en Misiones, cerca de cada escuela</p>
          </div>
          <div className="hero-visual reveal">
            <span className="hero-shape-a" aria-hidden="true" />
            <div className="hero-frame">
              <img className="hero-image" src={schoolImage} alt="Escena ilustrativa de estudiantes y una docente trabajando juntos en una huerta escolar misionera" width={1536} height={1024} fetchPriority="high" />
            </div>
            <span className="hero-shape-b" aria-hidden="true" />
            <p className="hero-caption">Ilustración de referencia · Huerta escolar</p>
          </div>
        </div>
      </section>
      <div className="context-strip"><div className="site-container context-inner"><span className="context-label">Una propuesta para</span><p className="context-title">Ministerio de Acción Cooperativa, Mutual, Comercio e Integración de la Provincia de Misiones</p><span className="context-meta"><FileCheck2 size={16} /> Propuesta comercial · Octubre 2026</span></div></div>
      <section className="section" id="desafio"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">01 / El desafío</div><h2>Menos barreras.<br /><em>Más oportunidades.</em></h2></div><p>El incentivo llega más lejos cuando la gestión es simple, cercana y transparente.</p></div><div className="grid-frame"><div className="three-grid">{challenges.map(c => <article className="feature-card challenge-card" key={c.title}><span className="feature-icon"><c.icon size={24} strokeWidth={1.7} /></span><h3>{c.title}</h3><p>{c.text}</p></article>)}</div></div></div></section>
      <section className="section section-solution" id="solucion"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">02 / La solución</div><h2>Una plataforma.<br /><em>Todo el recorrido.</em></h2></div><p>Seis módulos conectados para acompañar a las cooperativas escolares, desde su registro hasta el informe final.</p></div><div className="grid-frame alt"><div className="module-grid">{modules.map((m,i) => <article className="feature-card" key={m.title}><div className="card-top"><span className="feature-icon"><m.icon size={24} strokeWidth={1.7} /></span><span className="card-number">0{i+1}</span></div><h3>{m.title}</h3><p>{m.text}</p></article>)}</div></div></div></section>
      <section className="section" id="recorrido"><div className="site-container"><div className="eyebrow">03 / Cómo funciona</div><h2>Cada etapa, conectada<br /><em>con la siguiente.</em></h2><div className="grid-frame"><ol className="timeline">{stages.map((stage,i) => <li key={stage} className="timeline-item"><span className="timeline-dot">{String(i+1).padStart(2,'0')}</span><span>{stage}</span></li>)}</ol></div></div></section>
      <section className="section pt-0" id="demo"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">04 / Demo interactiva</div><h2>La propuesta, <em>en acción.</em></h2></div><p>Una primera mirada a la experiencia de las escuelas y del equipo del ministerio.</p></div><div className="grid-frame alt"><CoopBonoDemo /></div></div></section>
      <section className="section benefits-band" id="beneficios"><div className="site-container"><div className="eyebrow">05 / Beneficios</div><h2>Una gestión que <em>nos acerca.</em></h2><div className="grid-frame dark"><div className="benefits-grid"><div><h3>Para el ministerio</h3><ul>{['Trazabilidad de cada peso, de principio a fin','Auditoría simplificada y documentación ordenada','Datos en tiempo real para decidir mejor','Presencia territorial sin traslados'].map(text => <li key={text}><Check aria-hidden="true" />{text}</li>)}</ul></div><div><h3>Para las escuelas</h3><ul>{['Trámites desde el celular, sin viajar a Posadas','Seguimiento claro del estado de cada proyecto','Menos papeles y más tiempo para enseñar','Aprendizaje de gestión real para los alumnos'].map(text => <li key={text}><Check aria-hidden="true" />{text}</li>)}</ul></div></div></div></div></section>
      <section className="section" id="tecnologia"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">06 / Tecnología y datos</div><h2>Simple por fuera.<br /><em>Confiable por dentro.</em></h2></div><p>Una solución adaptable a la infraestructura provincial, con autonomía sobre los datos.</p></div><div className="grid-frame"><div className="tech-grid">{technologies.map(t => <div className="tech-item" key={t.title}><t.icon strokeWidth={1.6} aria-hidden="true" /><div><h3>{t.title}</h3><p>{t.text}</p></div></div>)}</div></div></div></section>
      <section className="section section-solution" id="implementacion"><div className="site-container"><div className="section-heading"><div><div className="eyebrow">07 / Plan de implementación</div><h2>Empezar cerca.<br /><em>Llegar a toda la provincia.</em></h2></div><p>Un despliegue gradual, con resultados concretos desde la primera etapa y acompañamiento en cada paso.</p></div><div className="grid-frame alt"><div className="three-grid"><article className="feature-card"><div className="phase-label">Etapa 01</div><h3>Piloto en Posadas</h3><p>Registro y presentación de proyectos con las cooperativas escolares de Posadas. Listo para abrir la convocatoria 2027.</p><span className="phase-tag">30–45 días</span></article><article className="feature-card"><div className="phase-label">Etapa 02</div><h3>Despliegue provincial</h3><p>Evaluación, adjudicación y alta de todas las cooperativas escolares de Misiones. Un proceso común para toda la provincia.</p><span className="phase-tag">Cobertura provincial</span></article><article className="feature-card"><div className="phase-label">Etapa 03</div><h3>Rendición y tablero</h3><p>Módulo de rendición de cuentas, tablero ministerial y capacitación a docentes asesores para consolidar el uso de la plataforma.</p><span className="phase-tag">Gestión de punta a punta</span></article></div></div></div></section>
      <section className="section contact-section" id="contacto"><div className="site-container"><div className="contact-card grid-frame alt">
        <div><div className="eyebrow">08 / Conversemos</div><h2>Hagamos que el CoopBono 2027 <em>llegue a cada escuela.</em></h2><p className="section-description">Conversemos sobre los próximos pasos y construyamos juntos una solución para Misiones.</p><div className="contact-cta"><Button asChild size="proposal"><a href={`mailto:${EMAIL}?subject=${MAIL_SUBJECT}`}>Coordinar una reunión <ArrowRight /></a></Button></div></div>
        <ul className="contact-details">
          <li><a href={`mailto:${EMAIL}`}><Mail size={22} aria-hidden="true" /><span><small>Correo</small>{EMAIL}</span></a></li>
          <li><a href={SITE_URL} target="_blank" rel="noreferrer"><Globe size={22} aria-hidden="true" /><span><small>Sitio web</small>{SITE_LABEL}</span></a></li>
          <li><span className="contact-static"><MapPin size={22} aria-hidden="true" /><span><small>Desde</small>Posadas, Misiones</span></span></li>
        </ul>
      </div></div></section>
    </main>
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <a className="footer-brand" href={SITE_URL} target="_blank" rel="noreferrer" aria-label="Tacuara, sitio web"><img src={markUrl} alt="" width={44} height={44} /><span>tacuara</span></a>
          <ul className="footer-links">
            <li><a href={`mailto:${EMAIL}`}><Mail size={18} aria-hidden="true" /> {EMAIL}</a></li>
            <li><a href={SITE_URL} target="_blank" rel="noreferrer"><Globe size={18} aria-hidden="true" /> {SITE_LABEL}</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tacuara · Propuesta elaborada en Octubre 2026</span>
          <span><Info size={14} aria-hidden="true" /> Propuesta de proveedor. No es un sitio oficial del Gobierno.</span>
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">tacuara</p>
    </footer>
  </>;
}
