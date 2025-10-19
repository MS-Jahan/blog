---
layout: post
current: post
navigation: True
title: Fixing WinBoat host.lan Permission Issues - Complete Investigation and Solution
date: 2025-10-20 01:58:00
tags: [linux, docker, winboat, samba, networking, troubleshooting]
class: post-template
subclass: 'post'
---

If you're running Windows inside WinBoat on Linux and struggling to access or write to the `\\host.lan\Data` network share, this comprehensive guide will walk you through the exact steps to fix it.

## Quick Fix (TL;DR)

**Total time: ~4 minutes**

### Step 1: Create Secure Shared Directory

```bash
# Create dedicated shared folder
mkdir -p ~/shared
chmod 777 ~/shared

# Stop WinBoat
cd ~/.winboat
docker-compose down

# Edit docker-compose.yml
nano docker-compose.yml
```

Find `"${HOME}:/shared"` and change it to:
```yaml
- "${HOME}/shared:/shared"
```

```bash
# Restart WinBoat
docker-compose up -d
```

### Step 2: Stop Conflicting Samba

```bash
sudo systemctl stop smb
sudo systemctl disable smb
```

### Step 3: Fix Write Permissions

```bash
# Get container ID
CONTAINER_ID=$(docker ps | grep WinBoat | awk '{print $1}')

# Update Samba config
docker exec $CONTAINER_ID sh -c "cat > /etc/samba/smb.conf << 'EOF'
[global]
    server string = Dockur
    netbios name = host.lan
    workgroup = WORKGROUP
    interfaces = dockerbridge
    bind interfaces only = yes
    security = user
    guest account = nobody
    map to guest = Bad User
    server min protocol = NT1
    follow symlinks = yes
    wide links = yes
    unix extensions = no
    log level = 3
    load printers = no
    printing = bsd
    printcap name = /dev/null
    disable spoolss = yes

[Data]
    path = /shared
    comment = Shared
    writable = yes
    browseable = yes
    guest ok = yes
    public = yes
    read only = no
    create mask = 0777
    directory mask = 0777
    force create mode = 0666
    force directory mode = 0777
EOF"

# Restart Samba
docker exec $CONTAINER_ID killall smbd
```

### Step 4: Test from Windows

```cmd
net use \\host.lan /delete
net use \\host.lan
echo test > \\host.lan\Data\test.txt
dir \\host.lan\Data
```

✅ Done! You should now have full read/write access.

---

## The Problem

When trying to access `\\host.lan\Data` from Windows inside WinBoat, users encounter:

```
Windows cannot access \\host.lan\Data
You do not have permission to access \\host.lan\Data.
```

Even when the share is visible, writing files fails with "Access is denied."

## Root Causes

After extensive investigation, three main issues were identified:

### 1. Insecure Home Directory Mount

**Problem:** WinBoat's default configuration mounts your entire home directory:
```yaml
- "${HOME}:/shared"
```

This exposes sensitive files (.ssh keys, browser data, etc.) and had permission issues (700 permissions blocking container access).

**Solution:** Use a dedicated shared directory instead:
```yaml
- "${HOME}/shared:/shared"
```

### 2. Conflicting Samba Servers

**Problem:** Two Samba servers running simultaneously:
- Host systemd Samba service
- WinBoat's container Samba

This caused routing confusion and AppArmor security blocks.

**Solution:** Disable the host Samba service - WinBoat has its own built-in Samba server.

### 3. Samba Permission Configuration

**Problem:** The Samba configuration used `force user = root` + `guest only = yes`, which failed to properly map guest users to root, blocking write operations.

**Solution:** Remove forced user mapping and set proper file creation masks to allow the guest (nobody) user to write files.

## Network Architecture

Understanding how WinBoat networking works:

```
Linux Host (192.168.0.186)
    ↓
Docker Bridge (172.22.0.1) ← WinBoat Container (172.22.0.2)
    ↓                            ↓
    ↓                      Internal Bridge (20.20.20.1) - Samba Server
    ↓                            ↓
    └────────[NAT/Routing]─→ Windows Guest (20.20.20.21)
```

- Windows resolves `host.lan` to `20.20.20.1` (WinBoat's internal bridge)
- Traffic gets NATed through the container to reach your Linux host
- Samba serves files from the `/shared` mount point

## Key Technical Insights

### AppArmor and Docker Containers

**Important:** AppArmor on the host does NOT apply to processes inside Docker containers. The AppArmor denials observed were from the host Samba service, not WinBoat's containerized Samba.

### Samba Force User Directive

The combination of `force user = root`, `force group = root`, and `guest only = yes` doesn't work as expected. Samba fails to properly map guest connections to root in this configuration, blocking write operations even though the config claims to allow them.

**Better approach:** Let the guest user (nobody) write files directly with appropriate create masks:
- `create mask = 0777` - Files are writable by all
- `force create mode = 0666` - Forces specific file permissions
- `directory mask = 0777` - Directories are writable by all
- `force directory mode = 0777` - Forces specific directory permissions

### File Creation Masks Matter

Default Samba `create mask = 0744` makes files read-only for group/others. For shared storage accessible by Windows guests, use `0777` masks with forced modes to ensure write access.

## Security Considerations

### Before (Insecure)
```yaml
volumes:
  - "${HOME}:/shared"  # Exposes entire home directory!
```

**Risks:**
- SSH keys accessible
- Browser history/cookies exposed
- GPG keys accessible
- All personal files readable

### After (Secure)
```yaml
volumes:
  - "${HOME}/shared:/shared"  # Only exposes ~/shared
```

**Benefits:**
- Home directory stays private (700 permissions)
- Only intended files are shared
- Easy to audit what's exposed
- Follows principle of least privilege

## Usage

### Share Files from Linux to Windows

```bash
# Copy files to shared directory
cp ~/Documents/myfile.pdf ~/shared/

# Create subdirectories
mkdir -p ~/shared/projects
cp -r ~/work/myproject ~/shared/projects/
```

Files appear instantly in Windows at `\\host.lan\Data\`

### Share Files from Windows to Linux

```cmd
rem Copy file
copy C:\Users\sjs\Desktop\file.txt \\host.lan\Data\

rem Copy directory
xcopy C:\Documents\project \\host.lan\Data\project\ /E /I
```

Access from Linux at `/home/YOUR_USERNAME/shared/`

### Map as Network Drive

For convenience, map it as a drive letter in Windows:

```cmd
net use Z: \\host.lan\Data /persistent:yes
```

Now accessible as `Z:` drive in File Explorer.

## Troubleshooting

### Share Becomes Inaccessible After Reboot

```bash
# Restart WinBoat
cd ~/.winboat
docker-compose restart

# Or restart just Samba
docker exec $(docker ps | grep WinBoat | awk '{print $1}') killall smbd
```

### Samba Config Lost After Container Recreate

The Samba configuration changes are lost when the container is recreated. To persist them:

1. Save the Samba config to your host:
```bash
cat > ~/.winboat/custom-smb.conf << 'EOF'
[global]
    # ... (full config here)
EOF
```

2. Mount it in `docker-compose.yml`:
```yaml
volumes:
  - "./custom-smb.conf:/etc/samba/smb.conf:ro"
```

### Check Current Samba Configuration

```bash
CONTAINER_ID=$(docker ps | grep WinBoat | awk '{print $1}')
docker exec $CONTAINER_ID testparm -s
```

Verify these settings in the `[Data]` section:
- `read only = No`
- `writable = yes`
- `create mask = 0777`
- `directory mask = 0777`

## Investigation Tools Used

For those interested in troubleshooting similar issues:

```bash
# Network inspection
docker inspect <container> --format '{{json .Mounts}}'
docker exec <container> ip addr show
ss -tlnp | grep 445  # Check SMB ports

# Samba debugging
docker exec <container> testparm -s
docker exec <container> smbstatus
docker logs <container>

# Permission checking
stat /path/to/directory
getfacl /path/to/directory
dmesg | grep apparmor  # Check for security blocks

# Container processes
docker exec <container> ps aux | grep smbd
```

## Conclusion

WinBoat provides excellent Windows-in-Docker functionality, but the default file sharing configuration has security and permission issues. By:

1. Using a dedicated shared directory instead of mounting your entire home
2. Disabling conflicting host Samba services
3. Properly configuring Samba file creation masks

You get secure, fully functional bidirectional file sharing between your Linux host and Windows guest.

**Total investigation time:** ~4 hours
**Time to fix once you know the solution:** ~4 minutes

---

**Related Issues:**
- [WinBoat #362: Host.lan inaccessible](https://github.com/TibixDev/winboat/issues/362)
- [dockur/windows #782: Cannot access \\host.lan](https://github.com/dockur/windows/issues/782)

_All commands tested on Manjaro Linux (Kernel 6.16.8) with WinBoat 5.03 running Windows 11 Pro._

_I've put Claude Code to investigate the issue, fix it, and write this detailed blog post. ^__^_
