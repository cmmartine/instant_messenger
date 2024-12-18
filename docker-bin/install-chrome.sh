#!/bin/bash
install the latest version of Chrome and the Chrome Driver
apt-get update && apt-get install -y libnss3-dev
# version from https://googlechromelabs.github.io/chrome-for-testing/#stable
version=$(131.0.6778.108)
wget -N http://chromedriver.storage.googleapis.com/${version}/chromedriver_linux64.zip
unzip chromedriver_linux64.zip -d /usr/local/bin
chmod +x /usr/local/bin/chromedriver
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install