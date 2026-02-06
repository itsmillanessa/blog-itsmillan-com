---
title: "AMD Se Niega a Corregir Vulnerabilidad Crítica de Ejecución Remota de Código"
date: "2026-02-06"
excerpt: "Un investigador de seguridad descubre una vulnerabilidad RCE trivial en el software de actualización de AMD, pero la compañía la considera 'fuera de alcance' y no planea corregirla."
category: "Ciberseguridad"
readTime: "6 min"
image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop"
featured: false
tags: ["AMD", "vulnerabilidad", "RCE", "ciberseguridad", "hardware"]
---

En el mundo de la ciberseguridad, pocas cosas son más preocupantes que una vulnerabilidad de ejecución remota de código (RCE). Cuando esa vulnerabilidad afecta a millones de usuarios y el fabricante decide no corregirla, la situación se vuelve alarmante. Esto es exactamente lo que está sucediendo con AMD y su software AutoUpdate.

## El Descubrimiento Accidental

La historia comienza de manera casi cómica. Un investigador de seguridad, frustrado por una ventana emergente que aparecía periódicamente en su nueva PC gaming, decidió investigar el origen del problema. Lo que encontró fue mucho más grave de lo que esperaba.

Al rastrear el ejecutable responsable hasta el software AMD AutoUpdate, el investigador decidió descompilar el programa para entender su funcionamiento. Lo que descubrió fue una vulnerabilidad de ejecución remota de código que califica como "trivial" de explotar.

## La Vulnerabilidad Explicada

El problema radica en cómo AMD maneja las actualizaciones de software. Aunque la URL del servidor de actualizaciones utiliza HTTPS (lo cual es seguro), los enlaces de descarga de los ejecutables utilizan HTTP sin cifrar.

Esta diferencia aparentemente menor tiene implicaciones devastadoras:

**Escenario de Ataque:**

1. Un atacante en la misma red (cafetería, hotel, oficina) puede interceptar el tráfico HTTP
2. Mediante un ataque Man-in-the-Middle (MITM), puede reemplazar el ejecutable legítimo por uno malicioso
3. El software de AMD no realiza ninguna validación de certificados ni firmas digitales
4. El ejecutable malicioso se ejecuta automáticamente con privilegios del usuario

Esto significa que cualquier persona con acceso a tu red local, o incluso actores estatales con acceso a nivel ISP, pueden comprometer tu sistema de manera silenciosa y efectiva.

## Sin Validación de Seguridad

Lo más preocupante del análisis del código descompilado es la ausencia total de medidas de seguridad básicas. El software AutoUpdate de AMD:

- No valida certificados digitales
- No verifica firmas de los ejecutables descargados
- Ejecuta inmediatamente cualquier archivo descargado
- No implementa ningún tipo de sandboxing

Estas son prácticas de seguridad básicas que deberían estar presentes en cualquier software de actualización automática, especialmente uno que se ejecuta con privilegios elevados en millones de sistemas.

## La Respuesta de AMD

Aquí es donde la historia toma un giro frustrante. Siguiendo las mejores prácticas de divulgación responsable, el investigador reportó la vulnerabilidad a AMD el 5 de febrero de 2026.

La respuesta de AMD fue inmediata pero decepcionante: el reporte fue cerrado el mismo día como "fuera de alcance" (out of scope). En otras palabras, AMD no considera esto una vulnerabilidad que merezca ser corregida.

Esta decisión ha generado una ola de críticas en la comunidad de seguridad informática. La vulnerabilidad permite potencialmente que atacantes:

- Instalen malware de forma silenciosa
- Roben credenciales y datos sensibles
- Establezcan persistencia en el sistema
- Utilicen la máquina para ataques posteriores

## Línea de Tiempo del Incidente

| Fecha | Evento |
|-------|--------|
| 27 de enero de 2026 | Vulnerabilidad descubierta |
| 5 de febrero de 2026 | Vulnerabilidad reportada a AMD |
| 5 de febrero de 2026 | Reporte cerrado como "fuera de alcance" |
| 6 de febrero de 2026 | Divulgación pública |

## Qué Pueden Hacer los Usuarios

Hasta que AMD decida tomar acción (si es que lo hace), los usuarios de hardware AMD tienen algunas opciones para protegerse:

### 1. Desactivar AMD AutoUpdate

La solución más directa es desactivar o desinstalar el software de actualización automática de AMD. Esto significa que tendrás que actualizar los drivers manualmente, pero elimina el vector de ataque.

### 2. Evitar Redes No Confiables

Si necesitas usar el software de AMD, evita conectarte a redes WiFi públicas o no confiables. En tu red doméstica, el riesgo es menor pero no nulo.

### 3. Usar una VPN

Una VPN cifra todo tu tráfico de red, incluyendo las conexiones HTTP inseguras, dificultando los ataques MITM.

### 4. Monitorear el Tráfico de Red

Usuarios avanzados pueden configurar firewalls para alertar sobre conexiones HTTP no cifradas desde el software de AMD.

## El Problema Más Grande

Este incidente revela un problema sistémico en la industria del hardware. Los fabricantes de componentes y periféricos a menudo no aplican los mismos estándares de seguridad que los desarrolladores de software tradicional.

El software de actualización automática es particularmente crítico porque:

- Se ejecuta con privilegios elevados
- Descarga y ejecuta código de internet
- Opera en segundo plano sin supervisión del usuario
- Está presente en millones de sistemas

Cuando este tipo de software tiene vulnerabilidades básicas, el impacto potencial es masivo.

## Reflexión Final

La decisión de AMD de clasificar esta vulnerabilidad como "fuera de alcance" envía un mensaje preocupante sobre las prioridades de seguridad de la empresa. En una era donde los ataques a la cadena de suministro de software son cada vez más comunes, este tipo de descuidos son inexcusables.

Los usuarios merecen saber que el software que instalan junto con su hardware no los expone a riesgos innecesarios. Y cuando se descubren vulnerabilidades, los fabricantes tienen la responsabilidad de corregirlas, no de ignorarlas.

La comunidad de seguridad seguirá presionando a AMD para que reconsidere su posición. Mientras tanto, la prudencia dicta tomar las precauciones mencionadas anteriormente. En ciberseguridad, más vale prevenir que lamentar.

---

*Este artículo se basa en la investigación publicada por el investigador de seguridad que descubrió la vulnerabilidad. La divulgación completa está disponible públicamente tras la negativa de AMD a corregir el problema.*
