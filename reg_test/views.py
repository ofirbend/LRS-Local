'''
jay test.
'''
from flask import Blueprint, render_template, request
from . import blueprint
import logging
from lrs_app import getLrsLogger
import json as JSON

import os

sub_menu_apps = ['Fleet_Overview', 'Entity_Breakdown', 'Entity_Statistics' , 'Weekly_Breakdown', 'Wafer_Swap_Time'] 

blueprint = Blueprint('reg_test',__name__, template_folder='templates', static_folder='static')
lgr = getLrsLogger(loggerName=__name__, level=logging.DEBUG)
dirname = os.path.dirname(__file__)

hide_in_index = False

@blueprint.route('/')
def regLandingPage():
    return render_template('basic.html')


@blueprint.route('/LFU_Report', methods=["POST","GET"])
def LFU_Report():

    header = ['WW',	'FAB',	'WEIGHTED_LFU',	'OUTS']

    table = [
                ['ASML', 'Wet', '202313', 'F28', 0.794, 2308.36],
                ['ASML', 'Wet', '202313', 'F32', 0.688, 2056.85],
                ['ASML', 'Wet', '202314', 'F28', 0.795, 2381.41],
                ['ASML', 'Wet', '202314', 'F32', 0.698, 1757.46],
                ['ASML', 'Wet', '202315', 'F28', 0.799, 2210.2],
                ['ASML', 'Wet', '202315', 'F32', 0.694, 1992.65],
                ['ASML', 'Wet', '202316', 'F28', 0.824, 1877.85],
                ['ASML', 'Wet', '202316', 'F32', 0.689, 2272.61],
                ['ASML', 'Wet', '202317', 'F28', 0.835, 1641.22],
                ['ASML', 'Wet', '202317', 'F32', 0.688, 1915.91]
            ]

    #y-axsis
    #data = [row[2] for row in table]

    #x-axsis
    #categories = [row[0] for row in table]
    
    #print(data)
    #print(categories)


    return render_template('LFU_Report.html', page_name = 'LFU_Report' , table = table)


@blueprint.route('/Fleet_Overview')
def Fleet_Overview():
    # show the form, it wasn't submitted
    return render_template('Fleet_Overview.html', page_name = 'Fleet_Overview', sub_menu_apps = sub_menu_apps)


@blueprint.route('/Entity_Breakdown')
def Entity_Breakdown():
    # show the form, it wasn't submitted
    return render_template('Entity_Breakdown.html', page_name = 'Entity_Breakdown', sub_menu_apps = sub_menu_apps)


@blueprint.route('/Entity_Statistics')
def Entity_Statistics():
    # show the form, it wasn't submitted
    return render_template('Entity_Statistics.html' , page_name = 'Entity_Statistics', sub_menu_apps = sub_menu_apps)


@blueprint.route('/Weekly_Breakdown')
def Weekly_Breakdown():
    # show the form, it wasn't submitted
    return render_template('Weekly_Breakdown.html', page_name = 'Weekly_Breakdown', sub_menu_apps = sub_menu_apps)


@blueprint.route('/Wafer_Swap_Time')
def Wafer_Swap_Time():
    # show the form, it wasn't submitted
    return render_template('Wafer_Swap_Time.html' ,page_name = 'Wafer_Swap_Time', sub_menu_apps = sub_menu_apps)


@blueprint.route('/SAU_Tactic_Dispatch')
def SAU_Tactic_Dispatch():

    # show the form, it wasn't submitted
    return render_template('SAU_Tactic_Dispatch.html', page_name = 'SAU_Tactic_Dispatch', sub_menu_apps = sub_menu_apps)


@blueprint.route('/Tactic_Dispatch_193BE')
def Tactic_Dispatch_193BE():

    # show the form, it wasn't submitted
    return render_template('193BE_Tactic_Dispatch.html' , page_name = '193BE_Tactic_Dispatch', sub_menu_apps = sub_menu_apps)


@blueprint.route('/Reg_Tactic_Dispatch')
def Reg_Tactic_Dispatch():

    # show the form, it wasn't submitted
    return render_template('Reg_Tactic_Dispatch.html' ,page_name = 'Reg_Tactic_Dispatch', sub_menu_apps = sub_menu_apps)
