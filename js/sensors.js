// ===== CONFIGURATION =====
const API_BASE_URL = 'https://midrive.myds.me:8100'; // Cambia esto a tu IP/host real
const REFRESH_INTERVAL = 30000; // 30 segundos
let autoRefreshEnabled = false;
let autoRefreshTimer = null;
let currentTimeRange = 24; // horas

// ===== CHART INSTANCES =====
let tempChart = null;
let humidityChart = null;
let tempDistChart = null;
let humidityDistChart = null;
let correlationChart = null;

// ===== CHART CONFIGURATION =====
const chartColors = {
    temperature: {
        border: '#FF10F0',
        background: 'rgba(255, 16, 240, 0.2)'
    },
    humidity: {
        border: '#00FF41',
        background: 'rgba(0, 255, 65, 0.2)'
    },
    grid: 'rgba(0, 240, 255, 0.1)',
    text: '#00F0FF'
};

const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            labels: {
                color: chartColors.text,
                font: {
                    family: 'VT323',
                    size: 14
                }
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: chartColors.text,
                font: {
                    family: 'VT323',
                    size: 12
                }
            },
            grid: {
                color: chartColors.grid
            }
        },
        y: {
            ticks: {
                color: chartColors.text,
                font: {
                    family: 'VT323',
                    size: 12
                }
            },
            grid: {
                color: chartColors.grid
            }
        }
    }
};

// ===== UTILITY FUNCTIONS =====

function calculateMean(values) {
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
}

function calculateMedian(values) {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
        ? (sorted[mid - 1] + sorted[mid]) / 2 
        : sorted[mid];
}

function calculateMode(values) {
    if (values.length === 0) return 'N/A';
    
    // Redondear valores a 1 decimal para agrupar
    const rounded = values.map(v => Math.round(v * 10) / 10);
    const frequency = {};
    
    rounded.forEach(val => {
        frequency[val] = (frequency[val] || 0) + 1;
    });
    
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
    
    return modes.length === rounded.length ? 'N/A' : modes.map(Number).join(', ');
}

function calculateStdDev(values) {
    if (values.length === 0) return 0;
    const mean = calculateMean(values);
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
    const variance = calculateMean(squaredDiffs);
    return Math.sqrt(variance);
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

// ===== API FUNCTIONS =====

async function checkAPIStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            document.getElementById('api-status-indicator').className = 'status-dot online';
            document.getElementById('api-status-text').textContent = 'API ONLINE';
            return true;
        }
    } catch (error) {
        console.error('API Error:', error);
    }
    
    document.getElementById('api-status-indicator').className = 'status-dot offline';
    document.getElementById('api-status-text').textContent = 'API OFFLINE';
    return false;
}

async function fetchMetrics(sensorType, hours = 24) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/metrics/?sensor_type=${sensorType}&limit=1000`
        );
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(`Error fetching ${sensorType}:`, error);
    }
    return [];
}

async function fetchStats(sensorType, hours = 24) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/metrics/stats?sensor_type=${sensorType}&hours=${hours}`
        );
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error(`Error fetching stats for ${sensorType}:`, error);
    }
    return null;
}

async function fetchSummary() {
    try {
        const response = await fetch(`${API_BASE_URL}/metrics/summary`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Error fetching summary:', error);
    }
    return null;
}

async function fetchLatestReadings(limit = 20) {
    try {
        const response = await fetch(`${API_BASE_URL}/metrics/latest?limit=${limit}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Error fetching latest readings:', error);
    }
    return [];
}

// ===== DATA PROCESSING =====

function processMetrics(metrics) {
    const values = metrics.map(m => m.value);
    const timestamps = metrics.map(m => new Date(m.timestamp));
    
    return {
        values,
        timestamps,
        mean: calculateMean(values),
        median: calculateMedian(values),
        mode: calculateMode(values),
        min: Math.min(...values),
        max: Math.max(...values),
        stdDev: calculateStdDev(values),
        current: values[values.length - 1] || 0
    };
}

function createHistogram(values, bins = 10) {
    if (values.length === 0) return { labels: [], data: [] };
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binSize = (max - min) / bins;
    
    const histogram = new Array(bins).fill(0);
    const labels = [];
    
    for (let i = 0; i < bins; i++) {
        const binStart = min + (i * binSize);
        const binEnd = binStart + binSize;
        labels.push(`${binStart.toFixed(1)}-${binEnd.toFixed(1)}`);
        
        values.forEach(val => {
            if (val >= binStart && (val < binEnd || (i === bins - 1 && val === binEnd))) {
                histogram[i]++;
            }
        });
    }
    
    return { labels, data: histogram };
}

// ===== UI UPDATE FUNCTIONS =====

function updateStatisticsUI(tempData, humidityData) {
    // Temperature stats
    document.getElementById('temp-current').textContent = 
        tempData.current ? `${tempData.current.toFixed(1)}°C` : '--°C';
    document.getElementById('temp-mean').textContent = 
        tempData.mean ? `${tempData.mean.toFixed(1)}°C` : '--';
    document.getElementById('temp-median').textContent = 
        tempData.median ? `${tempData.median.toFixed(1)}°C` : '--';
    document.getElementById('temp-mode').textContent = 
        tempData.mode !== 'N/A' ? `${tempData.mode}°C` : 'N/A';
    document.getElementById('temp-minmax').textContent = 
        tempData.min ? `${tempData.min.toFixed(1)} / ${tempData.max.toFixed(1)}°C` : '--';
    document.getElementById('temp-stddev').textContent = 
        tempData.stdDev ? `±${tempData.stdDev.toFixed(2)}°C` : '--';

    // Humidity stats
    document.getElementById('humidity-current').textContent = 
        humidityData.current ? `${humidityData.current.toFixed(1)}%` : '--%';
    document.getElementById('humidity-mean').textContent = 
        humidityData.mean ? `${humidityData.mean.toFixed(1)}%` : '--';
    document.getElementById('humidity-median').textContent = 
        humidityData.median ? `${humidityData.median.toFixed(1)}%` : '--';
    document.getElementById('humidity-mode').textContent = 
        humidityData.mode !== 'N/A' ? `${humidityData.mode}%` : 'N/A';
    document.getElementById('humidity-minmax').textContent = 
        humidityData.min ? `${humidityData.min.toFixed(1)} / ${humidityData.max.toFixed(1)}%` : '--';
    document.getElementById('humidity-stddev').textContent = 
        humidityData.stdDev ? `±${humidityData.stdDev.toFixed(2)}%` : '--';
}

function updateSummaryUI(summary) {
    if (!summary) return;
    
    document.getElementById('total-metrics').textContent = summary.total_metrics || '0';
    document.getElementById('total-devices').textContent = summary.total_devices || '0';
    document.getElementById('sensor-types').textContent = summary.total_sensor_types || '0';
    
    const lastUpdate = summary.latest_timestamp 
        ? formatTimestamp(summary.latest_timestamp) 
        : 'N/A';
    document.getElementById('last-update').textContent = lastUpdate;
}

function updateLatestReadingsTable(readings) {
    const tbody = document.getElementById('readings-tbody');
    
    if (readings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">NO DATA AVAILABLE</td></tr>';
        return;
    }
    
    tbody.innerHTML = readings.map(reading => `
        <tr>
            <td>${formatTimestamp(reading.timestamp)}</td>
            <td>${reading.device_id || 'N/A'}</td>
            <td>${reading.sensor_type || 'N/A'}</td>
            <td class="glow">${reading.value.toFixed(2)} ${reading.unit || ''}</td>
            <td>${reading.location || 'N/A'}</td>
        </tr>
    `).join('');
}

// ===== CHART FUNCTIONS =====

function createTimeSeriesChart(ctx, label, data, timestamps, color) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps.map(t => t.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            })),
            datasets: [{
                label: label,
                data: data,
                borderColor: color.border,
                backgroundColor: color.background,
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            ...commonChartOptions,
            plugins: {
                ...commonChartOptions.plugins,
                title: {
                    display: false
                }
            }
        }
    });
}

function createDistributionChart(ctx, label, histData, color) {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: histData.labels,
            datasets: [{
                label: label,
                data: histData.data,
                backgroundColor: color.background,
                borderColor: color.border,
                borderWidth: 2
            }]
        },
        options: {
            ...commonChartOptions,
            plugins: {
                ...commonChartOptions.plugins,
                title: {
                    display: false
                }
            }
        }
    });
}

function createCorrelationChart(ctx, tempValues, humidityValues) {
    const data = tempValues.map((temp, i) => ({
        x: temp,
        y: humidityValues[i]
    }));
    
    return new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Temperature vs Humidity',
                data: data,
                backgroundColor: 'rgba(157, 0, 255, 0.5)',
                borderColor: '#9D00FF',
                borderWidth: 2
            }]
        },
        options: {
            ...commonChartOptions,
            scales: {
                x: {
                    ...commonChartOptions.scales.x,
                    title: {
                        display: true,
                        text: 'Temperature (°C)',
                        color: chartColors.text,
                        font: {
                            family: 'VT323',
                            size: 14
                        }
                    }
                },
                y: {
                    ...commonChartOptions.scales.y,
                    title: {
                        display: true,
                        text: 'Humidity (%)',
                        color: chartColors.text,
                        font: {
                            family: 'VT323',
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

function destroyCharts() {
    [tempChart, humidityChart, tempDistChart, humidityDistChart, correlationChart].forEach(chart => {
        if (chart) chart.destroy();
    });
}

// ===== MAIN DATA REFRESH =====

async function refreshData() {
    console.log('Refreshing data...');
    
    // Check API status
    const apiOnline = await checkAPIStatus();
    
    if (!apiOnline) {
        console.warn('API is offline, showing demo mode');
        // Podrías mostrar datos de demo aquí si quisieras
        return;
    }
    
    // Fetch all data
    const [tempMetrics, humidityMetrics, summary, latestReadings] = await Promise.all([
        fetchMetrics('temperature', currentTimeRange),
        fetchMetrics('humidity', currentTimeRange),
        fetchSummary(),
        fetchLatestReadings(20)
    ]);
    
    // Process metrics
    const tempData = processMetrics(tempMetrics);
    const humidityData = processMetrics(humidityMetrics);
    
    // Update UI
    updateStatisticsUI(tempData, humidityData);
    updateSummaryUI(summary);
    updateLatestReadingsTable(latestReadings);
    
    // Create histograms
    const tempHist = createHistogram(tempData.values, 12);
    const humidityHist = createHistogram(humidityData.values, 12);
    
    // Destroy old charts
    destroyCharts();
    
    // Create new charts
    tempChart = createTimeSeriesChart(
        document.getElementById('tempChart'),
        'Temperature (°C)',
        tempData.values,
        tempData.timestamps,
        chartColors.temperature
    );
    
    humidityChart = createTimeSeriesChart(
        document.getElementById('humidityChart'),
        'Humidity (%)',
        humidityData.values,
        humidityData.timestamps,
        chartColors.humidity
    );
    
    tempDistChart = createDistributionChart(
        document.getElementById('tempDistChart'),
        'Frequency',
        tempHist,
        chartColors.temperature
    );
    
    humidityDistChart = createDistributionChart(
        document.getElementById('humidityDistChart'),
        'Frequency',
        humidityHist,
        chartColors.humidity
    );
    
    // Create correlation chart (sync data points)
    const minLength = Math.min(tempData.values.length, humidityData.values.length);
    correlationChart = createCorrelationChart(
        document.getElementById('correlationChart'),
        tempData.values.slice(0, minLength),
        humidityData.values.slice(0, minLength)
    );
    
    console.log('Data refresh complete');
}

// ===== CONTROL FUNCTIONS =====

function toggleAutoRefresh() {
    autoRefreshEnabled = !autoRefreshEnabled;
    const btn = document.getElementById('auto-refresh-text');
    
    if (autoRefreshEnabled) {
        btn.innerHTML = '⏸ AUTO-REFRESH: ON';
        autoRefreshTimer = setInterval(refreshData, REFRESH_INTERVAL);
        console.log('Auto-refresh enabled');
    } else {
        btn.innerHTML = '▶ AUTO-REFRESH: OFF';
        if (autoRefreshTimer) {
            clearInterval(autoRefreshTimer);
            autoRefreshTimer = null;
        }
        console.log('Auto-refresh disabled');
    }
}

function updateTimeRange() {
    const select = document.getElementById('time-range');
    currentTimeRange = parseInt(select.value);
    console.log(`Time range updated to ${currentTimeRange} hours`);
    refreshData();
}

// ===== INITIALIZATION =====

window.addEventListener('DOMContentLoaded', () => {
    console.log('Sensor Dashboard initialized');
    refreshData();
    
    // Auto-refresh every 30 seconds if enabled
    // toggleAutoRefresh(); // Descomenta esto si quieres auto-refresh por defecto
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (autoRefreshTimer) {
        clearInterval(autoRefreshTimer);
    }
    destroyCharts();
});
