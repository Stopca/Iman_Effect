// --- LÓGICA DE MODO OSCURO ---
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Verificar preferencia guardada o sistema
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  htmlElement.classList.add('dark');
} else {
  htmlElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  if (htmlElement.classList.contains('dark')) {
    localStorage.theme = 'dark';
  } else {
    localStorage.theme = 'light';
  }
});


// Variables de estado y tipo de cambio
let eurToMxnRate = 21.50;
let currentCurrency = 'EUR'; 

const MADRID_COORDS = [40.4168, -3.7038];

// Base de datos de Ciudades con Direcciones y Web Reales
const CITIES = [
  {
    id: 'malaga', name: 'Málaga', region: 'Andalucía', type: 'local', tagline: 'El "Silicon Valley" del Sur', sectors: ['tech', 'creative', 'biotech'],
    sharedRoom: 410, soloApt: 750, livingCost: 270, 
    companies: [
      { name: 'Google Safety Eng. Center', address: 'Paseo de la Farola, 29016 Málaga', url: 'https://safety.google/' },
      { name: 'Oracle', address: 'C. de Severo Ochoa, 4, 29590 Málaga (PTA)', url: 'https://www.oracle.com/es/' },
      { name: 'Vodafone', address: 'Av. Bulevar Louis Pasteur, 47, 29010 Málaga', url: 'https://www.vodafone.es/' },
      { name: 'Ericsson', address: 'C. de Severo Ochoa, 19, 29590 Málaga (PTA)', url: 'https://www.ericsson.com/es/' }
    ], 
    qualityScore: 9.0, aveTime: '2h 30m en AVE', commuteDetail: 'Ecosistema tecnológico 100% autónomo. No dependes de Madrid.', 
    transportCost: 18, mealPrice: 12.0, magnetBenefit: 'Trabajas directamente para multinacionales en sus sedes andaluzas.', 
    details: 'Málaga ha atraído a gigantes tecnológicos mundiales.', badge: 'Polo de Empleo Local', coords: [36.7213, -4.4214]
  },
  {
    id: 'zaragoza', name: 'Zaragoza', region: 'Aragón', type: 'local', tagline: 'Mega-Hub Logístico y Cloud', sectors: ['industry', 'tech'],
    sharedRoom: 290, soloApt: 550, livingCost: 230, 
    companies: [
      { name: 'Amazon', address: 'Av. de los Pirineos, PLAZA, 50197 Zaragoza', url: 'https://www.amazon.es/' },
      { name: 'AWS Cloud', address: 'Pol. Ind. Villanueva de Gállego, 50830 Zaragoza', url: 'https://aws.amazon.com/es/' },
      { name: 'Stellantis', address: 'Av. de las Cortes de Aragón, Figueruelas', url: 'https://www.stellantis.com/' },
      { name: 'Inditex', address: 'Plataforma Europa, PLAZA, 50197 Zaragoza', url: 'https://www.inditex.com/' }
    ], 
    qualityScore: 8.5, aveTime: '1h 15m en AVE', commuteDetail: 'Infraestructura de datos y logística independiente.', 
    transportCost: 22, mealPrice: 10.5, magnetBenefit: 'Costo de vida brutalmente bajo con empleadores del tamaño de Amazon a minutos de casa.', 
    details: 'Capital logística de Europa.', badge: 'Polo Industrial', coords: [41.6497, -0.8877]
  },
  {
    id: 'valencia', name: 'Valencia', region: 'Com. Valenciana', type: 'local', tagline: 'Innovación y Diseño', sectors: ['tech', 'creative'],
    sharedRoom: 380, soloApt: 720, livingCost: 280, 
    companies: [
      { name: 'HP', address: 'Universitat Politècnica de València (UPV)', url: 'https://www.hp.com/es-es/' },
      { name: 'Siemens', address: 'C/ del Parc Tecnològic, 3, 46980 Paterna', url: 'https://www.siemens.com/es/es.html' },
      { name: 'Ford', address: 'Polígono Industrial Juan Carlos I, Almussafes', url: 'https://www.ford.es/' },
      { name: 'Lanzadera', address: 'Marina de Empresas, Muelle de la Aduana, s/n', url: 'https://lanzadera.es/' }
    ], 
    qualityScore: 9.2, aveTime: '1h 50m en AVE', commuteDetail: 'Tercera economía de España.', transportCost: 20, mealPrice: 11.5,
    magnetBenefit: 'Balance entre multinacionales y estilo de vida relajado.', details: 'Concentra una gran red de startups.', 
    badge: 'Top Empleo Local', coords: [39.4699, -0.3774]
  },
  {
    id: 'segovia', name: 'Segovia', region: 'Castilla y León', type: 'hybrid', tagline: 'El refugio del Modelo Híbrido', sectors: ['tech', 'creative', 'industry', 'biotech'],
    sharedRoom: 250, soloApt: 450, livingCost: 220, 
    companies: [
      { name: 'IE University', address: 'Campus Santa Cruz la Real, C. Cardenal Zúñiga, 12', url: 'https://www.ie.edu/' },
      { name: 'Drylock Tech.', address: 'Polígono Ind. de Hontoria, 40195 Segovia', url: 'https://drylocktechnologies.com/' }
    ], 
    qualityScore: 8.8, aveTime: '27 minutos en Avant', commuteDetail: 'Llegas a Chamartín en media hora.', transportCost: 45, mealPrice: 10.0,
    magnetBenefit: 'Mantienes tu contrato en Madrid yendo a la oficina 2 veces por semana.', details: 'El ejemplo perfecto de sortear el Efecto Imán.', 
    badge: 'Conexión Híbrida Ideal', coords: [40.9429, -4.1088]
  },
  {
    id: 'valladolid', name: 'Valladolid', region: 'Castilla y León', type: 'hybrid', tagline: 'Híbrido y Automotriz', sectors: ['industry', 'biotech'],
    sharedRoom: 260, soloApt: 480, livingCost: 220, 
    companies: [
      { name: 'Renault Group', address: 'Factoría de Montaje, C. del Padre José Acosta', url: 'https://www.renault.es/' },
      { name: 'Michelin', address: 'Av. de Soria, 8, 47012 Valladolid', url: 'https://www.michelin.es/' },
      { name: 'Switch Mobility', address: 'Soto de Medinilla (Centro I+D)', url: 'https://www.switchmobility.tech/' }
    ], 
    qualityScore: 8.1, aveTime: '0h 55m en Avant', commuteDetail: 'Perfecto para modalidad híbrida.', transportCost: 15, mealPrice: 10.0,
    magnetBenefit: 'Opción de empleo local pesado o viaje a Madrid en menos de 1 hora.', details: 'Fuerza laboral de manufactura y ciudad satélite.', 
    badge: 'Híbrido + Industria', coords: [41.6523, -4.7245]
  }
];

const MADRID_METRICS = { sharedRoom: 580, soloApt: 980, livingCost: 360 };

let map;
let routeLine;
let cityMarkers = [];

function initMap() {
  map = L.map('map', { zoomControl: false }).setView([39.9, -3.7], 5);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 10
  }).addTo(map);

  L.circleMarker(MADRID_COORDS, {
    radius: 8, fillColor: "#e11d48", color: "#fff", weight: 2, opacity: 1, fillOpacity: 1
  }).addTo(map).bindTooltip("Madrid (Centro de Gravedad)", { permanent: false });

  CITIES.forEach(city => {
    const markerColor = city.type === 'hybrid' ? '#0f766e' : '#4f46e5';
    const marker = L.circleMarker(city.coords, {
      radius: 6, fillColor: markerColor, color: "#fff", weight: 2, opacity: 1, fillOpacity: 0.8
    }).addTo(map).bindTooltip(city.name);
    
    marker.on('click', () => openCityModal(city.id));
    cityMarkers.push(marker);
  });
}

function drawRouteOnMap(city) {
  if (routeLine) map.removeLayer(routeLine);
  
  routeLine = L.polyline([MADRID_COORDS, city.coords], {
    color: city.type === 'hybrid' ? '#0f766e' : '#4f46e5',
    weight: 3,
    dashArray: '5, 8',
    opacity: 0.8
  }).addTo(map);

  const bounds = L.latLngBounds([MADRID_COORDS, city.coords]);
  map.flyToBounds(bounds, { padding: [40, 40], duration: 1.5 });
}

async function fetchExchangeRate() {
  const rateText = document.getElementById('rateText');
  const rateStatus = document.getElementById('rateStatus');
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/EUR');
    const data = await response.json();
    if (data && data.rates && data.rates.MXN) {
      eurToMxnRate = data.rates.MXN;
      rateText.textContent = `1 EUR ≈ ${eurToMxnRate.toFixed(2)} MXN`;
      rateStatus.className = 'w-2 h-2 rounded-full bg-emerald-400';
    }
  } catch (err) {
    rateText.textContent = `1 EUR ≈ ${eurToMxnRate.toFixed(2)} MXN (Est.)`;
    rateStatus.className = 'w-2 h-2 rounded-full bg-amber-400';
  }
}

function formatMoney(amountInEur) {
  if (currentCurrency === 'MXN') return `$${Math.round(amountInEur * eurToMxnRate).toLocaleString('es-MX')} MXN`;
  return `${amountInEur.toLocaleString('es-ES')} €`;
}

function setCurrency(currency) {
  currentCurrency = currency;
  const btnEUR = document.getElementById('btnEUR');
  const btnMXN = document.getElementById('btnMXN');
  const sliderRangeLabels = document.getElementById('sliderRangeLabels');

  if (currency === 'EUR') {
    btnEUR.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-white dark:bg-slate-600 text-indigo-700 dark:text-white shadow-sm border border-slate-200 dark:border-slate-500';
    btnMXN.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-transparent';
    sliderRangeLabels.innerHTML = '<span>500 €</span><span>1.100 €</span><span>1.800 €</span>';
  } else {
    btnMXN.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all bg-white dark:bg-slate-600 text-indigo-700 dark:text-white shadow-sm border border-slate-200 dark:border-slate-500';
    btnEUR.className = 'px-3 py-1.5 text-xs font-bold rounded-lg transition-all text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-transparent';
    sliderRangeLabels.innerHTML = `<span>${formatMoney(500)}</span><span>${formatMoney(1100)}</span><span>${formatMoney(1800)}</span>`;
  }
  updateSliderDisplay();
  calculate();
}

const budgetInput = document.getElementById('budgetInput');
const budgetValue = document.getElementById('budgetValue');

function updateSliderDisplay() {
  budgetValue.textContent = `${formatMoney(parseInt(budgetInput.value, 10))} / mes`;
}

function calculate() {
  const budget = parseInt(budgetInput.value, 10);
  const sector = document.getElementById('sectorInput').value;
  const housing = document.querySelector('input[name="housing"]:checked').value;
  const priority = document.querySelector('input[name="priority"]:checked').value;

  const madridHousing = housing === 'shared' ? MADRID_METRICS.sharedRoom : MADRID_METRICS.soloApt;
  const madridTotal = madridHousing + MADRID_METRICS.livingCost;
  const madridDiff = budget - madridTotal;
  
  const madridStatus = document.getElementById('madridStatus');
  const madridBadge = document.getElementById('madridBadge');

  if (madridDiff < 0) {
    madridStatus.innerHTML = `Madrid: <strong class="text-rose-400">${formatMoney(madridTotal)}/mes</strong> (Alojam.: ${formatMoney(madridHousing)} + Vida: ${formatMoney(MADRID_METRICS.livingCost)}). <span class="underline">Faltan ${formatMoney(Math.abs(madridDiff))}</span>`;
    madridBadge.textContent = 'Inviable con presupuesto';
    madridBadge.className = 'bg-rose-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm';
  } else {
    madridStatus.innerHTML = `Madrid: <strong class="text-white">${formatMoney(madridTotal)}/mes</strong>. Sobran: <strong class="text-emerald-400">${formatMoney(madridDiff)}/mes</strong>.`;
    madridBadge.textContent = 'Presupuesto holgado';
    madridBadge.className = 'bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm';
  }

  let evaluatedCities = CITIES.map(city => {
    const cityHousing = housing === 'shared' ? city.sharedRoom : city.soloApt;
    const totalCost = cityHousing + city.livingCost;
    const margin = budget - totalCost;
    
    let score = 0;
    if (city.sectors.includes(sector) || city.sectors.includes('all')) score += 40;
    if (margin >= 0) score += 30 + Math.min(margin / 10, 20);
    else score -= 50;

    if (priority === 'local' && city.type === 'local') score += 25;
    if (priority === 'hybrid' && city.type === 'hybrid') score += 35;
    if (priority === 'saving') score += (budget - totalCost) * 0.05;

    return { ...city, cityHousing, totalCost, margin, score };
  });

  evaluatedCities.sort((a, b) => b.score - a.score);
  renderCities(evaluatedCities);
}

function renderCities(cities) {
  const container = document.getElementById('citiesContainer');
  container.innerHTML = '';

  cities.forEach(city => {
    const isViable = city.margin >= 0;
    const marginText = isViable 
      ? `<span class="text-emerald-600 dark:text-emerald-400 font-bold"><i class="fa-solid fa-circle-check"></i> Sobran ${formatMoney(city.margin)}</span>`
      : `<span class="text-rose-600 dark:text-rose-400 font-bold"><i class="fa-solid fa-circle-xmark"></i> Faltan ${formatMoney(Math.abs(city.margin))}</span>`;

    // Extraemos solo el nombre del objeto company para los mini-badges de la tarjeta principal
    const companiesHTML = city.companies.slice(0,2).map(c => 
      `<span class="bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded text-[9px] font-semibold">${c.name}</span>`
    ).join(' ');

    const cardHTML = `
      <div onclick="openCityModal('${city.id}')" class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm card-hover cursor-pointer transition-all relative group">
        <div class="flex justify-between items-start mb-3">
          <div>
            <span class="text-[9px] uppercase font-bold tracking-wider ${city.type === 'hybrid' ? 'text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800' : 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800'} px-2 py-0.5 rounded-md border">${city.badge}</span>
            <h4 class="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${city.name}</h4>
          </div>
          <div class="text-right">
            <span class="text-xl font-extrabold text-slate-900 dark:text-white block">${formatMoney(city.totalCost)}</span>
            <span class="text-[10px] text-slate-400 dark:text-slate-500">mensual</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-1.5 mb-3">
          ${companiesHTML} ${city.companies.length > 2 ? `<span class="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">+ más</span>` : ''}
        </div>

        <div class="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-700/50 p-2.5 rounded-xl text-xs mb-3 border border-slate-100 dark:border-slate-600/50">
          <div>
            <span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase">Alojam. + Gastos</span>
            <span class="font-bold text-slate-700 dark:text-slate-200">${formatMoney(city.cityHousing)} + ${formatMoney(city.livingCost)}</span>
          </div>
          <div>
            <span class="text-slate-400 dark:text-slate-500 block text-[9px] uppercase">Balance</span>
            ${marginText}
          </div>
        </div>

        <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-700 ${city.type === 'hybrid' ? 'text-teal-600 dark:text-teal-400' : 'text-indigo-600 dark:text-indigo-400'} font-semibold">
          <span class="flex items-center gap-1.5"><i class="fa-solid fa-train text-slate-400 dark:text-slate-500"></i> ${city.aveTime}</span>
          <span class="group-hover:underline">Análisis Detallado <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

function openCityModal(cityId) {
  const cityObj = CITIES.find(c => c.id === cityId);
  if (!cityObj) return;

  const housing = document.querySelector('input[name="housing"]:checked').value;
  const madridHousing = housing === 'shared' ? MADRID_METRICS.sharedRoom : MADRID_METRICS.soloApt;
  const madridTotal = madridHousing + MADRID_METRICS.livingCost;
  
  const cityHousing = housing === 'shared' ? cityObj.sharedRoom : cityObj.soloApt;
  const cityTotal = cityHousing + cityObj.livingCost;

  const maxCost = Math.max(madridTotal, cityTotal);
  const madridWidth = (madridTotal / maxCost) * 100;
  const cityWidth = (cityTotal / maxCost) * 100;

  // Renderizamos la lista de empresas con sus direcciones físicas y enlaces web
  const companiesList = cityObj.companies.map(c => `
    <li class="mb-3 last:mb-0">
      <div class="flex items-center gap-1.5">
        <i class="fa-solid fa-building text-slate-400 dark:text-slate-500"></i>
        <span class="font-bold text-slate-800 dark:text-slate-100">${c.name}</span>
        ${c.url ? `<a href="${c.url}" target="_blank" class="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 transition-colors" title="Visitar web de la empresa"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>` : ''}
      </div>
      <div class="text-[10px] text-slate-500 dark:text-slate-400 ml-5 flex items-start gap-1 mt-0.5">
        <i class="fa-solid fa-location-dot mt-0.5 opacity-70"></i> <span>${c.address}</span>
      </div>
    </li>
  `).join('');

  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <div class="space-y-4">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md">${cityObj.region}</span>
        <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">${cityObj.name}</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">${cityObj.tagline}</p>
      </div>

      <!-- SECCIÓN ECOSISTEMA Y TRAYECTO -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div class="bg-indigo-50/60 dark:bg-slate-700/50 p-3 rounded-xl border border-indigo-100 dark:border-slate-600">
          <span class="text-indigo-900 dark:text-indigo-300 block text-[10px] uppercase font-bold mb-2">💼 Directorio de Empresas</span>
          <ul class="text-slate-700 dark:text-slate-300 space-y-1 font-medium">
            ${companiesList}
          </ul>
        </div>
        <div class="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-200 dark:border-slate-600 flex flex-col justify-center">
          <span class="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-semibold">Conexión Madrid</span>
          <span class="font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5 mb-1.5 text-sm">
            <i class="fa-solid fa-train"></i> ${cityObj.aveTime}
          </span>
          <span class="text-slate-600 dark:text-slate-300 italic text-[10px] leading-tight">${cityObj.commuteDetail}</span>
        </div>
      </div>

      <!-- GRÁFICO COMPARATIVO VISUAL -->
      <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl">
        <h4 class="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">Comparativa de Costo de Vida Total</h4>
        
        <!-- Barra Madrid -->
        <div class="mb-3">
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-500 dark:text-slate-400 font-medium">Madrid (Referencia)</span>
            <span class="font-bold text-rose-600 dark:text-rose-400">${formatMoney(madridTotal)}</span>
          </div>
          <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3">
            <div class="bg-rose-500 h-3 rounded-full transition-all duration-1000" style="width: ${madridWidth}%"></div>
          </div>
        </div>
        
        <!-- Barra Ciudad Seleccionada -->
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span class="text-slate-800 dark:text-slate-200 font-bold">${cityObj.name}</span>
            <span class="font-bold text-indigo-600 dark:text-indigo-400">${formatMoney(cityTotal)}</span>
          </div>
          <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3">
            <div class="bg-indigo-500 h-3 rounded-full transition-all duration-1000 shadow-sm" style="width: ${cityWidth}%"></div>
          </div>
        </div>
        
        <div class="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2">
          Ahorro anual estimado vs Madrid: <strong class="text-emerald-600 dark:text-emerald-400">${formatMoney((madridTotal - cityTotal) * 12)}</strong>
        </div>
      </div>

      <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-3 rounded-xl text-[11px] text-emerald-800 dark:text-emerald-300 font-medium flex items-start gap-2">
        <i class="fa-solid fa-lightbulb text-emerald-600 dark:text-emerald-400 mt-0.5 text-sm"></i>
        <span><strong>Estrategia Anti-Imán:</strong> ${cityObj.magnetBenefit}</span>
      </div>
    </div>
  `;

  const modal = document.getElementById('cityModal');
  modal.classList.remove('hidden');
  
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.querySelector('div').classList.remove('scale-95');
  }, 10);

  drawRouteOnMap(cityObj);
}

function closeModal() {
  const modal = document.getElementById('cityModal');
  modal.classList.add('opacity-0');
  modal.querySelector('div').classList.add('scale-95');
  
  setTimeout(() => {
    modal.classList.add('hidden');
    if (routeLine) map.removeLayer(routeLine);
    map.flyTo([39.9, -3.7], 5, { duration: 1.0 });
  }, 300);
}

document.getElementById('btnEUR').addEventListener('click', () => setCurrency('EUR'));
document.getElementById('btnMXN').addEventListener('click', () => setCurrency('MXN'));
budgetInput.addEventListener('input', updateSliderDisplay);
document.getElementById('calculatorForm').addEventListener('change', calculate);
document.getElementById('btnCloseModal').addEventListener('click', closeModal);
document.getElementById('cityModal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('cityModal')) closeModal();
});

async function init() {
  initMap(); 
  await fetchExchangeRate();
  updateSliderDisplay();
  calculate();
}

init();