# 🧬 Eris ile bir Discord uygulaması
- Eris (*0.17.2*) ile oluşturulmuş temel düzeyde boş bir altyapıdır. Veritabanı için herhangi bir özellik bulunmamaktadır, bunu kendiniz ekleyebilirsiniz.

# Kurulum
- Gerekli paketleri `pnpm`, `yarn` veya `npm` aracılığıyla yükleyin.
  - `pnpm install`
  - `npm install`
  - `yarn`
- `./src/config.yaml` dosyasını açın ve boş (*girilmeyen*) yerleri doldurun.
- Projeyi ya `test` ya da `stabil` şeklinde başlatın.
  - Test sürümü için: `pnpm test`
  - Stabil sürümü için: `pnpm start`

# Kullanılan Kütüphaneler
- [Eris](https://abal.moe/Eris/) - Discord ile iletişim kurmak için.
- [discord-api-types](https://discord-api-types.dev/) - Discord API tipleri.
- [@discordjs/builders](https://github.com/discordjs/discord.js/tree/main/packages/builders), [@discordjs/collection](https://github.com/discordjs/discord.js/tree/main/packages/collection), [discordjs/rest](https://github.com/discordjs/discord.js/tree/main/packages/rest) - Yardımcı paketler.
- [consola](https://github.com/unjs/consola) - Konsol görünümlerini güzelleştirmek için.
- [js-yaml](https://github.com/nodeca/js-yaml) - `config.yaml` dosyasını yönetmek ve veri çekmek için.
