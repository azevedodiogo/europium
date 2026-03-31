
<!-- Página dedicada aos indicadores comuns reportados pelos Estados-Membros. -->
<template>
  
  <div class="ind-page">
    
    <div class="ind-container">

      
      <!-- Cabeçalho introdutório da página. -->
      <div class="page-hero">
        
        <h1 class="page-hero__title">Indicadores Comuns</h1>
        
        <p class="page-hero__desc">A Comissão Europeia definiu 14 indicadores de reporte obrigatório e semestral por todos os Estados Membros, cobrindo áreas como energia, digitalização, educação e saúde.</p>
      </div>

      
      <!-- Exportação global de todos os indicadores. -->
      <div class="ind-export-row" v-scroll-animate="'fade'">
        
        <AppExportMenu
          filename="indicadores-comuns"
          document-label="Indicadores Comuns"
          :dataCount="indicadores.length"
          :data="indicadores"
          :detailParts="allIndicatorsExportDetails"
        />
      </div>

      
      <!-- Grelha de botões: permite escolher qual dos 14 indicadores fica em detalhe. -->
      <div class="ind-selectors" role="group" aria-label="Selecionar indicador">
        
        <button
          v-for="ind in indicadores"
          :key="ind.num"
          type="button"
          class="ind-sel ind-sel--anim"
          :class="{ 'ind-sel--active': selectedNum === ind.num }"
          :style="{ animationDelay: `${(ind.num - 1) * 35}ms` }"
          @click="selectIndicador(ind.num)"
          :aria-pressed="selectedNum === ind.num"
        >
          
          <div class="ind-sel__icon" aria-hidden="true">
            
            <component :is="IND_ICONS[ind.iconType]" :size="16" />
          </div>
          
          <div class="ind-sel__top">
            
            <span class="ind-sel__num" :class="{ 'ind-sel__num--active': selectedNum === ind.num }">{{ ind.num }}</span>
            
            <span class="ind-sel__unit">{{ ind.unit }}</span>
          </div>
          
          <p class="ind-sel__name">{{ ind.name }}</p>
        </button>
      </div>

      
      <!-- Painel de detalhe do indicador selecionado. -->
      <div class="ind-detail" v-if="selected">
        
        <div class="ind-detail__header">
          
          <div class="ind-detail__header-left">
            
            <h2 class="ind-detail__title">{{ selected.name }}</h2>
            
            <button class="ind-detail__info-btn" type="button" @click="openPopup" :aria-label="`Mais informação: ${selected.name}`">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 7v5M8 5.5v.01" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            </button>
          </div>
          
          <div class="ind-detail__header-right">
            
            <span class="ind-detail__unit">Unidade: {{ selected.unit }}</span>
            
            <AppExportMenu
              :filename="`indicador-${selected.num}`"
              :document-label="selected.name"
              :dataCount="selected.chartData.length"
              :data="selected.chartData"
              :fileContext="selectedIndicatorExportContext"
              :detailParts="selectedIndicatorExportDetails"
            />
          </div>
        </div>

        
        <!-- Gráfico do indicador com os valores por país. -->
        <div class="ind-chart-wrap">
          
          <IndicatorBarChart
            v-if="selected"
            :rows="selected.chartData"
            :unit="selected.unit"
          />
        </div>

        
        <!-- Tabela textual com os mesmos dados do gráfico para leitura precisa. -->
        <div class="ind-table-wrap">
          
          <table class="ind-table" :aria-label="`Dados por país — ${selected.name}`">
            <thead><tr>
              
              <th class="ind-th" scope="col">País</th>
              
              <th class="ind-th ind-th--right" scope="col">Valor ({{ selected.unit }})</th>
            </tr></thead>
            <tbody>
              
              <tr v-for="row in selected.chartData" :key="row.country" class="ind-tr">
                
                <td class="ind-td ind-td--name">{{ row.country }}</td>
                
                <td class="ind-td ind-td--right">{{ row.value.toLocaleString('pt') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Modal com definição técnica, metodologia e informação de suporte. -->
    <Transition name="ind-modal">
      
      <div v-if="showPopup" class="ind-popup-overlay" role="dialog" aria-modal="true" :aria-label="selected?.name" @click.self="closePopup" @keydown.esc="closePopup">
        
        <div class="ind-popup" v-if="selected">
          
          <button class="ind-popup__close" type="button" @click="closePopup" aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          </button>
          
          <div class="ind-popup__top"><div class="ind-popup__badge">Indicador {{ selected.num }}</div><span class="ind-popup__unit-label">{{ selected.unit }}</span></div>
          
          <div class="ind-popup__title-row"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" class="ind-popup__icon"><circle cx="10" cy="10" r="8.5" stroke="currentColor" stroke-width="1.3"/><path d="M10 9v6M10 7v.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg><h2 class="ind-popup__title">{{ selected.name }}</h2></div>
          
          <div class="ind-popup__section-head"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ind-popup__icon"><rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M5 5h6M5 7.5h6M5 10h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg><span>Descrição</span></div>
          
          <p class="ind-popup__text">{{ selected.description }}</p>
          
          <div class="ind-popup__divider"></div>
          
          <p class="ind-popup__section-plain">Definição Técnica</p>
          
          <p class="ind-popup__text">{{ selected.techDefinition }}</p>
          
          <div class="ind-popup__divider"></div>
          
          <div class="ind-popup__section-head"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ind-popup__icon"><rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M5 5h6M5 7.5h4M5 10h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg><span>Metodologia de Cálculo</span></div>
          
          <p class="ind-popup__text">{{ selected.methodology }}</p>
          
          <div class="ind-popup__divider"></div>
          
          <div class="ind-popup__info-row">
            
            <div class="ind-popup__info-card">
              
              <div class="ind-popup__info-card-head"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" class="ind-popup__icon"><rect x="1" y="2" width="12" height="10" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M3 5h8M3 7.5h6M3 10h4" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg><span class="ind-popup__info-label">Fonte de Dados</span></div>
              
              <p class="ind-popup__info-value">{{ selected.source }}</p>
            </div>
            
            <div class="ind-popup__info-card">
              
              <p class="ind-popup__info-label">Frequência de Reporte</p>
              
              <p class="ind-popup__info-value ind-popup__info-value--strong">{{ selected.frequency }}</p>
            </div>
          </div>
          
          <div class="ind-popup__divider"></div>
          
          <div class="ind-popup__section-head"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ind-popup__icon"><path d="M3 8h10M10 5l3 3-3 3M6 5L3 8l3 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Indicadores Relacionados</span></div>
          
          <div class="ind-popup__tags"><span v-for="r in selected.related" :key="r" class="ind-popup__tag">{{ r }}</span></div>
          
          <div class="ind-popup__note"><p>Para mais informação sobre a metodologia e definições oficiais, consulte a <a href="https://ec.europa.eu/economy_finance/recovery-and-resilience-scoreboard/" target="_blank" rel="noopener" class="ind-popup__note-link">documentação da Comissão Europeia</a>.</p></div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
// Estado reativo da página e cálculos simples derivados da store.
import { ref, computed } from 'vue'
// Ícones usados nos cartões de seleção dos indicadores.
import {
  IconTrendingUp, IconSchool, IconDeviceDesktop,
  IconHome, IconBolt, IconLeaf, IconHeart,
} from '@tabler/icons-vue'
// Mapa entre o tipo de ícone guardado nos dados e o componente visual correspondente.
const IND_ICONS = {
  leaf:     IconLeaf,
  trending: IconTrendingUp,
  school:   IconSchool,
  monitor:  IconDeviceDesktop,
  home:     IconHome,
  bolt:     IconBolt,
  heart:    IconHeart,
}
// Store principal onde os indicadores são expostos para a página.
import { useDashboardStore } from '@/estado/painel'
import { storeToRefs } from 'pinia'
import AppExportMenu from '@/componentes/app/MenuExportacaoApp.vue'
import IndicatorBarChart from '@/componentes/indicadores/GraficoBarrasIndicadores.vue'
const store = useDashboardStore()
const { indicadores } = storeToRefs(store)
// Indicador inicial: o primeiro da lista oficial.
const selectedNum = ref(1)
// Controla a abertura do modal de informação.
const showPopup   = ref(false)
// Objeto completo do indicador atualmente selecionado.
const selected = computed(() => indicadores.value.find(i => i.num === selectedNum.value) ?? null)
// Muda o indicador apresentado no gráfico, tabela e exportação.
function selectIndicador(num) { selectedNum.value = num }
// Abre o modal e bloqueia o scroll da página de fundo.
function openPopup()  { showPopup.value = true;  document.body.style.overflow = 'hidden' }
// Fecha o modal e devolve o scroll normal ao documento.
function closePopup() { showPopup.value = false; document.body.style.overflow = '' }
// Informação extra usada na notificação/exportação global.
const allIndicatorsExportDetails = computed(() => ['Todos os indicadores'])
// Contexto usado para gerar nomes de ficheiro mais descritivos na exportação individual.
const selectedIndicatorExportContext = computed(() =>
  selected.value ? [selected.value.name] : []
)
// Detalhes apresentados ao utilizador quando exporta o indicador selecionado.
const selectedIndicatorExportDetails = computed(() => {
  if (!selected.value) return []
  return [
    `Indicador ${selected.value.num}`,
    `Unidade: ${selected.value.unit}`,
  ]
})
</script>

<style scoped>

/* Layout geral da página. */
.ind-page { background: var(--color-bg-page); min-height: 100vh; padding-bottom: 60px; }

.ind-container { max-width: 1520px; margin: 0 auto; padding: 0 var(--container-padding); }

/* Linha do menu de exportação global. */
.ind-export-row { display: flex; justify-content: flex-end; padding: 0 32px 8px; position: relative; z-index: 100; overflow: visible; }



/* Grelha de seleção dos indicadores. */
.ind-selectors { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; padding: 20px 32px 0; }
.ind-sel {
  position: relative;
  
  background: var(--color-bg-white);
  
  border: 1px solid var(--color-border);
  
  border-radius: var(--radius-md);
  
  padding: 12px 12px 12px 12px;
  text-align: left;
  cursor: pointer;
  
  transition: box-shadow .15s, border-color .15s;
  
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 68px;
}

.ind-sel:hover { box-shadow: 0 2px 8px rgba(0,0,0,.06); }

.ind-sel--active { background: rgba(29,69,135,.05); border-color: #1d4587; }
.ind-sel__icon {
  position: absolute;
  top: 8px;
  right: 8px;
  color: var(--color-text-secondary);
  pointer-events: none;
}

.ind-sel--active .ind-sel__icon { color: var(--color-brand-blue); }


.ind-sel__top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }

.ind-sel__num  { display: inline-flex; align-items: center; justify-content: center; height: 22px; min-width: 26px; padding: 0 4px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: var(--text-sm); font-weight: 500; color: var(--color-text-primary); }

.ind-sel__num--active { border-color: var(--color-brand-blue); color: var(--color-brand-blue); }

.ind-sel__unit { font-size: var(--text-sm); color: var(--color-text-secondary); }

.ind-sel__name { font-size: var(--text-sm); font-weight: 500; color: var(--color-text-primary); line-height: 1.375; }


/* Painel com gráfico, tabela e ações do indicador escolhido. */
.ind-detail { margin: 16px 32px 0; background: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 24px; }

.ind-detail__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 8px; }

.ind-detail__header-left { display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0; }

.ind-detail__title { font-size: 18px; font-weight: 600; line-height: 1.33; }

.ind-detail__info-btn { background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; color: var(--color-text-secondary); transition: color .15s; }

.ind-detail__info-btn:hover { color: var(--color-brand-blue); }

.ind-detail__header-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }

.ind-detail__unit { font-size: var(--text-base); color: var(--color-text-secondary); }


.ind-chart-wrap { width: 100%; margin: 4px 0 16px; overflow: visible; }
@keyframes indCardIn {
  
  from { opacity: 0; transform: translateY(6px); }
  
  to   { opacity: 1; transform: none; }
}
.ind-sel--anim {
  
  animation: indCardIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}


/* Tabela de dados por país. */
.ind-table-wrap { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }

.ind-table { width: 100%; border-collapse: collapse; font-size: var(--text-base); }

.ind-th { background: rgba(234,239,245,.5); border-bottom: .8px solid var(--color-border); padding: 10px 8px; font-size: var(--text-sm); font-weight: 500; text-align: left; }

.ind-th--right { text-align: right; }

.ind-tr { border-bottom: .8px solid var(--color-border); transition: background .1s; }

.ind-tr:last-child { border-bottom: none; }

.ind-tr:hover { background: rgba(249,250,251,.8); }

.ind-td { padding: 10px 8px; vertical-align: middle; }

.ind-td--name  { font-weight: 400; }

.ind-td--right { text-align: right; color: var(--color-text-secondary); }


/* Modal informativo com a definição completa do indicador. */
.ind-popup-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(10,16,24,.45); display: flex; align-items: center; justify-content: center; padding: 24px; }

.ind-popup { position: relative; width: 512px; max-width: 100%; max-height: 90vh; overflow-y: auto; background: #f9fafb; border: 1px solid var(--color-border); border-radius: var(--radius-md); box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1); padding: 24px; }

.ind-popup__close { position: absolute; top: 10px; right: 16px; width: 16px; height: 16px; padding: 0; background: none; border: none; cursor: pointer; color: var(--color-text-secondary); display: flex; align-items: center; justify-content: center; }

.ind-popup__top { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }

.ind-popup__badge { border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 3px 9px; font-size: var(--text-sm); font-weight: 500; }

.ind-popup__unit-label { font-size: var(--text-sm); color: var(--color-text-secondary); }

.ind-popup__icon { color: var(--color-text-secondary); flex-shrink: 0; }

.ind-popup__title-row { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 20px; }

.ind-popup__title { font-size: 18px; font-weight: 600; line-height: 1.4; flex: 1; }

.ind-popup__section-head { display: flex; align-items: center; gap: 8px; font-size: var(--text-base); font-weight: 500; margin-bottom: 8px; }

.ind-popup__section-plain { font-size: var(--text-base); font-weight: 500; margin-bottom: 8px; }

.ind-popup__text { font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.625; margin: 0; }

.ind-popup__divider { height: 1px; background: var(--color-border); margin: 20px 0; }

.ind-popup__info-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.ind-popup__info-card { background: rgba(234,239,245,.3); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 14px 16px; }

.ind-popup__info-card-head { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }

.ind-popup__info-label { font-size: var(--text-sm); color: var(--color-text-secondary); display: block; margin-bottom: 6px; }

.ind-popup__info-value { font-size: var(--text-base); line-height: 1.4; margin: 0; }

.ind-popup__info-value--strong { font-weight: 500; }

.ind-popup__tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }

.ind-popup__tag  { border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 4px 10px; font-size: var(--text-sm); font-weight: 500; }

.ind-popup__note { margin-top: 12px; background: rgba(29,69,135,.05); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 14px 16px; }

.ind-popup__note p { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; margin: 0; }

.ind-popup__note-link { color: var(--color-brand-blue); font-weight: 500; text-decoration: none; }

.ind-popup__note-link:hover { text-decoration: underline; }


.ind-modal-enter-active,.ind-modal-leave-active { transition: opacity .2s; }

.ind-modal-enter-from,.ind-modal-leave-to { opacity: 0; }

.ind-modal-enter-active .ind-popup,.ind-modal-leave-active .ind-popup { transition: transform .2s; }

.ind-modal-enter-from .ind-popup,.ind-modal-leave-to .ind-popup { transform: translateY(16px); }



@media (max-width: 1200px) { .ind-selectors { grid-template-columns: repeat(3,1fr); } }

@media (max-width: 900px)  { .ind-selectors { grid-template-columns: repeat(2,1fr); } .ind-container { padding: 0 40px; } }
[data-theme="dark"] .ind-popup {
  
  background: #223246;
  
  border-color: var(--color-border);
}
[data-theme="dark"] .ind-popup__info-card {
  
  background: rgba(232,240,252,0.05);
  
  border-color: var(--color-border);
}
[data-theme="dark"] .ind-popup__note {
  
  background: rgba(119,167,234,0.08);
  
  border-color: var(--color-border);
}
[data-theme="dark"] .ind-popup__tag {
  
  border-color: var(--color-border);
  
  color: var(--color-text-secondary);
}
[data-theme="dark"] .ind-popup-overlay {
  
  background: rgba(0,0,0,0.75);
}
[data-theme="dark"] .ind-th {
  
  background: rgba(232,240,252,0.06);
  
  color: var(--color-text-secondary);
}
[data-theme="dark"] .ind-tr:hover {
  
  background: rgba(119,167,234,0.08);
}

</style>
