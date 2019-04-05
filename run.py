from sklearn import datasets

from mappercore import Server
from mappercore.conf.kepler_mapper import KeplerMapperConfig

# create kepler mapper config
conf = KeplerMapperConfig()

# create server instance
server = Server("Mapper Example", conf=conf)

# get example data
data, labels = datasets.make_circles(n_samples=5000, noise=0.03, factor=0.3)
projected_data = conf.mapper.fit_transform(data, projection=[0, 1])  # X-Y axis

conf.set_data(data).set_lens(projected_data)

# to run the server, please use:
# gunicorn run:server
