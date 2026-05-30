// Importa o núcleo do Chart.js e os módulos necessários aos gráficos usados no projeto.
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'

// Regista globalmente os tipos de escala, elementos e plugins usados.
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler)

// Exporta a instância configurada para poder ser reutilizada.
export { ChartJS }
