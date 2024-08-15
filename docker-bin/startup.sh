#!/bin/bash
set -e

THIS_SCRIPT_DIR=$(dirname $0)

# Set variables for application
# source $THIS_SCRIPT_DIR/env.sh

# Remove postgres server file if it exists
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

exec "$@"