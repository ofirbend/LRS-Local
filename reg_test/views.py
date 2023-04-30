'''
Reporting for Utilization Charts.
'''
from flask import Blueprint, render_template
from . import blueprint
import logging
from lrs_app import getLrsLogger
import json as JSON

import os


blueprint = Blueprint('reg_test',__name__, template_folder='templates', static_folder='static')
lgr = getLrsLogger(loggerName=__name__, level=logging.DEBUG)
dirname = os.path.dirname(__file__)

hide_in_index = False

@blueprint.route('/')
def regLandingPage():

    return render_template('basic.html')
