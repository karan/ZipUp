#!/usr/bin/env python

# this script runs the web server
# file must be executable

from app import app

app.run(debug=False)