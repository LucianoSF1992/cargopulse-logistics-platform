import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowDownRight, ArrowUpRight, Bell, Box, ChevronDown, CircleAlert, Clock3, MapPin, PackageCheck, Search, Truck } from 'lucide-react';

type Status = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'EXCEPTION';
type Priority = 'STANDARD' | 'EXPRESS' | 'URGENT';
type Shipment = {
  id: string; trackingCode: string; recipient: string; originCity: string;
  destinationCity: string; status: Status; priority: Priority; estimatedDelivery: string;
  events?: { id: string; description: string; location: string; occurredAt: string }[];
};
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const demo: Shipment[] = [
  { id:'demo-1', trackingCode:'CP-2026-1001', recipient:'Mariana Costa', originCity:'Vitória, ES', destinationCity:'Belo Horizonte, MG', status:'IN_TRANSIT', priority:'EXPRESS', estimatedDelivery:'2026-10-18T15:00:00Z' },
  { id:'demo-2', trackingCode:'CP-2026-1002', recipient:'Rafael Almeida', originCity:'Serra, ES', destinationCity:'Rio de Janeiro, RJ', status:'DELIVERED', priority:'STANDARD', estimatedDelivery:'2026-10-12T16:00:00Z' },
  { id:'demo-3', trackingCode:'CP-2026-1003', recipient:'Camila Rocha', originCity:'São Paulo, SP', destinationCity:'Vitória, ES', status:'DELAYED', priority:'URGENT', estimatedDelivery:'2026-10-14T12:00:00Z' },
  { id:'demo-4', trackingCode:'CP-2026-1004', recipient:'Pedro Martins', originCity:'Curitiba, PR', destinationCity:'São Paulo, SP', status:'PENDING', priority:'STANDARD', estimatedDelivery:'2026-10-20T17:00:00Z' },
  { id:'demo-5', trackingCode:'CP-2026-1005', recipient:'Bianca Oliveira', originCity:'Belo Horizonte, MG', destinationCity:'Salvador, BA', status:'EXCEPTION', priority:'EXPRESS', estimatedDelivery:'2026-10-13T13:00:00Z' },
  { id:'demo-6', trackingCode:'CP-2026-1006', recipient:'Lucas Ferreira', originCity:'Rio de Janeiro, RJ', destinationCity:'Vitória, ES', status:'IN_TRANSIT', priority:'STANDARD', estimatedDelivery:'2026-10-19T14:00:00Z' },
];
const statusLabel: Record<Status, string> = { PENDING:'Pendente', IN_TRANSIT:'Em trânsito', DELIVERED:'Entregue', DELAYED:'Atrasada', EXCEPTION:'Ocorrência' };
const priorityLabel: Record<Priority, string> = { STANDARD:'Padrão', EXPRESS:'Expressa', URGENT:'Urgente' };
function date(value: string) { return new Intl.DateTimeFormat('pt-BR', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }).format(new Date(value)); }

export default function App() {
  const [shipments, setShipments] = useState<Shipment[]>(demo);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [selected, setSelected] = useState<Shipment | null>(null);
  const [apiState, setApiState] = useState<'loading'|'connected'|'demo'>('loading');

  useEffect(() => {
    let alive = true;
    fetch(`${API}/shipments`)
      .then(r => { if (!r.ok) throw new Error('API unavailable'); return r.json(); })
      .then(data => { if (alive && Array.isArray(data)) { setShipments(data); setApiState('connected'); } })
      .catch(() => { if (alive) setApiState('demo'); });
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => shipments.filter(s => {
    const q = search.toLocaleLowerCase('pt-BR');
    const matches = [s.trackingCode, s.recipient, s.originCity, s.destinationCity].some(v => v.toLocaleLowerCase('pt-BR').includes(q));
    return matches && (status === 'ALL' || s.status === status);
  }), [shipments, search, status]);
  const count = (s: Status) => shipments.filter(item => item.status === s).length;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Truck size={21}/></span><span>Cargo<span className="brand-light">Pulse</span><small>LOGISTICS INTELLIGENCE</small></span></div>
      <div className="workspace-label">WORKSPACE</div>
      <button className="nav-item active"><Activity size={18}/> Visão geral</button>
      <button className="nav-item" onClick={() => { setStatus('ALL'); document.getElementById('shipments')?.scrollIntoView({ behavior:'smooth' }); }}><Box size={18}/> Remessas <span className="nav-count">{shipments.length}</span></button>
      <button className="nav-item" onClick={() => setStatus('DELAYED')}><Clock3 size={18}/> Atrasos</button>
      <button className="nav-item" onClick={() => setStatus('EXCEPTION')}><CircleAlert size={18}/> Ocorrências</button>
      <div className="sidebar-bottom"><div className="avatar">LF</div><div><strong>Operação Demo</strong><small>Plano de avaliação</small></div><ChevronDown size={15}/></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>Visão geral</strong></div><div className="top-actions"><span className={`connection ${apiState}`}><i/> {apiState === 'connected' ? 'API conectada' : apiState === 'demo' ? 'Modo demonstração' : 'Conectando...'}</span><button className="icon-button" aria-label="Notificações"><Bell size={18}/><b/></button><div className="top-avatar">LF</div></div></header>
      <section className="page-heading"><div><div className="eyebrow">QUARTA-FEIRA, 14 DE OUTUBRO DE 2026</div><h1>Visão geral da operação</h1><p>Acompanhe suas entregas e identifique o que precisa de atenção.</p></div><button className="primary-button" onClick={() => window.location.href = '#shipments'}><PackageCheck size={17}/> Ver remessas</button></section>
      <section className="kpi-grid">
        <Kpi title="Total de remessas" value={shipments.length} subtitle="Em toda a operação" icon={<Box size={19}/>} tone="blue" trend="+12,8%" up/>
        <Kpi title="Em trânsito" value={count('IN_TRANSIT')} subtitle="A caminho do destino" icon={<Truck size={19}/>} tone="violet" trend="+4,3%" up/>
        <Kpi title="Entregues" value={count('DELIVERED')} subtitle="Concluídas com sucesso" icon={<PackageCheck size={19}/>} tone="green" trend="+8,2%" up/>
        <Kpi title="Precisam de atenção" value={count('DELAYED') + count('EXCEPTION')} subtitle="Atrasos e ocorrências" icon={<CircleAlert size={19}/>} tone="orange" trend="Acompanhar" />
      </section>
      <section className="middle-grid">
        <div className="panel map-panel"><div className="panel-heading"><div><h2>Visão de rotas</h2><p>Resumo ilustrativo dos principais corredores</p></div><button className="subtle-button">Últimos 7 dias <ChevronDown size={14}/></button></div>
          <div className="route-visual"><div className="route-grid"></div><svg viewBox="0 0 600 230" role="img" aria-label="Ilustração de rotas logísticas"><path d="M80 155 Q180 35 290 105 T500 65" className="route-line route-line-blue"/><path d="M80 155 Q230 210 350 150 T500 65" className="route-line route-line-orange"/><path d="M290 105 Q340 35 420 120" className="route-line route-line-dash"/>{[[80,155,'Vitória'],[290,105,'Belo Horizonte'],[500,65,'Salvador'],[350,150,'Rio de Janeiro']].map(([x,y,label])=><g key={String(label)}><circle cx={Number(x)} cy={Number(y)} r="8" className="route-dot"/><circle cx={Number(x)} cy={Number(y)} r="15" className="route-halo"/><text x={Number(x)+13} y={Number(y)-13}>{label}</text></g>)}</svg><div className="map-note"><MapPin size={15}/> Mapa esquemático — não representa geolocalização real</div></div>
          <div className="route-legend"><span><i className="legend-blue"/> Corredor principal <strong>12 remessas</strong></span><span><i className="legend-orange"/> Em atenção <strong>{count('DELAYED') + count('EXCEPTION')} remessas</strong></span></div>
        </div>
        <div className="panel attention-panel"><div className="panel-heading"><div><h2>Central de atenção</h2><p>Itens que merecem acompanhamento</p></div><span className="alert-count">{count('DELAYED') + count('EXCEPTION')}</span></div>
          {shipments.filter(s => s.status === 'DELAYED' || s.status === 'EXCEPTION').slice(0,3).map(s=><button className="attention-item" key={s.id} onClick={()=>setSelected(s)}><span className={`attention-icon ${s.status==='DELAYED'?'warning':'danger'}`}><CircleAlert size={17}/></span><span className="attention-copy"><strong>{s.status==='DELAYED'?'Entrega atrasada':'Ocorrência na remessa'}</strong><small>{s.trackingCode} · {s.destinationCity}</small></span><ChevronDown className="attention-chevron" size={16}/></button>)}
          {!shipments.some(s => s.status === 'DELAYED' || s.status === 'EXCEPTION') && <div className="empty-state">Nenhuma ocorrência no momento.</div>}
          <button className="text-link" onClick={()=>{setStatus('DELAYED'); document.getElementById('shipments')?.scrollIntoView({behavior:'smooth'});}}>Ver itens em atenção <span>→</span></button>
        </div>
      </section>
      <section className="panel shipments-panel" id="shipments">
        <div className="panel-heading shipment-heading"><div><h2>Remessas recentes</h2><p>Pesquise e acompanhe as movimentações da operação.</p></div><span className="result-count">{filtered.length} resultados</span></div>
        <div className="table-tools"><label className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar código, destinatário ou cidade..." /></label><select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filtrar por status"><option value="ALL">Todos os status</option>{Object.entries(statusLabel).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select><button className="subtle-button filter-button" onClick={()=>{setSearch('');setStatus('ALL');}}>Limpar filtros</button></div>
        <div className="table-wrap"><table><thead><tr><th>CÓDIGO / DESTINATÁRIO</th><th>ROTA</th><th>STATUS</th><th>PRIORIDADE</th><th>PREVISÃO</th><th></th></tr></thead><tbody>
          {filtered.map(s=><tr key={s.id} onClick={()=>setSelected(s)} className="shipment-row" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&setSelected(s)}><td><strong className="tracking">{s.trackingCode}</strong><small className="recipient">{s.recipient}</small></td><td><div className="route-cell"><span>{s.originCity}</span><span className="route-arrow">→</span><span>{s.destinationCity}</span></div></td><td><span className={`status-badge ${s.status.toLowerCase()}`}><i/>{statusLabel[s.status]}</span></td><td><span className={`priority ${s.priority.toLowerCase()}`}>{priorityLabel[s.priority]}</span></td><td className="date-cell">{date(s.estimatedDelivery)}</td><td><button className="row-action" aria-label={`Detalhes de ${s.trackingCode}`} onClick={e=>{e.stopPropagation();setSelected(s);}}>↗</button></td></tr>)}
          {filtered.length===0&&<tr><td colSpan={6} className="empty-table">Nenhuma remessa encontrada para esses filtros.</td></tr>}
        </tbody></table></div>
        <div className="table-footer"><span>Exibindo <strong>{filtered.length}</strong> de <strong>{shipments.length}</strong> remessas</span><span>Dados fictícios para demonstração</span></div>
      </section>
      <footer>© 2026 CargoPulse · Projeto de portfólio desenvolvido por Luciano Silva Ferreira <span>React · NestJS · PostgreSQL</span></footer>
    </main>
    {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}><section className="detail-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}>×</button><div className="eyebrow">DETALHES DA REMESSA</div><h2>{selected.trackingCode}</h2><p className="modal-recipient">{selected.recipient}</p><div className="detail-status"><span className={`status-badge ${selected.status.toLowerCase()}`}><i/>{statusLabel[selected.status]}</span><span className={`priority ${selected.priority.toLowerCase()}`}>{priorityLabel[selected.priority]}</span></div><div className="detail-route"><div><small>ORIGEM</small><strong>{selected.originCity}</strong></div><span>→</span><div><small>DESTINO</small><strong>{selected.destinationCity}</strong></div></div><div className="detail-eta"><Clock3 size={17}/> Previsão de entrega: <strong>{date(selected.estimatedDelivery)}</strong></div><h3>Últimas movimentações</h3>{(selected.events?.length ? selected.events : [{id:'a',description:'Remessa registrada no ambiente de demonstração',location:selected.originCity,occurredAt:new Date().toISOString()}]).map(ev=><div className="event-row" key={ev.id}><span className="event-dot"/><div><strong>{ev.description}</strong><small>{ev.location} · {date(ev.occurredAt)}</small></div></div>)}<div className="demo-notice">Ambiente demonstrativo · As atualizações são ilustrativas.</div></section></div>}
  </div>;
}
function Kpi({title,value,subtitle,icon,tone,trend,up}:{title:string;value:number;subtitle:string;icon:React.ReactNode;tone:string;trend:string;up?:boolean}) {
  return <article className="kpi-card"><div className="kpi-top"><span>{title}</span><span className={`kpi-icon ${tone}`}>{icon}</span></div><div className="kpi-value">{value}</div><div className="kpi-bottom"><span>{subtitle}</span><span className={`trend ${up?'up':''}`}>{up?<ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>} {trend}</span></div></article>;
}
