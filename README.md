# Karlstorps 4×4 – CMS-skelett (förslag)

Ett litet **Eleventy (11ty) + Sveltia CMS**-skelett som visar hur ägaren skulle
kunna redigera sidan själv utan att röra kod. Detta är **inte** den skarpa sidan –
det är ett fristående förslag att klicka runt i.

## Så funkar det
- Allt **innehåll** ligger som data, inte i HTML:
  - `src/_data/site.json` – texter, telefon, e-post.
  - `src/products/*.md` – en fil per produkt (namn, pris, bild, beskrivning).
- **11ty** bygger den färdiga sidan från en mall (`src/_includes/base.njk` + `src/index.njk`).
- **Sveltia CMS** (`src/admin/`) ger ägaren en inloggad `/admin`-panel med formulär.
  När hen sparar → git-commit → Netlify bygger om sidan automatiskt.

## Kör lokalt

```bash
cd karlstorp-cms-skeleton
npm install
npm start          # bygger + servar på http://localhost:8080
```

Öppna:
- **http://localhost:8080/** – den renderade sidan
- **http://localhost:8080/admin/** – redigeringspanelen

### Redigera lokalt (testa admin på riktigt)
Sveltia kan skriva direkt till filerna på disk via en lokal proxy. I ett andra terminalfönster:

```bash
npx decap-server        # startar proxyn på port 8081
```

Ladda om `/admin/` – nu kan du ändra texter och lägga till produkter, och ändringarna
hamnar i `src/`-filerna. (Kräver `local_backend: true`, redan satt i `config.yml`.)

## Vägen till skarp drift (när du är nöjd)
1. Lägg detta i sidans git-repo (det Netlify bygger från).
2. I `src/admin/config.yml`: avkommentera `backend: github` med rätt `repo`, ta bort `git-gateway`.
3. Sätt upp inloggning (GitHub-OAuth via Netlify eller Sveltias inbyggda).
4. Ägaren loggar in på `https://karlstorps4x4.se/admin/` och redigerar.

Endast 4 exempelprodukter är seedade – resten läggs till via panelen.
