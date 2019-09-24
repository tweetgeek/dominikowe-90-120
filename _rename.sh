#!/usr/bin/env bash

for entry in images/*.jpg; do
  n="${entry//[[:space:]]/}"
  n="${n//,/}"

  echo "mv \"$entry\" \"$n\";"
done
