# ANTFLIX Registry

Repositório oficial do **ANTFLIX Registry**.

Este repositório funciona como uma **central de distribuição de dados**, contendo todas as configurações remotas utilizadas pelo aplicativo ANTFLIX.

O aplicativo consulta periodicamente este repositório para obter atualizações sem necessidade de publicar uma nova versão.

---

# Objetivo

O Registry permite controlar diversos aspectos do aplicativo de forma remota, como:

* Catálogo de sites
* Configurações gerais
* Mensagens aos usuários
* Atualizações obrigatórias
* Configurações remotas
* Regras da WebView
* Lista de bloqueio de anúncios
* Configurações de segurança
* Alteração de servidores
* Ativação e desativação de funcionalidades

Todo o conteúdo deste repositório é distribuído através de arquivos JSON.

---

# Estrutura do Repositório

```text
ANTFLIX-Registry/
│
├── sites/
│   ├── metadata.json
│   │
│   ├── animes/
│   ├── filmes/
│   ├── series/
│   ├── tv/
│   ├── doramas/
│   ├── desenhos/
│   ├── documentarios/
│   ├── musica/
│   ├── esportes/
│   ├── radios/
│   ├── infantil/
│   ├── adultos/
│   └── outros/
│
├── registry/
│   ├── config.json
│   ├── messages.json
│   ├── remote-config.json
│   ├── blocklist.json
│   ├── protect.json
│   ├── webview-rules.json
│   ├── providers.json
│   ├── servers.json
│   ├── dns.json
│   ├── player.json
│   └── experiments.json
│
├── scripts/
│   └── build.js
│
├── sites.json
├── README.md
└── package.json
```

---

# Descrição dos Arquivos

## sites/

Contém os arquivos de origem de cada site.

Cada site deve possuir seu próprio arquivo JSON.

Exemplo:

```
sites/animes/animexhd.json
```

---

## metadata.json

Define a versão global do banco de sites.

Exemplo:

```json
{
    "version":"10.5.0"
}
```

---

## sites.json

Arquivo compilado automaticamente.

Este é o único arquivo consumido pelo aplicativo.

**Nunca edite este arquivo manualmente.**

---

## registry/config.json

Configurações gerais do aplicativo.

Exemplos:

* timeout
* idioma padrão
* regiões suportadas
* URLs oficiais
* parâmetros globais

---

## registry/messages.json

Mensagens remotas.

Exemplos:

* Avisos
* Notícias
* Beta
* Novidades
* Atualizações
* Promoções
* Informações

---

## registry/remote-config.json

Controle remoto do comportamento do aplicativo.

Exemplos:

* Atualização obrigatória
* Entrar em manutenção
* Desabilitar downloads
* Alterar servidor
* Alterar API
* Alterar CDN
* Limpar cache
* Bloquear versões antigas
* Ativar funcionalidades experimentais

---

## registry/blocklist.json

Lista de domínios utilizados para bloqueio.

Exemplos:

* anúncios
* trackers
* popups
* redirecionamentos
* mineração
* malware

---

## registry/protect.json

Configurações de proteção do aplicativo.

Exemplos:

* Anti Root
* Anti Emulator
* Anti Debug
* Anti Hook
* Anti Tamper
* Verificação de Integridade

---

## registry/webview-rules.json

Define o comportamento da WebView.

Exemplos:

* JavaScript
* Cookies
* Download
* Popup
* Geolocalização
* Picture-in-Picture
* Múltiplas Janelas
* User Agent

---

## registry/providers.json

Lista de provedores de conteúdo.

Permite habilitar ou desabilitar provedores remotamente.

---

## registry/servers.json

Lista de servidores.

Permite:

* adicionar servidores;
* remover servidores;
* alterar prioridade;
* marcar servidores em manutenção.

---

## registry/dns.json

Lista de DNS utilizados pelo aplicativo.

Pode ser alterada remotamente sem atualização do aplicativo.

---

## registry/player.json

Configurações do player.

Exemplos:

* Player padrão
* Buffer
* Codec
* Legendas
* Hardware Decode
* Qualidade padrão

---

## registry/experiments.json

Sistema de funcionalidades experimentais.

Permite ativar recursos para apenas parte dos usuários.

Exemplo:

* Novo player
* Nova interface
* Novo mecanismo de busca

---

# Processo de Build

Todo o conteúdo da pasta **sites/** é compilado automaticamente.

Durante o processo de compilação:

* valida os arquivos;
* verifica IDs duplicados;
* ordena os registros;
* adiciona o campo `source`;
* atualiza a data;
* gera o arquivo `sites.json`.

---

# Como adicionar um novo site

1. Escolha a categoria.

Exemplo:

```
sites/filmes/
```

2. Crie um novo arquivo JSON.

Exemplo:

```
megafilmes.json
```

3. Preencha os dados obrigatórios.

4. Execute:

```bash
npm run build
```

5. Faça o commit.

---

# Importante

* Nunca edite `sites.json` manualmente.
* Sempre modifique os arquivos dentro da pasta `sites/`.
* O aplicativo utiliza apenas os arquivos publicados neste repositório.
* O Registry não contém código do aplicativo. Ele funciona exclusivamente como um repositório de configurações e dados remotos consumidos pelo ANTFLIX.
