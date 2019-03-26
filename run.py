from os import path

from mappercore import Server
from mappercore.conf.kepler_mapper import KeplerMapperConfig
from sklearn import datasets
import numpy as np

import pandas as pd

# create server instance
server = Server("Mapper Example")

# create kepler mapper config
kepler_config = KeplerMapperConfig()

# get example data
data = datasets.make_circles(n_samples=1000)[0]
target = kepler_config.mapper.project(data)

kepler_config.set_data(data)
kepler_config.set_target(target)
kepler_config.setup(server)

# to run the server, please use:
#  gunicorn run:server
