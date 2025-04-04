#!/bin/bash
#
#  The Watcher of the Sigil
#  - It watches the sacred signal (pending-deployment) like a raven on a spire.
#  - It moves swiftly when called, but only when no other force is acting.
#  - It never forgets, never panics, never sleeps (except for 2 seconds at a time).
#

DEPLOYSIGNAL_FILE="/home/deploybot/cbrf-turbulentarius/pending-deployment"
APP_DIR="/home/exolord/contained/cbrf-turbulentarius/"
LOCKFILE="/var/lock/cbrf-deployer.lock"

echo "[INFO] cbrf-turbulentarius-deployer.sh has started"

cd "$APP_DIR" || exit 1

while true; do
  if [ -f "$DEPLOYSIGNAL_FILE" ]; then

    # Open lock file, assign it to file descriptor 200
    exec 200>"$LOCKFILE"
    # Try to acquire a non-blocking exclusive lock on FD 200 (i.e. the lockfile we just opened)
    if flock -n 200; then
      echo "[INFO] Lock acquired. Deploying..."

      rm -f "$DEPLOYSIGNAL_FILE"

      (
        shopt -s dotglob
        mv "/home/deploybot/cbrf-turbulentarius/"* "$APP_DIR/host-www"
      )

      sudo -u exolord docker compose down && \
      sudo -u exolord docker compose build && \
      sudo -u exolord docker compose up -d && \

      echo "[INFO] Deployment complete."
    else
      echo "[WARN] Another deployment is already running. Skipping."
    fi
  fi

  sleep 2
done