import urllib
from urllib.request import urlopen, Request

stream_url = 'http:/localhost:8000/barmaglot'
request = Request(stream_url)
try:
    request.add_header('Icy-MetaData', 1)
    response = urlopen(request)
    icy_metaint_header = response.headers.get('icy-metaint')
    if icy_metaint_header is not None:
        metaint = int(icy_metaint_header)
        read_buffer = metaint+255
        content = response.read(read_buffer)
        title = content[metaint:].split("'")[1]
        print(title)
except:
    raise