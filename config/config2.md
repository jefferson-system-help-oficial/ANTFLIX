A**ANTFLIX Remote Actions Map (Versão 2.0.0 Expandida)**  `.txt`.

---

```
============================================================
                ANTFLIX REMOTE ACTIONS MAP
                       Versão 2.0.0
              (Catálogo Expandido e Completo)
============================================================

Este documento define TODAS as ações remotas utilizadas pelo ANTFLIX.
O aplicativo deve consultar este mapa sempre que receber um JSON do GitHub.

------------------------------------------------------------
ESTRUTURA DO OBJETO JSON
------------------------------------------------------------

Cada objeto recebido poderá possuir a seguinte estrutura:

{
    "id": 1201,
    "action": "force_update",
    "version": "2.0.0",
    "revision": 1,
    "enabled": true,
    "params": { ... }  // Campo opcional para parâmetros extras
}

Onde:
- id          -> Identificador único da ação.
- action      -> Ação que o aplicativo deverá executar (string).
- version     -> Versão da ação (para controle semântico).
- revision    -> Número da revisão (para evitar repetições).
- enabled     -> Booleano que indica se a ação está ativa.
- params      -> Objeto opcional com dados adicionais (ex: URLs, limites, etc.).

IMPORTANTE: O aplicativo NUNCA deve depender apenas do ID. Quem define o comportamento é o campo "action".

------------------------------------------------------------
FAIXAS DE IDs E AÇÕES (1000 a 3999)
------------------------------------------------------------

============================================================
1000 a 1099 - MENSAGENS
============================================================
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

============================================================
1100 a 1199 - AVISOS
============================================================
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

============================================================
1200 a 1299 - ATUALIZAÇÕES
============================================================
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

============================================================
1300 a 1399 - MANUTENÇÃO
============================================================
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

============================================================
1400 a 1499 - RECURSOS (FEATURES)
============================================================
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

============================================================
1500 a 1599 - SEGURANÇA
============================================================
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

============================================================
1600 a 1699 - EMERGÊNCIA
============================================================
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

============================================================
1700 a 1799 - CONFIGURAÇÃO REMOTA
============================================================
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

============================================================
1800 a 1899 - STREAMING
============================================================
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

============================================================
1900 a 1999 - DOWNLOAD
============================================================
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

============================================================
2000 a 2099 - PUBLICIDADE (ADS)
============================================================
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

============================================================
2100 a 2199 - SERVIDOR
============================================================
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

============================================================
2200 a 2299 - CONTA
============================================================
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

============================================================
2300 a 2399 - BANCO DE DADOS
============================================================
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

============================================================
2400 a 2499 - ANÁLISE E ESTATÍSTICAS (NOVO)
============================================================
2400 = analytics
2401 = send_analytics
2402 = enable_analytics
2403 = disable_analytics
2404 = reset_analytics
2405 = export_analytics
2406 = crash_reporting
2407 = enable_crash_reporting
2408 = disable_crash_reporting
2409 = performance_monitoring

============================================================
2500 a 2599 - NOTIFICAÇÕES PUSH (NOVO)
============================================================
2500 = push_notification
2501 = register_push
2502 = unregister_push
2503 = update_push_token
2504 = enable_push
2505 = disable_push
2506 = clear_push_history
2507 = send_test_push
2508 = push_channel_update
2509 = push_sound_update

============================================================
2600 a 2699 - PREFERÊNCIAS DO USUÁRIO (NOVO)
============================================================
2600 = user_preferences
2601 = set_language
2602 = set_region
2603 = set_timezone
2604 = set_theme
2605 = set_font_size
2606 = set_notification_prefs
2607 = reset_preferences
2608 = export_preferences
2609 = import_preferences

============================================================
2700 a 2799 - INTEGRAÇÃO COM REDES SOCIAIS (NOVO)
============================================================
2700 = social_integration
2701 = enable_facebook
2702 = disable_facebook
2703 = enable_google
2704 = disable_google
2705 = enable_twitter
2706 = disable_twitter
2707 = sync_social_friends
2708 = share_on_social
2709 = social_login_required

============================================================
2800 a 2899 - PLAYER AVANÇADO (NOVO)
============================================================
2800 = advanced_player
2801 = set_video_quality
2802 = set_audio_bitrate
2803 = set_codec_preference
2804 = enable_hdr
2805 = disable_hdr
2806 = enable_dolby_vision
2807 = disable_dolby_vision
2808 = set_buffer_size
2809 = force_software_decoding

============================================================
2900 a 2999 - LEGENDAS E ÁUDIO (NOVO)
============================================================
2900 = captions_audio
2901 = set_default_language
2902 = enable_cc
2903 = disable_cc
2904 = set_cc_style
2905 = enable_audio_description
2906 = disable_audio_description
2907 = set_audio_track
2908 = download_subtitles
2909 = upload_subtitles

============================================================
3000 a 3099 - LISTAS DE REPRODUÇÃO (NOVO)
============================================================
3000 = playlists
3001 = create_playlist
3002 = delete_playlist
3003 = add_to_playlist
3004 = remove_from_playlist
3005 = reorder_playlist
3006 = set_playlist_visibility
3007 = sync_playlists
3008 = import_playlist
3009 = export_playlist

============================================================
3100 a 3199 - COMPARTILHAMENTO (NOVO)
============================================================
3100 = sharing
3101 = share_content
3102 = enable_sharing
3103 = disable_sharing
3104 = set_share_message
3105 = set_share_image
3106 = generate_share_link
3107 = revoke_share_link
3108 = share_to_watchparty
3109 = share_to_social

============================================================
3200 a 3299 - CONTROLE PARENTAL (NOVO)
============================================================
3200 = parental_control
3201 = enable_parental_lock
3202 = disable_parental_lock
3203 = set_parental_pin
3204 = reset_parental_pin
3205 = set_age_rating
3206 = block_category
3207 = unblock_category
3208 = set_viewing_hours
3209 = enable_kids_mode

============================================================
3300 a 3399 - EXPERIÊNCIA OFFLINE (NOVO)
============================================================
3300 = offline_experience
3301 = enable_offline_mode
3302 = disable_offline_mode
3303 = download_for_offline
3304 = remove_offline_content
3305 = set_offline_quality
3306 = auto_download_offline
3307 = sync_offline_progress
3308 = clear_offline_cache
3309 = offline_license_renewal

============================================================
3400 a 3499 - TEMAS E APARÊNCIA (NOVO)
============================================================
3400 = themes_appearance
3401 = set_dark_mode
3402 = set_light_mode
3403 = set_system_theme
3404 = set_accent_color
3405 = set_custom_background
3406 = enable_animations
3407 = disable_animations
3408 = reset_appearance
3409 = apply_custom_css

============================================================
3500 a 3599 - COMPORTAMENTO DE INICIALIZAÇÃO (NOVO)
============================================================
3500 = startup_behavior
3501 = set_launch_screen
3502 = enable_auto_play
3503 = disable_auto_play
3504 = set_default_tab
3505 = show_onboarding
3506 = skip_onboarding
3507 = enable_splash_screen
3508 = disable_splash_screen
3509 = set_startup_action

============================================================
3600 a 3699 - BACKUP E RESTAURAÇÃO (NOVO)
============================================================
3600 = backup_restore
3601 = create_backup
3602 = restore_backup
3603 = schedule_backup
3604 = delete_backup
3605 = verify_backup
3606 = export_backup
3607 = import_backup
3608 = backup_encryption
3609 = restore_encryption

============================================================
3700 a 3799 - GERENCIAMENTO DE DISPOSITIVOS (NOVO)
============================================================
3700 = device_management
3701 = list_devices
3702 = revoke_device
3703 = set_device_name
3704 = enable_device_sync
3705 = disable_device_sync
3706 = set_device_limit
3707 = add_trusted_device
3708 = remove_trusted_device
3709 = device_verification

============================================================
3800 a 3899 - CONTEÚDO EXCLUSIVO (NOVO)
============================================================
3800 = exclusive_content
3801 = unlock_exclusive
3802 = lock_exclusive
3803 = set_exclusive_visibility
3804 = notify_exclusive_available
3805 = early_access
3806 = beta_content
3807 = preview_content
3808 = content_teaser
3809 = exclusive_expiration

============================================================
3900 a 3999 - MONETIZAÇÃO E ASSINATURAS (NOVO)
============================================================
3900 = monetization
3901 = show_subscription_plans
3902 = activate_subscription
3903 = cancel_subscription
3904 = renew_subscription
3905 = apply_promo_code
3906 = check_payment_status
3907 = show_ad_free
3908 = enable_trial
3909 = subscription_expired

------------------------------------------------------------
LISTA DE AÇÕES RECONHECIDAS PELO APLICATIVO
------------------------------------------------------------

O aplicativo deve ser capaz de interpretar e executar as seguintes ações
(esta lista é a união de todas as ações mapeadas acima, além das ações
genéricas de sistema):

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

E todas as novas ações listadas nas faixas de 2400 a 3999.

------------------------------------------------------------
FLUXO RECOMENDADO PARA O APLICATIVO
------------------------------------------------------------

1. O aplicativo inicia (ou é ativado por um evento periódico).
2. Baixa o arquivo JSON do GitHub (ou de um CDN confiável).
3. Verifica se o arquivo mudou (comparando hash ou data/hora).
4. Analisa cada objeto presente no JSON.
5. Verifica se a ação está habilitada (enabled == true).
6. Compara a revisão (revision) com a última salva localmente.
   Se a revisão for maior, executa a ação; caso contrário, ignora.
7. Executa a ação correspondente (com base no campo "action").
8. Salva a nova revisão localmente para evitar repetições.
9. Em caso de ação com "params", utiliza os dados fornecidos para
   personalizar o comportamento (ex: URL de download, limite, etc.).

------------------------------------------------------------
EXEMPLO COMPLETO DE JSON
------------------------------------------------------------

{
    "id": 1201,
    "action": "force_update",
    "version": "2.0.0",
    "revision": 3,
    "enabled": true,
    "params": {
        "minimumVersion": "2.5.0",
        "storeUrl": "https://github.com/jefferson-system-help-oficial/ANTFLIX/releases",
        "message": "Nova versão obrigatória disponível!"
    }
}

Resultado esperado no aplicativo:
- O aplicativo verifica sua versão instalada.
- Se for inferior à versão mínima exigida (2.5.0), bloqueia o acesso.
- Exibe somente a tela de atualização com a mensagem fornecida.
- Após instalar a versão mais recente, o acesso é liberado automaticamente.

------------------------------------------------------------
OBJETIVO FINAL DO MAPA
------------------------------------------------------------

Este mapa centraliza TODAS as ações remotas do ANTFLIX, permitindo
controlar funcionalidades, servidores, manutenção, segurança,
atualizações, preferências, mídia, integrações e muito mais,
diretamente pelo GitHub, sem necessidade de publicar uma nova versão
do aplicativo para cada alteração de comportamento.

------------------------------------------------------------
FIM DO DOCUMENTO
------------------------------------------------------------
```
