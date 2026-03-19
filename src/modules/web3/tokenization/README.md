# Tokenization module

Responsabilidades:
- Modelar assets tokenizados (metadatos, supply, restricciones)
- Orquestar emisión/redeem (flujos off-chain + on-chain)
- Registrar eventos y estados (para UI + auditoría)

En fases tempranas, este módulo puede usar “services” y “ports”
para mantener el acoplamiento bajo (wallets, RPC, indexadores, etc.).

