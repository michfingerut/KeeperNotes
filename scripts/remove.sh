#!/bin/bash

# Move to script folder
cd "$(dirname "$0")";

HOST_UID="$(id -u)" HOST_GID="$(id -g)" docker-compose -f ../docker-compose.yml down;

read -p "Do you wish to remove node_modules folder? (y/n) " opn;
    if [ "${opn:-n}" = "y" ]; then
        rm -rf ../server/node_modules;
        rm -rf ../client/node_modules;
    fi
read -p "Do you wish to remove database folder? (requires sudo permissions) (y/n) " opn;
    if [ "${opn:-n}" = "y" ]; then
        sudo rm -rf ../db-dev-data;
    fi

echo -e '\nRemoved KeeperNotes\n';