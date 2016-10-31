from radio.services.exceptions import DecodeServiceError


def decode_track(track):
    if track:
        try:
            track = track.encode('latin1').decode('cp1251')
        except Exception as e:
            raise DecodeServiceError(str(e))
    return track
