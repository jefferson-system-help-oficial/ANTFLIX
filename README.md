# ANTFLIX Registry

Repositório central de configuração de sites, regras de webview, listas de bloqueio e configurações do aplicativo ANTFLIX.

---

## 🗺️ Roadmap da Estrutura de Pastas (Diretórios)

Para manter o projeto profissional e de fácil escala, organizamos o repositório seguindo o mapa de pastas abaixo:

```text
ANTFLIX/
├── sites/                  # Configurações de origem (Sempre modifique aqui!)
│   ├── metadata.json       # Metadados globais (versão do banco de dados de sites)
│   ├── animes/             # Sites focados em animes
│   │   ├── animexhd.json
│   │   ├── meusanimes.json
│   │   └── ...
│   ├── filmes/             # Sites focados em filmes e séries
│   │   ├── rededecanais.json
│   │   ├── megafilmeseserieshd.json
│   │   └── ...
│   ├── tv/                 # Sites/canais de transmissão de TV (ex: Pluto TV)
│   │   └── ...
│   └── adultos/            # Sites de conteúdo adulto
│       └── ...
├── scripts/                # Scripts utilitários de desenvolvimento
│   └── build.js            # Script que compila as pastas no arquivo unificado
├── package.json            # Definição do projeto e scripts de compilação
├── sites.json              # Arquivo FINAL unificado gerado automaticamente (NÃO EDITAR)
├── blocklist.json          # Regras e domínios de bloqueio de anúncios
├── config.json             # Configurações gerais da aplicação
├── messages.json           # Avisos globais em tempo real
├── protect.json            # Configurações de segurança da interface
└── webview-rules.json      # Políticas e permissões da WebView
```

---

## ⚙️ Explicação da Refatoração

Anteriormente, todos os sites eram listados diretamente dentro de um único e gigante arquivo `sites.json`. Com o crescimento do ANTFLIX, essa abordagem trazia diversos problemas:
1. **Dificuldade de Manutenção:** Arquivos gigantescos facilitam erros de sintaxe (como uma vírgula perdida) que quebravam todo o aplicativo.
2. **Conflitos de Git (Merge Conflicts):** Se dois desenvolvedores adicionassem ou atualizassem sites diferentes ao mesmo tempo, gerava conflitos difíceis de resolver.
3. **Escalabilidade:** Ficava difícil gerenciar categorias separadas visualmente e manter um controle limpo de versões.

### O que mudou?
- **Divisão por Pastas:** Agora, cada site é um arquivo JSON independente (`{id}.json`) dentro de sua categoria correspondente (`animes`, `filmes`, `tv`, `adultos`).
- **Rastreabilidade Dinâmica (`source`):** Durante o processo de build, o compilador automaticamente injeta a propriedade `"source"` em cada site no arquivo compilado, apontando exatamente para o arquivo correspondente na pasta (por exemplo: `"source": "sites/animes/animexhd.json"`). Dessa forma, qualquer pessoa ou sistema consumindo o `sites.json` sabe exatamente onde está o arquivo fonte original para fazer edições.
- **Automatização Inteligente:** Criamos um compilador em `scripts/build.js` que junta tudo perfeitamente. Ele valida se as propriedades obrigatórias existem, ordena de forma estável (primeiro por categoria de exibição, depois por ID em ordem alfabética) e escreve tudo atualizando dinamicamente a data de modificação (`updated`) e a versão global definida em `sites/metadata.json`.

---

## 🛠️ Como Contribuir ou Adicionar Novos Sites

Siga os passos abaixo para adicionar ou atualizar sites:

### 1. Criar ou editar o arquivo do site
Crie ou edite um arquivo JSON dentro da pasta correta de categoria (`sites/animes/`, `sites/filmes/`, `sites/tv/` ou `sites/adultos/`).

O arquivo deve seguir a estrutura padrão de exemplo:
```json
{
  "id": "meusite",
  "name": "Meu Site Favorito",
  "url": "https://meusite.com/",
  "logo": "https://meusite.com/logo.png",
  "enabled": true,
  "category": "Filmes e Séries",
  "status": {
    "online": true,
    "maintenance": false
  },
  "info": {
    "language": "pt-BR",
    "ads": true,
    "loginRequired": false,
    "vpnRequired": false,
    "quality": [
      "HD",
      "FULL HD"
    ]
  },
  "notice": {
    "enabled": false,
    "type": "info",
    "title": "",
    "message": "",
    "priority": "normal",
    "showOnce": false
  },
  "compatibility": {
    "adBlock": "partial",
    "popupBlock": true,
    "cast": true,
    "pictureInPicture": true,
    "download": false
  },
  "settings": {
    "javascript": true,
    "cookies": true,
    "fullscreen": true
  }
}
```

### 2. Atualizar a Versão (Opcional)
Se desejar subir a versão global do registro de sites, edite o arquivo `sites/metadata.json`:
```json
{
  "version": 10.2
}
```

### 3. Compilar a lista final (`sites.json`)
Sempre que fizer alterações nos arquivos individuais das pastas, compile o arquivo final `sites.json` rodando:

```bash
npm run build
```
