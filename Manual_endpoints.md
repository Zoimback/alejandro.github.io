# Manual de Endpoints para la IA

## Endpoints principales para métricas (ESP32)

### Crear una métrica
- **POST** `/metrics/`
- Header: `X-API-Key` (si está configurada)
- Body JSON:
  ```json
  {
    "device_id": "ESP32_01",
    "sensor_type": "temperature",
    "value": 25.5,
    "unit": "°C",
    "location": "Salon",
    "timestamp": "2026-02-13T12:00:00" // opcional
  }
  ```
- Respuesta: Métrica creada

### Crear múltiples métricas (batch)
- **POST** `/metrics/bulk`
- Header: `X-API-Key`
- Body JSON:
  ```json
  {
    "metrics": [
      { "device_id": "ESP32_01", "sensor_type": "temperature", "value": 25.5, "unit": "°C" },
      { "device_id": "ESP32_01", "sensor_type": "humidity", "value": 60, "unit": "%" }
    ]
  }
  ```
- Respuesta: Cantidad de métricas creadas

### Listar métricas (para gráficas)
- **GET** `/metrics/`
- Parámetros: `device_id`, `sensor_type`, `start_date`, `end_date`, `skip`, `limit`
- Ejemplo:
  ```
  GET /metrics/?device_id=ESP32_01&sensor_type=temperature&limit=100
  ```
- Respuesta: Lista de métricas

### Obtener últimas métricas
- **GET** `/metrics/latest`
- Parámetros: `device_id` (opcional), `limit`
- Ejemplo:
  ```
  GET /metrics/latest?device_id=ESP32_01&limit=10
  ```
- Respuesta: Últimas lecturas

### Estadísticas agregadas (para gráficas)
- **GET** `/metrics/stats`
- Parámetros: `device_id`, `sensor_type`, `hours`
- Ejemplo:
  ```
  GET /metrics/stats?device_id=ESP32_01&sensor_type=temperature&hours=24
  ```
- Respuesta: min, max, avg, count, latest_value, timestamps

### Resumen general (para dashboards)
- **GET** `/metrics/summary`
- Respuesta: total de métricas, dispositivos, tipos de sensores, últimas lecturas, rango de fechas

### Limpiar métricas antiguas
- **DELETE** `/metrics/cleanup`
- Header: `X-API-Key`
- Respuesta: cantidad de métricas eliminadas según retención

### Eliminar métrica específica
- **DELETE** `/metrics/{metric_id}`
- Header: `X-API-Key`
- Respuesta: 204 si se elimina

---

## Endpoints generales

### Bienvenida
- **GET** `/`
- Respuesta: info general, endpoints disponibles

### Health check
- **GET** `/health`
- Respuesta: estado, timestamp, conexión a BD, total de métricas

---

## Seguridad
- Filtrado por IP (solo red local)
- API Key en header `X-API-Key` (opcional, configurable)
- CORS abierto para consumo desde GitHub Pages

---

## Ejemplo de consumo desde ESP32

```cpp
http.begin("http://<host>:8000/metrics/");
http.addHeader("Content-Type", "application/json");
http.addHeader("X-API-Key", "tu_clave_secreta");
http.POST(payload);
```

---

## Ejemplo de consumo para gráficas (JavaScript)

```javascript
fetch('http://<host>:8000/metrics/?limit=100&sensor_type=temperature')
  .then(response => response.json())
  .then(data => {
    // Procesar datos para Chart.js
  });
```
