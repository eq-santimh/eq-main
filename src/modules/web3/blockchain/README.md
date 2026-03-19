# Blockchain module

Responsabilidades:
- Conexión a redes (RPC/Providers)
- Abstracción de `chainId`, `blockNumber`, balances y estado on-chain
- Clientes por cadena (ej. EVM, L2s, etc.)

Este módulo es intencionalmente “sin acoplarse” a tokenización o contratos
para que el sistema crezca sin reescrituras.

