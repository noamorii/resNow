
# RSP semestral

## Lokalni vyvoj

### Jak nastavit Docker

1. Pokud jeste nemas tak stahni [Docker desktop](https://www.docker.com/products/docker-desktop/)
2. Zapni Docker desktop
3. Bez v terminalu do projektove slozky a napis `docker compose up`
4. Ted by se ti mela lokalne zapnout DB a pgadmin (`localhost:5050`) a muzes spustit Spring aplikaci v IDE

### Troubleshooting s dockerem

- Pokud Docker rika, ze uz je port zabrany a nemuze spustit container, tak vypni
bezici containery pomoci `docker kill $(docker ps -q)` a zkus znovu `docker compose up`

### Jak nastavit IDE

Aby se pouzila spravna konfiguraci pri lokalnim vyvoji, tak je treba nastavit environment variable
v IDE.



## Linky

- [Discord](https://discord.gg/4sZeEG5E)
- [Cacoo](https://cacoo.com/diagrams/OLQ9DeqrgT7nAVK8/B8D3E)

