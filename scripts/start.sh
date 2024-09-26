#!/bin/bash

############################## Util functions ######################################

function setup_env {
    # Check .env file exists and load it
    if [ -z "$CLIENT_PORT" ] || [ -z "$SERVER_PORT" ]; then
        source ../.env 2>/dev/null;
        if [ $? -ne 0 ]; then
            echo ".env file not found" && exit 1;
        fi
    fi

    return 0;
}

################################## Script ##########################################

# Move to script folder
cd "$(dirname "$0")";

# Create folders and check .env file exists
setup_env;



# Start keeper notes app
echo -e "Building keeper notes app...\n" &&
HOST_UID="$(id -u)" HOST_GID="$(id -g)" docker-compose -f ../docker-compose.yml up --build -d --always-recreate-deps --no-deps;



# Wait for frontend to be ready
echo -ne "\nWaiting for client to run ";
while [[ "$(curl -s -o /dev/null -m 3 -L -w ''%{http_code}'' ${CLIENT_URL})" != "200" ]];
    do echo -n "." && sleep 1.33;
done

# Wait for backend to be ready
echo -ne "\nWaiting for server to run ";
while [[ "$(curl -s -o /dev/null -m 3 -L -w ''%{http_code}'' ${SERVER_URL})" != "200" ]];
    do echo -n "." && sleep 1.33;
done




echo -e "\n\nKeeper notes up and running" &&
echo -e "\nKeeper notes client running on $CLIENT_URL" &&
echo -e "Keeper notes server running on $SERVER_URL\n";
