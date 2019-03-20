from mappercore import Server
# from helpers.func import run_mapper

# create server instance
server = Server("Mapper Example")


# to run the server in production, please use:
#  gunicorn run:server

# and comment out this line
server.flask.run()
