def serialize(stream):
    return {
        'active': stream.get('active'),
        'stream_ip': stream.get('stream_ip'),
        'id': str(stream.get('_id'))
    }