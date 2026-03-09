# ERC-8004 Workshop — Guion de Presentacion (Espanol)

---

## Slide 1: Titulo — ERC-8004: La Economia de Agentes Sin Confianza

Bienvenidos al Workshop de ERC-8004 por PerkOS. Hoy vamos a aprender como construir infraestructura de agentes sin confianza usando identidad on-chain, reputacion y pagos. Al final de esta sesion, sabran como descubrir, verificar y registrar agentes de IA usando PerkOS Stack.

---

## Slide 2: Que es ERC-8004?

El problema hoy es la confianza. Cuando un agente de IA dice que puede hacer algo, como lo verificas? No hay historial on-chain, no hay identidad portable. ERC-8004 resuelve esto con tres registros: Identidad para descubrimiento e IDs portables, Reputacion para feedback y puntajes de desempeno, y Validacion para verificacion criptografica de tareas. Todo on-chain, sin permisos, interoperable entre plataformas.

---

## Slide 3: Como Funcionan los Agentes On-Chain

Cada agente empieza como un NFT ERC-721 -- una identidad unica y persistente on-chain. La tarjeta del agente almacena su nombre, capacidades y endpoints de API. Una vez registrado, el agente opera como un actor soberano con su propia wallet, firmando transacciones y negociando con otros agentes. Puedes descubrir agentes consultando los registros directamente o a traves de herramientas como 8004scan.

---

## Slide 4: Infraestructura para la Economia de Maquinas

Este es el stack completo para la economia de maquinas. ERC-8004 maneja la confianza -- quien es este agente, puedo confiar en el. x402 maneja los pagos -- HTTP 402 Payment Required, transacciones nativas maquina-a-maquina. MCP y A2A manejan la comunicacion -- protocolos estandarizados para uso de herramientas y mensajeria entre agentes. El flujo completo es: descubrir via A2A, verificar via ERC-8004, pagar via x402, listo. Desplegamos en L2s como Base, Celo y Avalanche para fees de menos de un centavo.

---

## Slide 5: Presentando Stack

Stack es el middleware de PerkOS que hace todo esto accesible via APIs REST. En vez de escribir Solidity o usar ethers.js para interactuar con contratos directamente, simplemente llamas a los endpoints de Stack. Maneja enrutamiento multi-chain, codificacion ABI, y sigue estandares web con endpoints de descubrimiento dot-well-known. Actualmente soporta 38 redes incluyendo todos los L2s principales. Todo lo que necesitas para integrar ERC-8004 en tu aplicacion esta a una llamada HTTP de distancia.

---

## Slide 6: Stack — Descubrimiento en Practica

Veamos los endpoints de descubrimiento. El health check confirma que Stack esta en linea y devuelve la version del API. El descriptor ERC-8004 en dot-well-known te da todo sobre este agente: capacidades, metodos de pago, redes soportadas, direcciones de contratos. Y llms.txt esta disenado especificamente para agentes de IA -- devuelve instrucciones en texto plano que cualquier LLM puede parsear para entender como interactuar con Stack. Son todas peticiones HTTP GET estandar, nada especial necesario.

---

## Slide 7: Stack — Identidad y Reputacion

La consulta de identidad devuelve la informacion del contrato de registro para cualquier red. El registro de identidad es un ERC-721 -- cada agente es literalmente un NFT con un tokenURI que apunta a sus metadatos de tarjeta de agente. Para reputacion, consultas por ID de agente y obtienes todo el feedback on-chain: puntajes, tags para categorizacion como fx-trade o buy, que clientes dieron el feedback, y si algun feedback fue revocado. La reputacion usa int128 con signo asi que soporta valores positivos y negativos con precision decimal configurable.

---

## Slide 8: Stack — Registro de Agentes

El registro es donde se pone interesante. Una sola peticion POST a Stack devuelve todo lo que tu agente necesita: la transaccion de registro lista para firmar, configuracion de pagos x402 con la URL del facilitador y direccion de pago, y las direcciones de contratos ERC-8004 para la red elegida. En produccion, tu agente llama a onboard, firma la transaccion devuelta con su wallet, y queda registrado on-chain. Sin dashboard, sin configuracion manual. Completamente programatico.

---

## Slide 9: Stack — Flujo de Pagos x402

x402 es la capa de pagos. El endpoint supported lista las 38 combinaciones de red y esquema. Dos esquemas: Exact para transferencias USDC inmediatas verificadas on-chain, y Deferred para liquidacion por lotes basada en escrow -- util para interacciones de alta frecuencia donde liquidar cada peticion individual seria muy caro. El endpoint verify valida una prueba de pago, y settle ejecuta la transferencia on-chain. En produccion, tu servidor devuelve HTTP 402 con requisitos de pago, el cliente construye una prueba firmada, y Stack maneja el resto.

---

## Slide 10: Modelos Hibridos de Confianza y Seguridad

La seguridad debe escalar con el riesgo. Una consulta simple no necesita el mismo nivel de verificacion que una operacion DeFi de $10K. ERC-8004 soporta esto a traves de confianza escalonada: solo reputacion para bajo riesgo, colateral en stake para medio, y atestaciones de hardware mas pruebas de conocimiento cero para operaciones criticas. La idea clave es que la reputacion es portable -- sigue a los agentes entre plataformas, asi que los actores maliciosos no pueden simplemente reiniciar su identidad.

---

## Slide 11: Workshop Practico

Ahora vamos a la practica. Tenemos seis ejercicios que recorren el API completo de Stack. Clonen el repo y vamos a trabajar juntos. No se necesita wallet ni clave privada para las operaciones de lectura -- estamos consultando datos reales en Base mainnet.

---

## Slide 12: Configuracion del Workshop

La configuracion es simple: Node 18 o superior, npm, y una terminal. No se necesita wallet para operaciones de lectura. Solo hagan cd a examples/stack-api y corran npm install. Los seis ejemplos son archivos TypeScript independientes que usan fetch nativo contra el API de Stack en produccion. Sin SDK, sin dependencias mas alla de chalk para salida con colores.

---

## Slide 13: Ejercicio 1 — Descubrimiento

Corran el primer ejercicio y veran cinco endpoints de descubrimiento en accion. El punto clave aqui es que un solo dominio expone el perfil completo del agente. Cualquier agente o humano puede descubrir capacidades, puntajes de confianza y terminos de pago a traves de peticiones HTTP estandar. Esta es la base de la economia de maquinas -- descubrimiento sin intermediarios.

---

## Slide 14: Ejercicios 2-3 — Identidad y Reputacion

Los ejercicios 2 y 3 consultan datos reales on-chain. La consulta de identidad muestra el contrato de registro en Base. La consulta de reputacion devuelve feedback real para el agente ID 1 -- veran un puntaje de 85, etiquetado como una operacion fx-trade buy. Pueden pasar su propia direccion o ID de agente como argumentos. Noten que las direcciones de contratos son las mismas en todas las cadenas EVM -- usan despliegue deterministico CREATE2.

---

## Slide 15: Ejercicio 4 — Registro de Agentes

El ejercicio 4 muestra el registro de agentes. Cuando lo corren, Stack devuelve el paquete de registro completo: la transaccion para firmar, configuracion de pagos x402 y direcciones de registros. En produccion, un agente firmaria esta transaccion con su wallet y quedaria registrado on-chain en un solo paso. Asi es como hacemos el registro de agentes sin friccion -- una llamada API te da todo.

---

## Slide 16: Ejercicio 5 — Ciclo de Vida de Pagos x402

El ejercicio 5 demuestra el ciclo de vida de pagos x402. Veran los 38 pares de red-esquema soportados, el health check con latencia RPC por red, y los endpoints verify y settle. En el workshop usamos datos de ejemplo ya que no estamos ejecutando pagos reales, pero el flujo es exactamente lo que sucede en produccion. Dos esquemas: Exact para liquidacion inmediata, Deferred para liquidacion por lotes basada en escrow.

---

## Slide 17: Ejercicio 6 — Flujo de Integracion Completo

El ejercicio final une todo. Descubrir, identidad, reputacion, registrar -- el ciclo de vida completo del agente en un solo script. Esto es lo que parece una integracion real: descubres un agente, verificas su identidad y reputacion antes de interactuar, luego registras tu propio agente para participar en la misma red. Corranlo y veran el flujo completo contra datos de produccion en vivo.

---

## Slide 18: Vista General de Arquitectura

Este diagrama muestra como encaja Stack. Tu agente o aplicacion hace peticiones HTTP a Stack, y Stack maneja toda la interaccion con blockchain: enrutamiento multi-chain a traves de 38 redes, codificacion ABI, protocolos de descubrimiento siguiendo estandares web, y facilitacion de pagos x402. Para usuarios avanzados que quieran interactuar con los contratos directamente, tenemos ejemplos separados usando ethers.js en el directorio direct-contract.

---

## Slide 19: Direcciones de Contratos Clave

Aqui estan las direcciones de contratos. Noten que son identicas en las siete cadenas mainnet -- esto es gracias al despliegue deterministico CREATE2. Una direccion para Identidad, una para Reputacion, en todas partes. Esto hace que la interoperabilidad de agentes cross-chain sea directa: mismo ID de agente, mismos contratos, mismas direcciones, cualquier cadena.

---

## Slide 20: Resumen

Para resumir: ERC-8004 le da a los agentes identidad y reputacion sin confianza. x402 les da pagos nativos. Stack hace todo accesible a traves de APIs REST simples. Descubrir, verificar, pagar, repetir. Esa es la economia de maquinas. Stack esta en vivo en stack.perkos.xyz -- vayan a construir algo.

---

## Slide 21: Like Follow Us

Escaneen los codigos QR para visitar PerkOS.xyz, seguir a @perk_os en X, y acceder al repo del workshop en GitHub.
