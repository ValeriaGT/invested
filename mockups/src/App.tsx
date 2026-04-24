import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  History, 
  Info, 
  PlusCircle,
  ChevronRight,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  X,
  PieChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('crecer');
  const [activeCrecerSubTab, setActiveCrecerSubTab] = useState('mi-nivel');
  const [activeRentabilidadSubTab, setActiveRentabilidadSubTab] = useState('rendimientos');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMezclasDrawerOpen, setIsMezclasDrawerOpen] = useState(false); 
  const [expandedMezcla, setExpandedMezcla] = useState<string | null>(null);
  const [showObservadorBanner, setShowObservadorBanner] = useState(true);
  const [userLevel, setUserLevel] = useState<'principiante' | 'observador'>('observador');

  const tabs = [
    { id: 'rentabilidad', label: 'Rentabilidad', icon: <TrendingUp size={18} /> },
    { id: 'objetivo', label: 'Objetivo', icon: <Target size={18} /> },
    { id: 'movimientos', label: 'Movimientos', icon: <History size={18} /> },
    { id: 'detalles', label: 'Detalles', icon: <Info size={18} /> },
    { id: 'crecer', label: 'Crecer', icon: <PlusCircle size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#2D3748]">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Fondo Voluntario de Pensión Skandia Multifund — INVEST-ED
                </p>
                <button 
                  onClick={() => setActiveTab('crecer')}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#00A34D]/5 border border-[#00A34D]/30 rounded-full text-[10px] font-bold text-[#006B33] hover:bg-[#00A34D]/10 transition-colors cursor-pointer"
                >
                  {userLevel === 'principiante' ? (
                    <><span>🌱</span> Principiante</>
                  ) : (
                    <><span>🔭</span> Observador</>
                  )}
                </button>
              </div>
              <h1 className="text-3xl font-bold text-[#00A34D] mt-1">Invertir en finca raíz 🏠</h1>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Saldo Total del Contrato</p>
              <p className="text-4xl font-extrabold text-slate-900 mt-1">$125,450,000.00</p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <InfoCard 
              title="Saldo" 
              value="$125,450,000" 
              subtitle="Disponible para retiro"
              icon={<Wallet className="text-[#00A34D]" />}
            />
            <InfoCard 
              title="Evolución" 
              value="+12.45%" 
              subtitle="Últimos 12 meses"
              icon={<ArrowUpRight className="text-[#00A34D]" />}
              isPositive={true}
              footer={
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tu mezcla actual:</p>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#00A34D]/10 text-[#00A34D] text-xs font-bold rounded-lg border border-[#00A34D]/20 flex items-center gap-1">
                          Discreta <PieChart size={10} />
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">Gestionada automáticamente por Invested</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(true)}
                    className="text-xs font-bold text-[#00A34D] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    ¿Qué significa tu mezcla? →
                  </button>
                </div>
              }
            />
            <InfoCard 
              title="Cuenta Contingente" 
              value="$15,000,000" 
              subtitle="Reserva de emergencia"
              icon={<ShieldCheck className="text-[#00A34D]" />}
            />
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-[#00A34D] text-[#00A34D]"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'rentabilidad' && (
              <div className="space-y-8">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-slate-900">Rentabilidad</h2>
                  
                  {/* Sub-tabs Navigation */}
                  <div className="bg-slate-100 p-1 rounded-full inline-flex self-start">
                    {[
                      { id: 'rendimientos', label: 'Rendimientos' },
                      { id: 'composicion', label: 'Composición' }
                    ].map((subTab) => (
                      <button
                        key={subTab.id}
                        onClick={() => setActiveRentabilidadSubTab(subTab.id)}
                        className={cn(
                          "px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                          activeRentabilidadSubTab === subTab.id
                            ? "bg-[#00A34D] text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRentabilidadSubTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeRentabilidadSubTab === 'rendimientos' && (
                      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-lg font-bold text-slate-900">Histórico de rendimientos</h3>
                          <div className="flex gap-2">
                            {['1M', '3M', '6M', '1Y', 'YTD'].map(p => (
                              <button key={p} className="px-3 py-1 text-xs font-bold rounded-lg hover:bg-slate-100 text-slate-500">{p}</button>
                            ))}
                          </div>
                        </div>
                        <div className="h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400">
                          Gráfico de rendimientos
                        </div>
                      </div>
                    )}

                    {activeRentabilidadSubTab === 'composicion' && (
                      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Composición de tu mezcla</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div className="h-48 w-48 bg-slate-50 rounded-full border-8 border-[#00A34D] flex items-center justify-center mx-auto">
                            <span className="text-xl font-bold text-slate-900">100%</span>
                          </div>
                          <div className="space-y-4">
                            {[
                              { name: 'Acciones Globales', pct: '40%', color: 'bg-[#00A34D]' },
                              { name: 'Renta Fija Local', pct: '35%', color: 'bg-[#00C36D]' },
                              { name: 'Efectivo', pct: '15%', color: 'bg-[#00E38D]' },
                              { name: 'Alternativos', pct: '10%', color: 'bg-[#006B33]' }
                            ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className={cn("w-3 h-3 rounded-full", item.color)} />
                                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900">{item.pct}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
            {activeTab === 'objetivo' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-slate-900">Invertir en finca raíz 🏠</h2>

                {/* Barra de progreso del objetivo */}
                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Progreso de tu meta</p>
                          <p className="text-2xl font-bold text-slate-900 mt-1">$125,450,000.00 <span className="text-slate-400 font-medium text-lg">/ $250,000,000.00</span></p>
                        </div>
                        {!showObservadorBanner && userLevel === 'observador' && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setIsMezclasDrawerOpen(true)}
                            title="Ver mis mezclas disponibles"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#00A34D]/10 border border-[#00A34D]/20 rounded-full text-[10px] font-bold text-[#006B33] hover:bg-[#00A34D]/20 transition-colors cursor-pointer self-start mt-1"
                          >
                            Nivel Observador 🔭
                          </motion.button>
                        )}
                      </div>
                      <span className="text-2xl font-bold text-[#00A34D]">50%</span>
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-[#00A34D] rounded-full shadow-[0_0_15px_rgba(0,163,77,0.2)]" 
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-slate-400">
                      <span>Iniciaste: 15 mar 2025</span>
                      <span>Meta estimada: 15 mar 2030</span>
                    </div>
                  </div>
                </div>

                {/* Banner nuevas mezclas */}
                <AnimatePresence>
                  {showObservadorBanner && userLevel === 'observador' && (
                    <motion.div
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      transition={{ duration: 0.2 }}
                      className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 relative shadow-sm"
                    >
                      <button
                        onClick={() => setShowObservadorBanner(false)}
                        className="absolute top-3 right-3 p-1 hover:bg-emerald-100 rounded-full transition-colors text-slate-400"
                      >
                        <X size={16} />
                      </button>

                      <div className="flex items-center gap-4 pr-6">
                        {/* Columna izquierda — 3/4 */}
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-2xl leading-none mt-0.5">🔭</span>
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-900 text-sm">¡Alcanzaste el nivel Observador!</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              Tienes acceso a 2 mezclas nuevas que podrían acelerar tu meta
                            </p>
                          </div>
                        </div>
                        {/* Columna derecha — 1/4 */}
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => setIsMezclasDrawerOpen(true)}
                            className="bg-[#00A34D] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-[#00A34D]/20 hover:bg-[#008F43] transition-all whitespace-nowrap active:scale-[0.98]"
                          >
                            Explorar mezclas →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Otros elementos del tab */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Detalles del plan</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Aporte mensual</span>
                        <span className="font-bold text-slate-900">$2,500,000</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Frecuencia</span>
                        <span className="font-bold text-slate-900">Mensual</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-sm text-slate-500">Día de aporte</span>
                        <span className="font-bold text-slate-900">05 de cada mes</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Proyección estimada</h3>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Vas por buen camino. Si mantienes tu ritmo actual de aportes y la rentabilidad proyectada, alcanzarás tu meta 3 meses antes de lo previsto.
                      </p>
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Tip de Invested</p>
                        <p className="text-xs text-emerald-600">Aumentar tu aporte en un 5% anual compensaría la inflación y protegería tu poder adquisitivo.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'movimientos' && <PlaceholderContent title="Movimientos" />}
            {activeTab === 'detalles' && <PlaceholderContent title="Detalles" />}
            {activeTab === 'crecer' && (
              <div className="space-y-8">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold text-slate-900">Mi nivel de inversionista</h2>
                  
                  {/* Sub-tabs Navigation */}
                  <div className="bg-slate-100 p-1 rounded-full inline-flex self-start">
                    {[
                      { id: 'mi-nivel', label: 'Mi Nivel' },
                      { id: 'mis-hitos', label: 'Mis Hitos' },
                      { id: 'aprende', label: 'Aprende' }
                    ].map((subTab) => (
                      <button
                        key={subTab.id}
                        onClick={() => setActiveCrecerSubTab(subTab.id)}
                        className={cn(
                          "px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                          activeCrecerSubTab === subTab.id
                            ? "bg-[#00A34D] text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        {subTab.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCrecerSubTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeCrecerSubTab === 'mi-nivel' && (
                      <div className="bg-white rounded-3xl border border-[#00A34D]/20 p-8 md:p-12 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                          {/* LADO IZQUIERDO */}
                          <div className="space-y-6">
                            <div>
                              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#00A34D]/10 text-[#00A34D] rounded-2xl mb-3 border border-[#00A34D]/20">
                                <span className="text-2xl">{userLevel === 'principiante' ? '🌱' : '🔭'}</span>
                                <span className="text-xl font-bold">{userLevel === 'principiante' ? 'Principiante' : 'Observador'}</span>
                              </div>
                              <p className="text-sm font-medium text-slate-500 ml-1">Tu nivel actual como inversionista</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                <span className="px-4 py-1.5 bg-[#00A34D]/5 text-[#00A34D] text-sm font-bold rounded-xl border border-[#00A34D]/10">Cauta</span>
                                <span className="px-4 py-1.5 bg-[#00A34D]/5 text-[#00A34D] text-sm font-bold rounded-xl border border-[#00A34D]/10">Discreta</span>
                                {userLevel === 'observador' && (
                                  <>
                                    <span className="px-4 py-1.5 bg-[#00A34D]/5 text-[#00A34D] text-sm font-bold rounded-xl border border-[#00A34D]/10">Paciente</span>
                                    <span className="px-4 py-1.5 bg-[#00A34D]/5 text-[#00A34D] text-sm font-bold rounded-xl border border-[#00A34D]/10">Dinámica</span>
                                  </>
                                )}
                              </div>
                              <p className="text-xs font-medium text-slate-400 ml-1">Mezclas disponibles para tu nivel</p>
                            </div>
                          </div>

                          {/* LADO DERECHO */}
                          <div className="space-y-8 bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                              Progreso hacia {userLevel === 'principiante' ? 'Observador' : 'Estratega'} <span className="text-xl">{userLevel === 'principiante' ? '🔭' : '🧭'}</span>
                            </h3>
                            
                            <div className="space-y-6">
                              {/* Primera barra */}
                              <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                  <span className="text-sm font-bold text-slate-700">Tiempo activo</span>
                                  <span className="text-sm font-bold text-[#00A34D]">
                                    {userLevel === 'principiante' ? '3 de 6 meses' : '0 de 12 meses'}
                                  </span>
                                </div>
                                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: userLevel === 'principiante' ? '50%' : '0%' }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="h-full bg-[#00A34D] rounded-full shadow-[0_0_10px_rgba(0,163,77,0.3)]"
                                  />
                                </div>
                                <p className="text-xs font-medium text-slate-500">
                                  {userLevel === 'principiante' ? '3 meses activo · faltan 3 meses' : '0 meses activo · faltan 12 meses'}
                                </p>
                              </div>

                              {/* Segunda barra */}
                              <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                  <span className="text-sm font-bold text-slate-700">Hitos de aprendizaje</span>
                                  <span className="text-sm font-bold text-[#00A34D]">
                                    {userLevel === 'principiante' ? '1 de 3 hitos' : '0 de 6 hitos'}
                                  </span>
                                </div>
                                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: userLevel === 'principiante' ? '33.33%' : '0%' }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                    className="h-full bg-[#00A34D] rounded-full shadow-[0_0_10px_rgba(0,163,77,0.3)]"
                                  />
                                </div>
                                <p className="text-xs font-medium text-slate-500">
                                  {userLevel === 'principiante' ? '1 hito completado · faltan 2 hitos' : '0 hitos completados · faltan 6 hitos'}
                                </p>
                              </div>
                            </div>

                            <div className="mt-8 p-5 bg-slate-100/50 rounded-2xl space-y-4">
                              <p className="text-xs font-bold text-slate-900">¿Qué pasa cuando subas de nivel?</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-start gap-2">
                                  <span className="text-sm">🔓</span>
                                  <p className="text-[11px] text-slate-600 leading-tight">Accedes a mezclas más dinámicas</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-sm">🎯</span>
                                  <p className="text-[11px] text-slate-600 leading-tight">Aparecen en tu tab Objetivo para explorarlas</p>
                                </div>
                              </div>
                              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                Las nuevas mezclas no se activan automáticamente — tú decides si quieres explorar un cambio
                              </p>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-200 pt-4 italic">
                              Cuando completes los requisitos te avisaremos para explorar el siguiente nivel
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCrecerSubTab === 'mis-hitos' && (
                      <div className="space-y-6">
                        <div className="flex flex-col gap-1">
                          <h2 className="text-2xl font-bold text-slate-900">Mis hitos</h2>
                          <p className="text-sm font-medium text-slate-500">3 de 10 hitos desbloqueados</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* COLUMNA IZQUIERDA — PERMANENCIA */}
                          <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-lg font-bold text-slate-900">Permanencia</h3>
                              <p className="text-xs font-medium text-slate-500">Por mantenerte invertido</p>
                            </div>

                            <div className="space-y-3">
                              {/* Hito 1 - Desbloqueado */}
                              <div className="bg-[#F0FFF4] border border-[#00A34D]/30 p-4 rounded-2xl flex gap-4 items-start shadow-sm">
                                <span className="text-2xl mt-1">🟢</span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-900">Primer mes activo</h4>
                                  <p className="text-sm text-slate-600">Llevas más de 30 días con Invested</p>
                                  <p className="text-[10px] font-bold text-[#00A34D] uppercase tracking-wider mt-2">Desbloqueado el 15 mar 2026</p>
                                </div>
                              </div>

                              {/* Hito 2 - Desbloqueado */}
                              <div className="bg-[#F0FFF4] border border-[#00A34D]/30 p-4 rounded-2xl flex gap-4 items-start shadow-sm">
                                <span className="text-2xl mt-1">🔵</span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-900">Primer rebalanceo vivido</h4>
                                  <p className="text-sm text-slate-600">Viviste tu primer rebalanceo sin retirar</p>
                                  <p className="text-[10px] font-bold text-[#00A34D] uppercase tracking-wider mt-2">Desbloqueado el 22 mar 2026</p>
                                </div>
                              </div>

                              {/* Hito 3 - Pendiente */}
                              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-4 items-start opacity-70">
                                <span className="text-2xl mt-1 grayscale opacity-50">🟠</span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-400">Superar una caída</h4>
                                  <p className="text-sm text-slate-400 italic">Condición: Mantente invertido durante una caída de mercado mayor al 5%</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* COLUMNA DERECHA — APRENDIZAJE */}
                          <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                              <h3 className="text-lg font-bold text-slate-900">Aprendizaje</h3>
                              <p className="text-xs font-medium text-slate-500">Por entender tu inversión</p>
                            </div>

                            <div className="space-y-3">
                              {/* Hito 1 - Desbloqueado */}
                              <div className="bg-[#F0FFF4] border border-[#00A34D]/30 p-4 rounded-2xl flex gap-4 items-start shadow-sm">
                                <span className="text-2xl mt-1">📊</span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-900">Entendiste tu mezcla</h4>
                                  <p className="text-sm text-slate-600">Completaste el módulo Entiende tu mezcla</p>
                                  <p className="text-[10px] font-bold text-[#00A34D] uppercase tracking-wider mt-2">Desbloqueado el 18 mar 2026</p>
                                </div>
                              </div>

                              {/* Hito 2 - Pendiente */}
                              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-4 items-start opacity-70">
                                <span className="text-2xl mt-1 grayscale opacity-50">🔄</span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-400">Entendiste un rebalanceo</h4>
                                  <p className="text-sm text-slate-400 italic">Condición: Lee el ¿Por qué? de 3 movimientos</p>
                                </div>
                              </div>

                              {/* Hito 3 - Pendiente */}
                              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-4 items-start opacity-70">
                                <span className="text-2xl mt-1 grayscale opacity-50">🛡️</span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-400">Conoces tu perfil de riesgo</h4>
                                  <p className="text-sm text-slate-400 italic">Condición: Completa el módulo Tu perfil de riesgo</p>
                                </div>
                              </div>

                              {/* Hito 4 - Pendiente */}
                              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex gap-4 items-start opacity-70">
                                <span className="text-2xl mt-1 grayscale opacity-50">📈</span>
                                <div className="space-y-1">
                                  <h4 className="font-bold text-slate-400">Rentabilidad real vs nominal</h4>
                                  <p className="text-sm text-slate-400 italic">Condición: Completa el módulo Rentabilidad en contexto</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeCrecerSubTab === 'aprende' && (
                      <div className="space-y-6 pb-8">
                        <div className="flex flex-col gap-1">
                          <h2 className="text-2xl font-bold text-slate-900">Aprende sobre tu inversión</h2>
                          <p className="text-sm font-medium text-slate-500">Completa módulos y desbloquea hitos</p>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                          {/* Card 1 — Disponible */}
                          <div 
                            onClick={() => setIsDrawerOpen(true)}
                            className="min-w-[200px] w-[200px] bg-white border border-[#00A34D]/30 rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                          >
                            <div className="w-16 h-16 bg-[#00A34D]/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                              📊
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm leading-tight">Entiende tu mezcla</h4>
                            <span className="px-3 py-1 bg-[#00A34D]/10 text-[#00A34D] text-[10px] font-bold rounded-full uppercase tracking-wider">Disponible</span>
                          </div>

                          {/* Card 2 — Disponible */}
                          <div 
                            onClick={() => setIsDrawerOpen(true)}
                            className="min-w-[200px] w-[200px] bg-white border border-[#00A34D]/30 rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                          >
                            <div className="w-16 h-16 bg-[#00A34D]/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                              🔄
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm leading-tight">Qué es un rebalanceo</h4>
                            <span className="px-3 py-1 bg-[#00A34D]/10 text-[#00A34D] text-[10px] font-bold rounded-full uppercase tracking-wider">Disponible</span>
                          </div>

                          {/* Card 3 — Completado */}
                          <div className="min-w-[200px] w-[200px] bg-slate-50 border border-transparent rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-sm opacity-80">
                            <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-3xl relative">
                              📊
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00A34D] text-white rounded-full flex items-center justify-center text-xs border-2 border-white shadow-sm">
                                ✓
                              </div>
                            </div>
                            <h4 className="font-bold text-slate-400 text-sm leading-tight">Entiende tu mezcla</h4>
                            <span className="px-3 py-1 bg-slate-200 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Completado ✓</span>
                          </div>

                          {/* Card 4 — Bloqueado */}
                          <div className="min-w-[200px] w-[200px] bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-sm opacity-60 cursor-not-allowed">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl relative grayscale">
                              📈
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-400 text-white rounded-full flex items-center justify-center text-xs border-2 border-white shadow-sm">
                                🔒
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-400 text-sm leading-tight">Rentabilidad en contexto</h4>
                              <p className="text-[10px] text-slate-400">Disponible en nivel Observador</p>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Bloqueado</span>
                          </div>

                          {/* Card 5 — Bloqueado */}
                          <div className="min-w-[200px] w-[200px] bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center gap-4 shadow-sm opacity-60 cursor-not-allowed">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl relative grayscale">
                              🧩
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-400 text-white rounded-full flex items-center justify-center text-xs border-2 border-white shadow-sm">
                                🔒
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-bold text-slate-400 text-sm leading-tight">Los fondos de tu mezcla</h4>
                              <p className="text-[10px] text-slate-400">Disponible en nivel Observador</p>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Bloqueado</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>
      {/* Drawer Overlay */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Tu mezcla: Discreta</h2>
                  <p className="text-sm text-slate-500">Aquí te explicamos qué significa</p>
                </div>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Sección 1 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00A34D]/10 rounded-xl flex items-center justify-center text-xl">
                      📊
                    </div>
                    <h3 className="font-bold text-[#00A34D]">¿Qué es tu mezcla?</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Tu mezcla Discreta combina fondos de renta fija y variable con un balance moderado. Está diseñada para crecer de forma estable sin asumir riesgos altos.
                  </p>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Sección 2 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00A34D]/10 rounded-xl flex items-center justify-center text-xl">
                      🎯
                    </div>
                    <h3 className="font-bold text-[#00A34D]">¿Por qué esta mezcla?</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Invested la seleccionó basándose en tu objetivo, tu horizonte de inversión y tu tolerancia al riesgo. Es la que mejor equilibra crecimiento y protección para tu perfil.
                  </p>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Sección 3 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00A34D]/10 rounded-xl flex items-center justify-center text-xl">
                      🔄
                    </div>
                    <h3 className="font-bold text-[#00A34D]">¿Qué hace Invested por ti?</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Monitorea y rebalancea tu mezcla automáticamente cuando el mercado se mueve. No tienes que hacer nada — nosotros nos encargamos de mantener tu estrategia.
                  </p>
                </div>

                <div className="h-px bg-slate-100" />

                {/* Sección 4 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#00A34D]/10 rounded-xl flex items-center justify-center text-xl">
                      📈
                    </div>
                    <h3 className="font-bold text-[#00A34D]">¿Cómo van tus fondos?</h3>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100">
                    {[
                      { name: 'Acciones Globales', pct: '40%' },
                      { name: 'Renta Fija Local', pct: '35%' },
                      { name: 'Efectivo', pct: '15%' },
                      { name: 'Alternativos', pct: '10%' }
                    ].map((fund, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-600">{fund.name}</span>
                        <span className="text-xs font-bold text-slate-900">{fund.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-white">
                <button 
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setActiveTab('rentabilidad');
                  }}
                  className="w-full py-4 bg-[#00A34D] text-white font-bold rounded-2xl shadow-lg shadow-[#00A34D]/20 hover:bg-[#008F43] transition-all active:scale-[0.98]"
                >
                  Ver composición completa
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Nuevas Mezclas Drawer */}
      <AnimatePresence>
        {isMezclasDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMezclasDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Tus nuevas mezclas disponibles</h2>
                  <p className="text-sm text-slate-500">Nivel Observador 🔭</p>
                </div>
                <button 
                  onClick={() => {
                    setIsMezclasDrawerOpen(false);
                    setShowObservadorBanner(false);
                    setUserLevel('observador');
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {/* Sección 1: Tu mezcla actual */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tu mezcla actual</p>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#00A34D]">●</span>
                      <span className="font-bold text-slate-900">Discreta</span>
                    </div>
                    <p className="text-xs text-slate-500">Moderada · 7.1% EA histórico</p>
                  </div>
                </div>

                {/* Sección 2: Ahora disponibles */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ahora disponibles</p>
                    <p className="text-[10px] font-bold text-[#00A34D]">Desbloqueadas por alcanzar nivel Observador</p>
                  </div>

                  {/* Card Paciente */}
                  <div className="bg-white border border-[#00A34D]/30 rounded-2xl p-5 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#00A34D]">●</span>
                        <span className="font-bold text-slate-900">Paciente</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#00A34D]/10 text-[#00A34D] text-[10px] font-bold rounded-full">Nueva para ti</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700">Moderada-dinámica · 7.8% EA histórico</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Mayor crecimiento a largo plazo con algo más de riesgo
                    </p>
                    <button 
                      onClick={() => setExpandedMezcla(expandedMezcla === 'paciente' ? null : 'paciente')}
                      className="text-xs font-bold text-[#00A34D] hover:underline flex items-center gap-1"
                    >
                      Ver detalle {expandedMezcla === 'paciente' ? '↑' : '↓'}
                    </button>
                    <AnimatePresence>
                      {expandedMezcla === 'paciente' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mt-2 leading-relaxed italic">
                            La mezcla Paciente combina un 60% en renta variable y 40% en renta fija. Ideal para horizontes mayores a 5 años con tolerancia moderada a las fluctuaciones.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Dinámica */}
                  <div className="bg-white border border-[#00A34D]/30 rounded-2xl p-5 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[#00A34D]">●</span>
                        <span className="font-bold text-slate-900">Dinámica</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#00A34D]/10 text-[#00A34D] text-[10px] font-bold rounded-full">Nueva para ti</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700">Dinámica · 8.2% EA histórico</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Para objetivos de largo plazo con tolerancia alta a los movimientos del mercado
                    </p>
                    <button 
                      onClick={() => setExpandedMezcla(expandedMezcla === 'dinamica' ? null : 'dinamica')}
                      className="text-xs font-bold text-[#00A34D] hover:underline flex items-center gap-1"
                    >
                      Ver detalle {expandedMezcla === 'dinamica' ? '↑' : '↓'}
                    </button>
                    <AnimatePresence>
                      {expandedMezcla === 'dinamica' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mt-2 leading-relaxed italic">
                            La mezcla Dinámica invierte un 80% en renta variable. Puede tener fluctuaciones mayores pero tiene el mayor potencial de crecimiento a largo plazo.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 bg-white space-y-4">
                <button 
                  onClick={() => {
                    setIsMezclasDrawerOpen(false);
                    setShowObservadorBanner(false);
                    setUserLevel('observador');
                    setActiveTab('crecer');
                    setActiveCrecerSubTab('mi-nivel');
                  }}
                  className="w-full py-4 bg-[#00A34D] text-white font-bold rounded-2xl shadow-lg shadow-[#00A34D]/20 hover:bg-[#008F43] transition-all active:scale-[0.98]"
                >
                  Quiero explorar un cambio
                </button>
                <button 
                  onClick={() => {
                    setIsMezclasDrawerOpen(false);
                    setShowObservadorBanner(false);
                    setUserLevel('observador');
                  }}
                  className="w-full py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Quedarme con mi mezcla actual
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoCard({ title, value, subtitle, icon, isPositive, footer }: { 
  title: string, 
  value: string, 
  subtitle: string, 
  icon: React.ReactNode,
  isPositive?: boolean,
  footer?: React.ReactNode
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-50 rounded-lg">
          {icon}
        </div>
        {isPositive !== undefined && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-full",
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          )}>
            {isPositive ? '↑' : '↓'}
          </span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          {footer}
        </div>
      )}
    </div>
  );
}

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <button className="text-sm text-[#00A34D] font-semibold hover:underline flex items-center gap-1">
          Ver más <ChevronRight size={16} />
        </button>
      </div>
      <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
        Contenido de {title}
      </div>
    </div>
  );
}
