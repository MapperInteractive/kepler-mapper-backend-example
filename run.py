import os
from mappercore import KMServer

filename = os.path.join('files', 'SumatranTiger.csv')

# create server instance
server = KMServer("Mapper Example", filename=filename)

# to run the server in production, please use:
#  gunicorn run:server

# and comment out this line
server.flask.run()
