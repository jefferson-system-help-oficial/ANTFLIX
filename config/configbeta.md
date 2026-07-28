# ANTFLIX Remote Actions Map

## Versão 1.0.0

Este documento define todas as ações remotas utilizadas pelo ANTFLIX.

O aplicativo deve consultar este mapa sempre que receber um JSON do GitHub.

---

# Estrutura

Cada objeto recebido poderá possuir:

```json
{
    "id": 1201,
    "action": "force_update",
    "version": "2.0.0",
    "revision": 1,
    "enabled": true
}
```

Onde:

* **id** → Identificador único da ação.
* **action** → Ação que o aplicativo deverá executar.
* **version** → Versão da ação.
* **revision** → Revisão da ação.
* **enabled** → Se está ativa.

O aplicativo nunca deve depender apenas do ID.

Quem define o comportamento é o campo **action**.

---

# Faixas de IDs

## 1000–1099

Mensagens

```
1000 = message
1001 = welcome
1002 = changelog
1003 = beta_warning
1004 = news
1005 = tips
1006 = survey
1007 = announcement
1008 = information
1009 = custom_message
```

---

## 1100–1199

Avisos

```
1100 = warning
1101 = server_warning
1102 = maintenance_warning
1103 = unstable_server
1104 = high_load
1105 = temporary_problem
1106 = network_issue
1107 = provider_issue
1108 = cache_issue
1109 = compatibility_warning
```

---

## 1200–1299

Atualizações

```
1200 = update

1201 = force_update
1202 = optional_update
1203 = hotfix
1204 = beta_update
1205 = security_update
1206 = rollback_version
1207 = update_finished
1208 = update_available
1209 = update_failed
```

---

## 1300–1399

Manutenção

```
1300 = maintenance

1301 = scheduled
1302 = emergency
1303 = server_restart
1304 = maintenance_finished
1305 = maintenance_extended
1306 = read_only_mode
1307 = service_unavailable
1308 = backend_upgrade
1309 = maintenance_cancelled
```

---

## 1400–1499

Recursos

```
1400 = feature

1401 = new_player
1402 = new_download_engine
1403 = new_provider
1404 = new_search
1405 = new_category
1406 = new_home
1407 = new_ui
1408 = new_theme
1409 = new_login
```

---

## 1500–1599

Segurança

```
1500 = security

1501 = compromised_version
1502 = certificate_expired
1503 = root_detected
1504 = emulator_detected
1505 = integrity_failed
1506 = unauthorized_access
1507 = revoke_token
1508 = revoke_session
1509 = api_key_invalid
```

---

## 1600–1699

Emergência

```
1600 = emergency

1601 = disable_login
1602 = disable_stream
1603 = disable_download
1604 = disable_search
1605 = disable_player
1606 = disable_history
1607 = disable_favorites
1608 = disable_sync
1609 = emergency_shutdown
```

---

## 1700–1799

Configuração Remota

```
1700 = remote_config

1701 = change_api
1702 = change_server
1703 = change_cdn
1704 = clear_cache
1705 = clear_images
1706 = clear_database
1707 = refresh_config
1708 = reload_providers
1709 = reset_settings
```

---

## 1800–1899

Streaming

```
1800 = stream

1801 = disable_provider
1802 = enable_provider
1803 = provider_priority
1804 = player_priority
1805 = disable_subtitles
1806 = enable_subtitles
1807 = force_external_player
1808 = force_internal_player
1809 = stream_redirect
```

---

## 1900–1999

Download

```
1900 = download

1901 = disable_downloads
1902 = enable_downloads
1903 = download_limit
1904 = download_speed_limit
1905 = clear_downloads
1906 = migrate_downloads
1907 = force_redownload
1908 = pause_downloads
1909 = resume_downloads
```

---

## 2000–2099

Publicidade

```
2000 = ads

2001 = disable_ads
2002 = enable_ads
2003 = update_filters
2004 = update_dns
2005 = update_blocklist
2006 = reload_filters
2007 = anti_popup_update
2008 = anti_tracker_update
2009 = anti_banner_update
```

---

## 2100–2199

Servidor

```
2100 = server

2101 = change_domain
2102 = change_dns
2103 = add_server
2104 = remove_server
2105 = disable_server
2106 = enable_server
2107 = priority_server
2108 = backup_server
2109 = restore_server
```

---

## 2200–2299

Conta

```
2200 = account

2201 = logout
2202 = force_logout
2203 = token_expired
2204 = session_expired
2205 = login_required
2206 = account_banned
2207 = account_restored
2208 = password_reset
2209 = email_verification
```

---

## 2300–2399

Banco de Dados

```
2300 = database

2301 = migrate_database
2302 = optimize_database
2303 = vacuum_database
2304 = clear_database
2305 = restore_database
2306 = rebuild_indexes
2307 = verify_database
2308 = repair_database
2309 = backup_database
```

---

# Ações reconhecidas pelo aplicativo

```
show_message
show_popup
show_dialog
show_banner

force_update
optional_update
hotfix

maintenance_mode
maintenance_finished

change_api
change_server
change_cdn

clear_cache
clear_database
clear_images
clear_downloads

reload_providers
reload_player
reload_config

disable_login
disable_stream
disable_download
disable_player
disable_search
disable_history
disable_favorites

logout
force_logout

disable_provider
enable_provider

update_filters
update_dns
update_blocklist

change_domain

restart_app

close_app

emergency_shutdown
```

---

# Fluxo recomendado

1. O aplicativo inicia.
2. Baixa o JSON do GitHub.
3. Verifica se o arquivo mudou.
4. Analisa cada objeto.
5. Verifica se está habilitado (`enabled`).
6. Compara a revisão (`revision`).
7. Executa a ação (`action`).
8. Salva a nova revisão localmente.

---

# Exemplo

```json
{
    "id":1201,
    "action":"force_update",
    "version":"2.0.0",
    "revision":3,

    "params":{
        "minimumVersion":"2.5.0",
        "storeUrl":"https://github.com/jefferson-system-help-oficial/ANTFLIX/releases"
    }
}
```

Resultado:

* O aplicativo verifica sua versão instalada.
* Se for inferior à versão mínima exigida, bloqueia o acesso.
* Exibe somente a tela de atualização.
* Após instalar a versão mais recente, o acesso é liberado automaticamente.

---

# Objetivo

Este mapa centraliza todas as ações remotas do ANTFLIX, permitindo controlar funcionalidades, servidores, manutenção, segurança e atualizações diretamente pelo GitHub, sem necessidade de publicar uma nova versão do aplicativo para cada alteração de comportamento.
