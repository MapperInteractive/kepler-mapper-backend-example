from mappercore import Server
from helpers.func import run_mapper

# create server instance
server = Server("Mapper Example")

# register your backend function here
server.register_function('run_mapper', run_mapper)

# to run the server, please use:
#  gunicorn run:server
