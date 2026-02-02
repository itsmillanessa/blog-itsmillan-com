---
title: "Ciberataques Coordinados de Rusia Destruyen Más de 30 Granjas Eólicas y Solares en Polonia"
date: "2026-02-02"
excerpt: "CERT Polska revela que el grupo Static Tundra, vinculado al FSB ruso, lanzó ataques destructivos contra infraestructura energética renovable y una planta de calefacción que sirve a medio millón de personas."
category: "Ciberseguridad"
readTime: "6 min"
image: "https://image.pollinations.ai/prompt/cyberattack%20wind%20farm%20solar%20panels%20destroyed%20digital%20warfare%20russian%20hackers%20energy%20grid%20dark%20dramatic?width=1200&height=630&model=flux&seed=290226"
featured: false
tags: ["Ciberguerra", "Infraestructura Crítica", "Rusia", "Energía Renovable", "SCADA", "ICS", "Polonia"]
---

# Cuando la Guerra Cibernética Apaga las Luces

El 29 de diciembre de 2025, mientras medio mundo cerraba el año entre celebraciones, un grupo de hackers vinculado al servicio de inteligencia ruso lanzó uno de los ataques cibernéticos más coordinados contra infraestructura energética en la historia reciente de Europa. Más de 30 granjas eólicas y solares en Polonia, una empresa manufacturera y una planta de calefacción que abastece a casi medio millón de personas fueron atacadas simultáneamente con un único objetivo: destruir.

CERT Polska, el equipo de respuesta a emergencias informáticas del país, publicó un informe detallado la semana pasada atribuyendo los ataques al grupo conocido como **Static Tundra** — también rastreado como Berserk Bear, Dragonfly, Energetic Bear y Havex — vinculado directamente a la Unidad Centro 16 del FSB (Servicio Federal de Seguridad de Rusia).

## La Anatomía de un Ataque Coordinado

Lo que hace excepcional a este incidente no es solo su escala, sino su precisión quirúrgica. Los atacantes no buscaban robar datos ni pedir rescate. Su objetivo era puramente destructivo: dañar firmware de controladores industriales, eliminar archivos de sistema y desplegar malware diseñado exclusivamente para borrar información de forma irrecuperable.

### DynoWiper: El Arma Principal

El protagonista técnico de estos ataques es un malware bautizado como **DynoWiper** por investigadores de ESET. Su funcionamiento es deliberadamente simple pero devastador:

1. **Inicialización:** Utiliza el generador de números pseudoaleatorios Mersenne Twister como semilla de corrupción.
2. **Enumeración y corrupción:** Recorre los archivos del sistema y los sobrescribe con datos aleatorios generados por el PRNG.
3. **Eliminación:** Borra los archivos corrompidos para dificultar cualquier intento de recuperación.

Lo notable es lo que DynoWiper **no** hace: no establece persistencia, no se comunica con servidores de comando y control, ni ejecuta comandos remotos. Es un arma de un solo uso, diseñada para causar el máximo daño posible en el menor tiempo y luego desaparecer.

Se han identificado al menos cuatro variantes distintas de DynoWiper, desplegadas directamente en computadoras HMI de Mikronika utilizadas por las instalaciones energéticas y a través de recursos compartidos de red dentro de la planta de calefacción.

### LazyWiper: El Segundo Frente

En paralelo, la empresa manufacturera fue atacada con una herramienta diferente: **LazyWiper**, un wiper basado en PowerShell que sobrescribe archivos con secuencias pseudoaleatorias de 32 bytes. Lo más inquietante es que CERT Polska sospecha que la funcionalidad principal de LazyWiper fue desarrollada utilizando un modelo de lenguaje (LLM), lo que plantea preguntas sobre cómo la inteligencia artificial está acelerando la creación de herramientas ofensivas.

## El Vector de Entrada: Dispositivos FortiGate Vulnerables

Uno de los hallazgos más relevantes del informe — y que debería preocupar a cualquier administrador de seguridad — es el vector de acceso inicial. En al menos dos de los ataques, los atacantes aprovecharon **dispositivos FortiGate vulnerables** expuestos en el perímetro de las redes objetivo.

En el caso de la planta de calefacción, el acceso se realizó a través del portal SSL-VPN de un dispositivo FortiGate utilizando cuentas definidas estáticamente en la configuración del equipo que **no tenían autenticación de dos factores habilitada**. Los atacantes se conectaron utilizando nodos de salida de Tor y direcciones IP de infraestructura comprometida, tanto polaca como extranjera.

Este detalle es crucial. No estamos hablando de una vulnerabilidad zero-day sofisticada, sino de **higiene básica de seguridad**: cuentas por defecto, sin MFA, expuestas a internet. Es un recordatorio brutal de que las brechas más devastadoras frecuentemente explotan las fallas más elementales.

## La Persistencia: 10 Meses Dentro de la Red

En la planta de calefacción, la investigación reveló que los atacantes no llegaron el 29 de diciembre y atacaron de inmediato. Habían mantenido acceso desde **marzo de 2025** — casi 10 meses de reconocimiento silencioso, escalada de privilegios y movimiento lateral.

Durante ese período, los atacantes:

- Obtuvieron credenciales del entorno on-premises
- Las utilizaron para acceder a servicios cloud de Microsoft 365
- Descargaron datos selectivos de Exchange, Teams y SharePoint
- Se enfocaron específicamente en documentos relacionados con **modernización de redes OT, sistemas SCADA y trabajo técnico** de las organizaciones

Este interés selectivo sugiere que el objetivo no era solo destruir, sino comprender profundamente cómo funcionan estas instalaciones para planificar futuros ataques potencialmente más devastadores.

## ¿Sandworm o Static Tundra?

Existe un debate interesante en la comunidad de inteligencia sobre la atribución exacta. Mientras CERT Polska atribuye los ataques a Static Tundra (FSB Centro 16), tanto ESET como Dragos lo vinculan con confianza moderada a **Sandworm**, el notorio grupo de la inteligencia militar rusa (GRU) responsable de los ataques a la red eléctrica ucraniana en 2015 y 2016.

CERT Polska señala que las similitudes de código entre DynoWiper y otros wipers asociados a Sandworm son de naturaleza "general" y no constituyen evidencia concreta. Sea cual sea el actor específico, lo que queda claro es que se trata de una operación respaldada por el estado ruso con capacidades avanzadas en sistemas de control industrial.

## Las Lecciones Para Latinoamérica

Aunque este ataque ocurrió en Polonia, las lecciones son universales y particularmente relevantes para la infraestructura energética en crecimiento de América Latina:

**1. La energía renovable es el nuevo objetivo.** A medida que los países diversifican su matriz energética, las granjas eólicas y solares se convierten en blancos atractivos. Muchas de estas instalaciones fueron diseñadas priorizando eficiencia sobre seguridad.

**2. Los dispositivos de perímetro son la puerta de entrada.** Firewalls, VPNs y gateways mal configurados siguen siendo el vector de ataque preferido. La autenticación multifactor no es opcional — es supervivencia.

**3. La segmentación OT/IT no es negociable.** Los atacantes se movieron desde redes corporativas hacia sistemas de control industrial. Sin segmentación adecuada, comprometer un email puede terminar apagando una turbina.

**4. El monitoreo continuo detecta lo que las defensas perimetrales no.** Diez meses de presencia sin detectar es inaceptable. Las organizaciones necesitan capacidades de detección y respuesta que cubran tanto IT como OT.

**5. Los wipers son la nueva normalidad.** A diferencia del ransomware, que al menos ofrece la posibilidad de recuperación, los wipers buscan destrucción permanente. Los planes de respaldo y recuperación ante desastres deben contemplar este escenario.

## Reflexión Final

Este incidente marca una escalada preocupante en la guerra cibernética contra infraestructura crítica. No se trató de un ataque oportunista ni financieramente motivado — fue un acto deliberado de sabotaje estatal contra la infraestructura energética de un país miembro de la OTAN.

El hecho de que los ataques no lograron interrumpir el suministro eléctrico ni la calefacción no debería ser motivo de complacencia, sino de alarma. Los atacantes ahora tienen un conocimiento íntimo de estos sistemas y la próxima vez podrían no fallar.

La pregunta ya no es si tu infraestructura crítica será atacada, sino cuándo. Y la respuesta a esa pregunta depende de lo que hagas hoy para prepararte.
