---
title: homelab
summary: you either die a SWE or live long enough to become a hobbyist sys admin
order: 3
link:
  [
    {
      name: Github,
      url: https://github.com/SimHoZebs/home-server,
      icon: "icon-[mdi--github]",
    }
  ]
---
Multi-node home server infrastructure distributed across debian-server (primary) and rbpi (Raspberry Pi). Uses Docker containerization, NGINX reverse proxy, Tailscale mesh networking, and DuckDNS dynamic DNS.

## System Architecture Diagram

![[home server mermaid.png]]

## Infrastructure Components
- **debian-server**: Primary server; configuration present in `debian-server/` directory. NVIDIA GPU for hardware acceleration.
- **rbpi**: Raspberry Pi; configuration present in `rbpi/` directory. Home automation and remote access services.

## Service Inventory

| Service            | Host Device     | Public Address/Internal Port     | Purpose                                               |
| :----------------- | :-------------- | :------------------------------- | :---------------------------------------------------- |
| **Jellyfin**       | `debian-server` | `simtyler.duckdns.org/jellyfin/` | GPU-accelerated media server                          |
| **Immich**         | `debian-server` | `simpics.duckdns.org`            | GPU-accelerated photo/video management                |
| **Umami**          | `debian-server` | `sim-analytics.duckdns.org`      | Web analytics platform                                |
| **Seafile**        | `debian-server` | Internal/`8585`                  | File sync/backup                                      |
| **Ollama**         | `debian-server` | Internal/`11434`                 | GPU-accelerated LLM inference                         |
| **Streamer**       | `debian-server` | Internal/`9998`                  | GPU-accelerated SRT to RTMP relay to YouTube & Twitch |
| **Certbot**        | `rbpi`          | Internal                         | SSL/TLS certificate management                        |
| **Home Assistant** | `rbpi`          | Internal                         | Home automation                                       |
| **RustDesk**       | `rbpi`          | Internal                         | Remote desktop                                        |
| **OwnTracks**      | `rbpi`          | Internal/8083                    | Location tracking                                     |
| **Mosquitto**      | `rbpi`          | Internal                         | MQTT broker for messaging                             |
| **Fail2ban**       | `rbpi`          | Internal                         | SSH/NGINX brute force protection                      |
## Network Architecture
- **Tailscale**: WireGuard-based mesh VPN providing secure inter-device communication
- **DuckDNS**: Dynamic DNS service for stable domain resolution to changing home IP
- **NGINX**: Reverse proxy with SSL termination and traffic routing
- **Let's Encrypt & Certbot**: Automated SSL/TLS certificate management via Certbot

## debian-server

### Seafile
Seafile service is configured with privileged access and SYS_ADMIN capability for FUSE mounting. Enables direct file access for services like Immich without API overhead.

### Ollama
| Model          | Size   | Classification | Use Case                   |
| -------------- | ------ | -------------- | -------------------------- |
| qwen3:1.7b     | 1.4 GB | Speed          | Low-latency inference      |
| qwen3:4b       | 2.6 GB | General        | Balanced performance       |
| gemma3:4b      | 3.3 GB | Multimodal     | Text and vision processing |
| qwen3:latest   | 5.2 GB | Intelligence   | Complex reasoning          |
| deepseek-r1:8b | 5.2 GB | Intelligence   | Complex reasoning          |

### Streamer
Expects HEVC video and AAC audio
