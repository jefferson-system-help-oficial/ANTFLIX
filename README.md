# ANTFLIX Registry

Repositório central de configuração de sites, regras de webview, listas de bloqueio e configurações do aplicativo ANTFLIX.

---

## 📂 Estrutura de Pastas

Para manter o projeto organizado, profissional e fácil de dar manutenção, dividimos a lista de sites em arquivos individuais:

- `sites/` - Diretório contendo as configurações de cada site individualmente e metadados globais.
  - `metadata.json` - Guarda a versão global (`version`).
  - `{id}.json` - Arquivo de configuração de cada site (ex: `animexhd.json`, `rededecanais.json`).
- `scripts/` - Scripts auxiliares de compilação.
  - `build.js` - Script Node.js que valida, ordena de forma estável (por categoria e ID) e compila todos os arquivos de sites individuais em um único `sites.json` unificado na raiz do repositório.
- `sites.json` - O arquivo compilado gerado automaticamente pelo script. **(Não edite este arquivo diretamente)**
- `blocklist.json` - Lista de bloqueio de anúncios, popups e rastreadores.
- `config.json` - Configurações gerais do app.
- `messages.json` - Sistema de mensagens e avisos dinâmicos.
- `protect.json` - Recursos de proteção de interface e segurança do app.
- `webview-rules.json` - Regras de execução e segurança da WebView.

---

## 🛠️ Como Contribuir ou Adicionar Novos Sites

Siga os passos abaixo para adicionar ou atualizar sites de forma profissional:

### 1. Criar ou editar o arquivo do site
Crie um arquivo JSON dentro da pasta `sites/` com o nome do ID do site. Por exemplo, `sites/meusite.json`.

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
Sempre que fizer alterações nos arquivos individuais da pasta `sites/`, você deve compilar o arquivo unificado `sites.json` rodando o seguinte comando no terminal:

```bash
# Instalar dependências (caso existam futuramente) e rodar o build
npm run build
```

O script de compilação irá:
1. Validar se os campos obrigatórios estão presentes em cada arquivo de site.
2. Ordenar os sites de forma estável por categoria e ordem alfabética de ID.
3. Atualizar a propriedade `updated` com a data atual (ano-mês-dia).
4. Gerar o arquivo final `sites.json` de forma limpa e otimizada.
